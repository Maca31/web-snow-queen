'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { LazyVideo } from '../shared/LazyVideo';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export function Section12Prisoner() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(card,
        { opacity: 0, x: -60, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-12-prisoner"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/palaciodentro.png"
        imageAlt="Kay prisionero en el palacio de hielo"
        imageOpacity={1}
        parallaxSpeed={0}
        objectFit="cover"
        bgColor="#c8dde8"
      />
      {/* Gerda en la puerta del palacio */}
      <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 z-[5] h-[15%] w-[5%] md:h-[18%] md:w-[4%]">
        <LazyVideo
          src="/images/characters/gerdasalu.mp4"
          className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
        />
      </div>

      {/* Reno esperando afuera — pequeño y lejano */}
      <div className="absolute bottom-[35%] left-[42%] z-[4] h-[12%] w-[5%] md:h-[14%] md:w-[4%]">
        <LazyVideo
          src="/images/characters/renomov.mp4"
          className="h-full w-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.4)]"
        />
      </div>

      {/* Kay sentado en el hielo */}
      <div className="absolute bottom-[0%] right-[33%] z-10 h-[35%] w-[12%] md:h-[40%] md:w-[10%]">
        <Image
          src="/images/characters/kaypalaciosen.png"
          alt="Kay sentado en el palacio de hielo"
          fill
          sizes="(max-width: 768px) 12vw, 10vw"
          className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          loading="lazy"
        />
      </div>

      <div ref={cardRef} className="absolute left-[5%] top-[10%] z-30" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo XI"
          title="El Prisionero de Hielo"
          body="Kay estaba sentado en el suelo de hielo, intentando formar la palabra 'ETERNIDAD' con pedazos de cristal."
          body2="No sentía frío. No sentía nada."
          variant="dark"
        />
      </div>
    </SectionWrapper>
  );
}
