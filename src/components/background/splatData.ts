// Seeded Gaussian-mixture cloud: every splat is an anisotropic 3D Gaussian
// (center, per-axis scale, rotation quaternion) plus a shade and an opacity.

export interface SplatData {
  count: number;
  centers: Float32Array; // xyz
  scales: Float32Array; // xyz, standard deviations in world units
  rotations: Float32Array; // xyzw, unit quaternions
  looks: Float32Array; // shade (0 = accent, 1 = ink), opacity
}

interface Cluster {
  center: [number, number, number];
  spread: [number, number, number];
  weight: number;
  shade: number;
}

// Kept off the reading column's centre line so text sits over sparse regions.
export const CLUSTERS: Cluster[] = [
  { center: [-4.2, 1.6, -1.0], spread: [1.6, 1.0, 1.4], weight: 0.28, shade: 0.15 },
  { center: [4.6, -0.8, -0.5], spread: [1.8, 1.3, 1.2], weight: 0.3, shade: 0.35 },
  { center: [1.2, 2.8, -3.0], spread: [2.4, 0.7, 1.0], weight: 0.16, shade: 0.8 },
  { center: [-2.0, -2.6, -2.2], spread: [2.0, 0.9, 1.6], weight: 0.16, shade: 0.6 },
  { center: [0.0, 0.0, -5.0], spread: [5.0, 3.0, 1.5], weight: 0.1, shade: 0.9 },
];

export const SCALE_MIN = 0.008;
export const SCALE_MAX = 0.3;
export const MAX_OPACITY = 0.45;
const BASE_SIZE = 0.045;

// mulberry32: tiny, fast, and identical across browsers for a given seed
export function createRng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussian(rng: () => number): number {
  const u = 1 - rng(); // (0, 1], keeps log finite
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rng());
}

function pickCluster(rng: () => number): Cluster {
  let r = rng();
  for (const cluster of CLUSTERS) {
    r -= cluster.weight;
    if (r <= 0) return cluster;
  }
  return CLUSTERS[CLUSTERS.length - 1];
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function generateSplats(count: number, seed: number): SplatData {
  const rng = createRng(seed);
  const centers = new Float32Array(count * 3);
  const scales = new Float32Array(count * 3);
  const rotations = new Float32Array(count * 4);
  const looks = new Float32Array(count * 2);

  for (let i = 0; i < count; i++) {
    const cluster = pickCluster(rng);
    for (let k = 0; k < 3; k++) {
      centers[i * 3 + k] = cluster.center[k] + gaussian(rng) * cluster.spread[k];
    }

    // Log-normal size with per-axis stretch gives a mix of dust and long streaks.
    const size = BASE_SIZE * Math.exp(0.6 * gaussian(rng));
    for (let k = 0; k < 3; k++) {
      scales[i * 3 + k] = clamp(size * Math.exp(0.4 * gaussian(rng)), SCALE_MIN, SCALE_MAX);
    }

    // Shoemake's method: uniform random rotation
    const u1 = rng();
    const u2 = 2 * Math.PI * rng();
    const u3 = 2 * Math.PI * rng();
    const s1 = Math.sqrt(1 - u1);
    const s2 = Math.sqrt(u1);
    rotations.set([s1 * Math.sin(u2), s1 * Math.cos(u2), s2 * Math.sin(u3), s2 * Math.cos(u3)], i * 4);

    // Large splats cover more pixels, so they get less opacity to stay faint.
    looks[i * 2] = clamp(cluster.shade + 0.25 * gaussian(rng), 0, 1);
    looks[i * 2 + 1] = MAX_OPACITY * clamp(BASE_SIZE / size, 0.1, 1);
  }

  return { count, centers, scales, rotations, looks };
}
