'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

gsap.registerPlugin(ScrollTrigger);

export function Section14Finale() {
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

      // Kay enters from right
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
      id="section-14-finale"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Celebration petals — warm floating confetti for the happy ending */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {[
          { left: '8%',  color: 'rgba(244,114,182,0.6)', size: 10, dur: 7,   delay: 0,   rotate: '12deg' },
          { left: '18%', color: 'rgba(251,191,36,0.5)',  size: 8,  dur: 8,   delay: 1.2, rotate: '-8deg' },
          { left: '30%', color: 'rgba(134,239,172,0.5)', size: 9,  dur: 7.5, delay: 0.5, rotate: '20deg' },
          { left: '42%', color: 'rgba(249,168,212,0.6)', size: 7,  dur: 9,   delay: 2.0, rotate: '-15deg' },
          { left: '55%', color: 'rgba(253,224,71,0.5)',  size: 11, dur: 6.5, delay: 0.8, rotate: '5deg' },
          { left: '65%', color: 'rgba(244,114,182,0.5)', size: 8,  dur: 8.5, delay: 1.5, rotate: '-20deg' },
          { left: '75%', color: 'rgba(134,239,172,0.4)', size: 10, dur: 7.2, delay: 2.5, rotate: '18deg' },
          { left: '85%', color: 'rgba(251,191,36,0.6)',  size: 9,  dur: 8.8, delay: 0.3, rotate: '-10deg' },
          { left: '12%', color: 'rgba(253,224,71,0.5)',  size: 7,  dur: 9.5, delay: 3.0, rotate: '25deg' },
          { left: '50%', color: 'rgba(249,168,212,0.5)', size: 8,  dur: 7.8, delay: 1.8, rotate: '-5deg' },
          { left: '92%', color: 'rgba(134,239,172,0.5)', size: 6,  dur: 8.2, delay: 0.7, rotate: '15deg' },
          { left: '38%', color: 'rgba(244,114,182,0.4)', size: 9,  dur: 6.8, delay: 2.2, rotate: '-22deg' },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute top-0 rounded-full"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 6px 1px ${p.color}`,
              transform: `rotate(${p.rotate})`,
              borderRadius: '50% 50% 50% 0',
              animation: `celebrationFloat ${p.dur}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <StoryCard
        chapter="Capítulo XIII"
        title="Final Feliz"
        body="Volvieron a casa tomados de la mano. Las rosas del jardín florecieron. El invierno se fue."
        body2="Y el amor, como siempre, venció al frío."
        variant="light"
      />
      <div ref={charLeftRef} className="absolute bottom-20 left-[15%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
          <Image
            src="/images/characters/transparent/gerda-05-arms-open-joy.png"
            alt="Gerda con los brazos abiertos de alegría"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
      <div ref={charRightRef} className="absolute bottom-20 right-[15%] z-30" style={{ opacity: 0 }}>
        <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
          <Image
            src="/images/characters/transparent/kay-normal-05-hugging-grateful.png"
            alt="Kay abrazando con gratitud"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>

      <p
        className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 text-4xl font-light italic text-amber-700/70 md:text-6xl"
        style={{ fontFamily: 'var(--font-title)', textShadow: '0 0 40px rgba(245,158,11,0.4)' }}
      >
        Fin
      </p>
    </SectionWrapper>
  );
}
