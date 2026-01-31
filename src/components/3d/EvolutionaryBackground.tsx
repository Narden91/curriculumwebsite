import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, shaderMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- 1. STAR FIELD DATA GENERATION ---
const generateStarField = (count = 1000) => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const twinkle = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        // Distribute stars in a large sphere around the scene
        const radius = 80 + Math.random() * 120;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        sizes[i] = 0.5 + Math.random() * 2;
        twinkle[i] = Math.random() * 6.28;
    }

    return { positions, sizes, twinkle };
};

// --- 2. STAR FIELD SHADER ---
const StarFieldShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uBlackHolePos: new THREE.Vector3(0, 0, 0),
        uExplosionProgress: 0,
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform vec3 uBlackHolePos;
    uniform float uExplosionProgress;
    attribute float aSize;
    attribute float aTwinkle;
    varying float vAlpha;
    varying float vTwinkle;

    void main() {
        vec3 pos = position;
        
        // Gravitational lensing - stars warp toward black hole
        vec3 toBlackHole = uBlackHolePos - pos;
        float dist = length(toBlackHole);
        float lensStrength = 800.0 / (dist * dist);
        lensStrength = min(lensStrength, 0.3);
        
        // Warp position toward black hole
        pos += normalize(toBlackHole) * lensStrength * 5.0;
        
        // During explosion, stars get pushed outward slightly
        if (uExplosionProgress > 0.0) {
            pos -= normalize(toBlackHole) * uExplosionProgress * 3.0;
        }
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Twinkling size
        float twinkleAmount = sin(uTime * 3.0 + aTwinkle) * 0.5 + 0.5;
        float pSize = aSize * (1.0 + twinkleAmount * 0.5) * (300.0 / max(-mvPosition.z, 1.0));
        gl_PointSize = clamp(pSize, 0.0, 15.0); // Keep stars small and safe
        
        vAlpha = 0.6 + twinkleAmount * 0.4;
        vTwinkle = aTwinkle;
    }
    `,
    // Fragment Shader
    `
    varying float vAlpha;
    varying float vTwinkle;

    void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        float strength = 1.0 - smoothstep(0.0, 0.5, dist);
        
        // Star color variation (white, pale blue, warm yellow)
        vec3 color = vec3(1.0);
        float colorVar = fract(vTwinkle * 10.0);
        if (colorVar < 0.3) {
            color = vec3(0.8, 0.9, 1.0); // Pale blue
        } else if (colorVar < 0.5) {
            color = vec3(1.0, 0.95, 0.8); // Warm yellow
        }
        
        gl_FragColor = vec4(color, strength * vAlpha);
    }
    `
);

// --- 3. BLACK HOLE DATA GENERATION ---
const generateBlackHoleData = (count = 5000) => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const particleTypes = new Float32Array(count);
    const trailOffsets = new Float32Array(count); // For trail effect

    for (let i = 0; i < count; i++) {
        randoms[i] = Math.random();
        trailOffsets[i] = Math.random() * 0.5; // Trail phase offset

        const typeRoll = Math.random();

        if (typeRoll < 0.65) {
            // ACCRETION DISK (65%)
            particleTypes[i] = 0;

            const minRadius = 3;
            const maxRadius = 22;
            const r = minRadius + Math.pow(Math.random(), 0.6) * (maxRadius - minRadius);

            const angle = Math.random() * Math.PI * 2;
            const thickness = 0.3 + (r / maxRadius) * 1.2;
            const y = (Math.random() - 0.5) * thickness;

            positions[i * 3] = Math.cos(angle) * r;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = Math.sin(angle) * r;

            const orbitalSpeed = 1.2 / Math.sqrt(r);
            velocities[i * 3] = -Math.sin(angle) * orbitalSpeed;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = Math.cos(angle) * orbitalSpeed;

        } else if (typeRoll < 0.80) {
            // POLAR JETS (15%)
            particleTypes[i] = 1;

            const jetHeight = (Math.random() * 30 + 5) * (Math.random() > 0.5 ? 1 : -1);
            const jetRadius = Math.abs(jetHeight) * 0.12 * Math.random();
            const jetAngle = Math.random() * Math.PI * 2;

            positions[i * 3] = Math.cos(jetAngle) * jetRadius;
            positions[i * 3 + 1] = jetHeight;
            positions[i * 3 + 2] = Math.sin(jetAngle) * jetRadius;

            const jetSpeed = 0.6 + Math.random() * 0.6;
            velocities[i * 3] = 0;
            velocities[i * 3 + 1] = Math.sign(jetHeight) * jetSpeed;
            velocities[i * 3 + 2] = 0;

        } else if (typeRoll < 0.90) {
            // EINSTEIN RING / PHOTON SPHERE (10%)
            particleTypes[i] = 2;

            const ringRadius = 4.5 + Math.random() * 0.5;
            const ringAngle = Math.random() * Math.PI * 2;

            positions[i * 3] = Math.cos(ringAngle) * ringRadius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
            positions[i * 3 + 2] = Math.sin(ringAngle) * ringRadius;

            velocities[i * 3] = -Math.sin(ringAngle) * 2.0;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = Math.cos(ringAngle) * 2.0;

        } else {
            // SWIRLING MATTER STREAMS (10%)
            particleTypes[i] = 3;

            // Spiral infall pattern
            const spiralT = Math.random();
            const spiralRadius = 8 + spiralT * 15;
            const spiralAngle = spiralT * Math.PI * 6 + Math.random() * 0.5;

            positions[i * 3] = Math.cos(spiralAngle) * spiralRadius;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] = Math.sin(spiralAngle) * spiralRadius;

            // Inward velocity + orbital
            const inwardSpeed = 0.3;
            velocities[i * 3] = -Math.cos(spiralAngle) * inwardSpeed - Math.sin(spiralAngle) * 0.5;
            velocities[i * 3 + 1] = 0;
            velocities[i * 3 + 2] = -Math.sin(spiralAngle) * inwardSpeed + Math.cos(spiralAngle) * 0.5;
        }
    }

    return { positions, velocities, randoms, particleTypes, trailOffsets };
};

// --- 4. ENHANCED BLACK HOLE SHADER ---
const BlackHoleShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uExplosionProgress: 0,
        uShockwaveRadius: 0,
        // Interstellar Color Palette
        uColorDiskCool: new THREE.Color("#ff6b35"),
        uColorDiskHot: new THREE.Color("#ffd166"),
        uColorJet: new THREE.Color("#00b4d8"),
        uColorCore: new THREE.Color("#ffffff"),
        uColorExplosion: new THREE.Color("#4361ee"),
        uColorRing: new THREE.Color("#ffaa00"),
    },
    // Vertex Shader
    `
    uniform float uTime;
    uniform float uExplosionProgress;
    uniform float uShockwaveRadius;
    
    attribute vec3 aVelocity;
    attribute float aRandom;
    attribute float aType;
    attribute float aTrailOffset;
    
    varying float vAlpha;
    varying float vType;
    varying float vRadius;
    varying float vTemperature;
    varying float vExplosion;
    varying float vTrailIntensity;

    // Simplex noise
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
        
        // Rotation speed (Keplerian)
        float rotationSpeed = 0.4 / (0.3 + radius * 0.08);
        float angle = uTime * rotationSpeed + aRandom * 6.28;
        
        // Trail effect - elongate particle along motion path
        float trailPhase = fract(uTime * 0.5 + aTrailOffset);
        vTrailIntensity = 1.0 - trailPhase * 0.5;
        
        if (aType < 0.5) {
            // ACCRETION DISK
            float cosA = cos(angle);
            float sinA = sin(angle);
            vec3 rotatedPos = vec3(
                pos.x * cosA - pos.z * sinA,
                pos.y,
                pos.x * sinA + pos.z * cosA
            );
            
            // Spiral infall
            float spiralInfall = sin(uTime * 0.3 + aRandom * 10.0) * 0.2;
            rotatedPos.xz *= 1.0 - spiralInfall * 0.03;
            
            // Turbulence
            float turbulence = snoise(vec3(rotatedPos.x * 0.15, rotatedPos.z * 0.15, uTime * 0.2)) * 0.6;
            rotatedPos.y += turbulence;
            
            // Gravitational stretching near center
            float stretch = 1.0 + (1.0 / (radius + 1.0)) * 0.3;
            rotatedPos.y *= stretch;
            
            pos = rotatedPos;
            
        } else if (aType < 1.5) {
            // POLAR JETS
            float jetPhase = mod(uTime * 1.0 + aRandom * 5.0, 3.5);
            pos.y = sign(position.y) * (2.0 + jetPhase * 12.0);
            pos.x = position.x * (1.0 + jetPhase * 0.4);
            pos.z = position.z * (1.0 + jetPhase * 0.4);
            
            // Helical motion
            float helixAngle = uTime * 3.0 + pos.y * 0.25;
            float helixRadius = 0.8 + abs(pos.y) * 0.04;
            pos.x += cos(helixAngle) * helixRadius;
            pos.z += sin(helixAngle) * helixRadius;
            
        } else if (aType < 2.5) {
            // EINSTEIN RING
            float ringAngle = uTime * 2.5 + aRandom * 6.28;
            float ringRadius = 4.5 + sin(uTime * 2.0 + aRandom * 10.0) * 0.2;
            pos.x = cos(ringAngle) * ringRadius;
            pos.z = sin(ringAngle) * ringRadius;
            pos.y = sin(uTime * 3.0 + aRandom * 6.28) * 0.15;
            
        } else {
            // SWIRLING MATTER STREAMS
            float streamTime = mod(uTime * 0.4 + aRandom * 3.0, 2.0);
            float streamRadius = 20.0 - streamTime * 8.0;
            streamRadius = max(streamRadius, 3.0);
            
            float streamAngle = uTime * 0.8 + aRandom * 6.28 + streamTime * 4.0;
            pos.x = cos(streamAngle) * streamRadius;
            pos.z = sin(streamAngle) * streamRadius;
            pos.y = (aRandom - 0.5) * (1.0 - streamTime * 0.3);
        }
        
        // EXPLOSION PHASE
        if (uExplosionProgress > 0.0) {
            vec3 explosionDir = normalize(pos + vec3(0.001));
            float explosionForce = uExplosionProgress * 60.0;
            float particleDelay = aRandom * 0.25;
            float adjustedProgress = max(0.0, uExplosionProgress - particleDelay);
            float eased = 1.0 - pow(1.0 - adjustedProgress, 2.5);
            
            pos += explosionDir * explosionForce * eased;
            
            // Chaotic spread
            pos.x += sin(aRandom * 100.0 + uTime * 3.0) * adjustedProgress * 8.0;
            pos.y += cos(aRandom * 50.0 + uTime * 4.0) * adjustedProgress * 8.0;
            pos.z += sin(aRandom * 75.0 + uTime * 3.5) * adjustedProgress * 8.0;
        }
        
        // SHOCKWAVE RING (particles near the ring get pushed)
        if (uShockwaveRadius > 0.0) {
            float distFromRing = abs(length(pos.xz) - uShockwaveRadius);
            float ringInfluence = smoothstep(5.0, 0.0, distFromRing);
            pos.xz *= 1.0 + ringInfluence * 0.3;
            pos.y += ringInfluence * sin(aRandom * 10.0) * 2.0;
        }
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Size by type
        float baseSize = aType < 0.5 ? 200.0 : (aType < 1.5 ? 140.0 : (aType < 2.5 ? 280.0 : 160.0));
        float sizePulse = 1.0 + sin(uTime * 5.0 + aRandom * 10.0) * 0.25;
        float explosionSize = 1.0 + uExplosionProgress * 2.5;
        
        // Safe point size calculation
        float distZ = max(-mvPosition.z, 1.0); // Prevent negative or zero Z division
        float pSize = (baseSize * sizePulse * explosionSize) / distZ;
        gl_PointSize = clamp(pSize, 0.0, 50.0); // Strict clamp to prevent giant tiles
        
        // Outputs
        vType = aType;
        vRadius = radius;
        vTemperature = 1.0 - (radius / 22.0);
        vExplosion = uExplosionProgress;
        
        float depth = -mvPosition.z;
        vAlpha = smoothstep(100.0, 15.0, depth);
        
        // Einstein ring extra brightness
        if (aType >= 1.5 && aType < 2.5) {
            vAlpha *= 1.5;
        }
        
        // Jets fade at extremes
        if (aType >= 0.5 && aType < 1.5) {
            vAlpha *= smoothstep(40.0, 25.0, abs(pos.y));
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
    uniform vec3 uColorRing;
    uniform float uExplosionProgress;
    uniform float uShockwaveRadius;
    uniform float uTime;
    
    varying float vAlpha;
    varying float vType;
    varying float vRadius;
    varying float vTemperature;
    varying float vExplosion;
    varying float vTrailIntensity;

    void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        float dist = length(coord);
        
        // Elongated glow for trail effect
        float trailStretch = 1.0 + (1.0 - vTrailIntensity) * 0.5;
        vec2 stretchedCoord = coord * vec2(1.0, trailStretch);
        float stretchedDist = length(stretchedCoord);
        
        // Safety guard: prevent division by zero
        float strength = 1.0 / (max(stretchedDist, 0.001) * 16.0) - 0.12;
        
        if (strength < 0.01) discard;
        
        strength = clamp(strength, 0.0, 1.0); // Clamp strength to avoid blowouts
        
        vec3 color;
        
        if (vType < 0.5) {
            // ACCRETION DISK
            color = mix(uColorDiskCool, uColorDiskHot, vTemperature);
            
            // Doppler shift
            float doppler = sin(atan(coord.y, coord.x) + 0.8) * 0.35 + 0.65;
            color *= doppler;
            
            // Hot inner region
            if (vRadius < 6.0) {
                color = mix(color, uColorCore, (6.0 - vRadius) / 6.0 * 0.5);
            }
            
        } else if (vType < 1.5) {
            // POLAR JETS
            color = uColorJet;
            color = mix(color, uColorCore, vTemperature * 0.4);
            
            // Pulsing brightness
            float pulse = sin(uTime * 8.0 + vRadius * 0.5) * 0.3 + 0.7;
            color *= pulse;
            
        } else if (vType < 2.5) {
            // EINSTEIN RING
            color = mix(uColorRing, uColorCore, 0.6);
            
            // Intense pulsing glow
            float ringPulse = sin(uTime * 4.0) * 0.2 + 1.0;
            color *= ringPulse;
            strength *= 1.8;
            
        } else {
            // SWIRLING MATTER STREAMS
            color = mix(uColorDiskCool, uColorDiskHot, vTemperature * 1.5);
            
            // Brighter as they approach center
            float proximityBoost = 1.0 + (1.0 - vRadius / 20.0) * 0.5;
            color *= proximityBoost;
        }
        
        // EXPLOSION COLOR SHIFT
        if (vExplosion > 0.0) {
            vec3 explosionColor = mix(uColorCore, uColorExplosion, vExplosion * 0.8);
            color = mix(color, explosionColor, vExplosion * 0.75);
            color *= 1.0 + vExplosion * 2.0;
        }
        
        // Shockwave ring glow
        if (uShockwaveRadius > 0.0) {
            float ringGlow = smoothstep(3.0, 0.0, abs(vRadius - uShockwaveRadius));
            color += vec3(0.5, 0.7, 1.0) * ringGlow * 2.0;
        }
        
        gl_FragColor = vec4(color, strength * vAlpha * vTrailIntensity);
    }
    `
);

extend({ BlackHoleShaderMaterial, StarFieldShaderMaterial });

// Type augmentation
declare module '@react-three/fiber' {
    interface ThreeElements {
        blackHoleShaderMaterial: ThreeElements['shaderMaterial'] & {
            uTime?: number;
            uExplosionProgress?: number;
            uShockwaveRadius?: number;
            uColorDiskCool?: THREE.Color;
            uColorDiskHot?: THREE.Color;
            uColorJet?: THREE.Color;
            uColorCore?: THREE.Color;
            uColorExplosion?: THREE.Color;
            uColorRing?: THREE.Color;
        };
        starFieldShaderMaterial: ThreeElements['shaderMaterial'] & {
            uTime?: number;
            uBlackHolePos?: THREE.Vector3;
            uExplosionProgress?: number;
        };
    }
}

// --- 5. STAR FIELD COMPONENT ---
const StarField = ({ explosionProgress }: { explosionProgress: number }) => {
    const materialRef = useRef<THREE.ShaderMaterial & {
        uTime: number;
        uExplosionProgress: number;
    }>(null);

    const { positions, sizes, twinkle } = useMemo(() => generateStarField(3000), []);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();
            materialRef.current.uExplosionProgress = explosionProgress;
        }
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
                <bufferAttribute attach="attributes-aTwinkle" args={[twinkle, 1]} />
            </bufferGeometry>
            <starFieldShaderMaterial
                ref={materialRef}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
};

// --- 6. BLACK HOLE SYSTEM COMPONENT ---
const BlackHoleSystem = ({ onExplosionProgress }: { onExplosionProgress: (p: number) => void }) => {
    const meshRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.ShaderMaterial & {
        uTime: number;
        uExplosionProgress: number;
        uShockwaveRadius: number;
    }>(null);

    const { positions, velocities, randoms, particleTypes, trailOffsets } = useMemo(
        () => generateBlackHoleData(30000),
        []
    );

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (materialRef.current) {
            materialRef.current.uTime = time;

            // Animation cycle: 18 seconds total
            const cycleTime = time % 18;

            if (cycleTime < 12) {
                // Rotation phase
                materialRef.current.uExplosionProgress = 0;
                materialRef.current.uShockwaveRadius = 0;
                onExplosionProgress(0);
            } else {
                // Explosion phase (12-18s)
                const explosionT = (cycleTime - 12) / 6;
                const explosionProgress = Math.pow(explosionT, 0.4);
                materialRef.current.uExplosionProgress = explosionProgress;

                // Shockwave ring expands
                const shockwaveDelay = 0.2;
                const shockwaveT = Math.max(0, explosionT - shockwaveDelay) / (1 - shockwaveDelay);
                materialRef.current.uShockwaveRadius = shockwaveT * 80;

                onExplosionProgress(explosionProgress);
            }
        }

        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(time * 0.08) * 0.12;
            meshRef.current.rotation.z = Math.cos(time * 0.12) * 0.06;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-aVelocity" args={[velocities, 3]} />
                <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
                <bufferAttribute attach="attributes-aType" args={[particleTypes, 1]} />
                <bufferAttribute attach="attributes-aTrailOffset" args={[trailOffsets, 1]} />
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

// --- 7. MAIN SCENE WRAPPER ---
const BlackHoleScene = () => {
    const [explosionProgress, setExplosionProgress] = React.useState(0);

    return (
        <>
            <StarField explosionProgress={explosionProgress} />
            <BlackHoleSystem onExplosionProgress={setExplosionProgress} />
        </>
    );
};

// --- 8. MAIN BACKGROUND COMPONENT ---
const EvolutionaryBackground: React.FC = () => {
    // Detect Firefox - it has issues with post-processing and performance
    const isFirefox = useMemo(() => {
        if (typeof navigator !== 'undefined') {
            return navigator.userAgent.toLowerCase().includes('firefox');
        }
        return false;
    }, []);

    // Firefox gets lower resolution for better performance
    const dpr: [number, number] = isFirefox ? [1, 1] : [1, 1.5];

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            background: 'radial-gradient(ellipse at 50% 50%, #0d1b2a 0%, #0a0a12 50%, #050508 100%)'
        }}>
            <Canvas
                camera={{ position: [0, 18, 40], fov: 55 }}
                dpr={dpr}
                gl={{
                    alpha: false,
                    antialias: false,
                    toneMapping: THREE.NoToneMapping,
                    preserveDrawingBuffer: true,
                    powerPreference: isFirefox ? 'low-power' : 'high-performance'
                }}
            >
                <color attach="background" args={['#050508']} />

                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={isFirefox ? 0.15 : 0.25}
                    enablePan={false}
                    maxPolarAngle={Math.PI * 0.75}
                    minPolarAngle={Math.PI * 0.25}
                />

                <BlackHoleScene />

                {/* POST PROCESSING - disabled for Firefox due to WebGL issues */}
                {!isFirefox && (
                    <EffectComposer multisampling={0}>
                        <Bloom
                            luminanceThreshold={0.5}
                            mipmapBlur
                            intensity={1.0}
                            radius={0.8}
                        />
                    </EffectComposer>
                )}
            </Canvas>
        </div>
    );
};

export default EvolutionaryBackground;
