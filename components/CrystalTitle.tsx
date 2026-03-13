'use client';

/**
 * CRYSTAL TITLE — Efecto explosion de copos al hover
 * Cada letra del titulo al ser tocada/hover:
 * -> Explota en 12 copos de nieve que vuelan hacia afuera
 * -> Los copos giran, se dispersan y desaparecen
 * -> La letra hace un "pop" y vuelve a su lugar con efecto elastico
 * -> En movil funciona con touch igual que hover
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
type Snowflake = {
  id: number;
  x: number;
  y: number;
  char: string;
  size: number;
  angle: number;
  distance: number;
};

// ─────────────────────────────────────────────
// POOL DE COPOS
// ─────────────────────────────────────────────
const FLAKE_CHARS = ['❄', '❅', '❆', '✦', '✧', '·', '*'];

let flakeCounter = 0;

function createExplosion(x: number, y: number, count = 12): Snowflake[] {
  return Array.from({ length: count }, (_, i) => ({
    id: flakeCounter++,
    x,
    y,
    char: FLAKE_CHARS[Math.floor(Math.random() * FLAKE_CHARS.length)],
    size: Math.random() * 14 + 8,
    angle: (360 / count) * i + Math.random() * 20 - 10,
    distance: Math.random() * 80 + 40,
  }));
}

// ─────────────────────────────────────────────
// SNOWFLAKE PARTICLE
// ─────────────────────────────────────────────
function SnowflakeParticle({
  flake,
  onDone,
}: {
  flake: Snowflake;
  onDone: (id: number) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const rad = (flake.angle * Math.PI) / 180;
    const dx = Math.cos(rad) * flake.distance;
    const dy = Math.sin(rad) * flake.distance;

    gsap.fromTo(
      ref.current,
      { x: 0, y: 0, opacity: 1, scale: 1, rotation: 0 },
      {
        x: dx,
        y: dy,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360 * (Math.random() > 0.5 ? 1 : -1),
        duration: Math.random() * 0.6 + 0.5,
        ease: 'power2.out',
        onComplete: () => onDone(flake.id),
      }
    );
  }, [flake, onDone]);

  return (
    <span
      ref={ref}
      className="pointer-events-none fixed select-none"
      style={{
        left: flake.x,
        top: flake.y,
        fontSize: flake.size,
        color: 'rgba(186,230,253,0.95)',
        textShadow: '0 0 10px rgba(186,230,253,0.8)',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        willChange: 'transform, opacity',
      }}
      aria-hidden
    >
      {flake.char}
    </span>
  );
}

// ─────────────────────────────────────────────
// LETTER — letra individual con explosion
// ─────────────────────────────────────────────
function ExplodingLetter({
  char,
  onExplode,
}: {
  char: string;
  onExplode: (x: number, y: number) => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isPopping = useRef(false);

  const triggerExplosion = useCallback(() => {
    if (!ref.current || isPopping.current) return;

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    onExplode(cx, cy);
    isPopping.current = true;

    gsap.timeline()
      .to(ref.current, {
        scale: 1.5,
        color: 'rgba(255,255,255,1)',
        textShadow: '0 0 30px rgba(186,230,253,1), 0 0 60px rgba(186,230,253,0.8)',
        duration: 0.1,
        ease: 'power2.out',
      })
      .to(ref.current, {
        scale: 0.85,
        duration: 0.08,
        ease: 'power2.in',
      })
      .to(ref.current, {
        scale: 1,
        color: 'rgba(240,249,255,1)',
        textShadow: '0 0 20px rgba(186,230,253,0.5)',
        duration: 0.25,
        ease: 'elastic.out(1, 0.5)',
        onComplete: () => { isPopping.current = false; },
      });
  }, [onExplode]);

  if (char === ' ') {
    return <span className="inline-block w-4 md:w-7" aria-hidden />;
  }

  return (
    <span
      ref={ref}
      className="inline-block cursor-default select-none"
      style={{
        color: 'rgba(240,249,255,1)',
        textShadow: '0 0 20px rgba(186,230,253,0.5)',
        transition: 'color 0.2s',
        willChange: 'transform',
      }}
      onMouseEnter={triggerExplosion}
      onTouchStart={(e) => {
        e.preventDefault();
        triggerExplosion();
      }}
      aria-hidden
    >
      {char}
    </span>
  );
}

// ─────────────────────────────────────────────
// CRYSTAL TITLE — componente principal
// ─────────────────────────────────────────────
interface CrystalTitleProps {
  visible?: boolean;
}

export function CrystalTitle({ visible = true }: CrystalTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [flakes, setFlakes] = useState<Snowflake[]>([]);

  const line1 = 'LA REINA';
  const line2 = 'DE LAS NIEVES';

  // Animacion de entrada — cristalizacion letra por letra
  useEffect(() => {
    if (!visible || !containerRef.current) return;
    const letters = containerRef.current.querySelectorAll('[data-letter]');

    gsap.fromTo(
      letters,
      { opacity: 0, scale: 0, filter: 'blur(20px) brightness(3)' },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px) brightness(1)',
        duration: 0.6,
        ease: 'back.out(2)',
        stagger: { each: 0.07, from: 'center' },
      }
    );
  }, [visible]);

  const handleExplode = useCallback((x: number, y: number) => {
    const newFlakes = createExplosion(x, y, 12);
    setFlakes(prev => [...prev, ...newFlakes]);
  }, []);

  const handleFlakeDone = useCallback((id: number) => {
    setFlakes(prev => prev.filter(f => f.id !== id));
  }, []);

  const renderLine = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={`${text}-${i}`}
        data-letter
        style={{ display: 'inline-block', opacity: 0 }}
      >
        <ExplodingLetter char={char} onExplode={handleExplode} />
      </span>
    ));

  return (
    <>
      {/* Particulas volando — portal al body via fixed */}
      {flakes.map(flake => (
        <SnowflakeParticle
          key={flake.id}
          flake={flake}
          onDone={handleFlakeDone}
        />
      ))}

      {/* Titulo */}
      <div
        ref={containerRef}
        className="relative z-40 flex flex-col items-center"
        style={{ gap: 0 }}
      >
        {/* Linea decorativa superior */}
        <div
          className="mb-2 flex items-center gap-3"
          style={{ opacity: visible ? 0.6 : 0, transition: 'opacity 1s 2s' }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-300 md:w-24" />
          <span
            className="text-sky-300"
            style={{
              fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)',
              letterSpacing: '0.5em',
            }}
          >
            UN CUENTO DE INVIERNO
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-300 md:w-24" />
        </div>

        {/* Linea 1 — LA REINA */}
        <h1
          className="font-bold tracking-widest text-sky-50"
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(8rem, 32vw, 24rem)',
            lineHeight: 0.8,
            letterSpacing: '0.06em',
          }}
          aria-label="La Reina"
        >
          {renderLine(line1)}
        </h1>

        {/* Linea 2 — DE LAS NIEVES */}
        <h1
          className="font-bold tracking-widest text-sky-50"
          style={{
            fontFamily: 'var(--font-title)',
            fontSize: 'clamp(5.5rem, 22vw, 18rem)',
            lineHeight: 0.8,
            letterSpacing: '0.1em',
            marginTop: '-0.7em',
          }}
          aria-label="De las Nieves"
        >
          {renderLine(line2)}
        </h1>

        {/* Hint de interaccion */}
        <p
          className="mt-2 text-center text-sky-300/40"
          style={{
            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
            letterSpacing: '0.2em',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s 4s',
            animation: visible ? 'hintFade 4s ease-in-out 4s infinite' : 'none',
          }}
          aria-hidden
        >
          ✦ toca las letras ✦
        </p>
      </div>

      <style>{`
        @keyframes hintFade {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 0.7; }
        }
      `}</style>
    </>
  );
}

export default CrystalTitle;
