import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- 1. BLACK HOLE DATA GENERATION ---
const generateBlackHoleData = (count = 25000) => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const particleTypes = new Float32Array(count); // 0: disk, 1: jet, 2: core glow

    for (let i = 0; i < count; i++) {
        randoms[i] = Math.random();

        const typeRoll = Math.random();

        if (typeRoll < 0.75) {
            // ACCRETION DISK (75% of particles)
            particleTypes[i] = 0;

            // Orbital radius with concentration toward middle
            const minRadius = 3;
            const maxRadius = 20;
            const r = minRadius + Math.pow(Math.random(), 0.7) * (maxRadius - minRadius);

            // Flat disk with slight thickness variation
            const angle = Math.random() * Math.PI * 2;
            const thickness = 0.5 + (r / maxRadius) * 1.5; // Thicker at edges
            const y = (Math.random() - 0.5) * thickness;

            positions[i * 3] = Math.cos(angle) * r;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * r;

            // Orbital velocity (faster near center - Kepler's laws)
            const orbitalSpeed = 1.0 / Math.sqrt(r);
            velocities[i * 3] = -Math.sin(angle) * orbitalSpeed;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = Math.cos(angle) * orbitalSpeed;

        } else if (typeRoll < 0.90) {
            // POLAR JETS (15% of particles)
            particleTypes[i] = 1;

            // Jet particles stream from poles
            const jetHeight = (Math.random() * 25 + 5) * (Math.random() > 0.5 ? 1 : -1);
            const jetRadius = Math.abs(jetHeight) * 0.15 * Math.random();
            const jetAngle = Math.random() * Math.PI * 2;

            positions[i * 3] = Math.cos(jetAngle) * jetRadius;
            positions[i * 3 + 1] = jetHeight;
            positions[i * 3 + 2] = Math.sin(jetAngle) * jetRadius;

            // Jet velocity (outward from core)
            const jetSpeed = 0.5 + Math.random() * 0.5;
            velocities[i * 3] = 0;
            velocities[i * 3 + 1] = Math.sign(jetHeight) * jetSpeed;
            velocities[i * 3 + 2] = 0;

        } else {
            // CORE GLOW (10% of particles)
            particleTypes[i] = 2;

            // Dense concentration at event horizon
            const coreRadius = 2 + Math.random() * 2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);

            positions[i * 3] = coreRadius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = coreRadius * Math.sin(phi) * Math.sin(theta) * 0.3;
            positions[i * 3 + 2] = coreRadius * Math.cos(phi);

            // Slow chaotic movement
            velocities[i * 3] = (Math.random() - 0.5) * 0.2;
            velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
            velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
        }
    }

    return { positions, velocities, randoms, particleTypes };
};

// --- 2. BLACK HOLE SHADER (Interstellar Colors) ---
const BlackHoleShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uPhase: 0, // 0-1: formation/rotation, 1-2: explosion
        uExplosionProgress: 0,
        // Interstellar Color Palette
        uColorDiskCool: new THREE.Color("#ff6b35"),    // Amber/Orange
        uColorDiskHot: new THREE.Color("#ffd166"),     // Yellow/White
        uColorJet: new THREE.Color("#00b4d8"),         // Cyan blue
        uColorCore: new THREE.Color("#ffffff"),        // Bright white
        uColorExplosion: new THREE.Color("#4361ee"),   // Deep blue
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform float uPhase;
    uniform float uExplosionProgress;
    
    attribute vec3 aVelocity;
    attribute float aRandom;
    attribute float aType; // 0: disk, 1: jet, 2: core
    
    varying float vAlpha;
    varying float vType;
    varying float vRadius;
    varying float vTemperature;
    varying float vExplosion;

    // Simplex noise function for organic movement
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
    
    float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
        vec3 pos = position;
        float radius = length(pos.xz);
        
        // Rotation speed varies by radius (Kepler's laws)
        float rotationSpeed = 0.3 / (0.5 + radius * 0.1);
        float angle = uTime * rotationSpeed + aRandom * 6.28;
        
        if (aType < 0.5) {
            // ACCRETION DISK - Orbital rotation
            float cosA = cos(angle);
            float sinA = sin(angle);
            vec3 rotatedPos = vec3(
                pos.x * cosA - pos.z * sinA,
                pos.y,
                pos.x * sinA + pos.z * cosA
            );
            
            // Add spiral infall
            float spiralInfall = sin(uTime * 0.5 + aRandom * 10.0) * 0.3;
            rotatedPos.xz *= 1.0 - spiralInfall * 0.05;
            
            // Organic turbulence
            float turbulence = snoise(vec3(rotatedPos.x * 0.1, rotatedPos.z * 0.1, uTime * 0.3)) * 0.5;
            rotatedPos.y += turbulence;
            
            pos = rotatedPos;
            
        } else if (aType < 1.5) {
            // POLAR JETS - Streaming outward
            float jetPhase = mod(uTime * 0.8 + aRandom * 5.0, 3.0);
            pos.y = sign(position.y) * (3.0 + jetPhase * 10.0);
            pos.x = position.x * (1.0 + jetPhase * 0.3);
            pos.z = position.z * (1.0 + jetPhase * 0.3);
            
            // Helical motion in jets
            float helixAngle = uTime * 2.0 + pos.y * 0.3;
            float helixRadius = 0.5 + abs(pos.y) * 0.05;
            pos.x += cos(helixAngle) * helixRadius;
            pos.z += sin(helixAngle) * helixRadius;
            
        } else {
            // CORE GLOW - Chaotic orbiting
            float coreAngle = uTime * 1.5 + aRandom * 6.28;
            pos.x = position.x * cos(coreAngle) - position.z * sin(coreAngle);
            pos.z = position.x * sin(coreAngle) + position.z * cos(coreAngle);
            
            // Pulsing
            float pulse = 1.0 + sin(uTime * 3.0 + aRandom * 6.28) * 0.2;
            pos *= pulse;
        }
        
        // EXPLOSION PHASE
        if (uExplosionProgress > 0.0) {
            // Normalized direction from center
            vec3 explosionDir = normalize(pos + vec3(0.001));
            
            // Explosion force - particles fly outward
            float explosionForce = uExplosionProgress * 50.0;
            float particleDelay = aRandom * 0.3; // Staggered explosion
            float adjustedProgress = max(0.0, uExplosionProgress - particleDelay);
            
            // Easing for natural explosion feel
            float eased = 1.0 - pow(1.0 - adjustedProgress, 3.0);
            
            pos += explosionDir * explosionForce * eased;
            
            // Add some chaotic spread
            pos.x += sin(aRandom * 100.0 + uTime * 2.0) * adjustedProgress * 5.0;
            pos.y += cos(aRandom * 50.0 + uTime * 3.0) * adjustedProgress * 5.0;
            pos.z += sin(aRandom * 75.0 + uTime * 2.5) * adjustedProgress * 5.0;
        }
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Particle size - vary by type and distance
        float baseSize = aType < 0.5 ? 180.0 : (aType < 1.5 ? 120.0 : 250.0);
        float sizePulse = 1.0 + sin(uTime * 4.0 + aRandom * 10.0) * 0.2;
        
        // Explosion makes particles larger and brighter
        float explosionSize = 1.0 + uExplosionProgress * 2.0;
        
        gl_PointSize = (baseSize * sizePulse * explosionSize) / -mvPosition.z;
        
        // Output to fragment shader
        vType = aType;
        vRadius = radius;
        vTemperature = 1.0 - (radius / 20.0); // Hotter near center
        vExplosion = uExplosionProgress;
        
        // Alpha based on depth and type
        float depth = -mvPosition.z;
        vAlpha = smoothstep(80.0, 15.0, depth);
        
        // Jets fade at extremes
        if (aType >= 0.5 && aType < 1.5) {
            vAlpha *= smoothstep(35.0, 20.0, abs(pos.y));
        }
    }
  `,
    // Fragment Shader
    `
    uniform vec3 uColorDiskCool;
    uniform vec3 uColorDiskHot;
    uniform vec3 uColorJet;
    uniform vec3 uColorCore;
    uniform vec3 uColorExplosion;
    uniform float uExplosionProgress;
    
    varying float vAlpha;
    varying float vType;
    varying float vRadius;
    varying float vTemperature;
    varying float vExplosion;

    void main() {
        // Soft glowing dot
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        float strength = 1.0 / (dist * 18.0) - 0.15;
        
        if (strength < 0.01) discard;
        
        vec3 color;
        
        if (vType < 0.5) {
            // ACCRETION DISK - Temperature gradient (Interstellar style)
            color = mix(uColorDiskCool, uColorDiskHot, vTemperature);
            
            // Add slight Doppler shift (one side brighter)
            float doppler = sin(atan(coord.y, coord.x) + 1.0) * 0.3 + 0.7;
            color *= doppler;
            
        } else if (vType < 1.5) {
            // POLAR JETS - Cyan/Blue
            color = uColorJet;
            
            // Slight variation along jet
            color = mix(color, uColorCore, vTemperature * 0.3);
            
        } else {
            // CORE GLOW - Bright white/yellow
            color = mix(uColorDiskHot, uColorCore, 0.7);
        }
        
        // EXPLOSION COLOR SHIFT
        if (vExplosion > 0.0) {
            // Shift toward explosion colors (white -> blue)
            vec3 explosionColor = mix(uColorCore, uColorExplosion, vExplosion);
            color = mix(color, explosionColor, vExplosion * 0.7);
            
            // Brighten during explosion
            color *= 1.0 + vExplosion * 1.5;
        }
        
        gl_FragColor = vec4(color, strength * vAlpha);
    }
  `
);

extend({ BlackHoleShaderMaterial });

// Type augmentation for the custom shader material
declare module '@react-three/fiber' {
    interface ThreeElements {
        blackHoleShaderMaterial: ThreeElements['shaderMaterial'] & {
            uTime?: number;
            uPhase?: number;
            uExplosionProgress?: number;
            uColorDiskCool?: THREE.Color;
            uColorDiskHot?: THREE.Color;
            uColorJet?: THREE.Color;
            uColorCore?: THREE.Color;
            uColorExplosion?: THREE.Color;
        };
    }
}

// --- 3. BLACK HOLE SCENE COMPONENT ---
const BlackHoleSystem = () => {
    const meshRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial & {
        uTime: number;
        uPhase: number;
        uExplosionProgress: number;
    }>(null);

    const { positions, velocities, randoms, particleTypes } = useMemo(
        () => generateBlackHoleData(25000),
        []
    );

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (materialRef.current) {
            materialRef.current.uTime = time;

            // Animation cycle: 15 seconds total
            // 0-10s: Black hole rotation
            // 10-15s: Explosion
            const cycleTime = time % 15;

            if (cycleTime < 10) {
                // Rotation phase
                materialRef.current.uPhase = 0;
                materialRef.current.uExplosionProgress = 0;
            } else {
                // Explosion phase
                materialRef.current.uPhase = 1;
                const explosionT = (cycleTime - 10) / 5; // 0 to 1 over 5 seconds
                // Ease out for natural explosion feel
                materialRef.current.uExplosionProgress = Math.pow(explosionT, 0.5);
            }
        }

        if (meshRef.current) {
            // Subtle overall wobble
            meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;
            meshRef.current.rotation.z = Math.cos(time * 0.15) * 0.05;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aVelocity" args={[velocities, 3]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
                <bufferAttribute attach="attributes-aType" args={[particleTypes, 1]} />
            </bufferGeometry>
            <blackHoleShaderMaterial
                ref={materialRef}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// --- 4. MAIN BACKGROUND COMPONENT ---
const EvolutionaryBackground: React.FC = () => {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            // Deep space gradient - Interstellar style
            background: 'radial-gradient(ellipse at 50% 50%, #1a1a2e 0%, #0d1b2a 40%, #0a0a0f 100%)'
        }}>
            <Canvas
                camera={{ position: [0, 15, 35], fov: 50 }}
                gl={{ antialias: false, toneMapping: THREE.NoToneMapping }}
            >
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    enablePan={false}
                    maxPolarAngle={Math.PI * 0.7}
                    minPolarAngle={Math.PI * 0.3}
                />

                <BlackHoleSystem />

                {/* POST PROCESSING: Enhanced bloom for cinematic glow */}
                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.1}
                        mipmapBlur
                        intensity={2.0}
                        radius={0.8}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default EvolutionaryBackground;
