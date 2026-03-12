'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGyroscope } from '@/lib/useGyroscope';

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// TÍTULO — copos de nieve → letras
// ─────────────────────────────────────────────
function CrystalTitle({ visible }: { visible: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const animated = useRef(false);

  const line1 = 'LA REINA';
  const line2 = 'DE LAS NIEVES';

  useEffect(() => {
    if (!visible || !containerRef.current || animated.current) return;
    animated.current = true;

    const flakes = containerRef.current.querySelectorAll('[data-flake]');
    const letters = containerRef.current.querySelectorAll('[data-letter]');

    const tl = gsap.timeline();

    // Phase 1: snowflakes fall into each letter position
    tl.fromTo(flakes,
      { opacity: 0, y: -60, scale: 0, rotation: 0 },
      {
        opacity: 1, y: 0, scale: 1, rotation: 360,
        duration: 0.5, ease: 'back.out(1.5)',
        stagger: { each: 0.06, from: 'start' },
      }
    );

    // Hold snowflakes visible
    tl.to({}, { duration: 0.5 });

    // Phase 2: snowflakes spin away, letters crystallize in
    tl.to(flakes, {
      opacity: 0, scale: 0, rotation: 720, filter: 'blur(6px)',
      duration: 0.35, ease: 'power2.in',
      stagger: { each: 0.03, from: 'center' },
    });

    tl.fromTo(letters,
      { opacity: 0, scale: 0.3, filter: 'blur(12px) brightness(3)' },
      {
        opacity: 1, scale: 1, filter: 'blur(0px) brightness(1)',
        duration: 0.5, ease: 'back.out(2)',
        stagger: { each: 0.04, from: 'center' },
      },
      '-=0.25'
    );
  }, [visible]);

  const renderLine = (text: string, lineOffset: number) =>
    text.split('').map((char, i) => {
      const globalIndex = lineOffset + i;
      if (char === ' ') return <span key={`sp-${globalIndex}`} className="inline-block w-4 md:w-7" />;
      return (
        <span
          key={`l-${globalIndex}`}
          className="relative inline-block cursor-default select-none"
          onMouseEnter={() => setHovered(globalIndex)}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Snowflake — positioned over letter */}
          <span
            data-flake
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-sky-300"
            style={{
              opacity: 0,
              fontSize: '0.6em',
              filter: 'drop-shadow(0 0 10px rgba(186,230,253,0.9))',
            }}
            aria-hidden="true"
          >
            ❄
          </span>
          {/* Actual letter */}
          <span
            data-letter
            style={{
              opacity: 0,
              display: 'inline-block',
              transformOrigin: 'center bottom',
              textShadow: hovered === globalIndex
                ? '0 0 40px rgba(186,230,253,1), 0 0 80px rgba(186,230,253,0.6)'
                : '0 0 20px rgba(186,230,253,0.5)',
              transition: 'text-shadow 0.2s, transform 0.2s',
              transform: hovered === globalIndex ? 'scale(1.3) translateY(-4px)' : 'scale(1)',
            }}
          >
            {char}
          </span>
        </span>
      );
    });

  return (
    <div ref={containerRef} className="relative z-40 flex flex-col items-center" style={{ gap: 0 }}>
      <div className="mb-2 flex items-center gap-3 opacity-60">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-sky-300 md:w-24" />
        <span className="text-sky-300" style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)', letterSpacing: '0.5em' }}>
          UN CUENTO DE INVIERNO
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-sky-300 md:w-24" />
      </div>

      <h1
        className="font-bold tracking-widest text-sky-50"
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(8rem, 32vw, 24rem)',
          lineHeight: 0.8,
          letterSpacing: '0.06em',
        }}
      >
        {renderLine(line1, 0)}
      </h1>

      <h1
        className="font-bold tracking-widest text-sky-50"
        style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(5.5rem, 22vw, 18rem)',
          lineHeight: 0.8,
          letterSpacing: '0.1em',
          marginTop: '-0.7em',
        }}
      >
        {renderLine(line2, line1.length)}
      </h1>
    </div>
  );
}

export function Section01Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const queenRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const gyro = useGyroscope();

  // ── Master timeline: cinematic intro ──
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const aurora = auroraRef.current;
    const queen = queenRef.current;
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    const scrollHint = scrollHintRef.current;
    const subtitle = subtitleRef.current;
    if (!section || !aurora || !queen || !canvas || !overlay || !scrollHint || !subtitle) return;

    const alreadyPlayed = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('heroPlayed') === '1';

    if (alreadyPlayed) {
      gsap.set(overlay, { opacity: 0, display: 'none' });
      gsap.set(aurora, { opacity: 1, scale: 1 });
      gsap.set(queen, { clipPath: 'inset(0% 0 0 0)' });
      gsap.set(subtitle, { opacity: 1 });
      gsap.set(scrollHint, { opacity: 1 });
      setTitleVisible(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        try { sessionStorage.setItem('heroPlayed', '1'); } catch {}
      }
    });

    // Step 1: Black void (0 - 0.5s)
    tl.to({}, { duration: 0.5 });

    // Step 2: Single snowflake falls (canvas handles this)
    tl.to({}, { duration: 1.5 }, 'snowflake');

    // Step 3: Aurora explosion (2.0s)
    tl.to(overlay, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, 2.0);
    tl.fromTo(aurora,
      { opacity: 0, scale: 0, transformOrigin: '50% 100%' },
      { opacity: 1, scale: 1, duration: 1.5, ease: 'back.out(1.2)' },
      2.0
    );

    // Step 4: Title crystallizes (3.0s) — CrystalTitle handles its own animation
    tl.call(() => setTitleVisible(true), [], 3.0);

    // Step 5: Queen silhouette reveal (3.8s)
    tl.to(queen, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power2.inOut'
    }, 3.8);

    // Step 6: Subtitle fades in (4.2s)
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 4.2);

    // Step 7: Scroll indicator (4.5s)
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

    // ── Intro snowflake ──
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

    // ── Cursor particles ──
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

    // ── Activate ambient + cursor after intro ──
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

  // ── Aurora parallax follows cursor/gyroscope ──
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

  return (
    <section
      ref={sectionRef}
      id="section-01-hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950"
      style={{}}
    >
      {/* Layer 0: Background image */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <Image
          src="/images/story/BG1.png"
          alt="Aurora boreal sobre paisaje nevado"
          fill
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.5 }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(11,22,40,0) 0%, rgba(2,11,24,0.7) 100%)' }}
        />
      </div>

      {/* Layer 1: Dark void overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[50] bg-black"
      />

      {/* Layer 2: Aurora SVG */}
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

      {/* Layer 3: Queen silhouette — clip-path reveal */}
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

      {/* Layer 4: Canvas — snowflakes + cursor particles */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      />

      {/* Layer 5: Central glow */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,_rgba(248,250,252,0.16),_transparent_55%)]" />

      {/* Layer 6: Content */}
      <div className="relative z-30 flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
        <CrystalTitle visible={titleVisible} />

        <p
          ref={subtitleRef}
          className="max-w-2xl text-balance text-sm text-slate-200/90 md:text-lg"
          style={{ opacity: 0, fontFamily: 'var(--font-body)', fontStyle: 'italic' }}
        >
          Una historia de amor, valentía y el poder de un abrazo
          que puede derretir el corazón más frío.
        </p>
      </div>

      {/* Layer 7: Scroll indicator */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-xs tracking-widest text-sky-200/70" style={{ fontFamily: 'var(--font-kids)' }}>
          Desliza para comenzar
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="animate-bounce text-sky-200/70">
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
