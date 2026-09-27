import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateSplats, CLUSTERS, SCALE_MIN, SCALE_MAX, MAX_OPACITY } from '../src/components/background/splatData.ts';

test('generateSplats is deterministic for a seed and varies across seeds', () => {
  const a = generateSplats(500, 7);
  const b = generateSplats(500, 7);
  const c = generateSplats(500, 8);
  assert.deepEqual(a.centers, b.centers);
  assert.deepEqual(a.rotations, b.rotations);
  assert.notDeepEqual(a.centers, c.centers);
});

test('generateSplats returns arrays sized for the instanced attributes', () => {
  const s = generateSplats(123, 1);
  assert.equal(s.count, 123);
  assert.equal(s.centers.length, 123 * 3);
  assert.equal(s.scales.length, 123 * 3);
  assert.equal(s.rotations.length, 123 * 4);
  assert.equal(s.looks.length, 123 * 2);
});

test('scales stay in range, rotations are unit quaternions, looks are valid', () => {
  const s = generateSplats(5000, 42);
  for (const v of s.scales) assert.ok(v >= Math.fround(SCALE_MIN) && v <= Math.fround(SCALE_MAX), `scale ${v}`);
  for (let i = 0; i < s.count; i++) {
    const [x, y, z, w] = s.rotations.subarray(i * 4, i * 4 + 4);
    assert.ok(Math.abs(Math.hypot(x, y, z, w) - 1) < 1e-5, `quaternion ${i}`);
    const shade = s.looks[i * 2];
    const opacity = s.looks[i * 2 + 1];
    assert.ok(shade >= 0 && shade <= 1, `shade ${shade}`);
    assert.ok(opacity > 0 && opacity <= MAX_OPACITY + 1e-6, `opacity ${opacity}`);
  }
});

test('sample mean matches the Gaussian mixture mean', () => {
  const totalWeight = CLUSTERS.reduce((sum, c) => sum + c.weight, 0);
  assert.ok(Math.abs(totalWeight - 1) < 1e-9, 'cluster weights sum to 1');

  const n = 20000;
  const s = generateSplats(n, 3);
  for (let k = 0; k < 3; k++) {
    const expected = CLUSTERS.reduce((sum, c) => sum + c.weight * c.center[k], 0);
    let mean = 0;
    for (let i = 0; i < n; i++) mean += s.centers[i * 3 + k] / n;
    // mixture sd is ~3.6 on x, so the standard error at n = 20000 is ~0.03
    assert.ok(Math.abs(mean - expected) < 0.15, `axis ${k}: mean ${mean} vs ${expected}`);
  }
});
