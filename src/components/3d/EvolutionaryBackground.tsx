import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- 1. DATA GENERATION (Denser & More Organic) ---
const generateEvolutionData = (count = 20000) => { // Increased density to 20k
    const initialPos = new Float32Array(count * 3);
    const targetPos = new Float32Array(count * 3);
    const randoms = new Float32Array(count); // Individual random offset for animation

    for (let i = 0; i < count; i++) {
        randoms[i] = Math.random();

        // STATE 1: CHAOS (Nebula Cloud)
        // We use a spherical distribution but concentrated in the center
        const r = 35 * Math.cbrt(Math.random()); // Cube root for more center density
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        initialPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        initialPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        initialPos[i * 3 + 2] = r * Math.cos(phi);

        // STATE 2: ORDER (Double Helix / DNA)
        const t = (i / count) * Math.PI * 20;
        const strandOffset = (i % 2 === 0) ? 0 : Math.PI;
        const radius = 5;
        const heightSpread = 25;

        let x = Math.cos(t + strandOffset) * radius;
        let z = Math.sin(t + strandOffset) * radius;
        let y = (i / count) * heightSpread - (heightSpread / 2);

        // Add "Genetic Variation" (Jitter)
        // This fills the gaps inside the helix structure
        const jitter = 1.5;
        x += (Math.random() - 0.5) * jitter;
        y += (Math.random() - 0.5) * jitter;
        z += (Math.random() - 0.5) * jitter;

        targetPos[i * 3] = x;
        targetPos[i * 3 + 1] = y;
        targetPos[i * 3 + 2] = z;
    }

    return { initialPos, targetPos, randoms };
};

// --- 2. THE IMPROVED SHADER (Soft Glow + Tech Noise) ---
const EvolutionShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uEvolution: 0,
        uColorA: new THREE.Color("#da073cff"), // High Error (Red)
        uColorB: new THREE.Color("#00f0ff"), // Optimized (Cyan)
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform float uEvolution;
    attribute vec3 aTarget;
    attribute float aRandom;
    
    varying float vAlpha;
    varying float vMorphFactor;

    void main() {
      vec3 posA = position; 
      vec3 posB = aTarget;

      // Morphing with a slight delay per particle for a "flowing" look
      float delayedEvolution = smoothstep(0.0, 1.0, uEvolution + (aRandom * 0.2) - 0.1);
      vec3 finalPos = mix(posA, posB, delayedEvolution);

      // Organic Movement (Curl Noise approximation)
      float noiseFreq = 1.5;
      float noiseAmp = (1.0 - delayedEvolution) * 0.8; // More chaos in chaotic state
      
      finalPos.x += sin(uTime * 2.0 + finalPos.y * 0.5) * noiseAmp;
      finalPos.z += cos(uTime * 1.5 + finalPos.x * 0.5) * noiseAmp;
      
      // Particle Breathing
      float sizePulse = 1.0 + sin(uTime * 3.0 + aRandom * 10.0) * 0.3;

      vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
      gl_Position = projectionMatrix * mvPosition;
      
      // Attenuation: Particles get smaller as they go further back
      gl_PointSize = (200.0 * sizePulse) / -mvPosition.z;
      
      // Alpha Fade: Fade out distant particles (Fog effect)
      float depth = -mvPosition.z;
      vAlpha = smoothstep(50.0, 10.0, depth);
      vMorphFactor = delayedEvolution;
    }
  `,
    // Fragment Shader (Soft Glow Core)
    `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying float vAlpha;
    varying float vMorphFactor;

    void main() {
      // Calculate distance from center of point (0.0 to 0.5)
      vec2 coord = gl_PointCoord - vec2(0.5);
      float dist = length(coord);

      // Create a soft glowing dot instead of a hard circle
      // 0.05 is the "hot" center, 0.5 is the edge
      float strength = 1.0 / (dist * 20.0) - 0.1; 
      
      // Add subtle "Tech Noise" to the glow, but don't discard pixels
      // This keeps the "Digital" feel without creating gaps
      // float noise = fract(sin(dot(gl_PointCoord.xy, vec2(12.9898,78.233))) * 43758.5453);
      // strength *= (0.8 + noise * 0.2);

      if (strength < 0.01) discard;

      vec3 color = mix(uColorA, uColorB, vMorphFactor);
      
      // Output color with additive alpha
      gl_FragColor = vec4(color, strength * vAlpha);
    }
  `
);

extend({ EvolutionShaderMaterial });

// Type augmentation for the custom shader material in @react-three/fiber
declare module '@react-three/fiber' {
    interface ThreeElements {
        evolutionShaderMaterial: ThreeElements['shaderMaterial'] & {
            uTime?: number;
            uEvolution?: number;
            uColorA?: THREE.Color;
            uColorB?: THREE.Color;
        };
    }
}

// --- 3. SCENE COMPONENT ---
const EvolutionarySystem = () => {
    const meshRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial & { uTime: number; uEvolution: number }>(null);

    const { initialPos, targetPos, randoms } = useMemo(() => generateEvolutionData(20000), []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (materialRef.current) {
            materialRef.current.uTime = time;
            // Cycle: Chaos -> Order -> Chaos
            const cycle = (Math.sin(time * 0.4) + 1) / 2;
            materialRef.current.uEvolution = THREE.MathUtils.smoothstep(cycle, 0.1, 0.9);
        }

        if (meshRef.current) {
            meshRef.current.rotation.y = time * 0.1; // Slowly rotate the universe
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[initialPos, 3]} />
                <bufferAttribute attach="attributes-aTarget" args={[targetPos, 3]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
            </bufferGeometry>
            {/* AdditiveBlending + No DepthWrite = Glowing Energy */}
            <evolutionShaderMaterial
                ref={materialRef}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// --- 4. BACKGROUND COMPONENT ---
const EvolutionaryBackground: React.FC = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: 'radial-gradient(ellipse at 50% 50%, #334155 0%, #1e293b 60%, #0f172a 100%)'
        }}>
            <Canvas camera={{ position: [0, 0, 40], fov: 45 }} gl={{ antialias: false, toneMapping: THREE.NoToneMapping }}>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} />

                <EvolutionarySystem />

                {/* POST PROCESSING: The key to removing the "gapped" look */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2} // Anything brighter than 0.2 will glow
                        mipmapBlur // Soft, high-quality blur
                        intensity={1.5} // How strong the glow is
                        radius={0.6} // How far the glow spreads
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default EvolutionaryBackground;
