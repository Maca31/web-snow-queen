'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section10Storm() {
  return (
    <SectionWrapper
      id="section-10-storm"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/NIEVE.mp4"
        imageAlt="Tormenta de nieve"
        imageOpacity={0.45}
        parallaxSpeed={0.25}
      />
      <StoryCard
        chapter="Capítulo IX"
        title="La Tormenta"
        body="El reno corrió por la nieve con Gerda en su lomo. La tormenta era terrible, pero Gerda no tenía miedo."
        body2="Su amor por Kay la hacía más fuerte que el viento."
        variant="dark"
      />
    </SectionWrapper>
  );
}
