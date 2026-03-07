'use client';

import { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionWrapper } from './SectionWrapper';
import { useGyroscope } from '@/lib/useGyroscope';

gsap.registerPlugin(ScrollTrigger);

export function Section01Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const queenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const gyro = useGyroscope();

  // ── Master timeline: 8-step cinematic intro ──
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const aurora = auroraRef.current;
    const queen = queenRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const scrollHint = scrollHintRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !aurora || !queen || !canvas || !overlay || !scrollHint || !subtitle) return;

    const letters = titleRef.current?.querySelectorAll<HTMLSpanElement>('[data-letter]');
    const tagline = section.querySelector<HTMLParagraphElement>('.text-xs.uppercase');
    const alreadyPlayed = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('heroPlayed') === '1';

    if (alreadyPlayed) {
      // Skip to final state
      gsap.set(overlay, { opacity: 0, display: 'none' });
      gsap.set(aurora, { opacity: 1, scale: 1 });
      gsap.set(queen, { clipPath: 'inset(0% 0 0 0)' });
      if (letters) gsap.set(letters, { opacity: 1, y: 0, rotateZ: 0, filter: 'blur(0px)' });
      if (tagline) gsap.set(tagline, { opacity: 1 });
      gsap.set(subtitle, { opacity: 1 });
      gsap.set(scrollHint, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem('heroPlayed', '1'); } catch {}
      }
    });

    // Step 1: Black void (0 - 0.5s) — overlay stays black
    tl.to({}, { duration: 0.5 });

    // Step 2: Single snowflake falls (handled by canvas — see useEffect below)
    // We just wait for its duration here
    tl.to({}, { duration: 1.5 }, 'snowflake');

    // Step 3: Aurora explosion (starts at 2.0s)
    tl.to(overlay, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 2.0);
    tl.fromTo(aurora,
      { opacity: 0, scale: 0, transformOrigin: '50% 100%' },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.2)' },
      2.0
    );

    // Step 4: Title crystallizes (starts at 3.0s)
    if (tagline) {
      tl.to(tagline, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 3.0);
    }
    if (letters && letters.length > 0) {
      tl.fromTo(letters,
        { opacity: 0, y: 80, rotateZ: (i: number) => (i % 2 === 0 ? -15 : 15), filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, rotateZ: 0, filter: 'blur(0px)',
          duration: 1.2, ease: 'elastic.out(1, 0.7)',
          stagger: { each: 0.06, from: 'center' }
        },
        3.0
      );
    }

    // Step 5: Queen silhouette (starts at 3.8s)
    tl.to(queen, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power2.inOut'
    }, 3.8);

    // Step 4b: Subtitle fades in
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 4.2);

    // Step 7: Scroll indicator fades in
    tl.to(scrollHint, { opacity: 1, duration: 0.6, ease: 'power2.out' }, 4.5);

    return () => { tl.kill(); };
  }, []);

  // ── Canvas: intro snowflake + ambient snow + cursor particles ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const alreadyPlayed = sessionStorage.getItem('heroPlayed') === '1';

    // ── Intro snowflake (step 2) ──
    const introFlake = {
      x: canvas.width / 2 + (Math.random() - 0.5) * 100,
      y: -20,
      targetY: canvas.height / 2,
      size: 4,
      active: !alreadyPlayed,
      landed: false,
      alpha: 1,
    };

    // ── Ambient snowflakes ──
    type Snowflake = { x: number; y: number; vx: number; vy: number; size: number; alpha: number };
    const FLAKE_COUNT = 100;
    const ambientFlakes: Snowflake[] = [];
    let ambientActive = alreadyPlayed;

    const spawnAmbient = () => {
      for (let i = 0; i < FLAKE_COUNT; i++) {
        ambientFlakes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: Math.random() * 1.0 + 0.3,
          size: Math.random() * 2.5 + 0.8,
          alpha: Math.random() * 0.5 + 0.3,
        });
      }
    };
    if (alreadyPlayed) spawnAmbient();

    // ── Cursor particles (step 8) ──
    type Particle = { x: number; y: number; vx: number; vy: number; size: number; life: number; maxLife: number };
    const cursorParticles: Particle[] = [];
    let cursorActive = alreadyPlayed;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cursorActive) return;
      for (let i = 0; i < 2; i++) {
        cursorParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * -2 - 0.5,
          size: Math.random() * 2 + 1,
          life: 0,
          maxLife: 40 + Math.random() * 20,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ── Timing: activate ambient + cursor after intro ──
    let activateTimer: ReturnType<typeof setTimeout> | undefined;
    if (!alreadyPlayed) {
      activateTimer = setTimeout(() => {
        ambientActive = true;
        cursorActive = true;
        spawnAmbient();
      }, 2500);
    }

    // ── Render loop ──
    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Intro snowflake
      if (introFlake.active && !introFlake.landed) {
        introFlake.y += 1.5;
        if (introFlake.y >= introFlake.targetY) {
          introFlake.landed = true;
          introFlake.y = introFlake.targetY;
        }
        const grad = ctx.createRadialGradient(introFlake.x, introFlake.y, 0, introFlake.x, introFlake.y, introFlake.size * 3);
        grad.addColorStop(0, 'rgba(255,255,255,0.95)');
        grad.addColorStop(0.5, 'rgba(200,230,255,0.4)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(introFlake.x, introFlake.y, introFlake.size * 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ambient snowflakes
      if (ambientActive) {
        ambientFlakes.forEach(f => {
          f.x += f.vx;
          f.y += f.vy;
          if (f.y > canvas.height) { f.y = -10; f.x = Math.random() * canvas.width; }
          if (f.x > canvas.width) f.x = 0;
          else if (f.x < 0) f.x = canvas.width;

          const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size * 2);
          g.addColorStop(0, `rgba(255,255,255,${f.alpha})`);
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.size * 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Cursor particles
      for (let i = cursorParticles.length - 1; i >= 0; i--) {
        const p = cursorParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.02;
        p.life++;
        const alpha = 1 - (p.life / p.maxLife);
        if (p.life >= p.maxLife) {
          cursorParticles.splice(i, 1);
          continue;
        }
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, `rgba(200,230,255,${alpha * 0.8})`);
        g.addColorStop(1, `rgba(255,255,255,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (activateTimer) clearTimeout(activateTimer);
    };
  }, []);

  // ── Aurora parallax follows cursor/gyroscope (step 6) ──
  useEffect(() => {
    const aurora = auroraRef.current;
    if (!aurora) return;

    const quickX = gsap.quickTo(aurora, 'x', { duration: 0.6, ease: 'power2.out' });
    const quickY = gsap.quickTo(aurora, 'y', { duration: 0.6, ease: 'power2.out' });

    let animId: number;
    const update = () => {
      quickX(gyro.current.x * 30);
      quickY(gyro.current.y * 15);
      animId = requestAnimationFrame(update);
    };
    animId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animId);
  }, [gyro]);

  const renderTitle = () => {
    const text = 'LA REINA DE LAS NIEVES';
    return text.split('').map((char, index) => {
      if (char === ' ') {
        return (
          <span key={`space-${index}`} className="inline-block w-2" aria-hidden>
            &nbsp;
          </span>
        );
      }
      return (
        <span
          key={`${char}-${index}`}
          data-letter
          className="inline-block origin-bottom drop-shadow-[0_0_25px_rgba(248,250,252,0.9)]"
          style={{ opacity: 0 }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <SectionWrapper
      id="section-01-hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Layer 1: Dark void overlay — starts fully black, fades out after aurora */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[50] bg-black"
      />

      {/* Layer 2: Aurora SVG — initially invisible, scales up from center */}
      <div
        ref={auroraRef}
        className="pointer-events-none absolute left-[-20%] top-0 z-[2] h-[55%] w-[140%]"
        style={{ opacity: 0, transform: 'scale(0)' }}
      >
        <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <radialGradient id="hero-ag1" cx="50%" cy="60%">
              <stop offset="0%" stopColor="rgba(80,200,255,0.22)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="hero-ag2" cx="30%" cy="70%">
              <stop offset="0%" stopColor="rgba(80,255,180,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="hero-ag3" cx="70%" cy="60%">
              <stop offset="0%" stopColor="rgba(180,80,255,0.10)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <ellipse cx="720" cy="280" rx="800" ry="280" fill="url(#hero-ag1)" />
          <ellipse cx="400" cy="300" rx="500" ry="200" fill="url(#hero-ag2)" />
          <ellipse cx="1050" cy="290" rx="500" ry="200" fill="url(#hero-ag3)" />
        </svg>
      </div>

      {/* Layer 3: Queen silhouette — clip-path reveal bottom-to-top */}
      <div
        ref={queenRef}
        className="pointer-events-none absolute inset-0 z-[3] flex items-center justify-center"
        style={{ clipPath: 'inset(100% 0 0 0)' }}
      >
        <div className="relative h-[70vh] w-[40vw] max-w-[400px]">
          <Image
            src="/images/characters/1772545519943d__1___2_-removebg-preview.png"
            alt=""
            fill
            sizes="40vw"
            className="object-contain"
            style={{ filter: 'brightness(0.12) saturate(0)', opacity: 0.6 }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Layer 4: Canvas — intro snowflake + ambient snow + cursor particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      />

      {/* Layer 5: Central glow */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,_rgba(248,250,252,0.16),_transparent_55%)]" />

      {/* Layer 6: Content */}
      <div className="relative z-30 flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-sky-200/80" style={{ opacity: 0 }}>
          Un cuento de invierno
        </p>

        <h1
          ref={titleRef}
          className="text-balance text-4xl font-semibold leading-tight text-sky-50 md:text-6xl"
        >
          {renderTitle()}
        </h1>

        <p
          ref={subtitleRef}
          className="max-w-2xl text-balance text-sm text-slate-200/90 md:text-lg"
          style={{ opacity: 0 }}
        >
          Una experiencia cinematográfica interactiva inspirada en el cuento de
          Hans Christian Andersen. Desplázate para volar entre luces del norte,
          espejos rotos y palacios de hielo.
        </p>
      </div>

      {/* Layer 7: Scroll indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-xs tracking-widest text-sky-200/70">
          Desliza para comenzar
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-bounce text-sky-200/70">
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </SectionWrapper>
  );
}
