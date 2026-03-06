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
  const charRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const char = charRef.current;
    if (!section || !char) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(char,
        { x: 120, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.to(char, { y: -8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
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
        imageSrc="/images/story/SECCION5.png"
        videoSrc="/images/story/NIEVE.mp4"
        imageAlt="La Reina de las Nieves en su trineo"
        imageOpacity={0.55}
        parallaxSpeed={0.2}
      />
      <StormEffect intensity="normal" />
      <StoryCard
        chapter="Capítulo IV"
        title="La Reina de las Nieves"
        body="La Reina de las Nieves llegó en su trineo de cristal. Era bella y terrible. Se llevó a Kay entre la ventisca, hacia su palacio de hielo eterno."
        variant="dark"
      />
      <div ref={charRef} className="absolute bottom-20 right-[15%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
          <Image
            src="/images/characters/transparent/snow-queen-02-arms-commanding.png"
            alt="La Reina de las Nieves"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
