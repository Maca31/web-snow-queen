'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section08Crow() {
  return (
    <SectionWrapper
      id="section-08-crow"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo VII"
        title="El Cuervo Sabio"
        body="Un cuervo sabio le contó a Gerda sobre un príncipe que se parecía a Kay. Corrió al castillo… pero no era él."
        body2="La princesa, conmovida, le dio un abrigo cálido y un trineo dorado para que siguiera su camino."
        variant="dark"
      />
    </SectionWrapper>
  );
}
