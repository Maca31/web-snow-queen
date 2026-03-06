'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section09Robber() {
  return (
    <SectionWrapper
      id="section-09-robber"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo VIII"
        title="La Niña Ladrona"
        body="Unos bandidos la atraparon en el bosque. Pero la hija de la jefa, una niña valiente y curiosa, se hizo su amiga."
        body2="'Te ayudaré', dijo. Y le dio su reno más fuerte para que la llevara al norte."
        variant="dark"
      />
    </SectionWrapper>
  );
}
