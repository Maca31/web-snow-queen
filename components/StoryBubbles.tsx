'use client';

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
interface NarratorBubbleProps {
  text: string;
  position?: 'top' | 'bottom';
  delay?: number;
  className?: string;
}

interface DialogBubbleProps {
  text: string;
  character: string;
  variant?: 'gerda' | 'kay' | 'queen' | 'narrator';
  side?: 'left' | 'right';
  className?: string;
  delay?: number;
}

// ─────────────────────────────────────────────
// PALETA DE PERSONAJES
// ─────────────────────────────────────────────
const VARIANTS = {
  gerda: {
    bg: 'bg-rose-100',
    border: 'border-rose-300',
    text: 'text-rose-900',
    name: 'text-rose-500',
    tail: 'border-rose-300',
    tailFill: '#ffe4e6',
  },
  kay: {
    bg: 'bg-sky-100',
    border: 'border-sky-300',
    text: 'text-sky-900',
    name: 'text-sky-500',
    tail: 'border-sky-300',
    tailFill: '#e0f2fe',
  },
  queen: {
    bg: 'bg-indigo-100',
    border: 'border-indigo-300',
    text: 'text-indigo-900',
    name: 'text-indigo-500',
    tail: 'border-indigo-300',
    tailFill: '#e0e7ff',
  },
  narrator: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    name: 'text-amber-500',
    tail: 'border-amber-200',
    tailFill: '#fffbeb',
  },
};

// ─────────────────────────────────────────────
// NARRADOR
// ─────────────────────────────────────────────
export function NarratorBubble({
  text,
  position = 'bottom',
  delay = 0,
  className = '',
}: NarratorBubbleProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: position === 'bottom' ? 30 : -30, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'back.out(1.4)',
        delay,
      }
    );
  }, [delay, position]);

  const posClass = position === 'bottom'
    ? 'bottom-8 left-1/2 -translate-x-1/2'
    : 'top-8 left-1/2 -translate-x-1/2';

  return (
    <div
      ref={ref}
      className={`
        absolute z-50 ${posClass}
        w-[80vw] max-w-md
        rounded-xl border border-amber-200/60
        bg-amber-50/80 backdrop-blur-sm
        px-4 py-2.5 shadow-md
        ${className}
      `}
      style={{ opacity: 0 }}
    >
      <p
        className="text-center leading-snug text-amber-900"
        style={{ fontFamily: "var(--font-kids)", fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}
      >
        {text}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────
// DIÁLOGO
// ─────────────────────────────────────────────
export function DialogBubble({
  text,
  character,
  variant = 'narrator',
  side = 'left',
  className = '',
  delay = 0,
}: DialogBubbleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const colors = VARIANTS[variant];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0.5, transformOrigin: side === 'left' ? 'bottom left' : 'bottom right' },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(2)',
        delay,
      }
    );

    gsap.to(el, {
      scale: 1.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay + 0.6,
    });
  }, [delay, side]);

  return (
    <div
      ref={ref}
      className={`relative inline-block max-w-xs md:max-w-sm ${className}`}
      style={{ opacity: 0 }}
    >
      <div
        className={`
          relative rounded-2xl border-2 ${colors.bg} ${colors.border}
          px-4 py-3 shadow-lg
        `}
      >
        <p className={`mb-1 text-xs font-bold uppercase tracking-wider ${colors.name}`}>
          {character}
        </p>

        <p
          className={`text-sm leading-relaxed md:text-base ${colors.text}`}
          style={{ fontFamily: "var(--font-kids)", fontWeight: 600 }}
        >
          {text}
        </p>

        {side === 'left' && (
          <div
            className="absolute -bottom-4 left-6"
            style={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `16px solid ${colors.tailFill}`,
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
            }}
          />
        )}

        {side === 'right' && (
          <div
            className="absolute -bottom-4 right-6"
            style={{
              width: 0,
              height: 0,
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderTop: `16px solid ${colors.tailFill}`,
              filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
            }}
          />
        )}
      </div>
    </div>
  );
}
