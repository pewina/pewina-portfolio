import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import Panel from '../components/visuals/Panel';
import type { VisualSpec } from '../components/visuals/Panel';

const PURPLE = '#8A2944';
const VIOLET = '#B24863';
const ORANGE = '#C7A88B';

const ROW_ONE: VisualSpec[] = [
  { kind: 'network', accent: PURPLE, seed: 2 },
  { kind: 'code', accent: VIOLET },
  { kind: 'heatmap', accent: PURPLE, seed: 31 },
  { kind: 'scatter', accent: VIOLET, seed: 8 },
  { kind: 'hex', accent: PURPLE, seed: 12 },
  { kind: 'curve', accent: ORANGE },
];

const ROW_TWO: VisualSpec[] = [
  { kind: 'bars', accent: VIOLET, seed: 6 },
  { kind: 'topology', accent: PURPLE, seed: 14 },
  { kind: 'pulse', accent: VIOLET, seed: 19 },
  { kind: 'log', accent: ORANGE, seed: 4 },
  { kind: 'mood' },
  { kind: 'network', accent: ORANGE, seed: 23 },
];

const TILE_WIDTH = 420;
const TILE_HEIGHT = 270;
const GAP = 12; // gap-3

const tripled = (items: VisualSpec[]) => [...items, ...items, ...items];

function Row({
  items,
  rowRef,
}: {
  items: VisualSpec[];
  rowRef: React.RefObject<HTMLDivElement>;
}) {
  // Start the row one full set to the left so scrolling in either direction
  // always reveals tiles instead of empty space.
  const setWidth = items.length * (TILE_WIDTH + GAP);

  return (
    <div
      ref={rowRef}
      className="flex gap-3"
      style={{ willChange: 'transform', marginLeft: -setWidth, width: 'max-content' }}
      aria-hidden="true"
    >
      {tripled(items).map((spec, i) => (
        <div
          key={i}
          className="rounded-2xl overflow-hidden shrink-0 border border-[#55283C]/10"
          style={{ width: TILE_WIDTH, height: TILE_HEIGHT }}
        >
          <Panel spec={spec} />
        </div>
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowOneRef = useRef<HTMLDivElement>(null);
  const rowTwoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = !!useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      if (rowOneRef.current) rowOneRef.current.style.transform = 'translateX(0px)';
      if (rowTwoRef.current) rowTwoRef.current.style.transform = 'translateX(0px)';
      return;
    }

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      if (rowOneRef.current) {
        rowOneRef.current.style.transform = `translateX(${offset - 200}px)`;
      }
      if (rowTwoRef.current) {
        rowTwoRef.current.style.transform = `translateX(${-(offset - 200)}px)`;
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Abstract visual studies in AI, data, and code"
      className="relative overflow-hidden pt-24 sm:pt-32 md:pt-40 pb-10 flex flex-col gap-3"
      style={{ background: '#FBF8F5' }}
    >
      <Row items={ROW_ONE} rowRef={rowOneRef} />
      <Row items={ROW_TWO} rowRef={rowTwoRef} />
      <p className="mt-6 px-6 md:px-10 text-center text-[#55283C]/50 font-light uppercase tracking-widest text-[0.7rem] sm:text-xs">
        Abstract visual studies in AI, data &amp; code
      </p>
    </section>
  );
}
