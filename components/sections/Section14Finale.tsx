'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section14Finale() {
  return (
    <SectionWrapper
      id="section-14-finale"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo XIII"
        title="Final Feliz"
        body="Volvieron a casa tomados de la mano. Las rosas del jardín florecieron. El invierno se fue."
        body2="Y el amor, como siempre, venció al frío."
        variant="light"
      />

      <p
        className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 text-4xl font-light italic text-amber-700/70 md:text-6xl"
        style={{ fontFamily: 'var(--font-title)', textShadow: '0 0 40px rgba(245,158,11,0.4)' }}
      >
        Fin
      </p>
    </SectionWrapper>
  );
}
