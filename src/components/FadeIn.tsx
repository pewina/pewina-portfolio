import { motion } from 'framer-motion';
import type { ComponentType, CSSProperties, ElementType, ReactNode } from 'react';

type MotionComponent = ComponentType<Record<string, unknown>>;

const motionCache = new Map<ElementType, MotionComponent>();

function getMotionComponent(as: ElementType): MotionComponent {
  let component = motionCache.get(as);
  if (!component) {
    component = motion.create(as as ComponentType<Record<string, unknown>>) as MotionComponent;
    motionCache.set(as, component);
  }
  return component;
}

interface FadeInProps {
  children?: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  const Component = getMotionComponent(as);

  return (
    <Component
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}
