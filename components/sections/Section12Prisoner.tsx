'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section12Prisoner() {
  return (
    <SectionWrapper
      id="section-12-prisoner"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo XI"
        title="El Prisionero de Hielo"
        body="Kay estaba sentado en el suelo de hielo, intentando formar la palabra 'ETERNIDAD' con pedazos de cristal."
        body2="No sentía frío. No sentía nada."
        variant="dark"
      />
    </SectionWrapper>
  );
}
