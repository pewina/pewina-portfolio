import { useId } from 'react';

const INK = '#55283C';

// Isometric cube vertices (viewBox 520 x 520)
const V = {
  top: [260, 96],
  ur: [392, 172],
  lr: [392, 328],
  bottom: [260, 404],
  ll: [128, 328],
  ul: [128, 172],
  c: [260, 250],
} as const;

const pt = (p: readonly number[]) => `${p[0]},${p[1]}`;

const SATELLITES = [
  { x: 70, y: 96, link: 'ul' },
  { x: 452, y: 112, link: 'ur' },
  { x: 470, y: 292, link: 'lr' },
  { x: 62, y: 330, link: 'll' },
  { x: 260, y: 40, link: 'top' },
  { x: 210, y: 462, link: 'bottom' },
] as const;

/** Original developer-themed hero object: a wireframe polyhedron wired up like a neural network. */
export default function HeroVisual() {
  const uid = useId().replace(/:/g, '');
  return (
    <svg
      viewBox="0 0 520 520"
      className="block w-full h-auto select-none"
      role="img"
      aria-label="Abstract 3D cube connected by glowing neural-network nodes"
    >
      <defs>
        <linearGradient id={`${uid}-top`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BBCCD7" stopOpacity="0.55" />
          <stop offset="1" stopColor="#B24863" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`${uid}-left`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B24863" stopOpacity="0.75" />
          <stop offset="1" stopColor="#4A1F32" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id={`${uid}-right`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8A2944" stopOpacity="0.8" />
          <stop offset="1" stopColor="#C7A88B" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`${uid}-halo`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#8A2944" stopOpacity="0.35" />
          <stop offset="1" stopColor="#8A2944" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="260" cy="250" r="250" fill={`url(#${uid}-halo)`} />
      <ellipse
        cx="260"
        cy="250"
        rx="236"
        ry="86"
        fill="none"
        stroke={INK}
        strokeOpacity="0.22"
        strokeDasharray="3 7"
        transform="rotate(-18 260 250)"
      />

      <g className="float-slow">
        {/* faces */}
        <polygon points={`${pt(V.top)} ${pt(V.ur)} ${pt(V.c)} ${pt(V.ul)}`} fill={`url(#${uid}-top)`} />
        <polygon points={`${pt(V.ul)} ${pt(V.c)} ${pt(V.bottom)} ${pt(V.ll)}`} fill={`url(#${uid}-left)`} />
        <polygon points={`${pt(V.ur)} ${pt(V.lr)} ${pt(V.bottom)} ${pt(V.c)}`} fill={`url(#${uid}-right)`} />

        {/* edges */}
        <g stroke={INK} strokeOpacity="0.7" strokeWidth="1.5" strokeLinejoin="round" fill="none">
          <polygon points={`${pt(V.top)} ${pt(V.ur)} ${pt(V.lr)} ${pt(V.bottom)} ${pt(V.ll)} ${pt(V.ul)}`} />
          <polyline points={`${pt(V.ul)} ${pt(V.c)} ${pt(V.ur)}`} />
          <line x1={V.c[0]} y1={V.c[1]} x2={V.bottom[0]} y2={V.bottom[1]} />
        </g>

        {/* satellite nodes wired to vertices */}
        {SATELLITES.map((s) => {
          const target = V[s.link];
          return (
            <g key={`${s.x}-${s.y}`}>
              <line
                x1={s.x}
                y1={s.y}
                x2={target[0]}
                y2={target[1]}
                stroke={INK}
                strokeOpacity="0.35"
                strokeDasharray="2 5"
              />
              <circle cx={s.x} cy={s.y} r="9" fill="#FBF8F5" stroke="#8A2944" strokeWidth="2" className="pulse-node" />
              <circle cx={s.x} cy={s.y} r="3.5" fill="#55283C" />
            </g>
          );
        })}

        {/* vertex nodes */}
        {Object.values(V).map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="6" fill="#FBF8F5" stroke={INK} strokeWidth="2" />
        ))}
        <circle cx={V.c[0]} cy={V.c[1]} r="11" fill="#8A2944" fillOpacity="0.9" className="pulse-node" />
      </g>
    </svg>
  );
}
