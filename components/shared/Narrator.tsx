'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

const NARRATOR_LINES: Record<string, string> = {
  'section-01-hero':     '¡Hola! Soy Lumi ✨ Tu guía en este cuento mágico. ¡Desplázate para comenzar la aventura!',
  'section-02-village':  'Capítulo I — Kay y Gerda son los mejores amigos. ¡Juegan juntos en su jardín feliz!',
  'section-03-mirror':   'Capítulo II — ¡Oh no! Un duende creó un espejo terrible... ¡Cuidado con los pedacitos!',
  'section-04-ice-heart':'Capítulo III — Pobre Kay... un fragmento cayó en su ojo y su corazón se enfría.',
  'section-05-queen':    'Capítulo IV — ¡La Reina de las Nieves se lleva a Kay en su trineo de cristal!',
  'section-06-search':   'Capítulo V — ¡Gerda es tan valiente! Sale a buscar a Kay sin importar el frío.',
  'section-07-garden':   'Capítulo VI — Una anciana amable invita a Gerda a su jardín mágico... pero Kay no está aquí.',
  'section-08-crow':     'Capítulo VII — ¡Un cuervo muy listo ayuda a Gerda a seguir buscando a Kay!',
  'section-09-robber':   'Capítulo VIII — La niña ladrona tiene buen corazón. ¡Le da su reno a Gerda!',
  'section-10-storm':    'Capítulo IX — ¡Corre reno, corre! La tormenta es terrible pero Gerda no se rinde.',
  'section-11-palace':   'Capítulo X — El palacio de hielo brilla como un diamante... pero qué frío hace aquí.',
  'section-12-prisoner': 'Capítulo XI — Kay está atrapado en el hielo... no siente nada. ¡Ánimo Gerda!',
  'section-13-tears':    'Capítulo XII — ¡Las lágrimas de Gerda derriten el hielo! ¡El amor lo puede todo! 💧',
  'section-queen-defeated': 'Capítulo XIII — ¡La Reina siente el calor del amor! El palacio de hielo se derrite... ❄️',
  'section-14-finale':   '¡Final feliz! El amor de Gerda venció al frío. Kay y Gerda vuelven a casa juntos. 🌸',
};

const SECTION_IDS = Object.keys(NARRATOR_LINES);

export function Narrator() {
  const [text, setText] = useState(NARRATOR_LINES['section-01-hero']);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const currentSection = useRef('section-01-hero');
  const rafRef = useRef<number>(0);

  const updateText = useCallback((sectionId: string) => {
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
  }, []);

  useEffect(() => {
    // Collect all section elements once
    const sections: { id: string; el: HTMLElement }[] = [];
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) sections.push({ id, el });
    }

    if (sections.length === 0) return;

    const checkActiveSection = () => {
      const viewportCenter = window.innerHeight / 2;
      let closest: string | null = null;
      let closestDist = Infinity;

      for (const { id, el } of sections) {
        const rect = el.getBoundingClientRect();
        // Check if the section overlaps the viewport center
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          // Section contains the center — measure distance from section center to viewport center
          const sectionCenter = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(sectionCenter - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = id;
          }
        }
      }

      // If no section contains viewport center, find nearest one
      if (!closest) {
        for (const { id, el } of sections) {
          const rect = el.getBoundingClientRect();
          const sectionCenter = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(sectionCenter - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = id;
          }
        }
      }

      if (closest) {
        updateText(closest);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(checkActiveSection);
    };

    // Check on mount
    checkActiveSection();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateText]);

  return (
    <div
      className="pointer-events-none fixed bottom-0 left-0 z-[400] flex w-full items-end gap-2.5 px-4 pb-4 md:px-8 md:pb-5"
    >
      {/* Lumi snowflake icon */}
      <span
        className="mb-1 flex-shrink-0 text-sky-300"
        style={{
          fontSize: 'clamp(1.7rem, 3.6vw, 2rem)',
          filter: 'drop-shadow(0 0 4px rgba(125,211,252,0.5))',
          animation: 'softPulse 3s ease-in-out infinite',
        }}
      >
        ❄
      </span>

      {/* Speech bubble — dark translucent */}
      <div
        ref={bubbleRef}
        className="max-w-[min(340px,58vw)] rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5"
        style={{
          background: 'rgba(2,11,24,0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderLeft: '2px solid rgba(125,211,252,0.25)',
        }}
      >
        <p
          className="leading-relaxed"
          style={{
            fontFamily: 'var(--font-kids)',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
            color: 'rgba(186,230,253,0.85)',
            fontWeight: 500,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
