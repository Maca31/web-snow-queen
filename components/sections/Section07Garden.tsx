'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section07Garden() {
  return (
    <SectionWrapper
      id="section-07-garden"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/JARDINGERDAYKAY.png"
        imageAlt="Jardín mágico con flores"
        imageOpacity={0.5}
        parallaxSpeed={0.15}
      />
      <StoryCard
        chapter="Capítulo VI"
        title="El Jardín Mágico"
        body="En el camino, Gerda encontró un jardín mágico. Una anciana amable la invitó a quedarse. Las flores cantaban historias… pero ninguna hablaba de Kay."
        variant="light"
      />
    </SectionWrapper>
  );
}
