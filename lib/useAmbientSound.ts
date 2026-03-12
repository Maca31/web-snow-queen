'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Plays an ambient sound loop when the section is in view,
 * fading in/out smoothly with ScrollTrigger.
 */
export function useAmbientSound(
  sectionRef: React.RefObject<HTMLElement | null>,
  src: string,
  { volume = 0.3, fadeIn = 1.5, fadeOut = 1 } = {}
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objRef = useRef({ vol: 0 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;

    const obj = objRef.current;
    obj.vol = 0;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        audio.play().catch(() => {});
        gsap.to(obj, {
          vol: volume,
          duration: fadeIn,
          ease: 'power2.out',
          onUpdate: () => { audio.volume = obj.vol; },
        });
      },
      onLeave: () => {
        gsap.to(obj, {
          vol: 0,
          duration: fadeOut,
          ease: 'power2.in',
          onUpdate: () => { audio.volume = obj.vol; },
          onComplete: () => { audio.pause(); },
        });
      },
      onEnterBack: () => {
        audio.play().catch(() => {});
        gsap.to(obj, {
          vol: volume,
          duration: fadeIn,
          ease: 'power2.out',
          onUpdate: () => { audio.volume = obj.vol; },
        });
      },
      onLeaveBack: () => {
        gsap.to(obj, {
          vol: 0,
          duration: fadeOut,
          ease: 'power2.in',
          onUpdate: () => { audio.volume = obj.vol; },
          onComplete: () => { audio.pause(); },
        });
      },
    });

    return () => {
      st.kill();
      gsap.killTweensOf(obj);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [sectionRef, src, volume, fadeIn, fadeOut]);
}
