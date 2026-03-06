'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section04IceHeart() {
  return (
    <SectionWrapper
      id="section-04-ice-heart"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/SECCION4.mp4"
        imageAlt="Kay transformándose por el hielo"
        imageOpacity={0.5}
        parallaxSpeed={0.15}
      />
      <StoryCard
        chapter="Capítulo III"
        title="El Corazón de Hielo"
        body="Con el fragmento en el ojo, Kay ya no veía la belleza. Las flores le parecían aburridas. La nieve, perfecta. Gerda le pareció tonta."
        body2="Su corazón se fue enfriando poco a poco… como el invierno que tanto amaba."
        variant="dark"
      />
    </SectionWrapper>
  );
}
