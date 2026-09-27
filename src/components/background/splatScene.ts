import {
  BufferAttribute,
  Color,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { generateSplats } from './splatData';

const SPLAT_COUNT = 2400;
const SEED = 20260927;
// The drift is slow enough that 30 fps looks identical and halves GPU work.
const FRAME_MS = 1000 / 30;
const THEME_EASE = 0.12; // per frame, roughly matches the body's 0.5s colour transition
const SCROLL_EASE = 0.08;

// Same projection as 3D Gaussian Splatting (Kerbl et al. 2023): the 3D covariance
// R S S^T R^T is mapped to a 2D screen ellipse through the Jacobian of the perspective
// projection, then a quad is stretched along that ellipse's eigenvectors.
const vertexShader = /* glsl */ `
  attribute vec3 center;
  attribute vec3 scale;
  attribute vec4 rotation;
  attribute vec2 look;

  uniform vec2 viewport;
  uniform float focal;
  uniform vec3 accent;
  uniform vec3 ink;

  varying vec2 vOffset;
  varying vec4 vColor;

  mat3 rotationFromQuat(vec4 q) {
    float x = q.x, y = q.y, z = q.z, w = q.w;
    return mat3(
      1.0 - 2.0 * (y * y + z * z), 2.0 * (x * y + w * z), 2.0 * (x * z - w * y),
      2.0 * (x * y - w * z), 1.0 - 2.0 * (x * x + z * z), 2.0 * (y * z + w * x),
      2.0 * (x * z + w * y), 2.0 * (y * z - w * x), 1.0 - 2.0 * (x * x + y * y)
    );
  }

  void main() {
    vec4 viewCenter = modelViewMatrix * vec4(center, 1.0);
    if (viewCenter.z > -0.2) {
      gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
      return;
    }

    mat3 M = rotationFromQuat(rotation) * mat3(scale.x, 0.0, 0.0, 0.0, scale.y, 0.0, 0.0, 0.0, scale.z);
    mat3 cov3 = M * transpose(M);

    float invZ = 1.0 / -viewCenter.z;
    mat3 J = mat3(
      focal * invZ, 0.0, 0.0,
      0.0, focal * invZ, 0.0,
      focal * viewCenter.x * invZ * invZ, focal * viewCenter.y * invZ * invZ, 0.0
    );
    mat3 T = J * mat3(modelViewMatrix);
    mat3 cov2 = T * cov3 * transpose(T);

    // 0.3 px low-pass, as in 3DGS, stops sub-pixel splats from aliasing
    float a = cov2[0][0] + 0.3;
    float b = cov2[0][1];
    float c = cov2[1][1] + 0.3;

    float mid = 0.5 * (a + c);
    float radius = length(vec2(0.5 * (a - c), b));
    float lambda1 = mid + radius;
    float lambda2 = max(mid - radius, 0.1);
    vec2 axis = vec2(b, lambda1 - a);
    axis = dot(axis, axis) < 1e-8 ? vec2(1.0, 0.0) : normalize(axis);
    vec2 major = min(sqrt(2.0 * lambda1), 1024.0) * axis;
    // +90 degrees keeps the quad counter-clockwise, so front-face culling keeps it
    vec2 minor = min(sqrt(2.0 * lambda2), 1024.0) * vec2(-axis.y, axis.x);

    vOffset = position.xy;
    vColor = vec4(mix(accent, ink, look.x), look.y);

    vec4 clipCenter = projectionMatrix * viewCenter;
    vec2 pixelOffset = position.x * major + position.y * minor;
    gl_Position = vec4(clipCenter.xy / clipCenter.w + 2.0 * pixelOffset / viewport, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  varying vec2 vOffset;
  varying vec4 vColor;

  void main() {
    float power = -dot(vOffset, vOffset);
    if (power < -4.0) discard;
    gl_FragColor = vec4(vColor.rgb, vColor.a * exp(power));
    #include <colorspace_fragment>
  }
`;

function createSplatGeometry(): InstancedBufferGeometry {
  const data = generateSplats(SPLAT_COUNT, SEED);
  const geometry = new InstancedBufferGeometry();
  // Quad spans +-2 in eigen-units, where the Gaussian has fallen to exp(-4).
  geometry.setAttribute('position', new BufferAttribute(new Float32Array([-2, -2, 0, 2, -2, 0, 2, 2, 0, -2, 2, 0]), 3));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  geometry.setAttribute('center', new InstancedBufferAttribute(data.centers, 3));
  geometry.setAttribute('scale', new InstancedBufferAttribute(data.scales, 3));
  geometry.setAttribute('rotation', new InstancedBufferAttribute(data.rotations, 4));
  geometry.setAttribute('look', new InstancedBufferAttribute(data.looks, 2));
  geometry.instanceCount = data.count;
  return geometry;
}

// Low-alpha splats in similar hues: blending them unsorted shows no visible error,
// so the per-frame depth sort a captured scene would need is skipped.
function createSplatMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      viewport: { value: new Vector2(1, 1) },
      focal: { value: 1 },
      accent: { value: new Color() },
      ink: { value: new Color() },
    },
    transparent: true,
    depthTest: false,
    depthWrite: false,
  });
}

function readThemeColors(accent: Color, ink: Color) {
  const style = getComputedStyle(document.documentElement);
  accent.setStyle(style.getPropertyValue('--primary-color').trim());
  ink.setStyle(style.getPropertyValue('--text-color').trim());
}

/** Starts the background on `canvas` and returns a function that tears it down. */
export function startSplatScene(canvas: HTMLCanvasElement): () => void {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch {
    return () => {}; // no WebGL: the page keeps its plain background
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const camera = new PerspectiveCamera(50, 1, 0.1, 50);
  camera.position.set(0, 0, 9);

  const geometry = createSplatGeometry();
  const material = createSplatMaterial();
  const cloud = new Mesh(geometry, material);
  cloud.frustumCulled = false; // bounds come from the quad, not the instances
  const scene = new Scene().add(cloud);

  const { viewport, focal, accent, ink } = material.uniforms;
  const accentTarget = new Color();
  const inkTarget = new Color();
  readThemeColors(accentTarget, inkTarget);
  accent.value.copy(accentTarget);
  ink.value.copy(inkTarget);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const draw = () => renderer.render(scene, camera);

  const resize = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.getDrawingBufferSize(viewport.value);
    focal.value = viewport.value.y / (2 * Math.tan((camera.fov * Math.PI) / 360));
  };

  const onResize = () => {
    resize();
    if (reducedMotion) draw();
  };

  const observer = new MutationObserver(() => {
    readThemeColors(accentTarget, inkTarget);
    if (!reducedMotion) return; // the loop eases towards the new colours
    accent.value.copy(accentTarget);
    ink.value.copy(inkTarget);
    draw();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  window.addEventListener('resize', onResize);

  resize();
  draw();
  canvas.classList.add('is-ready');

  if (!reducedMotion) {
    let scroll = window.scrollY;
    let lastFrame = -Infinity;
    // requestAnimationFrame underneath, so the loop already stops in hidden tabs
    renderer.setAnimationLoop((time) => {
      if (time - lastFrame < FRAME_MS) return;
      lastFrame = time;
      scroll += (window.scrollY - scroll) * SCROLL_EASE;
      cloud.rotation.y = 0.25 * Math.sin(time * 0.00004) + scroll * 0.00035;
      cloud.rotation.x = 0.08 * Math.sin(time * 0.000031);
      accent.value.lerp(accentTarget, THEME_EASE);
      ink.value.lerp(inkTarget, THEME_EASE);
      draw();
    });
  }

  return () => {
    renderer.setAnimationLoop(null);
    window.removeEventListener('resize', onResize);
    observer.disconnect();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
