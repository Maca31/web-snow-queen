'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { useAmbientSound } from '@/lib/useAmbientSound';

gsap.registerPlugin(ScrollTrigger);

export function Section06Search() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useAmbientSound(sectionRef, '/freesound_community-bosque-con-abejas-78867.mp3');

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.set(card, { y: -200, opacity: 0 });

      gsap.to(card, {
        y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', scrub: 1 }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-06-search"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/GERDACAMINANDO.mp4"
        imageAlt="Gerda caminando en la nieve"
        imageOpacity={0.9}
        parallaxSpeed={0}
      />

      {/* Texto — lado derecho, entra desde arriba */}
      <div ref={cardRef} className="absolute right-[5%] top-1/2 z-20 -translate-y-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo V"
          title="El Viaje de Gerda"
          body="Gerda no se rindió. Aunque todos decían que Kay se había ido para siempre, ella salió a buscarlo. El camino era largo y frío, pero su corazón estaba lleno de amor."
          variant="dark"
        />
      </div>
    </SectionWrapper>
  );
}
