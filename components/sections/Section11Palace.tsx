'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { LazyVideo } from '../shared/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

export function Section11Palace() {
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

      // Viaja de derecha a izquierda acercándose al palacio
      gsap.fromTo(char,
        { x: '95vw' },
        {
          x: '-15vw', ease: 'none',
          scrollTrigger: { trigger: section, start: 'bottom bottom', end: 'bottom top', scrub: true }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-11-palace"
      className="relative flex h-screen w-full items-center justify-center"
    >
      <ParallaxBg
        imageSrc="/images/story/palacio3.png"
        imageAlt="El Palacio de Hielo"
        imageOpacity={1}
        parallaxSpeed={0}
        objectFit="cover"
        bgColor="#c8dde8"
      />

      <div ref={cardRef} className="absolute left-1/2 top-[10%] z-20 -translate-x-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo X"
          title="El Palacio de Hielo"
          body="Al fin llegaron. El palacio brillaba como un diamante helado. Todo era frío, silencioso y enorme."
          body2="La Reina no estaba… pero Kay sí."
          variant="dark"
        />
      </div>

      <div ref={charRef} className="absolute bottom-[10%] left-0 z-30">
        <div className="relative" style={{ width: 'clamp(120px, 20vw, 240px)', height: 'clamp(120px, 20vw, 240px)', transform: 'scaleX(-1)' }}>
          <LazyVideo
            src="/images/characters/renoger.mp4"
            className="h-full w-full object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
