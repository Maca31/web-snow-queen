'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

gsap.registerPlugin(ScrollTrigger);

export function Section07Garden() {
  const sectionRef = useRef<HTMLElement>(null);
  const charLeftRef = useRef<HTMLDivElement>(null);
  const charRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const charLeft = charLeftRef.current;
    const charRight = charRightRef.current;
    if (!section || !charLeft || !charRight) return;

    const ctx = gsap.context(() => {
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
        imageSrc="/images/story/JARDINGERDAYKAY.png"
        imageAlt="Jardín mágico con flores"
        imageOpacity={0.5}
        parallaxSpeed={0.15}
      />
      <StoryCard
        chapter="Capítulo VI"
        title="El Jardín Mágico"
        body="En el camino, Gerda encontró un jardín mágico. Una anciana amable la invitó a quedarse. Las flores cantaban historias… pero ninguna hablaba de Kay."
        variant="light"
      />
      <div ref={charLeftRef} className="absolute bottom-20 left-[15%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
          <Image
            src="/images/characters/transparent/gerda-08-looking-up-wonder.png"
            alt="Gerda mirando con asombro"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
      <div ref={charRightRef} className="absolute bottom-20 right-[15%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
          <Image
            src="/images/characters/transparent/witch-01-standing-welcoming.png"
            alt="La anciana hechicera del jardín"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
