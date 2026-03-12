# Hero Cinematic Intro — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the static hero section with an 8-step cinematic intro sequence — black void → snowflake → aurora explosion → crystallizing title → Queen silhouette → cursor-reactive aurora → scroll indicator → cursor snow trails.

**Architecture:** Single GSAP master timeline in a rewritten `Section01Intro.tsx`. One canvas handles both the intro snowflake and cursor micro-snowflakes. Aurora SVG is inlined (not a separate component) so the timeline can control it. A `useGyroscope` hook provides device orientation / mouse position for parallax. SessionStorage skips the intro for returning visitors.

**Tech Stack:** Next.js 16 + React 19, GSAP 3.14 (ScrollTrigger), Tailwind CSS v4, Canvas API, DeviceOrientationEvent API

---

### Task 1: Create useGyroscope Hook

**Files:**
- Create: `lib/useGyroscope.ts`

**Step 1: Create the hook file**

```ts
'use client';

import { useEffect, useRef, useCallback } from 'react';

interface GyroPosition {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export function useGyroscope() {
  const pos = useRef<GyroPosition>({ x: 0, y: 0 });
  const enabled = useRef(false);

  const handleMouse = useCallback((e: MouseEvent) => {
    pos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    pos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, []);

  const handleOrientation = useCallback((e: DeviceOrientationEvent) => {
    const gamma = e.gamma ?? 0; // left-right tilt (-90 to 90)
    const beta = e.beta ?? 0;   // front-back tilt (-180 to 180)
    pos.current.x = Math.max(-1, Math.min(1, gamma / 30));
    pos.current.y = Math.max(-1, Math.min(1, (beta - 45) / 30));
  }, []);

  const handleTouch = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    pos.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
    pos.current.y = (touch.clientY / window.innerHeight) * 2 - 1;
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = 'ontouchstart' in window;

    if (isMobile) {
      // Try gyroscope first
      const tryGyroscope = async () => {
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            'requestPermission' in DeviceOrientationEvent) {
          try {
            const perm = await (DeviceOrientationEvent as any).requestPermission();
            if (perm === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
              enabled.current = true;
              return;
            }
          } catch { /* fall through to touch */ }
        } else if ('DeviceOrientationEvent' in window) {
          window.addEventListener('deviceorientation', handleOrientation);
          enabled.current = true;
          return;
        }
        // Fallback: touch
        window.addEventListener('touchmove', handleTouch, { passive: true });
        enabled.current = true;
      };
      tryGyroscope();
    } else {
      window.addEventListener('mousemove', handleMouse);
      enabled.current = true;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('touchmove', handleTouch);
    };
  }, [handleMouse, handleOrientation, handleTouch]);

  return pos;
}
```

**Step 2: Verify no TypeScript errors**

Run: `npx tsc --noEmit lib/useGyroscope.ts` (or just check in the dev server later)

**Step 3: Commit**

```bash
git add lib/useGyroscope.ts
git commit -m "feat: add useGyroscope hook for device orientation / mouse parallax"
```

---

### Task 2: Rewrite Section01Intro — Structure and Layout

**Files:**
- Rewrite: `components/sections/Section01Intro.tsx`

This task sets up the JSX structure and refs. Animation logic comes in Task 3.

**Step 1: Write the new component structure**

Replace the entire file. The new structure has these layers (bottom to top):
1. Dark gradient background (CSS, no image)
2. Aurora SVG (3 ellipses, initially invisible)
3. Queen silhouette image (initially clipped)
4. Canvas (snowflakes + cursor particles)
5. Central glow overlay
6. Title + subtitle + scroll indicator

```tsx
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

  // --- Animation hooks will be added in Task 3 ---

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
```

**Step 2: Verify it renders (dev server)**

Run: `npm run dev`
Expected: Hero section shows a pure black screen (the overlay covers everything). No errors in console.

**Step 3: Commit**

```bash
git add components/sections/Section01Intro.tsx
git commit -m "feat: hero section structure with layers for cinematic intro"
```

---

### Task 3: Implement the GSAP Master Timeline (8-Step Sequence)

**Files:**
- Modify: `components/sections/Section01Intro.tsx` (add animation hooks)

This is the core animation logic. Add these two hooks inside the component, replacing the `// --- Animation hooks will be added in Task 3 ---` comment.

**Step 1: Add the master timeline (useLayoutEffect)**

Insert this after the gyro ref declaration:

```tsx
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

    return () => tl.kill();
  }, []);
```

**Step 2: Add the canvas logic (useEffect)**

Insert after the timeline hook. This handles:
- Step 2: Single intro snowflake falling to center
- Ambient snowflakes starting after aurora
- Step 8: Cursor micro-snowflakes

```tsx
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
    let ambientActive = alreadyPlayed; // Start immediately if already played

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
      }, 2500); // After aurora explosion (step 3)
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
        p.vy += 0.02; // slight gravity
        p.life++;
        const progress = p.life / p.maxLife;
        const alpha = 1 - progress;
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
```

**Step 3: Add the aurora parallax effect (useEffect)**

Insert after the canvas hook. This handles step 6:

```tsx
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
```

**Step 4: Verify in dev server**

Run: `npm run dev`
Expected:
- First visit: Black screen → snowflake falls → aurora explodes → title crystallizes → Queen silhouette reveals → scroll indicator appears
- Moving mouse creates micro-snowflakes and shifts aurora
- Refresh: intro skips, final state appears immediately (clear sessionStorage to test again)

**Step 5: Commit**

```bash
git add components/sections/Section01Intro.tsx
git commit -m "feat: implement 8-step cinematic hero intro with GSAP master timeline"
```

---

### Task 4: Delete Old Components

**Files:**
- Delete: `components/shared/AuroraEffect.tsx`
- Delete: `components/shared/MountainSilhouette.tsx`

**Step 1: Verify they are only imported by Section01Intro (already confirmed — no other imports)**

**Step 2: Delete the files**

```bash
rm components/shared/AuroraEffect.tsx
rm components/shared/MountainSilhouette.tsx
```

**Step 3: Verify no build errors**

Run: `npm run build` (or just check dev server for import errors)

**Step 4: Commit**

```bash
git add -u components/shared/AuroraEffect.tsx components/shared/MountainSilhouette.tsx
git commit -m "chore: remove AuroraEffect and MountainSilhouette (inlined into hero)"
```

---

### Task 5: Polish and Verify

**Files:**
- Possibly modify: `components/sections/Section01Intro.tsx` (timing tweaks)
- Possibly modify: `app/globals.css` (if new keyframes needed)

**Step 1: Test the full flow**

1. Clear sessionStorage: `sessionStorage.removeItem('heroPlayed')` in browser console
2. Reload page — full 8-step intro should play
3. Reload again — should skip directly to final state
4. Test on mobile viewport (Chrome DevTools toggle device)
5. Check `prefers-reduced-motion` behavior (animations should be near-instant)

**Step 2: Verify no console errors or warnings**

Check browser console for:
- React hydration warnings
- GSAP warnings
- Canvas errors
- DeviceOrientationEvent permission issues

**Step 3: Adjust timing if needed**

If any step feels too fast/slow, adjust the timeline positions in the `tl.to()` / `tl.fromTo()` calls. Key timing values:
- `0.5` — black void duration
- `2.0` — aurora starts
- `3.0` — title starts
- `3.8` — Queen starts
- `4.5` — scroll hint appears

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete cinematic hero intro with polish"
```

---

## File Summary

| Action | File | Purpose |
|--------|------|---------|
| Create | `lib/useGyroscope.ts` | Device orientation / mouse parallax hook |
| Rewrite | `components/sections/Section01Intro.tsx` | Full 8-step cinematic intro |
| Delete | `components/shared/AuroraEffect.tsx` | No longer needed (inlined) |
| Delete | `components/shared/MountainSilhouette.tsx` | No longer needed (removed) |

## Key Implementation Notes

- **Canvas performance**: Uses `requestAnimationFrame` with a single render loop. Cursor particles are capped implicitly (2 per mousemove frame, maxLife 60 frames).
- **SessionStorage skip**: On return visits, `gsap.set()` applies final state instantly — no flash of black.
- **Gyroscope iOS**: Requires user gesture for `requestPermission()`. The hook tries automatically but may need a button tap on iOS Safari. Current implementation attempts it on mount — if denied, falls back to touch.
- **prefers-reduced-motion**: Already handled by the global CSS rule in `globals.css` (line 433-438) which forces `animation-duration: 0.01ms`. GSAP timelines are not affected by this CSS rule, so consider checking `matchMedia('(prefers-reduced-motion: reduce)')` and skipping the timeline if true.
