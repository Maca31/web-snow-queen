'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { LazyVideo } from '../shared/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

export function Section08Crow() {
  const sectionRef = useRef<HTMLElement>(null);
  const princessRef = useRef<HTMLDivElement>(null);
  const crowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const princess = princessRef.current;
    const crow = crowRef.current;
    const card = cardRef.current;
    if (!section || !princess || !crow || !card) return;

    const ctx = gsap.context(() => {
      // Texto entra desde arriba
      gsap.set(card, { y: -200, opacity: 0 });
      gsap.to(card, {
        y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', scrub: 1 }
      });

      // Princesa entra desde la derecha
      gsap.fromTo(princess,
        { x: 200, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', scrub: 1 }
        }
      );

      // Cuervo entra desde la izquierda
      gsap.fromTo(crow,
        { x: -200, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', scrub: 1 }
        }
      );

      // Floating idle
      gsap.to(princess, { y: -8, duration: 2.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
      gsap.to(crow, { y: -6, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-08-crow"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/characters/gerpricu.png"
        imageAlt="Gerda, la princesa y el cuervo"
        imageOpacity={0.85}
        parallaxSpeed={0}
      />

      {/* Texto — lado izquierdo */}
      <div ref={cardRef} className="absolute left-1/2 top-[11%] z-20 -translate-x-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo VII"
          title="El Cuervo Sabio"
          body="Un cuervo sabio le contó a Gerda sobre un príncipe que se parecía a Kay. Corrió al castillo… pero no era él."
          body2="La princesa, conmovida, le dio un abrigo cálido y un trineo dorado para que siguiera su camino."
          variant="dark"
        />
      </div>

      {/* Cuervo — izquierda */}
      <div ref={crowRef} className="char-hover absolute bottom-4 right-[55%] z-30" style={{ opacity: 0, height: 'clamp(200px, 32vh, 380px)', width: 'clamp(200px, 32vh, 380px)' }}>
        <LazyVideo
          src="/images/characters/cuervo.mp4"
          className="h-full w-full object-contain drop-shadow-lg"
          transparentBg
          mobileSrc="/images/characters/1772547114f81b-removebg-preview.png"
          alt="El cuervo"
        />
      </div>

      {/* Princesa — derecha */}
      <div ref={princessRef} className="char-hover absolute bottom-[-2%] right-[42%] z-30" style={{ opacity: 0, height: 'clamp(240px, 40vh, 450px)', width: 'clamp(160px, 26vh, 300px)' }}>
        <LazyVideo
          src="/images/characters/princesa.mp4"
          className="h-full w-full object-contain drop-shadow-lg"
          transparentBg
          mobileSrc="/images/characters/1772547569102e-removebg-preview.png"
          alt="La princesa"
        />
      </div>
    </SectionWrapper>
  );
}
