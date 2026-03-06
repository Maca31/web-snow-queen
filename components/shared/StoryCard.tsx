'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StoryCardProps {
  chapter: string;       // e.g. "Capítulo I"
  title: string;         // e.g. "Kay y Gerda"
  body: string;          // Narrative text
  body2?: string;        // Optional second paragraph
  hint?: string;         // e.g. "👆 ¡Toca a Kay y Gerda!"
  variant?: 'dark' | 'light';
  className?: string;
}

export function StoryCard({
  chapter,
  title,
  body,
  body2,
  hint,
  variant = 'dark',
  className = '',
}: StoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const isDark = variant === 'dark';

  return (
    <div
      ref={ref}
      className={`relative z-20 max-w-sm rounded-3xl border px-7 py-6 ${
        isDark
          ? 'border-sky-300/10 bg-slate-950/70 shadow-[0_0_80px_rgba(0,0,0,0.5)]'
          : 'border-white/90 bg-white/80 shadow-[0_20px_80px_rgba(0,0,0,0.12)]'
      } backdrop-blur-xl ${className}`}
      style={{ opacity: 0 }}
    >
      <p
        className={`text-[0.7rem] font-semibold uppercase tracking-[0.4em] ${
          isDark ? 'text-amber-400/70' : 'text-sky-700/70'
        }`}
        style={{ fontFamily: 'var(--font-kids)' }}
      >
        {chapter}
      </p>

      <div
        className="my-3 h-px w-12"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(26,74,112,0.6), transparent)',
        }}
      />

      <h2
        className={`text-xl font-light italic leading-tight md:text-2xl ${
          isDark ? 'text-sky-100' : 'text-slate-800'
        }`}
        style={{ fontFamily: 'var(--font-title)' }}
      >
        {title}
      </h2>

      <p
        className={`mt-3 text-sm leading-relaxed md:text-base ${
          isDark ? 'text-sky-100/85' : 'text-slate-600/90'
        }`}
        style={{ fontFamily: 'var(--font-kids)' }}
      >
        {body}
      </p>

      {body2 && (
        <p
          className={`mt-2 text-sm leading-relaxed md:text-base ${
            isDark ? 'text-sky-100/85' : 'text-slate-600/90'
          }`}
          style={{ fontFamily: 'var(--font-kids)' }}
        >
          {body2}
        </p>
      )}

      {hint && (
        <p
          className={`mt-4 text-xs tracking-wide ${
            isDark ? 'text-sky-200/45' : 'text-slate-400/70'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
