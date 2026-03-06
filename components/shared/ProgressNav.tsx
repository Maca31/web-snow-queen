'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  'section-01-hero',
  'section-02-village',
  'section-03-mirror',
  'section-04-ice-heart',
  'section-05-queen',
  'section-06-search',
  'section-07-garden',
  'section-08-crow',
  'section-09-robber',
  'section-10-storm',
  'section-11-palace',
  'section-12-prisoner',
  'section-13-tears',
  'section-14-finale',
];

export function ProgressNav() {
  const [active, setActive] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers = SECTION_IDS.map((id, index) => {
      return ScrollTrigger.create({
        trigger: `#${id}`,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActive(index),
        onEnterBack: () => setActive(index),
      });
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  const scrollToSection = (index: number) => {
    const el = document.getElementById(SECTION_IDS[index]);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed right-4 top-1/2 z-[500] flex -translate-y-1/2 flex-col items-center gap-2.5 md:right-7"
    >
      {SECTION_IDS.map((_, i) => (
        <button
          key={i}
          onClick={() => scrollToSection(i)}
          aria-label={`Ir a sección ${i + 1}`}
          className={`rounded-full border transition-all duration-400 ${
            active === i
              ? 'h-5 w-[7px] border-sky-300/60 bg-sky-300 shadow-[0_0_10px_rgba(158,212,240,0.6)]'
              : 'h-[5px] w-[5px] border-white/12 bg-white/20 hover:bg-white/50'
          }`}
          style={{ cursor: 'pointer', minWidth: 'auto', minHeight: 'auto' }}
        />
      ))}
    </nav>
  );
}
