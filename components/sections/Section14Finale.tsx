'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

gsap.registerPlugin(ScrollTrigger);

// Deterministic pseudo-random based on index — rounded to avoid server/client mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

const PETAL_SIZES = Array.from({ length: 18 }, (_, i) => ({
  w: Math.round(8 + seededRandom(i * 2) * 10),
  h: Math.round(8 + seededRandom(i * 2 + 1) * 10),
}));

const HEART_DATA = Array.from({ length: 12 }, (_, i) => ({
  left: `${Math.round(10 + seededRandom(i + 100) * 80)}%`,
  size: Math.round(14 + seededRandom(i + 110) * 16),
  dur: Math.round((6 + seededRandom(i + 120) * 5) * 10) / 10,
  delay: Math.round(seededRandom(i + 130) * 60) / 10,
  sway: Math.round(20 + seededRandom(i + 140) * 40),
}));

const SPARKLE_DATA = Array.from({ length: 25 }, (_, i) => ({
  left: `${Math.round(5 + seededRandom(i * 3 + 200) * 90)}%`,
  top: `${Math.round(5 + seededRandom(i * 3 + 201) * 90)}%`,
  w: Math.round(6 + seededRandom(i * 3 + 202) * 10),
  h: Math.round(6 + seededRandom(i * 3 + 203) * 10),
  dur: 2 + seededRandom(i + 210) * 3,
  delay: seededRandom(i + 220) * 4,
}));

export function Section14Finale() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<HTMLDivElement>(null);
  const finRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const petals = petalsRef.current;
    const fin = finRef.current;
    if (!section || !petals || !fin) return;

    const ctx = gsap.context(() => {
      // StoryCard scroll animation
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { opacity: 0, y: -40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // ── Pétalos de flor cayendo suavemente (GSAP — funciona bien) ──
      const petalEls = petals.children;
      for (let i = 0; i < petalEls.length; i++) {
        const el = petalEls[i] as HTMLElement;
        const delay = seededRandom(i * 10) * 4;
        const duration = 6 + seededRandom(i * 10 + 1) * 5;
        const startX = seededRandom(i * 10 + 2) * 100;
        gsap.set(el, { left: `${startX}%`, top: '-5%', opacity: 0 });
        gsap.to(el, {
          top: '110%',
          x: `random(-80, 80)`,
          rotation: `random(-360, 360)`,
          opacity: 0.8,
          duration,
          delay,
          repeat: -1,
          ease: 'none',
          modifiers: {
            opacity: (val: string) => {
              const progress = parseFloat(val);
              if (progress < 0.15) return String(progress / 0.15 * 0.8);
              if (progress > 0.85) return String((1 - progress) / 0.15 * 0.8);
              return '0.8';
            }
          }
        });
      }

      // ── Texto "Fin" con fade elegante ──
      gsap.fromTo(fin,
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1, y: 0, scale: 1, duration: 2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 50%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.to(fin, {
        textShadow: '0 0 60px rgba(245,158,11,0.8), 0 0 120px rgba(245,158,11,0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-14-finale"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/fin.mp4"
        imageAlt="Final feliz"
        imageOpacity={1}
        parallaxSpeed={0}
        objectFit="cover"
      />

      {/* CSS keyframes para corazones y sparkles */}
      <style jsx>{`
        @keyframes floatUp {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(-110vh) translateX(var(--sway)); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes sparkleDrift {
          0%, 100% { translate: 0 0; }
          25% { translate: 8px -6px; }
          50% { translate: -4px 8px; }
          75% { translate: -8px -4px; }
        }
      `}</style>

      {/* Pétalos de flor cayendo */}
      <div ref={petalsRef} className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {PETAL_SIZES.map((p, i) => (
          <div
            key={`petal-${i}`}
            className="absolute"
            style={{
              width: p.w,
              height: p.h,
              background: ['#F9A8D4', '#FBCFE8', '#FDA4AF', '#FCA5A5', '#FED7AA'][i % 5],
              borderRadius: '50% 0 50% 50%',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Corazones flotando hacia arriba — CSS animation */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {HEART_DATA.map((h, i) => (
          <div
            key={`heart-${i}`}
            className="absolute text-pink-400/70"
            style={{
              left: h.left,
              bottom: '-5%',
              fontSize: h.size,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ['--sway' as any]: `${h.sway}px`,
              animation: `floatUp ${h.dur}s ease-in-out ${h.delay}s infinite`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Partículas doradas — CSS animation */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
        {SPARKLE_DATA.map((s, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.w,
              height: s.h,
              background: 'radial-gradient(circle, rgba(253,224,71,0.9) 0%, rgba(245,158,11,0.5) 50%, transparent 70%)',
              boxShadow: '0 0 12px 4px rgba(251,191,36,0.5)',
              animation: `sparkle ${s.dur}s ease-in-out ${s.delay}s infinite, sparkleDrift ${s.dur * 1.5}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div ref={cardRef} className="absolute left-1/2 top-[5%] z-30 -translate-x-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo XIII"
          title="Final Feliz"
          body="Volvieron a casa tomados de la mano. Las rosas del jardín florecieron. El invierno se fue."
          body2="Y el amor, como siempre, venció al frío."
          variant="light"
        />
      </div>

      <p
        ref={finRef}
        className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 text-7xl font-light italic text-amber-600/80 md:text-9xl"
        style={{ fontFamily: 'var(--font-title)', textShadow: '0 0 40px rgba(245,158,11,0.4)', opacity: 0 }}
      >
        Fin
      </p>
    </SectionWrapper>
  );
}
