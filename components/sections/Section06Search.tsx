'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section06Search() {
  return (
    <SectionWrapper
      id="section-06-search"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/GERDACAMINANDO.mp4"
        imageAlt="Gerda caminando en la nieve"
        imageOpacity={0.5}
        parallaxSpeed={0.2}
      />
      <StoryCard
        chapter="Capítulo V"
        title="El Viaje de Gerda"
        body="Gerda no se rindió. Aunque todos decían que Kay se había ido para siempre, ella salió a buscarlo. El camino era largo y frío, pero su corazón estaba lleno de amor."
        variant="dark"
      />
    </SectionWrapper>
  );
}
