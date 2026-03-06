'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

gsap.registerPlugin(ScrollTrigger);

export function Section10Storm() {
  const sectionRef = useRef<HTMLElement>(null);
  const charRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const char = charRef.current;
    if (!section || !char) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(char,
        { x: -120, opacity: 0 },
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
      id="section-10-storm"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/NIEVE.mp4"
        imageAlt="Tormenta de nieve"
        imageOpacity={0.45}
        parallaxSpeed={0.25}
      />
      <StoryCard
        chapter="Capítulo IX"
        title="La Tormenta"
        body="El reno corrió por la nieve con Gerda en su lomo. La tormenta era terrible, pero Gerda no tenía miedo."
        body2="Su amor por Kay la hacía más fuerte que el viento."
        variant="dark"
      />
      <div ref={charRef} className="absolute bottom-20 left-[15%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
          <Image
            src="/images/characters/transparent/gerda-03-running-urgent.png"
            alt="Gerda corriendo en la tormenta"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
