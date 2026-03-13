'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';
import { LazyVideo } from '../shared/LazyVideo';

gsap.registerPlugin(ScrollTrigger);

export function Section04IceHeart() {
  const sectionRef = useRef<HTMLElement>(null);
  const charRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const char = charRef.current;
    if (!section || !char) return;

    const ctx = gsap.context(() => {
      // Kay camina de izquierda a derecha lentamente
      gsap.fromTo(char,
        { x: -500, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: section, start: 'top 100%', end: 'top -10%', scrub: 1.5 }
        }
      );

      // Card entra desde la izquierda
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { x: -300, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 30%', scrub: 0.8 }
          }
        );
      }

      // Floating idle para Kay
      ScrollTrigger.create({
        trigger: section,
        start: 'top 30%',
        onEnter: () => {
          gsap.to(char, { y: -8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="section-04-ice-heart"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/kayesp.png"
        imageAlt="Kay transformándose por el hielo"
        imageOpacity={1}
        parallaxSpeed={0}
      />
      {/* Texto — sobre la vela, lado izquierdo */}
      <div ref={cardRef} className="absolute left-[5%] top-1/2 z-20 -translate-y-1/2" style={{ opacity: 0 }}>
        <StoryCard
          chapter="Capítulo III"
          title="El Corazón de Hielo"
          body="Con el fragmento en el ojo, Kay ya no veía la belleza. Las flores le parecían aburridas. La nieve, perfecta. Gerda le pareció tonta."
          body2="Su corazón se fue enfriando poco a poco… como el invierno que tanto amaba."
          variant="dark"
        />
      </div>
      {/* Kay — sobre el suelo */}
      <div ref={charRef} className="absolute bottom-4 right-[15%] z-30" style={{ opacity: 0 }}>
        <div className="char-hover">
          <div className="relative" style={{ width: 'clamp(140px, 25vw, 300px)', height: 'clamp(220px, 40vw, 480px)' }}>
            <LazyVideo
              src="/images/characters/KAYFELIZTRISTE-Picsart-BackgroundRemover.mp4"
              className="h-full w-full object-contain drop-shadow-lg"
              transparentBg
              mobileSrc="/images/characters/KAY1-removebg-preview.png"
              alt="Kay"
            />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
