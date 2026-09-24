import React from 'react';
import './CitationChart.css';

interface CitationChartProps {
  data: { year: number; citations: number }[];
  caption?: React.ReactNode;
}

const W = 560;
const H = 190;
const PAD = { top: 28, right: 20, bottom: 30, left: 20 };

/** Citations per year as a line that draws itself, styled after the curve on the lab monitor. */
const CitationChart: React.FC<CitationChartProps> = ({ data, caption }) => {
  if (data.length < 2) return null;

  const max = Math.max(...data.map((d) => d.citations), 1);
  const x = (i: number) => PAD.left + (i * (W - PAD.left - PAD.right)) / (data.length - 1);
  const y = (c: number) => H - PAD.bottom - (c / max) * (H - PAD.top - PAD.bottom);
  const points = data.map((d, i) => [x(i), y(d.citations)] as const);
  const line = points.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ');
  const area = `${line} L${x(data.length - 1).toFixed(1)},${H - PAD.bottom} L${PAD.left},${H - PAD.bottom} Z`;
  const summary = data.map((d) => `${d.year}: ${d.citations}`).join(', ');

  return (
    <figure className="cite-chart">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Citations per year. ${summary}`}>
        <line className="cite-base" x1={PAD.left} x2={W - PAD.right} y1={H - PAD.bottom} y2={H - PAD.bottom} />
        <path className="cite-area" d={area} />
        <path className="cite-line" d={line} pathLength={1} />
        {points.map(([px, py], i) => (
          <g key={data[i].year} className="cite-point" style={{ '--i': i } as React.CSSProperties}>
            <circle cx={px} cy={py} r={i === points.length - 1 ? 4.5 : 3} />
            <text x={px} y={py - 10} textAnchor="middle" className="cite-value">
              {data[i].citations}
            </text>
            <text x={px} y={H - 10} textAnchor="middle" className="cite-year">
              {data[i].year}
            </text>
          </g>
        ))}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

export default CitationChart;
