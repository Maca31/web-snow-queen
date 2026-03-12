'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

gsap.registerPlugin(ScrollTrigger);

export function Section13Tears() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { opacity: 0, x: 60, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-13-tears"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Imagen de fondo detrás del video */}
      <ParallaxBg
        imageSrc="/images/story/1773053207970a.png"
        imageAlt="Fondo palacio de hielo"
        imageOpacity={1}
        parallaxSpeed={0}
        objectFit="cover"
      />

      {/* Video con bordes difuminados para fundirse con el fondo */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
        }}
      >
        <ParallaxBg
          videoSrc="/images/story/penultimaseccion.mp4"
          imageAlt="Gerda y Kay se abrazan"
          imageOpacity={1}
          parallaxSpeed={0}
          objectFit="contain"
        />
      </div>

      {/* Viñeta lateral para suavizar bordes de la imagen */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to right, rgba(30,60,90,0.9) 0%, rgba(30,60,90,0.5) 10%, transparent 25%, transparent 75%, rgba(30,60,90,0.5) 90%, rgba(30,60,90,0.9) 100%)',
        }}
      />

      {/* Golden sparkle particles — Gerda's tears melting Kay's frozen heart */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {[
          { top: '25%', left: '40%', size: 6, dur: 3.0, delay: 0 },
          { top: '35%', left: '55%', size: 8, dur: 3.5, delay: 0.6 },
          { top: '45%', left: '45%', size: 5, dur: 2.8, delay: 1.2 },
          { top: '30%', left: '50%', size: 7, dur: 3.2, delay: 1.8 },
          { top: '50%', left: '42%', size: 4, dur: 2.6, delay: 0.4 },
          { top: '40%', left: '58%', size: 6, dur: 3.4, delay: 2.0 },
          { top: '55%', left: '48%', size: 5, dur: 2.9, delay: 0.9 },
          { top: '20%', left: '52%', size: 4, dur: 3.1, delay: 1.5 },
          { top: '60%', left: '38%', size: 6, dur: 3.3, delay: 2.4 },
          { top: '28%', left: '60%', size: 5, dur: 2.7, delay: 0.3 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.5) 50%, transparent 70%)',
              boxShadow: '0 0 8px 2px rgba(251,191,36,0.4)',
              animation: `sparkleFloat ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div ref={cardRef} className="absolute right-[5%] top-[10%] z-30" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo XII"
          title="Las Lágrimas Mágicas"
          body="Gerda corrió hacia Kay y lo abrazó. Lloró con todo su corazón. Sus lágrimas calientes cayeron sobre el pecho de Kay… y derritieron la astilla de hielo."
          body2="Kay parpadeó. Y recordó todo."
          variant="dark"
        />
      </div>
    </SectionWrapper>
  );
}
