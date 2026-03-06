'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

gsap.registerPlugin(ScrollTrigger);

export function Section13Tears() {
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
      id="section-13-tears"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      {/* Golden sparkle particles — Gerda's tears melting Kay's frozen heart */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
        {[
          { top: '25%', left: '40%', size: 6, dur: 3.0, delay: 0 },
          { top: '35%', left: '55%', size: 8, dur: 3.5, delay: 0.6 },
          { top: '45%', left: '45%', size: 5, dur: 2.8, delay: 1.2 },
          { top: '30%', left: '50%', size: 7, dur: 3.2, delay: 1.8 },
          { top: '50%', left: '42%', size: 4, dur: 2.6, delay: 0.4 },
          { top: '40%', left: '58%', size: 6, dur: 3.4, delay: 2.0 },
          { top: '55%', left: '48%', size: 5, dur: 2.9, delay: 0.9 },
          { top: '20%', left: '52%', size: 4, dur: 3.1, delay: 1.5 },
          { top: '60%', left: '38%', size: 6, dur: 3.3, delay: 2.4 },
          { top: '28%', left: '60%', size: 5, dur: 2.7, delay: 0.3 },
        ].map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background: 'radial-gradient(circle, rgba(251,191,36,0.9) 0%, rgba(245,158,11,0.5) 50%, transparent 70%)',
              boxShadow: '0 0 8px 2px rgba(251,191,36,0.4)',
              animation: `sparkleFloat ${s.dur}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <StoryCard
        chapter="Capítulo XII"
        title="Las Lágrimas Mágicas"
        body="Gerda corrió hacia Kay y lo abrazó. Lloró con todo su corazón. Sus lágrimas calientes cayeron sobre el pecho de Kay… y derritieron la astilla de hielo."
        body2="Kay parpadeó. Y recordó todo."
        variant="dark"
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
            src="/images/characters/transparent/kay-normal-04-crying-relief.png"
            alt="Kay llorando de alivio"
            fill
            sizes="(max-width: 768px) 80px, 160px"
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
