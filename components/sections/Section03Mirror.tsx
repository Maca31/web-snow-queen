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

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
        },
      });
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
          className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #08031a, #140630, #06021a)' }}
        >
          <ParallaxBg
            imageSrc="/images/story/SECCION3.png"
            imageAlt="El espejo maldito"
            imageOpacity={0.4}
            parallaxSpeed={0.1}
          />
          <StoryCard
            chapter="Capítulo II"
            title="El Espejo Maldito"
            body="Un duende malvado creó un espejo terrible. Quien se miraba en él solo veía lo feo del mundo. Lo lanzó al cielo… y se rompió en millones de fragmentos."
            variant="dark"
          />
        </div>

        {/* Panel B: The Shard */}
        <div
          className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #150828, #0a0420, #040210)' }}
        >
          <ParallaxBg
            videoSrc="/images/story/ESPEJO ROTO.mp4"
            imageAlt="Los fragmentos del espejo"
            imageOpacity={0.35}
          />
          <StoryCard
            chapter="Capítulo II (cont.)"
            title="Los Fragmentos Malvados"
            body="Uno de esos pedacitos cayó en el ojo de Kay. Y desde ese momento, su corazón comenzó a enfriarse."
            variant="dark"
          />
        </div>
      </div>
    </div>
  );
}
