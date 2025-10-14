import type { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

type Variant = 'elevated' | 'glass' | 'outline' | 'gradient';
type Pad = 'sm' | 'md' | 'lg';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Lift on hover */
  hover?: boolean;
  /** Visual style */
  variant?: Variant;
  /** Padding scale */
  padding?: Pad;
  /** Scroll-reveal animation */
  revealOnScroll?: boolean;
  /** Glossy sweep on hover */
  shine?: boolean;
  /** For `gradient` variant */
  gradientFrom?: string; // e.g. '#fe2681'
  gradientTo?: string;   // e.g. '#bf1c60'
}

export function Card({
  children,
  className = '',
  hover = false,
  variant = 'elevated',
  padding = 'md',
  revealOnScroll = false,
  shine = false,
  gradientFrom = '#fe2681',
  gradientTo = '#bf1c60',
  ...props
}: CardProps) {
  const Wrapper: any = revealOnScroll ? motion.div : 'div';

  const pad =
    padding === 'sm' ? 'p-4' :
    padding === 'lg' ? 'p-8' : 'p-6';

  const base =
    'group relative rounded-2xl transition-all duration-300 will-change-transform ' +
    (hover ? 'hover:-translate-y-1 hover:shadow-xl' : '');

  const bodyCommon = `${pad} ${className}`;

  // Inner surface choices
  const surfaceByVariant: Record<Variant, string> = {
    elevated: 'bg-white shadow-md border border-gray-100',
    outline:  'bg-white border border-gray-200 shadow-sm',
    glass:    'bg-white/70 backdrop-blur border border-white/60 shadow',
    gradient: 'bg-white rounded-2xl', // actual gradient lives on outer wrapper
  };

  const content = (
    <div
      className={
        surfaceByVariant[variant] +
        ' ' +
        bodyCommon +
        (shine
          ? ' overflow-hidden ' +
            // glossy sweep
            'after:content-[""] after:absolute after:-left-1/2 after:-top-full after:h-[280%] after:w-[130%] ' +
            'after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-rotate-12 ' +
            'group-hover:after:translate-x-[85%] after:transition-transform after:duration-700'
          : '')
      }
    >
      {children}
    </div>
  );

  // Outer wrapper styles (gradient border uses an outer layer)
  const outer =
    variant === 'gradient'
      ? `p-[1.5px] bg-gradient-to-br from-[${gradientFrom}] to-[${gradientTo}] rounded-2xl shadow-lg shadow-[${gradientTo}]/20`
      : '';

  const initial = revealOnScroll ? { opacity: 0, y: 16 } : undefined;
  const animate = revealOnScroll ? { opacity: 1, y: 0 } : undefined;
  const viewport = revealOnScroll ? { once: true, amount: 0.2 } : undefined;
  const transition = revealOnScroll ? { duration: 0.45, ease: 'easeOut' } : undefined;

  return (
    <Wrapper
      initial={initial}
      whileInView={animate}
      viewport={viewport}
      transition={transition}
      className={`${base} ${outer}`}
      {...props}
    >
      {content}
    </Wrapper>
  );
}
