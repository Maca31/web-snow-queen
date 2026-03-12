'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { LazyVideo } from '../shared/LazyVideo';
import { useAmbientSound } from '@/lib/useAmbientSound';

gsap.registerPlugin(ScrollTrigger);

export function Section07Garden() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const charLeftRef = useRef<HTMLDivElement>(null);
  const charRightRef = useRef<HTMLDivElement>(null);

  useAmbientSound(sectionRef, '/freesound_community-bosque-con-abejas-78867.mp3');

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const charLeft = charLeftRef.current;
    const charRight = charRightRef.current;
    if (!section || !charLeft || !charRight) return;

    const ctx = gsap.context(() => {
      // StoryCard scroll animation
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
          }
        );
      }

      // Gerda enters from left
      gsap.fromTo(charLeft,
        { x: -120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.to(charLeft, { y: -8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });

      // Witch enters from right
      gsap.fromTo(charRight,
        { x: 120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)', delay: 0.3,
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.to(charRight, { y: -8, duration: 2.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-07-garden"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/jardinencan.png"
        imageAlt="Jardín mágico con flores"
        imageOpacity={1}
        parallaxSpeed={0}
      />

      {/* Texto — lado izquierdo */}
      <div ref={cardRef} className="absolute left-[5%] top-1/2 z-20 -translate-y-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo VI"
          title="El Jardín Mágico"
          body="En el camino, Gerda encontró un jardín mágico. Una anciana amable la invitó a quedarse. Las flores cantaban historias… pero ninguna hablaba de Kay."
          variant="light"
        />
      </div>

      {/* Gerda — mismo tamaño visual que la anciana */}
      <div ref={charLeftRef} className="absolute bottom-4 right-[32%] z-30" style={{ opacity: 0, height: 'clamp(200px, 35vh, 400px)', width: 'clamp(130px, 22vh, 260px)' }}>
        <LazyVideo
          src="/images/characters/GERDAFELIZTRISTE-Picsart-BackgroundRemover.mp4"
          className="h-full w-full object-contain drop-shadow-lg"
        />
      </div>

      {/* Anciana */}
      <div ref={charRightRef} className="absolute bottom-4 right-[45%] z-30" style={{ opacity: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/characters/anciana.png?v=3"
          alt="La anciana hechicera del jardín"
          className="drop-shadow-lg"
          style={{ height: 'clamp(200px, 35vh, 400px)', width: 'auto' }}
        />
      </div>
    </SectionWrapper>
  );
}
