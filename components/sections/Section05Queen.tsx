'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { StormEffect } from '../shared/StormEffect';

gsap.registerPlugin(ScrollTrigger);

export function Section05Queen() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const group = groupRef.current;
    const card = cardRef.current;
    if (!section || !group) return;

    const ctx = gsap.context(() => {
      // Reina + trineo (grupo) entra desde la derecha con scroll
      gsap.fromTo(group,
        { x: 500, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 100%', end: 'top -10%', scrub: 1.5 }
        }
      );

      // Texto entra desde la izquierda con scroll
      if (card) {
        gsap.fromTo(card,
          { x: -400, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: section, start: 'top 100%', end: 'top -10%', scrub: 1.5 }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-05-queen"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/BG-05v.mp4"
        imageAlt="La Reina de las Nieves en su trineo"
        imageOpacity={0.8}
        parallaxSpeed={0}
      />
      <StormEffect intensity="normal" />

      {/* Texto — lado izquierdo */}
      <div ref={cardRef} className="absolute left-[5%] top-1/2 z-20 -translate-y-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo IV"
          title="La Reina de las Nieves"
          body="La Reina de las Nieves llegó en su trineo de cristal. Era bella y terrible. Se llevó a Kay entre la ventisca, hacia su palacio de hielo eterno."
          variant="dark"
        />
      </div>

      {/* Reina — sobre el trineo, entra desde la derecha */}
      <div ref={groupRef} className="char-hover absolute bottom-[15%] right-[18%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(140px, 22vw, 280px)', height: 'clamp(220px, 38vw, 450px)' }}>
          <Image
            src="/images/characters/1772545519943d__1___2_-removebg-preview.png"
            alt="La Reina de las Nieves"
            fill
            sizes="(max-width: 768px) 140px, 280px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
