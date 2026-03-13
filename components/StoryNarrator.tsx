'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { NARRATIONS, getLatinoVoice, VOICE_CONFIG } from './NARRATIONS_COMPLETE';

const SECTION_IDS = Object.keys(NARRATIONS);

// ─────────────────────────────────────────────
// HOOK — Web Speech API
// ─────────────────────────────────────────────
function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setIsSupported(true);

    const pickVoice = () => {
      voiceRef.current = getLatinoVoice();
      if (voiceRef.current) {
        console.log('[Narrador] Voz seleccionada:', voiceRef.current.name, voiceRef.current.lang);
      }
      const voices = window.speechSynthesis.getVoices();
      const esVoices = voices.filter(v => v.lang.startsWith('es'));
      console.log('[Narrador] Voces ES disponibles:', esVoices.map(v => `${v.name} (${v.lang})`).join(', '));
    };

    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_CONFIG.lang;
    utterance.rate = VOICE_CONFIG.rate;
    utterance.pitch = VOICE_CONFIG.pitch;
    utterance.volume = VOICE_CONFIG.volume;

    if (voiceRef.current) utterance.voice = voiceRef.current;

    utterance.onstart = () => { setIsPlaying(true); setIsPaused(false); };
    utterance.onend = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onerror = () => { setIsPlaying(false); setIsPaused(false); };
    utterance.onpause = () => setIsPaused(true);
    utterance.onresume = () => setIsPaused(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  return { speak, pause, resume, stop, isPlaying, isPaused, isSupported };
}

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL — StoryNarrator
// ─────────────────────────────────────────────
export function StoryNarrator() {
  const { speak, pause, resume, stop, isPlaying, isPaused, isSupported } = useSpeech();
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0]);
  const prevSectionRef = useRef(SECTION_IDS[0]);
  const rafRef = useRef<number>(0);

  // Detección de sección activa via scroll + getBoundingClientRect
  // (mismo approach que Narrator.tsx — funciona con secciones pinneadas de GSAP)
  useEffect(() => {
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
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          const sectionCenter = (rect.top + rect.bottom) / 2;
          const dist = Math.abs(sectionCenter - viewportCenter);
          if (dist < closestDist) {
            closestDist = dist;
            closest = id;
          }
        }
      }

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

      if (closest) setActiveSection(closest);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(checkActiveSection);
    };

    checkActiveSection();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Auto-stop cuando cambia de sección
  useEffect(() => {
    if (activeSection !== prevSectionRef.current) {
      if (isPlaying || isPaused) stop();
      prevSectionRef.current = activeSection;
    }
  }, [activeSection, isPlaying, isPaused, stop]);

  const narration = NARRATIONS[activeSection];

  const handlePlay = useCallback(() => {
    if (!narration) return;
    if (isPaused) {
      resume();
    } else {
      speak(narration.text);
    }
  }, [narration, isPaused, resume, speak]);

  if (!isSupported) return null;

  return (
    <>
      <div
        className="fixed bottom-6 right-6 z-[500] flex flex-col items-end gap-3"
        style={{ fontFamily: 'var(--font-kids, sans-serif)' }}
      >
        {/* Panel expandido */}
        {isExpanded && narration && (
          <div
            className="flex flex-col gap-3 rounded-2xl p-4 shadow-2xl"
            style={{
              background: 'rgba(2, 11, 36, 0.92)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(186,230,253,0.2)',
              width: 'clamp(260px, 30vw, 340px)',
              animation: 'narratorSlideIn 0.3s ease',
            }}
          >
            {/* Título del capítulo */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="mb-1 text-xs uppercase tracking-widest text-sky-400/70">
                  Narrando ahora
                </p>
                <p
                  className="font-semibold leading-tight text-sky-100"
                  style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)' }}
                >
                  {narration.title}
                </p>
              </div>
              {/* Indicador de onda cuando reproduce */}
              {isPlaying && !isPaused && (
                <div className="mt-1 flex h-6 shrink-0 items-end gap-0.5">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-sky-400"
                      style={{
                        animation: `soundWave 0.8s ease-in-out ${i * 0.15}s infinite`,
                        height: `${8 + i * 4}px`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Preview del texto */}
            <p
              className="line-clamp-3 leading-relaxed text-sky-200/60"
              style={{ fontSize: '0.7rem' }}
            >
              {narration.text.trim().substring(0, 120)}...
            </p>

            {/* Controles */}
            <div className="flex items-center gap-2">
              {/* Play / Pause */}
              <button
                onClick={isPlaying && !isPaused ? pause : handlePlay}
                className="flex items-center justify-center rounded-xl text-white transition-all active:scale-95"
                style={{
                  background: isPlaying && !isPaused
                    ? 'rgba(56,189,248,0.3)'
                    : 'linear-gradient(135deg, rgba(56,189,248,0.4), rgba(99,102,241,0.4))',
                  border: '1px solid rgba(186,230,253,0.3)',
                  width: 44,
                  height: 44,
                  fontSize: '1.1rem',
                  flexShrink: 0,
                }}
                aria-label={isPlaying && !isPaused ? 'Pausar narración' : 'Reproducir narración'}
              >
                {isPlaying && !isPaused ? '⏸' : '▶'}
              </button>

              {/* Stop */}
              {(isPlaying || isPaused) && (
                <button
                  onClick={stop}
                  className="flex items-center justify-center rounded-xl text-sky-300/70 transition-all hover:text-sky-300 active:scale-95"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(186,230,253,0.15)',
                    width: 36,
                    height: 36,
                    fontSize: '0.9rem',
                  }}
                  aria-label="Detener narración"
                >
                  ⏹
                </button>
              )}

              {/* Estado */}
              <p className="ml-1 text-xs text-sky-300/50">
                {isPlaying && !isPaused
                  ? 'Reproduciendo...'
                  : isPaused
                  ? 'En pausa'
                  : 'Listo para narrar'}
              </p>
            </div>

            <p className="text-center text-sky-400/30" style={{ fontSize: '0.6rem' }}>
              La voz varía según tu navegador
            </p>
          </div>
        )}

        {/* Botón principal */}
        <button
          onClick={() => setIsExpanded(prev => !prev)}
          className="relative flex items-center justify-center rounded-full text-white shadow-2xl transition-all hover:scale-110 active:scale-95"
          style={{
            width: 56,
            height: 56,
            background: isPlaying
              ? 'linear-gradient(135deg, #0ea5e9, #6366f1)'
              : 'linear-gradient(135deg, rgba(14,165,233,0.7), rgba(99,102,241,0.7))',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(186,230,253,0.4)',
            boxShadow: isPlaying
              ? '0 0 30px rgba(56,189,248,0.5), 0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(0,0,0,0.4)',
            animation: isPlaying ? 'narratorPulse 2s ease-in-out infinite' : 'none',
            fontSize: '1.4rem',
          }}
          aria-label="Narrador del cuento"
        >
          🎙️
          {isPlaying && (
            <span
              className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-white"
              style={{ fontSize: '0.5rem', fontWeight: 'bold' }}
            >
              ▶
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes narratorSlideIn {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes narratorPulse {
          0%, 100% { box-shadow: 0 0 30px rgba(56,189,248,0.5), 0 8px 32px rgba(0,0,0,0.4); }
          50%       { box-shadow: 0 0 50px rgba(56,189,248,0.8), 0 8px 32px rgba(0,0,0,0.4); }
        }
        @keyframes soundWave {
          0%, 100% { transform: scaleY(0.4); opacity: 0.5; }
          50%       { transform: scaleY(1);   opacity: 1;   }
        }
      `}</style>
    </>
  );
}
