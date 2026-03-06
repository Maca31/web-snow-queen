'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section11Palace() {
  return (
    <SectionWrapper
      id="section-11-palace"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo X"
        title="El Palacio de Hielo"
        body="Al fin llegaron. El palacio brillaba como un diamante helado. Todo era frío, silencioso y enorme."
        body2="La Reina no estaba… pero Kay sí."
        variant="dark"
      />
    </SectionWrapper>
  );
}
