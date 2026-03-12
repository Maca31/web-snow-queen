'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

gsap.registerPlugin(ScrollTrigger);

export function Section03Mirror() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardARef = useRef<HTMLDivElement>(null);
  const cardBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      // Card A initial state
      if (cardARef.current) gsap.set(cardARef.current, { x: 300, opacity: 0 });
      // Card B initial state
      if (cardBRef.current) gsap.set(cardBRef.current, { y: -200, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
        },
      });

      // Card A entra desde la derecha (0% - 20% del timeline)
      if (cardARef.current) {
        tl.to(cardARef.current, { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0);
      }

      // Horizontal scroll del track (20% - 80%)
      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        duration: 1,
      }, 0.2);

      // Card B entra desde arriba (50% - 70% del timeline)
      if (cardBRef.current) {
        tl.to(cardBRef.current, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.5);
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="section-03-mirror"
      ref={wrapRef}
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div
        ref={trackRef}
        className="flex h-screen"
        style={{ width: '200vw' }}
      >
        {/* Panel A: The Mirror */}
        <div
          className="relative flex h-screen w-screen flex-shrink-0 items-center justify-end overflow-hidden pr-[8%]"
        >
          <ParallaxBg
            imageSrc="/images/story/BG-02.png"
            imageAlt="El espejo maldito"
            imageOpacity={0.85}
            parallaxSpeed={0}
          />
          <div ref={cardARef} className="relative z-20" style={{ opacity: 0 }}>
            <StoryCard
              chapter="Capítulo II"
              title="El Espejo Maldito"
              body="Un duende malvado creó un espejo terrible. Quien se miraba en él solo veía lo feo del mundo. Lo lanzó al cielo… y se rompió en millones de fragmentos."
              variant="dark"
            />
          </div>
        </div>

        {/* Panel B: The Shard */}
        <div
          className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden"
        >
          <ParallaxBg
            videoSrc="/images/story/eroto.mp4"
            imageAlt="Los fragmentos del espejo"
            imageOpacity={0.9}
            parallaxSpeed={0}
          />
          <div ref={cardBRef} className="relative z-20" style={{ opacity: 0 }}>
            <StoryCard
              chapter="Capítulo II (cont.)"
              title="Los Fragmentos Malvados"
              body="Uno de esos pedacitos cayó en el ojo de Kay. Y desde ese momento, su corazón comenzó a enfriarse."
              variant="dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
