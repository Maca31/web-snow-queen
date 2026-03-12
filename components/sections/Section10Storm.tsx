'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { StormEffect } from '../shared/StormEffect';
import { LazyVideo } from '../shared/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

export function Section10Storm() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const charRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const char = charRef.current;
    if (!section || !char) return;

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

      // Viaja de izquierda a derecha mientras se hace scroll
      gsap.fromTo(char,
        { x: '-15vw' },
        {
          x: '95vw', ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-10-storm"
      className="relative flex h-screen w-full items-center justify-center"
    >
      <ParallaxBg
        videoSrc="/images/story/NIEVE.mp4"
        imageAlt="Tormenta de nieve"
        imageOpacity={1}
        parallaxSpeed={0}
      />
      <StormEffect intensity="heavy" />
      <div ref={cardRef} className="absolute left-1/2 top-[10%] z-20 -translate-x-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo IX"
          title="La Tormenta"
          body="El reno corrió por la nieve con Gerda en su lomo. La tormenta era terrible, pero Gerda no tenía miedo."
          body2="Su amor por Kay la hacía más fuerte que el viento."
          variant="dark"
        />
      </div>
      <div ref={charRef} className="absolute bottom-[10%] left-0 z-30">
        <div className="relative" style={{ width: 'clamp(120px, 20vw, 240px)', height: 'clamp(120px, 20vw, 240px)' }}>
          <LazyVideo
            src="/images/characters/renoger.mp4"
            className="h-full w-full object-contain drop-shadow-lg"
            transparentBg
            mobileSrc="/images/characters/1772806771f04a-removebg-preview.png"
            alt="Gerda y el reno"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
