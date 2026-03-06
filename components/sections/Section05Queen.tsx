'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section05Queen() {
  return (
    <SectionWrapper
      id="section-05-queen"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/SECCION5.png"
        videoSrc="/images/story/NIEVE.mp4"
        imageAlt="La Reina de las Nieves en su trineo"
        imageOpacity={0.55}
        parallaxSpeed={0.2}
      />
      <StoryCard
        chapter="Capítulo IV"
        title="La Reina de las Nieves"
        body="La Reina de las Nieves llegó en su trineo de cristal. Era bella y terrible. Se llevó a Kay entre la ventisca, hacia su palacio de hielo eterno."
        variant="dark"
      />
    </SectionWrapper>
  );
}
