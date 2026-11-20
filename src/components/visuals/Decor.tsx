const INK = '#55283C';

interface DecorProps {
  className?: string;
}

const svgProps = {
  viewBox: '0 0 200 200',
  fill: 'none',
  'aria-hidden': true,
  focusable: false,
} as const;

/** Small decorative neural cluster */
export function NeuralDecor({ className }: DecorProps) {
  const nodes = [
    [100, 40],
    [40, 90],
    [160, 84],
    [70, 150],
    [140, 156],
    [100, 100],
  ];
  return (
    <svg {...svgProps} className={className}>
      <circle cx="100" cy="100" r="92" stroke={INK} strokeOpacity="0.12" />
      {nodes.flatMap((a, i) =>
        nodes.slice(i + 1).map((b, j) => (
          <line key={`${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke="#8A2944" strokeOpacity="0.45" />
        ))
      )}
      {nodes.map((n, i) => (
        <circle key={i} cx={n[0]} cy={n[1]} r="8" fill="#FBF8F5" stroke={INK} strokeWidth="2" />
      ))}
      <circle cx="100" cy="100" r="5" fill="#8A2944" />
    </svg>
  );
}

/** Wireframe cube */
export function CubeDecor({ className }: DecorProps) {
  return (
    <svg {...svgProps} className={className}>
      <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
        <polygon points="100,30 160,65 160,135 100,170 40,135 40,65" fill="#B24863" fillOpacity="0.35" />
        <polyline points="40,65 100,100 160,65" />
        <line x1="100" y1="100" x2="100" y2="170" />
      </g>
      <circle cx="100" cy="100" r="5" fill="#8A2944" />
    </svg>
  );
}

/** Mini data chart */
export function DataDecor({ className }: DecorProps) {
  const bars = [60, 100, 76, 130, 108, 150];
  return (
    <svg {...svgProps} className={className}>
      <line x1="24" y1="170" x2="178" y2="170" stroke={INK} strokeOpacity="0.4" />
      {bars.map((h, i) => (
        <rect key={i} x={30 + i * 24} y={170 - h} width="16" height={h} rx="5" fill="#8A2944" fillOpacity={0.35 + i * 0.1} />
      ))}
      <polyline
        points="38,120 62,86 86,102 110,58 134,72 158,28"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="158" cy="28" r="6" fill="#C7A88B" />
    </svg>
  );
}

/** Hexagon lattice */
export function HexDecor({ className }: DecorProps) {
  const hex = (cx: number, cy: number, r: number) =>
    Array.from({ length: 6 }, (_, k) => {
      const a = (Math.PI / 3) * k + Math.PI / 6;
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');
  return (
    <svg {...svgProps} className={className}>
      <g stroke={INK} strokeWidth="2" strokeLinejoin="round">
        <polygon points={hex(100, 100, 32)} fill="#8A2944" fillOpacity="0.4" />
        <polygon points={hex(155.4, 100, 32)} />
        <polygon points={hex(72.3, 52, 32)} />
        <polygon points={hex(72.3, 148, 32)} />
        <polygon points={hex(127.7, 148, 32)} strokeOpacity="0.4" />
      </g>
    </svg>
  );
}
