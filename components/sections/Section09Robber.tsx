'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import Image from 'next/image';
import { LazyVideo } from '../shared/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

export function Section09Robber() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.set(card, { y: -200, opacity: 0 });
      gsap.to(card, {
        y: 0, opacity: 1, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 20%', scrub: 1 }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-09-robber"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/ladrona.png"
        imageAlt="La niña ladrona en el bosque"
        imageOpacity={1}
        parallaxSpeed={0}
      />

      {/* Personaje — al lado del columpio, flotando */}
      <div className="absolute bottom-[5%] left-[32%] z-10 h-[38%] w-[15%] md:h-[42%] md:w-[12%] animate-float">
        <Image
          src="/images/characters/17725450952830__1_-removebg-preview.png"
          alt="La Niña Ladrona"
          fill
          sizes="(max-width: 768px) 15vw, 12vw"
          className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          loading="lazy"
        />
      </div>

      {/* Gerda llorando — mismo tamaño que la ladrona */}
      <div className="absolute bottom-[10%] left-[42%] z-10 h-[30%] w-[12%] md:h-[35%] md:w-[10%] animate-float">
        <LazyVideo
          src="/images/characters/GERDALLORANDO-Picsart-BackgroundRemover.mp4"
          className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          transparentBg
          mobileSrc="/images/characters/gerda1-removebg-preview.png"
          alt="Gerda"
        />
      </div>

      {/* Reno — lado derecho */}
      <div className="absolute bottom-[5%] right-[15%] z-10 h-[40%] w-[18%] md:h-[45%] md:w-[14%] animate-float">
        <LazyVideo
          src="/images/characters/renomov.mp4"
          className="h-full w-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
          transparentBg
          mobileSrc="/images/characters/17725448172ac6__1_-removebg-preview.png"
          alt="Reno"
        />
      </div>

      {/* Texto — lado izquierdo, entra desde arriba */}
      <div ref={cardRef} className="absolute left-[5%] top-1/2 z-30 -translate-y-1/2">
        <StoryCard
          chapter="Capítulo VIII"
          title="La Niña Ladrona"
          body="Unos bandidos la atraparon en el bosque. Pero la hija de la jefa, una niña valiente y curiosa, se hizo su amiga."
          body2="'Te ayudaré', dijo. Y le dio su reno más fuerte para que la llevara al norte."
          variant="dark"
        />
      </div>
    </SectionWrapper>
  );
}
