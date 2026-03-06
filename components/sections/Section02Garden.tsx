'use client';

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "./SectionWrapper";
import { NarratorBubble, DialogBubble } from "../StoryBubbles";

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
  const size = 8 + Math.random() * 10;

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

      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: -30 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      }

      if (gerdaRef.current) {
        gsap.fromTo(gerdaRef.current,
          { x: -120, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
        gsap.to(gerdaRef.current, {
          y: -8,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.2,
        });
      }

      if (kayRef.current) {
        gsap.fromTo(kayRef.current,
          { x: 120, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)',
            delay: 0.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            }
          }
        );
        gsap.to(kayRef.current, {
          y: -6,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.4,
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
      {/* Fondo: cielo celeste pastel con degradado */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to bottom, #87CEEB 0%, #D6EAF8 40%, #E8F5E9 70%, #C8E6C9 100%)',
        }}
      />

      {/* Imagen de fondo del jardín */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/story/scene-03-garden-happiness.webp"
          alt="Jardín de flores en primavera"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </div>

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
      <h2
        ref={titleRef}
        className="absolute top-6 left-1/2 z-40 -translate-x-1/2 text-center opacity-0"
        style={{
          fontFamily: "var(--font-title)",
          fontSize: 'clamp(1.2rem, 3vw, 2rem)',
          color: '#5D4037',
          textShadow: '0 2px 8px rgba(255,255,255,0.8)',
          whiteSpace: 'nowrap',
        }}
      >
        🌸 El Jardín Feliz 🌸
      </h2>

      {/* Contenido central: personajes */}
      <div className="relative z-30 flex w-full max-w-5xl items-end justify-center gap-8 px-6 pb-32 md:gap-24">

        {/* GERDA */}
        <div ref={gerdaRef} className="flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <DialogBubble
            character="Gerda"
            variant="gerda"
            text="¡Kay, mira qué bonitas son las rosas hoy! 🌹"
            side="left"
            delay={1.5}
          />
          <div
            className="relative"
            style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}
          >
            <Image
              src="/images/characters/transparent/gerda-01-standing-happy.webp"
              alt="Gerda sonriendo"
              fill
              sizes="(max-width: 768px) 80px, 160px"
              className="object-contain drop-shadow-lg"
            />
          </div>
          <p
            className="rounded-full bg-rose-200/80 px-3 py-1 text-xs font-bold text-rose-700"
            style={{ fontFamily: "var(--font-kids)" }}
          >
            Gerda 👧
          </p>
        </div>

        {/* KAY */}
        <div ref={kayRef} className="flex flex-col items-center gap-3" style={{ opacity: 0 }}>
          <DialogBubble
            character="Kay"
            variant="kay"
            text="¡Son las más bonitas del mundo entero! 🌟"
            side="right"
            delay={2.2}
          />
          <div
            className="relative"
            style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}
          >
            <Image
              src="/images/characters/transparent/kay-normal-02-laughing-playing.webp"
              alt="Kay sonriendo"
              fill
              sizes="(max-width: 768px) 80px, 160px"
              className="object-contain drop-shadow-lg"
            />
          </div>
          <p
            className="rounded-full bg-sky-200/80 px-3 py-1 text-xs font-bold text-sky-700"
            style={{ fontFamily: "var(--font-kids)" }}
          >
            Kay 👦
          </p>
        </div>
      </div>

      {/* Rosas interactivas */}
      <div className="absolute inset-0 z-40">
        {rosePositions.map((pos, i) => (
          <InteractiveRose key={i} style={pos} delay={0.3 + i * 0.15} />
        ))}
      </div>

      {/* Narrador */}
      <NarratorBubble
        text="Gerda y Kay eran los mejores amigos del mundo. Cada día jugaban juntos en su jardín lleno de rosas coloridas y mariposas. ¡Era el lugar más feliz del mundo! 🌺"
        position="bottom"
        delay={0.8}
      />

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
