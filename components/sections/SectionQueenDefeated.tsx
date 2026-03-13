'use client';

/**
 * SECCION — La Reina Vencida
 * Cap XIII — El palacio se derrite, la Reina desaparece y reaparece
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { useAmbientSound } from '@/lib/useAmbientSound';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// CORAZONES FLOTANTES
// ─────────────────────────────────────────────
function FloatingHearts() {
  // Deterministic values to avoid SSR hydration mismatch
  const hearts = [
    { id: 0, left: 42, delay: 0,   size: 20, duration: 5.5, char: '\u{1F49B}' },
    { id: 1, left: 55, delay: 0.6, size: 16, duration: 4.8, char: '\u{1F338}' },
    { id: 2, left: 48, delay: 1.2, size: 24, duration: 6.2, char: '\u2728' },
    { id: 3, left: 63, delay: 1.8, size: 14, duration: 5.0, char: '\u{1F49B}' },
    { id: 4, left: 50, delay: 2.4, size: 22, duration: 4.5, char: '\u{1F338}' },
    { id: 5, left: 58, delay: 3.0, size: 18, duration: 6.8, char: '\u2728' },
    { id: 6, left: 45, delay: 3.6, size: 26, duration: 5.3, char: '\u{1F49B}' },
    { id: 7, left: 67, delay: 4.2, size: 15, duration: 4.2, char: '\u{1F338}' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {hearts.map(h => (
        <div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            bottom: '20%',
            fontSize: h.size,
            animation: `heartFloat ${h.duration}s ease-in-out ${h.delay}s infinite`,
            opacity: 0,
          }}
        >
          {h.char}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// PETALOS CAYENDO
// ─────────────────────────────────────────────
function FallingPetals() {
  // Deterministic values to avoid SSR hydration mismatch
  const petals = [
    { id: 0,  left: 15, delay: 0,   duration: 6.5, size: 12 },
    { id: 1,  left: 28, delay: 0.4, duration: 7.8, size: 10 },
    { id: 2,  left: 42, delay: 0.8, duration: 5.4, size: 15 },
    { id: 3,  left: 55, delay: 1.2, duration: 8.2, size: 9  },
    { id: 4,  left: 68, delay: 1.6, duration: 6.0, size: 14 },
    { id: 5,  left: 80, delay: 2.0, duration: 7.1, size: 11 },
    { id: 6,  left: 22, delay: 2.4, duration: 5.8, size: 16 },
    { id: 7,  left: 35, delay: 2.8, duration: 8.5, size: 10 },
    { id: 8,  left: 50, delay: 3.2, duration: 6.3, size: 13 },
    { id: 9,  left: 63, delay: 3.6, duration: 7.4, size: 8  },
    { id: 10, left: 75, delay: 4.0, duration: 5.6, size: 17 },
    { id: 11, left: 88, delay: 4.4, duration: 8.0, size: 11 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: '-5%',
            fontSize: p.size,
            animation: `petalFall ${p.duration}s ease-in ${p.delay}s infinite`,
            opacity: 0,
          }}
        >
          {'\u{1F338}'}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// BOCADILLO DE DIALOGO
// ─────────────────────────────────────────────
type DialogProps = {
  text: string;
  color: string;
  side?: 'left' | 'right';
  visible: boolean;
  delay?: number;
};

function DialogBubble({ text, color, side = 'right', visible, delay = 0 }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (visible) {
      gsap.fromTo(ref.current,
        { opacity: 0, scale: 0.5, y: 10 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, delay, ease: 'back.out(2)' }
      );
    } else {
      gsap.to(ref.current, { opacity: 0, scale: 0.8, duration: 0.3 });
    }
  }, [visible, delay]);

  return (
    <div
      ref={ref}
      className="absolute z-50 max-w-[160px] rounded-2xl px-3 py-2 text-center shadow-lg"
      style={{
        background: color,
        opacity: 0,
        fontSize: 'clamp(0.65rem, 1.2vw, 0.8rem)',
        fontFamily: 'var(--font-kids)',
        fontWeight: 700,
        color: 'white',
        bottom: '102%',
        ...(side === 'left' ? { right: '10%' } : { left: '10%' }),
        lineHeight: 1.3,
      }}
    >
      {text}
      <div
        style={{
          position: 'absolute',
          bottom: -8,
          ...(side === 'left' ? { right: 20 } : { left: 20 }),
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `8px solid ${color}`,
        }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// SECCION PRINCIPAL
// ─────────────────────────────────────────────
export function SectionQueenDefeated() {
  const sectionRef = useRef<HTMLElement>(null);
  const queenRef = useRef<HTMLDivElement>(null);
  const gerdaRef = useRef<HTMLDivElement>(null);
  const kayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const queenTlRef = useRef<gsap.core.Timeline | null>(null);

  useAmbientSound(sectionRef, '/593290__2100385_joshua_blignaut__water-dripping-in-the-back-of-a-cave.wav', { volume: 0.25 });

  const [dialogsVisible, setDialogsVisible] = useState(false);
  const [queenFading, setQueenFading] = useState(false);
  const [queenGone, setQueenGone] = useState(false);

  // Ciclo: la Reina se desvanece, espera 15s, y reaparece
  const runQueenCycle = useCallback(() => {
    if (!queenRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        // Despues de reaparecer, vuelve a empezar el ciclo
        setTimeout(() => runQueenCycle(), 3000);
      },
    });

    // Desvanecerse
    tl.add(() => { setQueenFading(true); setQueenGone(false); });
    tl.to(queenRef.current, {
      opacity: 0, y: -30, filter: 'blur(8px)',
      duration: 2, ease: 'power1.in',
    }, 0.5);
    tl.add(() => setQueenGone(true));

    // Esperar 5 segundos invisible
    tl.to({}, { duration: 5 });

    // Reaparecer
    tl.add(() => { setQueenFading(false); setQueenGone(false); });
    tl.to(queenRef.current, {
      opacity: 1, y: 0, filter: 'blur(0px)',
      duration: 1.5, ease: 'power2.out',
    });

    queenTlRef.current = tl;
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      // Card de texto
      if (cardRef.current) {
        tl.fromTo(cardRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0
        );
      }

      // 1. Gerda entra desde la derecha
      tl.fromTo(gerdaRef.current,
        { x: 120, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
        0
      );

      // 2. Kay entra detras de Gerda
      tl.fromTo(kayRef.current,
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        0.4
      );

      // 3. Reina aparece desde la izquierda
      tl.fromTo(queenRef.current,
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        0.7
      );

      // 4. Bocadillos aparecen
      tl.add(() => setDialogsVisible(true), 1.0);

      // 5. Iniciar el ciclo de disolucion de la Reina
      tl.add(() => runQueenCycle(), 3.5);

      // Breathing suave de Gerda y Kay
      gsap.to(gerdaRef.current, {
        y: -6, duration: 2.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1,
      });
      gsap.to(kayRef.current, {
        y: -5, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.3,
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      if (queenTlRef.current) queenTlRef.current.kill();
    };
  }, [runQueenCycle]);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-queen-defeated"
      className="relative flex h-screen w-full items-end overflow-hidden"
    >
      {/* BACKGROUND — imagen completa con object-cover */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/story/seccion10.png"
          alt="El palacio de hielo se derrite"
          fill
          sizes="100vw"
          className="object-cover"
          quality={90}
          priority
        />
      </div>

      {/* EFECTOS AMBIENTALES */}
      <FloatingHearts />
      <FallingPetals />

      {/* CARD DE TEXTO */}
      <div ref={cardRef} className="absolute right-[5%] top-[8%] z-40" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capitulo XIII"
          title="La Reina Vencida"
          body="La Reina sintio algo que nunca habia sentido. El calor del amor verdadero."
          body2="Y el palacio de hielo eterno... dejo de ser eterno."
          variant="dark"
        />
      </div>

      {/* PERSONAJES */}
      <div className="relative z-30 flex w-full items-end justify-center px-4 pb-6">

        {/* REINA — izquierda */}
        <div
          ref={queenRef}
          className="relative flex flex-col items-center"
          style={{
            opacity: 0,
            marginRight: 'clamp(20px, 4vw, 60px)',
            marginBottom: 'clamp(10px, 2vh, 30px)',
          }}
        >
          <DialogBubble
            text="Que... es esto que siento...?"
            color="rgba(99,102,241,0.9)"
            side="right"
            visible={dialogsVisible && !queenFading}
            delay={0.2}
          />

          <div
            className="char-hover relative"
            style={{
              filter: queenFading
                ? 'drop-shadow(0 0 20px rgba(186,230,253,0.8))'
                : 'drop-shadow(0 0 12px rgba(186,230,253,0.4))',
              transition: 'filter 1s ease',
            }}
          >
            <Image
              src="/images/characters/1772806771f04a-removebg-preview.png"
              alt="Reina de las Nieves"
              width={220}
              height={380}
              className="object-contain"
              style={{
                height: 'clamp(200px, 38vh, 380px)',
                width: 'auto',
              }}
            />

            {/* Particulas de disolucion */}
            {queenFading && !queenGone && (
              <div className="pointer-events-none absolute inset-0">
                {['\u2744', '\u2726', '\u00B7', '\u2745'].map((char, i) => (
                  <span
                    key={i}
                    className="absolute text-sky-200"
                    style={{
                      left: `${20 + i * 20}%`,
                      top: `${10 + i * 15}%`,
                      fontSize: `${12 + i * 4}px`,
                      animation: `queenDissolve${i} ${1.5 + i * 0.3}s ease-out ${i * 0.2}s forwards`,
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sombra */}
          <div
            style={{
              width: '70%',
              height: 8,
              background: 'radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              marginTop: 2,
            }}
          />
        </div>

        {/* GERDA — centro */}
        <div
          ref={gerdaRef}
          className="relative flex flex-col items-center"
          style={{ opacity: 0 }}
        >
          <DialogBubble
            text="Lo siento... pero Kay tiene que volver a casa."
            color="rgba(244,63,94,0.85)"
            side="left"
            visible={dialogsVisible}
            delay={0.5}
          />

          <div className="char-hover" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>
            <Image
              src="/images/characters/gerda1-removebg-preview.png"
              alt="Gerda"
              width={200}
              height={360}
              className="object-contain"
              style={{
                height: 'clamp(190px, 36vh, 360px)',
                width: 'auto',
              }}
            />
          </div>

          {/* Sombra */}
          <div
            style={{
              width: '60%',
              height: 8,
              background: 'radial-gradient(ellipse, rgba(244,63,94,0.25) 0%, transparent 70%)',
              borderRadius: '50%',
              marginTop: 2,
            }}
          />
        </div>

        {/* KAY — derecha de Gerda */}
        <div
          ref={kayRef}
          className="relative flex flex-col items-center"
          style={{
            opacity: 0,
            marginLeft: 'clamp(-30px, -2vw, -20px)',
            marginBottom: 'clamp(0px, 1vh, 15px)',
          }}
        >
          <DialogBubble
            text="Gerda! Te encontre... quiero decir, me encontraste!"
            color="rgba(14,165,233,0.85)"
            side="left"
            visible={dialogsVisible}
            delay={0.8}
          />

          <div className="char-hover" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }}>
            <Image
              src="/images/characters/KAY1-removebg-preview.png"
              alt="Kay"
              width={185}
              height={340}
              className="object-contain"
              style={{
                height: 'clamp(175px, 33vh, 340px)',
                width: 'auto',
              }}
            />
          </div>

          {/* Sombra */}
          <div
            style={{
              width: '55%',
              height: 8,
              background: 'radial-gradient(ellipse, rgba(14,165,233,0.25) 0%, transparent 70%)',
              borderRadius: '50%',
              marginTop: 2,
            }}
          />
        </div>
      </div>

      {/* Texto inferior */}
      {queenFading && (
        <div
          className="pointer-events-none absolute bottom-24 left-1/2 z-40 -translate-x-1/2 whitespace-nowrap rounded-full px-6 py-2"
          style={{
            background: 'rgba(2,11,36,0.7)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-kids)',
            fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
            color: 'rgba(186,230,253,0.9)',
            letterSpacing: '0.15em',
            animation: 'textFadeIn 1s ease forwards',
          }}
        >
          La Reina se disuelve en el viento del norte...
        </div>
      )}

      {/* ESTILOS */}
      <style>{`
        @keyframes heartFloat {
          0%   { opacity: 0; transform: translateY(0) scale(0.8); }
          20%  { opacity: 1; }
          80%  { opacity: 0.8; }
          100% { opacity: 0; transform: translateY(-120px) scale(1.2); }
        }
        @keyframes petalFall {
          0%   { opacity: 0; transform: translateY(-20px) rotate(0deg) translateX(0px); }
          10%  { opacity: 0.9; }
          90%  { opacity: 0.6; }
          100% { opacity: 0; transform: translateY(110vh) rotate(360deg) translateX(40px); }
        }
        @keyframes queenDissolve0 {
          0%   { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(25px, -45px) scale(0.3); }
        }
        @keyframes queenDissolve1 {
          0%   { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(-30px, -55px) scale(0.3); }
        }
        @keyframes queenDissolve2 {
          0%   { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(35px, -40px) scale(0.3); }
        }
        @keyframes queenDissolve3 {
          0%   { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(-20px, -65px) scale(0.3); }
        }
        @keyframes textFadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </SectionWrapper>
  );
}

export default SectionQueenDefeated;
