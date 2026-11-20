import { Frame } from './Panels';
import type { PanelProps } from './Panels';

/**
 * Labelled diagrams that explain how a project works.
 * Every label comes from the project's README / the author's own description.
 * They are illustrations, not screenshots, and carry no invented numbers.
 */

const INK = '#55283C';
const ORANGE = '#C7A88B';
const FONT = "'Kanit', sans-serif";

function Label({
  x,
  y,
  children,
  size = 12,
  anchor = 'middle',
  opacity = 1,
  weight = 500,
}: {
  x: number;
  y: number;
  children: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  opacity?: number;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={INK}
      fillOpacity={opacity}
      fontFamily={FONT}
    >
      {children}
    </text>
  );
}

/** Four labelled factors orbiting a central idea. */
export function FactorsPanel({
  accent,
  center = 'Match',
  labels = ['One', 'Two', 'Three', 'Four'],
}: PanelProps & { center?: string; labels?: string[] }) {
  const spots = [
    { x: 24, y: 40 },
    { x: 286, y: 40 },
    { x: 24, y: 196 },
    { x: 286, y: 196 },
  ];
  return (
    <Frame accent={accent}>
      {spots.map((s, i) => (
        <line
          key={i}
          x1={210}
          y1={135}
          x2={s.x + 55}
          y2={s.y + 17}
          stroke={accent}
          strokeOpacity="0.5"
          strokeDasharray="4 5"
        />
      ))}
      <circle cx="210" cy="135" r="46" fill={accent} fillOpacity="0.16" stroke={accent} strokeWidth="1.5" />
      <Label x={210} y={140} size={14}>
        {center}
      </Label>
      {spots.map((s, i) => (
        <g key={`b-${i}`}>
          <rect x={s.x} y={s.y} width="110" height="34" rx="17" fill="#FBF8F5" fillOpacity="0.7" stroke={INK} strokeOpacity="0.35" />
          <Label x={s.x + 55} y={s.y + 22}>
            {labels[i] ?? ''}
          </Label>
        </g>
      ))}
    </Frame>
  );
}

/** Two profiles linked by a temporary access code. */
export function GuidePanel({
  accent,
  left = 'Worker',
  right = 'Family Guide',
  codeLabel = '6-digit code',
  footnote = 'temporary access',
}: PanelProps & { left?: string; right?: string; codeLabel?: string; footnote?: string }) {
  const profile = (x: number, label: string) => (
    <g>
      <rect x={x} y="64" width="96" height="124" rx="18" fill="#FBF8F5" fillOpacity="0.7" stroke={INK} strokeOpacity="0.4" />
      <circle cx={x + 48} cy="102" r="17" fill={accent} fillOpacity="0.35" stroke={accent} strokeWidth="1.5" />
      <rect x={x + 18} y="132" width="60" height="7" rx="3.5" fill={INK} fillOpacity="0.35" />
      <rect x={x + 26} y="148" width="44" height="7" rx="3.5" fill={INK} fillOpacity="0.2" />
      <Label x={x + 48} y={214}>
        {label}
      </Label>
    </g>
  );
  return (
    <Frame accent={accent}>
      {profile(26, left)}
      {profile(298, right)}
      <line x1="122" y1="126" x2="298" y2="126" stroke={accent} strokeOpacity="0.5" strokeDasharray="4 5" />
      <Label x={210} y={96} opacity={0.75}>
        {codeLabel}
      </Label>
      {Array.from({ length: 6 }, (_, i) => (
        <rect
          key={i}
          x={134 + i * 26}
          y="110"
          width="22"
          height="32"
          rx="7"
          fill="#FBF8F5"
          stroke={accent}
          strokeWidth="1.5"
        />
      ))}
      <Label x={210} y={170} size={11} opacity={0.6}>
        {footnote}
      </Label>
    </Frame>
  );
}

/** Inputs funnel through a human checkpoint before being routed to people. */
export function RoutingPanel({
  accent,
  source = 'Signals',
  gate = 'Human review',
  targets = ['Teacher', 'Counselor', 'Management'],
}: PanelProps & { source?: string; gate?: string; targets?: string[] }) {
  const ys = [44, 118, 192];
  return (
    <Frame accent={accent}>
      {ys.map((y, i) => (
        <path
          key={i}
          d={`M262 135 C 285 135, 285 ${y + 18}, 304 ${y + 18}`}
          fill="none"
          stroke={accent}
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />
      ))}
      <line x1="112" y1="135" x2="158" y2="135" stroke={INK} strokeOpacity="0.5" strokeWidth="1.5" />
      <rect x="20" y="112" width="92" height="46" rx="14" fill="#FBF8F5" fillOpacity="0.7" stroke={INK} strokeOpacity="0.4" />
      <Label x={66} y={140}>
        {source}
      </Label>
      <rect x="158" y="104" width="104" height="62" rx="18" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="1.5" />
      <Label x={210} y={131} size={13}>
        {gate.split(' ')[0]}
      </Label>
      <Label x={210} y={149} size={13}>
        {gate.split(' ').slice(1).join(' ')}
      </Label>
      {ys.map((y, i) => (
        <g key={`t-${i}`}>
          <rect x="304" y={y} width="100" height="36" rx="12" fill="#FBF8F5" fillOpacity="0.7" stroke={INK} strokeOpacity="0.4" />
          <Label x={354} y={y + 23}>
            {targets[i] ?? ''}
          </Label>
        </g>
      ))}
    </Frame>
  );
}

/** Real class-imbalance proportions: 284,315 valid vs 492 fraud (dataset README). */
export function ImbalancePanel({ accent }: PanelProps) {
  return (
    <Frame accent={accent}>
      <Label x={30} y={62} size={13} anchor="start" opacity={0.75}>
        284,807 transactions
      </Label>
      <rect x="30" y="114" width="360" height="30" rx="8" fill={accent} fillOpacity="0.45" />
      <rect x="387" y="108" width="4" height="42" rx="2" fill={ORANGE} />
      <Label x={30} y={106} size={12} anchor="start">
        284,315 valid
      </Label>
      <path d="M389 152 L389 176" stroke={ORANGE} strokeWidth="1.5" />
      <Label x={390} y={194} size={13} anchor="end">
        492 fraud · 0.17%
      </Label>
      <Label x={30} y={224} size={10.5} anchor="start" opacity={0.5}>
        fraud sliver widened so it stays visible
      </Label>
    </Frame>
  );
}

/** Supervised vs unsupervised comparison with the metrics used. */
export function ModelsPanel({
  accent,
  models = [
    { name: 'Logistic Regression', note: 'supervised' },
    { name: 'Isolation Forest', note: 'unsupervised' },
  ],
  metrics = ['F1-score', 'MCC'],
}: PanelProps & {
  models?: Array<{ name: string; note: string }>;
  metrics?: string[];
}) {
  return (
    <Frame accent={accent}>
      {models.map((m, i) => {
        const x = 26 + i * 196;
        return (
          <g key={m.name}>
            <rect x={x} y="52" width="172" height="104" rx="18" fill={accent} fillOpacity={i === 0 ? 0.2 : 0.1} stroke={accent} strokeWidth="1.5" />
            <Label x={x + 86} y={98} size={13.5}>
              {m.name}
            </Label>
            <Label x={x + 86} y={122} size={12} opacity={0.65}>
              {m.note}
            </Label>
          </g>
        );
      })}
      <Label x={210} y={110} size={12} opacity={0.6}>
        vs
      </Label>
      {metrics.map((m, i) => {
        const w = 92;
        const x = 210 - ((metrics.length * w + (metrics.length - 1) * 10) / 2) + i * (w + 10);
        return (
          <g key={m}>
            <rect x={x} y="186" width={w} height="30" rx="15" fill="#FBF8F5" fillOpacity="0.7" stroke={INK} strokeOpacity="0.4" />
            <Label x={x + w / 2} y={206} size={12}>
              {m}
            </Label>
          </g>
        );
      })}
    </Frame>
  );
}
