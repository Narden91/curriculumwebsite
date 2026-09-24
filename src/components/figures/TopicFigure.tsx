import React from 'react';
import type { TopicId } from '../../data/postdocData';
import './TopicFigure.css';

// Schematic figures for the postdoc topics. Curves are computed from simple models (Gaussian
// peaks, posterior mixtures, an AR(2) series) so they are faithful sketches, not decoration.
// Random-looking elements use a fixed seed, so every build draws the same picture.

const W = 240;
const H = 150;

type Fn = (t: number) => number;

interface Box {
  x0: number;
  x1: number;
  y0: number; // where f = 0
  y1: number; // where f = 1
}

const PLOT: Box = { x0: 20, x1: 220, y0: 125, y1: 22 };

/** SVG path of f(t) for t in [0, 1], mapped into the box. */
function plot(f: Fn, box: Box = PLOT, samples = 160): string {
  let d = '';
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const x = box.x0 + t * (box.x1 - box.x0);
    const y = box.y0 - f(t) * (box.y0 - box.y1);
    d += `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }
  return d;
}

/** Closed area between f and the box's zero line, for filled densities. */
function area(f: Fn, box: Box = PLOT): string {
  return `${plot(f, box)}L${box.x1},${box.y0}L${box.x0},${box.y0}Z`;
}

const gauss = (t: number, mu: number, sigma: number) => Math.exp(-((t - mu) ** 2) / (2 * sigma * sigma));

/** Deterministic pseudo-random numbers in [0, 1) (Park–Miller). */
function seeded(seed: number): () => number {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Line with an arrowhead at its end. */
function Arrow({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="fig-main" />
      <polygon points="0,0 -6,-3.2 -6,3.2" transform={`translate(${x2},${y2}) rotate(${angle})`} className="fig-accent" />
    </g>
  );
}

function Label({ x, y, children, anchor = 'start', strong }: { x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end'; strong?: boolean }) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={strong ? 'fig-label fig-label-strong' : 'fig-label'}>
      {children}
    </text>
  );
}

const Axis = () => <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x1} y2={PLOT.y0} className="fig-axis" />;

function Spectroscopy() {
  const baseline: Fn = (t) => 0.12 + 0.26 * t;
  const spectrum: Fn = (t) =>
    baseline(t) + 0.5 * gauss(t, 0.22, 0.025) + 0.72 * gauss(t, 0.47, 0.018) + 0.3 * gauss(t, 0.74, 0.04) + 0.85 * gauss(t, 0.61, 0.003);
  const spikeX = PLOT.x0 + 0.61 * (PLOT.x1 - PLOT.x0);
  const spikeY = PLOT.y0 - spectrum(0.61) * (PLOT.y0 - PLOT.y1);
  return (
    <>
      <Axis />
      <path d={plot(baseline)} className="fig-soft fig-dash" />
      <path d={plot(spectrum, PLOT, 400)} className="fig-main" />
      <circle cx={spikeX} cy={spikeY} r={6} className="fig-soft" />
      <Label x={spikeX + 9} y={spikeY + 3}>cosmic ray</Label>
      <Label x={24} y={36} strong>Raman shift →</Label>
      <Label x={216} y={116} anchor="end">baseline</Label>
    </>
  );
}

function Terahertz() {
  return (
    <>
      <rect x={20} y={72} width={200} height={18} className="fig-fill" />
      <rect x={20} y={90} width={200} height={24} className="fig-fill-strong" />
      <rect x={20} y={114} width={200} height={16} className="fig-dim" fillOpacity={0.15} />
      <Arrow x1={36} y1={22} x2={78} y2={72} />
      <polyline points="78,72 94,90 110,72" className="fig-main" strokeOpacity={0.6} />
      <polyline points="94,90 110,114 126,90 142,72" className="fig-main" strokeOpacity={0.35} />
      <Arrow x1={78} y1={72} x2={118} y2={24} />
      <line x1={110} y1={72} x2={150} y2={24} className="fig-main" strokeOpacity={0.6} />
      <line x1={142} y1={72} x2={182} y2={24} className="fig-main" strokeOpacity={0.35} />
      <Label x={24} y={18} strong>E(t) in</Label>
      <Label x={152} y={18} strong>r(ω) out</Label>
      <Label x={216} y={84} anchor="end">n₁, d₁</Label>
      <Label x={216} y={105} anchor="end">n₂, d₂</Label>
      <Label x={216} y={126} anchor="end">substrate</Label>
    </>
  );
}

function Microscopy() {
  const rand = seeded(11);
  const particles = Array.from({ length: 13 }, () => ({ x: 34 + rand() * 170, y: 30 + rand() * 80, r: 6 + rand() * 9 }));
  return (
    <>
      {particles.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={p.r} className="fig-dim" fillOpacity={0.18} />
          <circle cx={p.x} cy={p.y} r={p.r} className={i % 5 === 4 ? 'fig-soft fig-dash' : 'fig-main'} />
        </g>
      ))}
      <line x1={172} y1={136} x2={214} y2={136} className="fig-main fig-thick" />
      <Label x={193} y={131} anchor="middle">20 nm</Label>
      <Label x={20} y={140}>watershed + SAM masks</Label>
    </>
  );
}

function SingleMolecule() {
  const rand = seeded(5);
  const high = 48;
  const low = 104;
  let x = 20;
  let on = false;
  let d = `M20,${low}`;
  while (x < 176) {
    x = Math.min(176, x + 6 + rand() * (on ? 18 : 26));
    d += `L${x.toFixed(1)},${on ? high : low}`;
    on = !on;
    d += `L${x.toFixed(1)},${on ? high : low}`;
  }
  d += `L176,${low}L220,${low}`;
  return (
    <>
      <Axis />
      <path d={d} className="fig-main" />
      <Label x={18} y={high + 3} anchor="end">on</Label>
      <Label x={18} y={low + 3} anchor="end">off</Label>
      <Label x={198} y={low - 8} anchor="middle">bleached</Label>
      <Label x={216} y={140} anchor="end">time →</Label>
      <Label x={24} y={26} strong>blinking trace</Label>
    </>
  );
}

function Diamond() {
  const rand = seeded(3);
  const series = [0, 0];
  for (let i = 2; i < 60; i++) {
    series.push(1.2 * series[i - 1] - 0.5 * series[i - 2] + (rand() - 0.5) * 0.9);
  }
  // stationary AR(2) fluctuations on top of a slow downward drift
  const trace = series.map((v, i) => `${i ? 'L' : 'M'}${(158 + i * 1.05).toFixed(1)},${(78 - v * 11 + i * 0.18).toFixed(1)}`).join('');
  return (
    <>
      <polygon points="20,48 132,75 20,102" className="fig-soft fig-dim" fillOpacity={0.14} />
      <circle cx={120} cy={75} r={13} className="fig-main fig-dash" />
      {[[116, 71], [123, 78], [118, 80]].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={2.2} className="fig-accent" />
      ))}
      <path d={trace} className="fig-main" />
      <line x1={156} y1={112} x2={222} y2={112} className="fig-axis" />
      <Label x={24} y={40} strong>microneedle</Label>
      <Label x={108} y={104}>NV centres</Label>
      <Label x={222} y={128} anchor="end">pH signal, AR(2) + drift</Label>
    </>
  );
}

function Ultrafast() {
  const surface = 96;
  const threshold = 0.42;
  const peak = 0.95;
  const fluence: Fn = (t) => peak * gauss(t, 0.5, 0.15);
  // ablation depth grows with ln(F / F_th); normalised so the centre reaches the crater box bottom
  const depth: Fn = (t) => Math.max(0, Math.log(fluence(t) / threshold)) / Math.log(peak / threshold);
  const beamBox: Box = { x0: 20, x1: 220, y0: surface, y1: 20 };
  const craterBox: Box = { x0: 20, x1: 220, y0: surface, y1: surface + 34 };
  const thresholdY = surface - threshold * (surface - 20);
  return (
    <>
      <path d={area(depth, craterBox)} className="fig-dim" fillOpacity={0.2} />
      <line x1={20} y1={surface} x2={220} y2={surface} className="fig-axis" />
      <path d={plot(fluence, beamBox)} className="fig-main" />
      <line x1={20} y1={thresholdY} x2={220} y2={thresholdY} className="fig-soft fig-dash" />
      <Label x={216} y={thresholdY - 4} anchor="end">F_th</Label>
      <Label x={24} y={28} strong>F(r), fs pulse</Label>
      <Label x={120} y={146} anchor="middle">ablation crater</Label>
    </>
  );
}

function Identifiability() {
  return (
    <>
      <line x1={30} y1={128} x2={30} y2={18} className="fig-axis" />
      <line x1={30} y1={128} x2={222} y2={128} className="fig-axis" />
      <ellipse cx={126} cy={74} rx={84} ry={15} transform="rotate(-24 126 74)" className="fig-soft fig-dash" />
      <ellipse cx={126} cy={74} rx={26} ry={11} transform="rotate(-24 126 74)" className="fig-main fig-fill" />
      <circle cx={126} cy={74} r={2.2} className="fig-accent" />
      <Label x={36} y={24}>θ₂</Label>
      <Label x={218} y={140} anchor="end">θ₁</Label>
      <Label x={216} y={26} anchor="end">poorly identified</Label>
      <Label x={150} y={104}>after design</Label>
    </>
  );
}

function Differentiable() {
  const boxes = [
    { x: 18, w: 34, text: 'θ' },
    { x: 74, w: 52, text: 'TMM' },
    { x: 148, w: 30, text: 'ŷ' },
    { x: 196, w: 28, text: 'L' },
  ];
  const y = 42;
  const h = 28;
  return (
    <>
      {boxes.map((b) => (
        <g key={b.text}>
          <rect x={b.x} y={y} width={b.w} height={h} rx={3} className="fig-box" />
          <text x={b.x + b.w / 2} y={y + h / 2 + 3.5} textAnchor="middle" className="fig-box-text">{b.text}</text>
        </g>
      ))}
      {boxes.slice(0, -1).map((b, i) => (
        <Arrow key={b.text} x1={b.x + b.w + 2} y1={y + h / 2} x2={boxes[i + 1].x - 2} y2={y + h / 2} />
      ))}
      <path d="M210,74 C210,118 35,118 35,78" className="fig-soft fig-dash" />
      <polygon points="35,72 31.5,80 38.5,80" className="fig-dim" />
      <Label x={122} y={128} anchor="middle">∇θ L by automatic differentiation</Label>
      <Label x={100} y={30} anchor="middle" strong>physics forward model</Label>
    </>
  );
}

function Uncertainty() {
  const posterior: Fn = (t) => 0.55 * gauss(t, 0.3, 0.07) + 0.9 * gauss(t, 0.69, 0.055);
  const at = (t: number) => PLOT.x0 + t * (PLOT.x1 - PLOT.x0);
  return (
    <>
      <path d={area(posterior)} className="fig-fill" />
      <path d={plot(posterior)} className="fig-main" />
      <Axis />
      <line x1={at(0.52)} y1={PLOT.y0} x2={at(0.52)} y2={40} className="fig-soft fig-dash" />
      <line x1={at(0.17)} y1={137} x2={at(0.43)} y2={137} className="fig-main fig-thick" />
      <line x1={at(0.58)} y1={137} x2={at(0.8)} y2={137} className="fig-main fig-thick" />
      <Label x={at(0.52) - 4} y={40} anchor="end">posterior mean</Label>
      <Label x={24} y={28} strong>p(θ | y)</Label>
      <Label x={216} y={148} anchor="end">95% credible set</Label>
    </>
  );
}

function Operators() {
  const n = 6;
  const cell = 11;
  const field = (i: number, j: number, shift: number, spread: number) =>
    Math.max(gauss(i / n, 0.3 + shift, spread) * gauss(j / n, 0.35, spread), 0.8 * gauss(i / n, 0.72, spread) * gauss(j / n, 0.7 + shift, spread));
  const grid = (x0: number, shift: number, spread: number) =>
    Array.from({ length: n * n }, (_, k) => {
      const i = k % n;
      const j = Math.floor(k / n);
      return (
        <rect key={k} x={x0 + i * cell} y={36 + j * cell} width={cell - 1} height={cell - 1} className="fig-accent" fillOpacity={0.08 + 0.85 * field(i, j, shift, spread)} />
      );
    });
  return (
    <>
      {grid(22, 0, 0.14)}
      {grid(152, 0.08, 0.22)}
      <Arrow x1={96} y1={69} x2={144} y2={69} />
      <Label x={120} y={62} anchor="middle" strong>FNO</Label>
      <Label x={54} y={116} anchor="middle">u(x), t</Label>
      <Label x={184} y={116} anchor="middle">u(x), t + Δt</Label>
      <Label x={120} y={138} anchor="middle">tested on held-out experiments</Label>
    </>
  );
}

function Validation() {
  const folds = 5;
  const groups = 8;
  return (
    <>
      {Array.from({ length: folds * groups }, (_, k) => {
        const fold = Math.floor(k / groups);
        const group = k % groups;
        const isTest = group % folds === fold;
        return (
          <rect key={k} x={62 + group * 19} y={30 + fold * 18} width={16} height={14} rx={1.5}
            className={isTest ? 'fig-accent' : 'fig-dim'} fillOpacity={isTest ? 0.85 : 0.2} />
        );
      })}
      {Array.from({ length: folds }, (_, f) => (
        <Label key={f} x={56} y={40 + f * 18} anchor="end">fold {f + 1}</Label>
      ))}
      <Label x={62} y={22} strong>patients (groups) →</Label>
      <Label x={62} y={134}>test group never seen in training</Label>
    </>
  );
}

function Software() {
  const stages = ['notebook', 'package', 'CLI'];
  const lineWidths = [34, 24, 38, 18];
  return (
    <>
      {stages.map((label, i) => {
        const x = 18 + i * 74;
        return (
          <g key={label}>
            <rect x={x} y={34} width={56} height={52} rx={3} className="fig-box" />
            {lineWidths.map((_, l) => (
              <rect key={l} x={x + 8} y={44 + l * 9} width={lineWidths[(l + i) % 4]} height={3} className="fig-dim" fillOpacity={0.45} />
            ))}
            <Label x={x + 28} y={100} anchor="middle" strong>{label}</Label>
            {i < stages.length - 1 && <Arrow x1={x + 58} y1={60} x2={x + 72} y2={60} />}
          </g>
        );
      })}
      <Label x={120} y={128} anchor="middle">✓ unit  ✓ regression  ✓ physical invariants</Label>
    </>
  );
}

function Agents() {
  const nodes = [
    { x: 120, y: 34, label: 'LLM' },
    { x: 194, y: 108, label: 'tools (MCP)' },
    { x: 46, y: 108, label: 'human review' },
  ];
  return (
    <>
      <Arrow x1={134} y1={46} x2={180} y2={96} />
      <Arrow x1={158} y1={112} x2={84} y2={112} />
      <Arrow x1={58} y1={96} x2={104} y2={46} />
      {nodes.map((n) => (
        <g key={n.label}>
          <rect x={n.x - 34} y={n.y - 11} width={68} height={22} rx={11} className="fig-box" />
          <text x={n.x} y={n.y + 3.5} textAnchor="middle" className="fig-box-text">{n.label}</text>
        </g>
      ))}
      <Label x={120} y={82} anchor="middle">provenance log</Label>
      <Label x={120} y={140} anchor="middle">restricted permissions</Label>
    </>
  );
}

function Hpc() {
  const rack = (x0: number, cols: number, gpu: boolean) =>
    Array.from({ length: cols * 5 }, (_, k) => (
      <rect key={k} x={x0 + (k % cols) * 13} y={30 + Math.floor(k / cols) * 13} width={10} height={10} rx={1.5}
        className={gpu ? 'fig-accent' : 'fig-dim'} fillOpacity={gpu ? 0.8 : 0.25} />
    ));
  return (
    <>
      {rack(24, 6, false)}
      {rack(146, 5, true)}
      <Label x={24} y={24} strong>CPU · x86</Label>
      <Label x={146} y={24} strong>GPU · GH200</Label>
      <rect x={24} y={112} width={192} height={14} rx={2} className="fig-fill" />
      <Label x={120} y={122} anchor="middle">Allas object storage</Label>
      <Label x={120} y={142} anchor="middle">CSC Roihu</Label>
    </>
  );
}

const FIGURES: Record<TopicId, () => React.ReactElement> = {
  spectroscopy: Spectroscopy,
  terahertz: Terahertz,
  microscopy: Microscopy,
  smlm: SingleMolecule,
  diamond: Diamond,
  ultrafast: Ultrafast,
  identifiability: Identifiability,
  differentiable: Differentiable,
  uncertainty: Uncertainty,
  operators: Operators,
  validation: Validation,
  software: Software,
  agents: Agents,
  hpc: Hpc,
};

/** Schematic figure for one postdoc topic. */
const TopicFigure: React.FC<{ id: TopicId; label: string }> = ({ id, label }) => {
  const Figure = FIGURES[id];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Schematic: ${label}`} className="topic-svg">
      <Figure />
    </svg>
  );
};

export default TopicFigure;
