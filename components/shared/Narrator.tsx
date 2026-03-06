'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NARRATOR_LINES: Record<string, string> = {
  'section-01-hero':     '¡Hola! Soy Lumi ✨ Tu guía en este cuento mágico. ¡Desplázate para comenzar la aventura!',
  'section-02-village':  '¡Mira qué bonito pueblo! Aquí viven Kay y Gerda, los mejores amigos.',
  'section-03-mirror':   '¡Oh no! Ese espejo es muy peligroso... ¡Cuidado con los pedacitos!',
  'section-04-ice-heart':'Pobre Kay... algo cambió dentro de él. Su corazón se enfría.',
  'section-05-queen':    '¡La Reina de las Nieves! ¡Es bellísima pero muy fría!',
  'section-06-search':   '¡Gerda es tan valiente! Va a buscar a su amigo sin importar nada.',
  'section-07-garden':   '¡Qué jardín tan mágico! Pero Kay no está aquí...',
  'section-08-crow':     'El cuervo es muy listo. ¡Ayuda a Gerda a seguir buscando!',
  'section-09-robber':   'La niña ladrona tiene buen corazón. ¡Mira, le da su reno!',
  'section-10-storm':    '¡Vamos reno, corre! ¡La tormenta es terrible pero Gerda no se rinde!',
  'section-11-palace':   'El palacio brilla como un diamante... pero qué frío hace aquí.',
  'section-12-prisoner': 'Kay está ahí... pero no siente nada. ¡Ánimo Gerda!',
  'section-13-tears':    '¡Las lágrimas de Gerda son mágicas! ¡El amor lo puede todo! 💧',
  'section-14-finale':   '¡Final feliz! El amor siempre vence al frío. 🌸',
};

export function Narrator() {
  const [text, setText] = useState(NARRATOR_LINES['section-01-hero']);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const currentSection = useRef('section-01-hero');

  useEffect(() => {
    const sectionIds = Object.keys(NARRATOR_LINES);

    const triggers = sectionIds.map((id) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => updateText(id),
        onEnterBack: () => updateText(id),
      });
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const updateText = (sectionId: string) => {
    if (currentSection.current === sectionId) return;
    currentSection.current = sectionId;

    const bubble = bubbleRef.current;
    if (!bubble) {
      setText(NARRATOR_LINES[sectionId]);
      return;
    }

    gsap.to(bubble, {
      opacity: 0,
      y: 5,
      duration: 0.25,
      onComplete: () => {
        setText(NARRATOR_LINES[sectionId]);
        gsap.to(bubble, { opacity: 1, y: 0, duration: 0.3 });
      },
    });
  };

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-[400] flex w-full items-end gap-3 px-4 pb-4 md:px-8 md:pb-5"
    >
      <div
        className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14"
        style={{
          background: 'linear-gradient(135deg, #d4a843, #e8889a)',
          boxShadow: '0 0 20px rgba(212,168,67,0.45)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <span className="text-xl sm:text-2xl md:text-3xl">🦋</span>
      </div>

      <div
        ref={bubbleRef}
        className="max-w-[min(340px,58vw)] rounded-2xl rounded-bl-sm bg-white/95 px-3 py-2 text-xs font-bold leading-relaxed text-slate-700 shadow-lg sm:px-4 sm:py-2.5 sm:text-sm md:text-base"
        style={{ fontFamily: 'var(--font-kids)' }}
      >
        {text}
      </div>
    </div>
  );
}
