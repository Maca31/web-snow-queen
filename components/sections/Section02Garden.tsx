'use client';

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "./SectionWrapper";

import { ParallaxBg } from "../shared/ParallaxBg";
import { StoryCard } from "../shared/StoryCard";
import { useAmbientSound } from "@/lib/useAmbientSound";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// PÉTALO — elemento decorativo animado
// ─────────────────────────────────────────────
function Petal({ index }: { index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const startX = Math.random() * 100;
    const duration = 6 + Math.random() * 6;
    const delay = Math.random() * 4;

    gsap.set(el, { x: `${startX}vw`, y: '-5vh', opacity: 0, rotation: Math.random() * 360 });

    gsap.to(el, {
      y: '110vh',
      x: `+=${(Math.random() - 0.5) * 30}vw`,
      rotation: `+=${Math.random() * 720}`,
      opacity: 0.7,
      duration,
      delay,
      repeat: -1,
      ease: 'none',
      repeatDelay: Math.random() * 2,
    });
  }, []);

  const colors = ['#fda4af', '#f9a8d4', '#fbcfe8', '#fecdd3', '#fde68a'];
  const color = colors[index % colors.length];
  const size = 8 + ((index * 7 + 3) % 11);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute top-0 z-20"
      style={{
        width: size,
        height: size,
        borderRadius: '50% 0 50% 0',
        backgroundColor: color,
        opacity: 0,
        transform: 'rotate(45deg)',
      }}
    />
  );
}

// ─────────────────────────────────────────────
// ROSA INTERACTIVA
// ─────────────────────────────────────────────
function InteractiveRose({
  style,
  delay = 0,
}: {
  style: React.CSSProperties;
  delay?: number;
}) {
  const roseRef = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const el = roseRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, scale: 0, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(2)', delay }
    );

    gsap.to(el, {
      rotation: 4,
      duration: 2 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: delay + 0.8,
    });
  }, [delay]);

  const handleInteract = useCallback(() => {
    const el = roseRef.current;
    if (!el || isAnimating.current) return;

    isAnimating.current = true;

    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.6);
    } catch {
      // silently fail if audio not supported
    }

    gsap.timeline({
      onComplete: () => { isAnimating.current = false; }
    })
      .to(el, { scale: 1.5, rotation: 0, duration: 0.25, ease: 'back.out(3)' })
      .to(el, {
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.4)',
      })
      .call(() => {
        const hearts = ['\u2764\uFE0F', '\uD83C\uDF38', '\u2728'];
        hearts.forEach((h, i) => {
          const span = document.createElement('span');
          span.textContent = h;
          span.style.cssText = `
            position:absolute; font-size:16px; pointer-events:none;
            left:50%; top:0; transform:translateX(-50%);
            z-index:100;
          `;
          el.appendChild(span);
          gsap.to(span, {
            y: -60 - i * 20,
            x: (i - 1) * 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            delay: i * 0.1,
            onComplete: () => span.remove(),
          });
        });
      }, [], '-=0.3');
  }, []);

  return (
    <div
      ref={roseRef}
      className="absolute cursor-pointer select-none"
      style={{ ...style, opacity: 0, fontSize: '3rem' }}
      onClick={handleInteract}
      onTouchStart={handleInteract}
      role="button"
      aria-label="Toca la rosa"
      title="¡Tócame!"
    >
      🌹
      <div
        className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-300"
        style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) infinite' }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// SECCIÓN PRINCIPAL
// ─────────────────────────────────────────────
export function Section02Garden() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gerdaRef = useRef<HTMLDivElement | null>(null);
  const kayRef = useRef<HTMLDivElement | null>(null);
  const sunRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useAmbientSound(sectionRef, '/freesound_community-bosque-con-abejas-78867.mp3');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      if (sunRef.current) {
        gsap.to(sunRef.current, {
          scale: 1.08,
          opacity: 0.85,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Título: aparece con scroll
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: -40 },
          {
            opacity: 1, y: 0, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              end: 'top 40%',
              scrub: 0.8,
            }
          }
        );
      }

      // Gerda: entra desde la izquierda con el scroll
      if (gerdaRef.current) {
        gsap.fromTo(gerdaRef.current,
          { x: -200, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 0.8,
            }
          }
        );
        // Floating idle después de entrar
        ScrollTrigger.create({
          trigger: section,
          start: 'top 30%',
          onEnter: () => {
            gsap.to(gerdaRef.current, {
              y: -8, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
          },
        });
      }

      // Kay: entra desde la derecha con el scroll
      if (kayRef.current) {
        gsap.fromTo(kayRef.current,
          { x: 200, opacity: 0 },
          {
            x: 0, opacity: 1, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              end: 'top 30%',
              scrub: 0.8,
            }
          }
        );
        // Floating idle después de entrar
        ScrollTrigger.create({
          trigger: section,
          start: 'top 30%',
          onEnter: () => {
            gsap.to(kayRef.current, {
              y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut',
            });
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const rosePositions: React.CSSProperties[] = [
    { left: '5%',  bottom: '15%' },
    { left: '12%', bottom: '25%' },
    { left: '20%', bottom: '10%' },
    { right: '5%', bottom: '15%' },
    { right: '12%', bottom: '25%' },
    { right: '20%', bottom: '10%' },
    { left: '45%', bottom: '8%' },
  ];

  return (
    <SectionWrapper
      id="section-02-village"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      {/* Fondo: imagen parallax del jardín */}
      <ParallaxBg
        imageSrc="/images/story/JARDINGERDAYKAY.png"
        imageAlt="Jardín de Gerda y Kay"
        imageOpacity={1}
        parallaxSpeed={0.15}
      />

      {/* Sol */}
      <div
        ref={sunRef}
        className="pointer-events-none absolute z-10"
        style={{ top: '8%', left: '50%', transform: 'translateX(-50%)' }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFD700, #FFA500)',
            boxShadow: '0 0 40px 20px rgba(255,215,0,0.4)',
          }}
        />
      </div>

      {/* Pétalos cayendo */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <Petal key={i} index={i} />
        ))}
      </div>

      {/* Título */}
      <div
        ref={titleRef}
        className="absolute top-[5%] left-[38%] z-40 opacity-0"
      >
        <StoryCard
          chapter="Capítulo I"
          title="El Jardín Feliz"
          body="Gerda y Kay eran los mejores amigos del mundo. Cada día jugaban juntos en su jardín lleno de rosas coloridas y mariposas."
          variant="light"
        />
      </div>

      {/* GERDA — izquierda */}
      <div ref={gerdaRef} className="absolute bottom-[3%] left-[29%] z-30 flex flex-col items-center gap-1.5">
        <div
          className="relative"
          style={{ width: 'clamp(100px, 18vw, 200px)', height: 'clamp(160px, 30vw, 320px)' }}
        >
          <Image
            src="/images/characters/gerda1-removebg-preview.png"
            alt="Gerda"
            fill
            sizes="(max-width: 768px) 100px, 200px"
            className="object-contain drop-shadow-lg"
          />
        </div>
        <p
          className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold text-rose-700"
          style={{
            fontFamily: "var(--font-kids)",
            background: 'rgba(255,228,230,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        >
          Gerda
        </p>
        <div
          className="max-w-[140px] rounded-lg px-2.5 py-1.5 md:max-w-[180px]"
          style={{
            background: 'rgba(255,228,230,0.75)',
            backdropFilter: 'blur(8px)',
            borderLeft: '2px solid rgba(244,114,182,0.4)',
          }}
        >
          <p
            className="text-center leading-snug text-rose-800"
            style={{ fontFamily: "var(--font-kids)", fontSize: 'clamp(0.55rem, 1.1vw, 0.7rem)' }}
          >
            ¡Kay, mira qué bonitas son las rosas hoy!
          </p>
        </div>
      </div>

      {/* KAY — centro-derecha */}
      <div ref={kayRef} className="absolute bottom-[3%] right-[27%] z-30 flex flex-col items-center gap-1.5">
        <div
          className="relative"
          style={{ width: 'clamp(100px, 18vw, 200px)', height: 'clamp(160px, 30vw, 320px)' }}
        >
          <Image
            src="/images/characters/KAY1-removebg-preview.png"
            alt="Kay"
            fill
            sizes="(max-width: 768px) 100px, 200px"
            className="object-contain drop-shadow-lg"
          />
        </div>
        <p
          className="rounded-full px-2.5 py-0.5 text-[0.6rem] font-semibold text-sky-700"
          style={{
            fontFamily: "var(--font-kids)",
            background: 'rgba(224,242,254,0.7)',
            backdropFilter: 'blur(4px)',
          }}
        >
          Kay
        </p>
        <div
          className="max-w-[140px] rounded-lg px-2.5 py-1.5 md:max-w-[180px]"
          style={{
            background: 'rgba(224,242,254,0.75)',
            backdropFilter: 'blur(8px)',
            borderLeft: '2px solid rgba(56,189,248,0.4)',
          }}
        >
          <p
            className="text-center leading-snug text-sky-800"
            style={{ fontFamily: "var(--font-kids)", fontSize: 'clamp(0.55rem, 1.1vw, 0.7rem)' }}
          >
            ¡Son las más bonitas del mundo entero!
          </p>
        </div>
      </div>

      {/* Rosas interactivas */}
      <div className="absolute inset-0 z-40">
        {rosePositions.map((pos, i) => (
          <InteractiveRose key={i} style={pos} delay={0.3 + i * 0.15} />
        ))}
      </div>


      {/* Hint táctil (solo móvil) */}
      <div
        className="pointer-events-none absolute bottom-36 left-1/2 z-50 -translate-x-1/2 md:hidden"
        style={{ animation: 'bounce 2s infinite' }}
      >
        <p
          className="rounded-full bg-white/70 px-4 py-2 text-xs text-rose-600 shadow"
          style={{ fontFamily: "var(--font-kids)" }}
        >
          👆 ¡Toca las rosas!
        </p>
      </div>
    </SectionWrapper>
  );
}
