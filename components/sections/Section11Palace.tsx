'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

gsap.registerPlugin(ScrollTrigger);

export function Section11Palace() {
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
      id="section-11-palace"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Icy crystal ambient glow for palace atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 80%, rgba(103,232,249,0.1) 0%, transparent 60%), radial-gradient(ellipse at 30% 20%, rgba(56,189,248,0.06) 0%, transparent 50%)',
        }}
        aria-hidden="true"
      />
      <StoryCard
        chapter="Capítulo X"
        title="El Palacio de Hielo"
        body="Al fin llegaron. El palacio brillaba como un diamante helado. Todo era frío, silencioso y enorme."
        body2="La Reina no estaba… pero Kay sí."
        variant="dark"
      />
      <div ref={charRef} className="absolute bottom-20 right-[15%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
          <Image
            src="/images/characters/transparent/snow-queen-04-walking-gliding.png"
            alt="La Reina de las Nieves caminando"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
