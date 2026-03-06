'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section13Tears() {
  return (
    <SectionWrapper
      id="section-13-tears"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo XII"
        title="Las Lágrimas Mágicas"
        body="Gerda corrió hacia Kay y lo abrazó. Lloró con todo su corazón. Sus lágrimas calientes cayeron sobre el pecho de Kay… y derritieron la astilla de hielo."
        body2="Kay parpadeó. Y recordó todo."
        variant="dark"
      />
    </SectionWrapper>
  );
}
