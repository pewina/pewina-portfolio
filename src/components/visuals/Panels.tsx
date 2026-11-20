import { useId } from 'react';
import type { ReactNode } from 'react';

/**
 * Original, code-drawn illustrations (no stock imagery, no third-party work).
 * They are conceptual visuals — NOT screenshots of any project.
 */

export interface PanelProps {
  accent?: string;
  seed?: number;
}

const INK = '#55283C';
const PURPLE = '#8A2944';
const ORANGE = '#C7A88B';

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Frame({ children, accent = PURPLE }: { children: ReactNode; accent?: string }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 420 270"
      preserveAspectRatio="xMidYMid slice"
      className="block w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6A2C44" />
          <stop offset="1" stopColor="#FBF8F5" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.78" cy="0.18" r="0.75">
          <stop offset="0" stopColor={accent} stopOpacity="0.38" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="420" height="270" fill={`url(#${uid}-bg)`} />
      <rect width="420" height="270" fill={`url(#${uid}-glow)`} />
      {children}
    </svg>
  );
}

export function NetworkPanel({ accent = PURPLE, seed = 1 }: PanelProps) {
  const r = rng(seed);
  const layers = [3, 5, 5, 3];
  const xs = [66, 158, 262, 354];
  const nodes = layers.map((n, l) =>
    Array.from({ length: n }, (_, i) => ({ x: xs[l], y: 135 + (i - (n - 1) / 2) * 42 }))
  );
  return (
    <Frame accent={accent}>
      {nodes.slice(0, -1).flatMap((layer, l) =>
        layer.flatMap((a, i) =>
          nodes[l + 1].map((b, j) => (
            <line
              key={`${l}-${i}-${j}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={accent}
              strokeOpacity={0.12 + r() * 0.28}
              strokeWidth="1"
            />
          ))
        )
      )}
      {nodes.flat().map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="7.5"
          fill={r() > 0.5 ? accent : '#FBF8F5'}
          stroke={accent}
          strokeWidth="1.5"
          className={i % 3 === 0 ? 'pulse-node' : undefined}
        />
      ))}
    </Frame>
  );
}

export function CurvePanel({ accent = PURPLE }: PanelProps) {
  const line = 'M44 222 C 82 218, 96 214, 120 150 S 170 62, 230 56 S 330 52, 384 50';
  return (
    <Frame accent={accent}>
      <g stroke={INK} strokeOpacity="0.25">
        <line x1="44" y1="232" x2="392" y2="232" />
        <line x1="44" y1="30" x2="44" y2="232" />
      </g>
      <line x1="44" y1="50" x2="392" y2="50" stroke={INK} strokeOpacity="0.25" strokeDasharray="4 5" />
      <path d={`${line} L384 232 L44 232 Z`} fill={accent} fillOpacity="0.14" />
      <path d={line} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <circle cx="384" cy="50" r="5" fill={accent} />
      <text x="392" y="250" textAnchor="end" fontSize="11" fill={INK} fillOpacity="0.55">
        time
      </text>
      <text x="52" y="28" fontSize="11" fill={INK} fillOpacity="0.55">
        accuracy
      </text>
    </Frame>
  );
}

export function PulsePanel({ accent = PURPLE, seed = 3 }: PanelProps) {
  const r = rng(seed);
  const rows = 8;
  return (
    <Frame accent={accent}>
      {Array.from({ length: rows }, (_, row) => {
        const y = 36 + row * 26;
        return (
          <g key={row}>
            <line x1="28" y1={y} x2="392" y2={y} stroke={INK} strokeOpacity="0.08" />
            {Array.from({ length: 18 }, (_, k) => {
              if (r() < 0.45) return null;
              const x = 34 + k * 20 + r() * 10;
              return (
                <line
                  key={k}
                  x1={x}
                  y1={y - 8}
                  x2={x}
                  y2={y + 8}
                  stroke={r() > 0.8 ? ORANGE : accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        );
      })}
    </Frame>
  );
}

export function ScatterPanel({ accent = PURPLE, seed = 5 }: PanelProps) {
  const r = rng(seed);
  const majority = Array.from({ length: 95 }, () => ({
    x: 150 + (r() + r() + r() - 1.5) * 150,
    y: 140 + (r() + r() + r() - 1.5) * 150,
  }));
  const minority = Array.from({ length: 11 }, () => ({
    x: 318 + (r() - 0.5) * 70,
    y: 112 + (r() - 0.5) * 80,
  }));
  return (
    <Frame accent={accent}>
      {majority.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.2" fill="#B58D9A" fillOpacity="0.6" />
      ))}
      <path
        d="M246 24 C 270 90, 232 170, 262 246"
        fill="none"
        stroke={INK}
        strokeOpacity="0.4"
        strokeDasharray="5 6"
      />
      {minority.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4.6" fill={accent} />
      ))}
    </Frame>
  );
}

export function PipelinePanel({
  accent = PURPLE,
  steps = ['EDA', 'SMOTE', 'Models', 'Evaluate'],
}: PanelProps & { steps?: string[] }) {
  return (
    <Frame accent={accent}>
      {steps.map((label, i) => {
        const x = 22 + i * 98;
        return (
          <g key={label}>
            <rect
              x={x}
              y="108"
              width="80"
              height="54"
              rx="14"
              fill={accent}
              fillOpacity="0.14"
              stroke={accent}
              strokeWidth="1.5"
            />
            <text
              x={x + 40}
              y="140"
              textAnchor="middle"
              fontSize="13"
              fontWeight="500"
              fill={INK}
            >
              {label}
            </text>
            {i < steps.length - 1 && (
              <path
                d={`M${x + 83} 135 L${x + 95} 135 M${x + 91} 131 L${x + 95} 135 L${x + 91} 139`}
                stroke={INK}
                strokeOpacity="0.6"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
    </Frame>
  );
}

export function WeatherPanel(_: PanelProps) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 420 270"
      preserveAspectRatio="xMidYMid slice"
      className="block w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6ec6ff" />
          <stop offset="1" stopColor="#ffd9a8" />
        </linearGradient>
      </defs>
      <rect width="420" height="270" fill={`url(#${uid}-sky)`} />
      <g stroke="#FBF8F5" strokeWidth="3" strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={310 + Math.cos(a) * 52}
              y1={84 + Math.sin(a) * 52}
              x2={310 + Math.cos(a) * 68}
              y2={84 + Math.sin(a) * 68}
            />
          );
        })}
        <circle cx="310" cy="84" r="38" fill="#FFD166" />
      </g>
      <g fill="#ffffff" stroke="#FBF8F5" strokeWidth="3">
        <circle cx="120" cy="156" r="30" />
        <circle cx="160" cy="140" r="38" />
        <circle cx="208" cy="158" r="28" />
        <rect x="98" y="156" width="132" height="30" rx="15" />
      </g>
      <path
        d="M0 238 C 90 210, 180 250, 270 226 S 390 214, 420 228 L420 270 L0 270 Z"
        fill="#B77A8C"
        stroke="#FBF8F5"
        strokeWidth="3"
      />
    </svg>
  );
}

export function MoodPanel(_: PanelProps) {
  const uid = useId().replace(/:/g, '');
  const r = rng(11);
  return (
    <svg
      viewBox="0 0 420 270"
      preserveAspectRatio="xMidYMid slice"
      className="block w-full h-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-dusk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#70405B" />
          <stop offset="1" stopColor="#B24863" />
        </linearGradient>
      </defs>
      <rect width="420" height="270" fill={`url(#${uid}-dusk)`} />
      {Array.from({ length: 26 }, (_, i) => (
        <circle key={i} cx={r() * 420} cy={r() * 120} r={r() * 1.6 + 0.6} fill="#ffffff" fillOpacity="0.7" />
      ))}
      <circle cx="82" cy="70" r="30" fill="#f4e9c8" />
      <circle cx="96" cy="62" r="26" fill="#2a1a63" />
      <g fill="#ffffff" fillOpacity="0.92" stroke="#FBF8F5" strokeWidth="3">
        <circle cx="262" cy="104" r="24" />
        <circle cx="296" cy="92" r="32" />
        <circle cx="334" cy="106" r="22" />
        <rect x="240" y="104" width="116" height="24" rx="12" />
      </g>
      <g stroke="#9fd3ff" strokeWidth="3" strokeLinecap="round">
        {[262, 288, 314, 340].map((x, i) => (
          <line key={x} x1={x} y1={146 + (i % 2) * 8} x2={x - 6} y2={170 + (i % 2) * 8} />
        ))}
      </g>
    </svg>
  );
}

export function TopologyPanel({ accent = PURPLE, seed = 7 }: PanelProps) {
  const r = rng(seed);
  const pts = Array.from({ length: 12 }, () => ({ x: 40 + r() * 340, y: 34 + r() * 202 }));
  const edges: Array<[number, number]> = [];
  pts.forEach((a, i) => {
    pts.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < 120) edges.push([i, j]);
    });
  });
  const anomaly = 4;
  return (
    <Frame accent={accent}>
      {edges.map(([i, j]) => (
        <line
          key={`${i}-${j}`}
          x1={pts[i].x}
          y1={pts[i].y}
          x2={pts[j].x}
          y2={pts[j].y}
          stroke={INK}
          strokeOpacity="0.2"
        />
      ))}
      {pts.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === anomaly ? 8 : 6}
          fill={i === anomaly ? ORANGE : '#FBF8F5'}
          stroke={i === anomaly ? ORANGE : accent}
          strokeWidth="2"
        />
      ))}
      <circle
        cx={pts[anomaly].x}
        cy={pts[anomaly].y}
        r="20"
        fill="none"
        stroke={ORANGE}
        strokeOpacity="0.7"
        strokeDasharray="4 4"
        className="pulse-node"
      />
    </Frame>
  );
}

export function LogPanel({ accent = PURPLE, seed = 9 }: PanelProps) {
  const r = rng(seed);
  const flagged = 5;
  return (
    <Frame accent={accent}>
      {Array.from({ length: 9 }, (_, i) => {
        const y = 28 + i * 24;
        const hot = i === flagged;
        return (
          <g key={i}>
            {hot && (
              <rect x="20" y={y - 12} width="380" height="22" rx="8" fill={ORANGE} fillOpacity="0.16" />
            )}
            <circle cx="36" cy={y - 1} r="4" fill={hot ? ORANGE : '#C7A88B'} />
            <rect x="52" y={y - 5} width="50" height="8" rx="4" fill={INK} fillOpacity="0.35" />
            <rect
              x="112"
              y={y - 5}
              width={120 + r() * 200}
              height="8"
              rx="4"
              fill={INK}
              fillOpacity={hot ? 0.7 : 0.2}
            />
          </g>
        );
      })}
    </Frame>
  );
}

export function CodePanel({ accent = PURPLE }: PanelProps) {
  const kw = accent;
  const lines: Array<Array<[string, string]>> = [
    [['import ', kw], ['pandas ', INK], ['as ', kw], ['pd', INK]],
    [['import ', kw], ['numpy ', INK], ['as ', kw], ['np', INK]],
    [],
    [['df ', INK], ['= ', kw], ['pd.read_csv(', INK], ['"data.csv"', '#B24863'], [')', INK]],
    [['df', INK], ['.isna().sum()', INK]],
    [['df', INK], ['.describe()', INK]],
    [['# explore, clean, model', '#6b7a88']],
  ];
  return (
    <Frame accent={accent}>
      <rect x="18" y="18" width="384" height="234" rx="16" fill="#FBF8F5" fillOpacity="0.7" stroke={INK} strokeOpacity="0.15" />
      {['#ff5f56', '#ffbd2e', '#27c93f'].map((c, i) => (
        <circle key={c} cx={38 + i * 16} cy="38" r="4.5" fill={c} fillOpacity="0.8" />
      ))}
      {lines.map((segs, i) => (
        <text
          key={i}
          x="36"
          y={78 + i * 24}
          fontSize="14"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          xmlSpace="preserve"
        >
          {segs.map(([t, c], k) => (
            <tspan key={k} fill={c}>
              {t}
            </tspan>
          ))}
        </text>
      ))}
    </Frame>
  );
}

export function BarsPanel({ accent = PURPLE, seed = 13 }: PanelProps) {
  const r = rng(seed);
  const n = 20;
  return (
    <Frame accent={accent}>
      <line x1="24" y1="232" x2="396" y2="232" stroke={INK} strokeOpacity="0.25" />
      {Array.from({ length: n }, (_, i) => {
        const t = (i - (n - 1) / 2) / 4.2;
        const h = 20 + Math.exp(-t * t) * 160 + r() * 18;
        return (
          <rect
            key={i}
            x={30 + i * 18.2}
            y={232 - h}
            width="13"
            height={h}
            rx="4"
            fill={accent}
            fillOpacity={0.35 + (h / 200) * 0.6}
          />
        );
      })}
    </Frame>
  );
}

export function HeatmapPanel({ accent = PURPLE, seed = 17 }: PanelProps) {
  const r = rng(seed);
  const cols = 11;
  const rows = 7;
  return (
    <Frame accent={accent}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const cx = i % cols;
        const cy = Math.floor(i / cols);
        const diag = Math.max(0, 1 - Math.abs(cx - cy * 1.5) / 3.5);
        return (
          <rect
            key={i}
            x={30 + cx * 34}
            y={26 + cy * 32}
            width="28"
            height="26"
            rx="6"
            fill={accent}
            fillOpacity={0.08 + Math.min(1, diag * 0.7 + r() * 0.3) * 0.8}
          />
        );
      })}
    </Frame>
  );
}

export function HexPanel({ accent = PURPLE, seed = 21 }: PanelProps) {
  const r = rng(seed);
  const size = 28;
  const w = Math.sqrt(3) * size;
  const cells: ReactNode[] = [];
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 9; col++) {
      const cx = 24 + col * w + (row % 2 ? w / 2 : 0);
      const cy = 28 + row * size * 1.5;
      const pts = Array.from({ length: 6 }, (_, k) => {
        const a = (Math.PI / 3) * k + Math.PI / 6;
        return `${cx + size * 0.9 * Math.cos(a)},${cy + size * 0.9 * Math.sin(a)}`;
      }).join(' ');
      const on = r() > 0.62;
      cells.push(
        <polygon
          key={`${row}-${col}`}
          points={pts}
          fill={on ? accent : 'none'}
          fillOpacity={on ? 0.15 + r() * 0.5 : 0}
          stroke={on ? accent : INK}
          strokeOpacity={on ? 0.9 : 0.16}
          strokeWidth="1.2"
        />
      );
    }
  }
  return <Frame accent={accent}>{cells}</Frame>;
}
