'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section03Mirror() {
  return (
    <SectionWrapper
      id="section-03-mirror"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/SECCION3.png"
        imageAlt="El espejo maldito rompiéndose"
        imageOpacity={0.5}
        parallaxSpeed={0.15}
      />
      <StoryCard
        chapter="Capítulo II"
        title="El Espejo Maldito"
        body="Un duende malvado creó un espejo terrible. Quien se miraba en él solo veía lo feo del mundo. Lo lanzó al cielo… y se rompió en millones de fragmentos."
        body2="Uno de esos pedacitos cayó en el ojo de Kay. Y desde ese momento, su corazón comenzó a enfriarse."
        variant="dark"
      />
    </SectionWrapper>
  );
}
