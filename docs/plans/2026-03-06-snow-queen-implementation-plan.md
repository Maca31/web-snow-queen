# La Reina de las Nieves — 14-Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 14-section interactive storybook website merging the rich storytelling/effects from a reference HTML with the existing Next.js project's hero section, design system, and character assets.

**Architecture:** Layer Cake approach — build all sections with content first, then progressively add scroll mechanics, characters, ambient effects, and polish. Each layer works independently so progress is visible immediately.

**Tech Stack:** Next.js 16 + React 19 + GSAP 3.14 (via MCP) + Lenis 1.0.42 + Tailwind v4

---

## Layer 1: Structure + Content

### Task 1: Expand CSS Design System to 14 Sections

**Files:**
- Modify: `app/globals.css`

**Step 1: Add section palette variables for sections 09-14**

Add after the existing `--s08-*` variables in `:root`:

```css
/* SECCIÓN 09 — La Niña Ladrona: Bosque oscuro */
--s09-bg:        #2D4A14;
--s09-bg2:       #1A3010;
--s09-accent:    #A3E635;
--s09-text:      #ECFCCB;
--s09-glow:      rgba(163,230,53, 0.3);

/* SECCIÓN 10 — Tormenta: Azul noche tormentoso */
--s10-bg:        #030A18;
--s10-bg2:       #040C1E;
--s10-accent:    #93C5FD;
--s10-text:      #DBEAFE;
--s10-glow:      rgba(147,197,253, 0.35);

/* SECCIÓN 11 — Palacio de Hielo: Cristal profundo */
--s11-bg:        #041224;
--s11-bg2:       #010710;
--s11-accent:    #67E8F9;
--s11-text:      #CFFAFE;
--s11-glow:      rgba(103,232,249, 0.4);

/* SECCIÓN 12 — Kay Prisionero: Vacío helado */
--s12-bg:        #020810;
--s12-bg2:       #030C1A;
--s12-accent:    #A5B4FC;
--s12-text:      #E0E7FF;
--s12-glow:      rgba(165,180,252, 0.3);

/* SECCIÓN 13 — Lágrimas: Transición azul → dorado */
--s13-bg:        #0D2A50;
--s13-bg2:       #FFF8E7;
--s13-accent:    #FBBF24;
--s13-text:      #FEF3C7;
--s13-glow:      rgba(251,191,36, 0.4);

/* SECCIÓN 14 — Final: Dorado cálido primaveral */
--s14-bg:        #FFF8E7;
--s14-bg2:       #FFE4B5;
--s14-accent:    #F59E0B;
--s14-text:      #78350F;
--s14-glow:      rgba(245,158,11, 0.35);
```

**Step 2: Add CSS section ID styles for sections 03-14**

Replace the existing section styles block (lines ~149-191) with updated IDs matching the new 14-section naming:

```css
#section-01-hero {
  background: linear-gradient(180deg, var(--s01-bg) 0%, var(--s01-bg2) 100%);
  color: var(--s01-text);
}
#section-02-village {
  background: linear-gradient(180deg, #0c2040 0%, #152a50 50%, #0e1e3a 100%);
  color: var(--s01-text);
}
#section-03-mirror {
  background: linear-gradient(135deg, #08031a 0%, #140630 40%, #06021a 100%);
  color: var(--s03-text);
}
#section-04-ice-heart {
  background: linear-gradient(160deg, #150828 0%, #0a0420 40%, #040210 100%);
  color: var(--s04-text);
}
#section-05-queen {
  background: radial-gradient(ellipse at 50% 0%, #050f28 0%, #020810 80%);
  color: var(--s05-text);
}
#section-06-search {
  background: linear-gradient(180deg, #1a0a28 0%, #2d1040 50%, #1a0a28 100%);
  color: var(--s06-text);
}
#section-07-garden {
  background: linear-gradient(180deg, #4a8fa8 0%, #72b8d0 30%, #a0d4e5 60%, #c8ebf5 85%, #dff2fa 100%);
  color: #062040;
}
#section-08-crow {
  background: linear-gradient(135deg, #0c1830 0%, #1a2d50 50%, #0c1830 100%);
  color: var(--s01-text);
}
#section-09-robber {
  background: linear-gradient(180deg, var(--s09-bg) 0%, var(--s09-bg2) 100%);
  color: var(--s09-text);
}
#section-10-storm {
  background: linear-gradient(180deg, var(--s10-bg) 0%, var(--s10-bg2) 60%, var(--s10-bg) 100%);
  color: var(--s10-text);
}
#section-11-palace {
  background: radial-gradient(ellipse at 50% 100%, var(--s11-bg) 0%, var(--s11-bg2) 80%);
  color: var(--s11-text);
}
#section-12-prisoner {
  background: linear-gradient(180deg, var(--s12-bg) 0%, var(--s12-bg2) 100%);
  color: var(--s12-text);
}
#section-13-tears {
  background: linear-gradient(180deg, #0d2a50 0%, #1a4a70 30%, #8B7355 60%, var(--s13-bg2) 100%);
  color: var(--s13-text);
}
#section-14-finale {
  background: linear-gradient(155deg, var(--s14-bg) 0%, #FDE68A 50%, var(--s14-bg2) 100%);
  color: var(--s14-text);
}
```

**Step 3: Run dev server to verify no CSS errors**

Run: `npm run dev`
Expected: No build errors, page loads

**Step 4: Commit**

```bash
git add app/globals.css
git commit -m "feat: expand design system to 14 section palettes"
```

---

### Task 2: Create Shared StoryCard Component

**Files:**
- Create: `components/shared/StoryCard.tsx`

**Step 1: Create the component**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StoryCardProps {
  chapter: string;       // e.g. "Capítulo I"
  title: string;         // e.g. "Kay y Gerda"
  body: string;          // Narrative text
  body2?: string;        // Optional second paragraph
  hint?: string;         // e.g. "👆 ¡Toca a Kay y Gerda!"
  variant?: 'dark' | 'light';
  className?: string;
}

export function StoryCard({
  chapter,
  title,
  body,
  body2,
  hint,
  variant = 'dark',
  className = '',
}: StoryCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const isDark = variant === 'dark';

  return (
    <div
      ref={ref}
      className={`relative z-20 max-w-sm rounded-3xl border px-7 py-6 ${
        isDark
          ? 'border-sky-300/10 bg-slate-950/70 shadow-[0_0_80px_rgba(0,0,0,0.5)]'
          : 'border-white/90 bg-white/80 shadow-[0_20px_80px_rgba(0,0,0,0.12)]'
      } backdrop-blur-xl ${className}`}
      style={{ opacity: 0 }}
    >
      {/* Eyebrow */}
      <p
        className={`text-[0.7rem] font-semibold uppercase tracking-[0.4em] ${
          isDark ? 'text-amber-400/70' : 'text-sky-700/70'
        }`}
        style={{ fontFamily: 'var(--font-kids)' }}
      >
        {chapter}
      </p>

      {/* Rule */}
      <div
        className="my-3 h-px w-12"
        style={{
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(212,168,67,0.6), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(26,74,112,0.6), transparent)',
        }}
      />

      {/* Title */}
      <h2
        className={`text-xl font-light italic leading-tight md:text-2xl ${
          isDark ? 'text-sky-100' : 'text-slate-800'
        }`}
        style={{ fontFamily: 'var(--font-title)' }}
      >
        {title}
      </h2>

      {/* Body */}
      <p
        className={`mt-3 text-sm leading-relaxed md:text-base ${
          isDark ? 'text-sky-100/85' : 'text-slate-600/90'
        }`}
        style={{ fontFamily: 'var(--font-kids)' }}
      >
        {body}
      </p>

      {body2 && (
        <p
          className={`mt-2 text-sm leading-relaxed md:text-base ${
            isDark ? 'text-sky-100/85' : 'text-slate-600/90'
          }`}
          style={{ fontFamily: 'var(--font-kids)' }}
        >
          {body2}
        </p>
      )}

      {/* Hint */}
      {hint && (
        <p
          className={`mt-4 text-xs tracking-wide ${
            isDark ? 'text-sky-200/45' : 'text-slate-400/70'
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/shared/StoryCard.tsx
git commit -m "feat: add StoryCard shared component (dark/light variants)"
```

---

### Task 3: Create Narrator Lumi Component

**Files:**
- Create: `components/shared/Narrator.tsx`

**Step 1: Create the fixed narrator component**

```tsx
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
      {/* Avatar */}
      <div
        className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full md:h-14 md:w-14"
        style={{
          background: 'linear-gradient(135deg, #d4a843, #e8889a)',
          boxShadow: '0 0 20px rgba(212,168,67,0.45)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          animation: 'float 3s ease-in-out infinite',
        }}
      >
        <span className="text-2xl md:text-3xl">🦋</span>
      </div>

      {/* Bubble */}
      <div
        ref={bubbleRef}
        className="max-w-[min(340px,58vw)] rounded-2xl rounded-bl-sm bg-white/95 px-4 py-2.5 text-sm font-bold leading-relaxed text-slate-700 shadow-lg md:text-base"
        style={{ fontFamily: 'var(--font-kids)' }}
      >
        {text}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/shared/Narrator.tsx
git commit -m "feat: add Narrator Lumi fixed component with scroll-triggered text"
```

---

### Task 4: Create ParallaxBg Component

**Files:**
- Create: `components/shared/ParallaxBg.tsx`

**Step 1: Create the background component**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBgProps {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  gradient?: string;
  parallaxSpeed?: number;   // 0.1 = subtle, 0.5 = strong
  imageOpacity?: number;    // 0-1
  blendMode?: string;       // CSS mix-blend-mode
  kenBurns?: boolean;
}

export function ParallaxBg({
  imageSrc,
  videoSrc,
  imageAlt = 'Scene background',
  gradient,
  parallaxSpeed = 0.2,
  imageOpacity = 0.6,
  blendMode = 'normal',
  kenBurns = false,
}: ParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const media = mediaRef.current;
    if (!container || !media) return;

    const ctx = gsap.context(() => {
      // Parallax scroll
      gsap.fromTo(media,
        { yPercent: -parallaxSpeed * 50 },
        {
          yPercent: parallaxSpeed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Ken Burns
      if (kenBurns) {
        gsap.to(media, {
          scale: 1.06,
          xPercent: 2,
          duration: 12,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => ctx.revert();
  }, [parallaxSpeed, kenBurns]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Gradient base */}
      {gradient && (
        <div className="absolute inset-0" style={{ background: gradient }} />
      )}

      {/* Image or Video layer */}
      <div
        ref={mediaRef}
        className="absolute inset-0 scale-110"
        style={{ opacity: imageOpacity, mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'] }}
      >
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        )}
        {imageSrc && !videoSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/shared/ParallaxBg.tsx
git commit -m "feat: add ParallaxBg with image/video/gradient + parallax + Ken Burns"
```

---

### Task 5: Create ProgressNav Component (14 dots)

**Files:**
- Create: `components/shared/ProgressNav.tsx`

**Step 1: Create the navigation dots component**

```tsx
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
```

**Step 2: Commit**

```bash
git add components/shared/ProgressNav.tsx
git commit -m "feat: add ProgressNav 14-dot navigation with scroll tracking"
```

---

### Task 6: Build All 14 Section Components (Shell + Content)

This is the largest task. Create sections 03-14 as shells with StoryCard text, ParallaxBg, and basic structure. Each section follows the same pattern.

**Files:**
- Modify: `components/sections/Section01Intro.tsx` (rename ID only)
- Modify: `components/sections/Section02Garden.tsx` (update text to match HTML storytelling)
- Create: `components/sections/Section03Mirror.tsx`
- Create: `components/sections/Section04IceHeart.tsx`
- Create: `components/sections/Section05Queen.tsx`
- Create: `components/sections/Section06Search.tsx`
- Create: `components/sections/Section07Garden.tsx`
- Create: `components/sections/Section08Crow.tsx`
- Create: `components/sections/Section09Robber.tsx`
- Create: `components/sections/Section10Storm.tsx`
- Create: `components/sections/Section11Palace.tsx`
- Create: `components/sections/Section12Prisoner.tsx`
- Create: `components/sections/Section13Tears.tsx`
- Create: `components/sections/Section14Finale.tsx`

**Step 1: Update Section01Intro ID**

In `components/sections/Section01Intro.tsx`, change the SectionWrapper `id` from `"section-01-intro"` to `"section-01-hero"`. Keep everything else.

**Step 2: Update Section02Garden text**

In `components/sections/Section02Garden.tsx`:
- Change SectionWrapper `id` to `"section-02-village"`
- Update the title to "🏘️ El Pueblo en Invierno"
- Update NarratorBubble text to use the HTML version: "En un pueblo pequeño y acogedor, cubierto de nieve todo el año, vivían dos amigos inseparables. Se querían con todo el corazón."
- Update DialogBubble texts: Gerda says "¡Me encanta jugar contigo, Kay! 💛" / Kay says "¡Eres mi mejor amiga, Gerda! ⛄"
- Update background image src: the current `scene-03-garden-happiness.webp` path may not exist. Use `SECCION2.png` or `JARDINGERDAYKAY.png` (check which exists). Fallback to gradient.

**Step 3: Create Section03Mirror.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section03Mirror() {
  return (
    <SectionWrapper
      id="section-03-mirror"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/SECCION3.png"
        videoSrc="/images/story/ESPEJO ROTO.mp4"
        imageAlt="El espejo maldito rompiéndose"
        imageOpacity={0.5}
        parallaxSpeed={0.15}
      />

      <StoryCard
        chapter="Capítulo II"
        title="El Espejo Maldito"
        body="Un duende malvado creó un espejo terrible. Quien se miraba en él solo veía lo feo del mundo. Lo lanzó al cielo… y se rompió en millones de fragmentos."
        body2="Uno de esos pedacitos cayó en el ojo de Kay. Y desde ese momento, su corazón comenzó a enfriarse."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 4: Create Section04IceHeart.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section04IceHeart() {
  return (
    <SectionWrapper
      id="section-04-ice-heart"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/SECCION4.mp4"
        imageAlt="Kay transformándose por el hielo"
        imageOpacity={0.5}
        parallaxSpeed={0.15}
      />

      <StoryCard
        chapter="Capítulo III"
        title="El Corazón de Hielo"
        body="Con el fragmento en el ojo, Kay ya no veía la belleza. Las flores le parecían aburridas. La nieve, perfecta. Gerda le pareció tonta."
        body2="Su corazón se fue enfriando poco a poco… como el invierno que tanto amaba."
        variant="dark"
        hint="❄️ El hielo avanza..."
      />
    </SectionWrapper>
  );
}
```

**Step 5: Create Section05Queen.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section05Queen() {
  return (
    <SectionWrapper
      id="section-05-queen"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/SECCION5.png"
        videoSrc="/images/story/NIEVE.mp4"
        imageAlt="La Reina de las Nieves en su trineo"
        imageOpacity={0.55}
        parallaxSpeed={0.2}
      />

      <StoryCard
        chapter="Capítulo IV"
        title="La Reina de las Nieves"
        body="La Reina de las Nieves llegó en su trineo de cristal. Era bella y terrible. Se llevó a Kay entre la ventisca, hacia su palacio de hielo eterno."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 6: Create Section06Search.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section06Search() {
  return (
    <SectionWrapper
      id="section-06-search"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/GERDACAMINANDO.mp4"
        imageAlt="Gerda caminando en la nieve"
        imageOpacity={0.5}
        parallaxSpeed={0.2}
      />

      <StoryCard
        chapter="Capítulo V"
        title="El Viaje de Gerda"
        body="Gerda no se rindió. Aunque todos decían que Kay se había ido para siempre, ella salió a buscarlo. El camino era largo y frío, pero su corazón estaba lleno de amor."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 7: Create Section07Garden.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section07Garden() {
  return (
    <SectionWrapper
      id="section-07-garden"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        imageSrc="/images/story/JARDINGERDAYKAY.png"
        imageAlt="Jardín mágico con flores"
        imageOpacity={0.5}
        parallaxSpeed={0.15}
      />

      <StoryCard
        chapter="Capítulo VI"
        title="El Jardín Mágico"
        body="En el camino, Gerda encontró un jardín mágico. Una anciana amable la invitó a quedarse. Las flores cantaban historias… pero ninguna hablaba de Kay."
        variant="light"
      />
    </SectionWrapper>
  );
}
```

**Step 8: Create Section08Crow.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section08Crow() {
  return (
    <SectionWrapper
      id="section-08-crow"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo VII"
        title="El Cuervo Sabio"
        body="Un cuervo sabio le contó a Gerda sobre un príncipe que se parecía a Kay. Corrió al castillo… pero no era él."
        body2="La princesa, conmovida, le dio un abrigo cálido y un trineo dorado para que siguiera su camino."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 9: Create Section09Robber.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section09Robber() {
  return (
    <SectionWrapper
      id="section-09-robber"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo VIII"
        title="La Niña Ladrona"
        body="Unos bandidos la atraparon en el bosque. Pero la hija de la jefa, una niña valiente y curiosa, se hizo su amiga."
        body2="'Te ayudaré', dijo. Y le dio su reno más fuerte para que la llevara al norte."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 10: Create Section10Storm.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

export function Section10Storm() {
  return (
    <SectionWrapper
      id="section-10-storm"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <ParallaxBg
        videoSrc="/images/story/NIEVE.mp4"
        imageAlt="Tormenta de nieve"
        imageOpacity={0.45}
        parallaxSpeed={0.25}
      />

      <StoryCard
        chapter="Capítulo IX"
        title="La Tormenta"
        body="El reno corrió por la nieve con Gerda en su lomo. La tormenta era terrible, pero Gerda no tenía miedo."
        body2="Su amor por Kay la hacía más fuerte que el viento."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 11: Create Section11Palace.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section11Palace() {
  return (
    <SectionWrapper
      id="section-11-palace"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo X"
        title="El Palacio de Hielo"
        body="Al fin llegaron. El palacio brillaba como un diamante helado. Todo era frío, silencioso y enorme."
        body2="La Reina no estaba… pero Kay sí."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 12: Create Section12Prisoner.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section12Prisoner() {
  return (
    <SectionWrapper
      id="section-12-prisoner"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo XI"
        title="El Prisionero de Hielo"
        body="Kay estaba sentado en el suelo de hielo, intentando formar la palabra 'ETERNIDAD' con pedazos de cristal."
        body2="No sentía frío. No sentía nada."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 13: Create Section13Tears.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section13Tears() {
  return (
    <SectionWrapper
      id="section-13-tears"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo XII"
        title="Las Lágrimas Mágicas"
        body="Gerda corrió hacia Kay y lo abrazó. Lloró con todo su corazón. Sus lágrimas calientes cayeron sobre el pecho de Kay… y derritieron la astilla de hielo."
        body2="Kay parpadeó. Y recordó todo."
        variant="dark"
      />
    </SectionWrapper>
  );
}
```

**Step 14: Create Section14Finale.tsx**

```tsx
'use client';

import { SectionWrapper } from './SectionWrapper';
import { StoryCard } from '../shared/StoryCard';

export function Section14Finale() {
  return (
    <SectionWrapper
      id="section-14-finale"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <StoryCard
        chapter="Capítulo XIII"
        title="Final Feliz"
        body="Volvieron a casa tomados de la mano. Las rosas del jardín florecieron. El invierno se fue."
        body2="Y el amor, como siempre, venció al frío."
        variant="light"
      />

      {/* "Fin" title */}
      <p
        className="absolute bottom-16 left-1/2 -translate-x-1/2 text-4xl font-light italic text-amber-700/70 md:text-6xl"
        style={{ fontFamily: 'var(--font-title)', textShadow: '0 0 40px rgba(245,158,11,0.4)' }}
      >
        Fin
      </p>
    </SectionWrapper>
  );
}
```

**Step 15: Commit all sections**

```bash
git add components/sections/
git commit -m "feat: create all 14 section components with StoryCard content"
```

---

### Task 7: Wire Everything in page.tsx and RootClient

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/RootClient.tsx`

**Step 1: Update page.tsx to render all 14 sections**

```tsx
import { Section01Intro } from "@/components/sections/Section01Intro";
import { Section02Garden } from "@/components/sections/Section02Garden";
import { Section03Mirror } from "@/components/sections/Section03Mirror";
import { Section04IceHeart } from "@/components/sections/Section04IceHeart";
import { Section05Queen } from "@/components/sections/Section05Queen";
import { Section06Search } from "@/components/sections/Section06Search";
import { Section07Garden } from "@/components/sections/Section07Garden";
import { Section08Crow } from "@/components/sections/Section08Crow";
import { Section09Robber } from "@/components/sections/Section09Robber";
import { Section10Storm } from "@/components/sections/Section10Storm";
import { Section11Palace } from "@/components/sections/Section11Palace";
import { Section12Prisoner } from "@/components/sections/Section12Prisoner";
import { Section13Tears } from "@/components/sections/Section13Tears";
import { Section14Finale } from "@/components/sections/Section14Finale";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Section01Intro />
      <Section02Garden />
      <Section03Mirror />
      <Section04IceHeart />
      <Section05Queen />
      <Section06Search />
      <Section07Garden />
      <Section08Crow />
      <Section09Robber />
      <Section10Storm />
      <Section11Palace />
      <Section12Prisoner />
      <Section13Tears />
      <Section14Finale />
    </main>
  );
}
```

**Step 2: Update RootClient.tsx to include Narrator and ProgressNav**

Replace the existing ProgressIndicator import with ProgressNav. Add Narrator.

```tsx
'use client';

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/scroll";

import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./CustomCursor";
import SnowParticles from "./SnowParticles";
import { ProgressNav } from "./shared/ProgressNav";
import { Narrator } from "./shared/Narrator";

interface RootClientProps {
  children: React.ReactNode;
}

export function RootClient({ children }: RootClientProps) {
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      lenis?.destroy?.();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SnowParticles />
      <ProgressNav />
      <Narrator />
      {children}
    </>
  );
}
```

**Step 3: Run dev server and verify**

Run: `npm run dev`
Expected: All 14 sections visible, can scroll through them, Lumi updates text, dots track progress.

**Step 4: Commit**

```bash
git add app/page.tsx components/RootClient.tsx
git commit -m "feat: wire all 14 sections + Narrator + ProgressNav in page"
```

---

## Layer 2: Scroll System Enhancements

### Task 8: Update SectionWrapper Snap for 14 Sections

**Files:**
- Modify: `components/sections/SectionWrapper.tsx`

**Step 1: Adjust snap behavior**

The current SectionWrapper snaps per section. With 14 sections, snapping might feel aggressive. Update the snap duration to be smoother:

Change `snapTo: 1` to remove snap entirely (Lenis handles smoothness), OR keep snap but increase max duration:

```tsx
const trigger = ScrollTrigger.create({
  trigger: section,
  start: "top top",
  end: "bottom top",
  // Remove snap for smoother multi-section scrolling
  // Snap is too aggressive with 14 sections
});
```

Keep the entry animation logic as-is.

**Step 2: Commit**

```bash
git add components/sections/SectionWrapper.tsx
git commit -m "refactor: remove snap from SectionWrapper for smoother 14-section flow"
```

---

### Task 9: Add Horizontal Scroll to Section03Mirror

**Files:**
- Modify: `components/sections/Section03Mirror.tsx`

**Step 1: Implement horizontal scroll with 2 panels**

Replace the simple section with a GSAP horizontal scroll pinned container:

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoryCard } from '../shared/StoryCard';
import { ParallaxBg } from '../shared/ParallaxBg';

gsap.registerPlugin(ScrollTrigger);

export function Section03Mirror() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const panels = track.querySelectorAll('.h-panel');

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      id="section-03-mirror"
      ref={wrapRef}
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      <div
        ref={trackRef}
        className="flex h-screen"
        style={{ width: '200vw' }}
      >
        {/* Panel A: The Mirror */}
        <div className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #08031a, #140630, #06021a)' }}
        >
          <ParallaxBg
            imageSrc="/images/story/SECCION3.png"
            imageAlt="El espejo maldito"
            imageOpacity={0.4}
            parallaxSpeed={0.1}
          />
          <StoryCard
            chapter="Capítulo II"
            title="El Espejo Maldito"
            body="Un duende malvado creó un espejo terrible. Quien se miraba en él solo veía lo feo del mundo. Lo lanzó al cielo… y se rompió en millones de fragmentos."
            variant="dark"
          />
        </div>

        {/* Panel B: The Shard */}
        <div className="relative flex h-screen w-screen flex-shrink-0 items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #150828, #0a0420, #040210)' }}
        >
          <ParallaxBg
            videoSrc="/images/story/ESPEJO ROTO.mp4"
            imageAlt="Los fragmentos del espejo"
            imageOpacity={0.35}
          />
          <StoryCard
            chapter="Capítulo II (cont.)"
            title="Los Fragmentos Malvados"
            body="Uno de esos pedacitos cayó en el ojo de Kay. Y desde ese momento, su corazón comenzó a enfriarse."
            variant="dark"
          />
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Verify horizontal scroll works**

Run: `npm run dev`, scroll to section 3, should scroll horizontally through 2 panels.

**Step 3: Commit**

```bash
git add components/sections/Section03Mirror.tsx
git commit -m "feat: add horizontal scroll to Section03 mirror with 2 panels"
```

---

## Layer 3: Characters

### Task 10: Add Character Images to Sections

**Files:**
- Modify: `components/sections/Section04IceHeart.tsx` — add Kay images
- Modify: `components/sections/Section05Queen.tsx` — add Snow Queen
- Modify: `components/sections/Section06Search.tsx` — add Gerda walking
- Modify: `components/sections/Section07Garden.tsx` — add Gerda + Witch
- Modify: `components/sections/Section08Crow.tsx` — add Gerda pointing
- Modify: `components/sections/Section09Robber.tsx` — add Robber Girl
- Modify: `components/sections/Section10Storm.tsx` — add Gerda running
- Modify: `components/sections/Section11Palace.tsx` — add Snow Queen
- Modify: `components/sections/Section12Prisoner.tsx` — add Kay frozen
- Modify: `components/sections/Section13Tears.tsx` — add Gerda + Kay
- Modify: `components/sections/Section14Finale.tsx` — add Kay + Gerda

For each section, add character PNG images using Next.js `<Image>` with:
- Absolute positioning (bottom area of viewport)
- GSAP entry animation (slide from left/right, ScrollTrigger)
- Breathing animation (translateY oscillation)
- Responsive sizing: `width: clamp(80px, 15vw, 160px)`, `height: clamp(140px, 25vw, 280px)`

**Character assignment map:**

| Section | Left character | Right character |
|---------|---------------|----------------|
| 04 | - | kay-normal-02 (warm→cold transition on scroll) |
| 05 | - | snow-queen-02-arms-commanding |
| 06 | gerda-02-walking-determined | - |
| 07 | gerda-08-looking-up-wonder | witch-01-standing-welcoming |
| 08 | gerda-07-pointing-discovery | - |
| 09 | - | robber-girl-02-sitting-relaxed |
| 10 | gerda-03-running-urgent | - |
| 11 | - | snow-queen-04-walking-gliding |
| 12 | - | kay-frozen-04-transition-awakening |
| 13 | gerda-05-arms-open-joy | kay-normal-04-crying-relief |
| 14 | gerda-05-arms-open-joy | kay-normal-05-hugging-grateful |

All images from `public/images/characters/transparent/` folder.

**Pattern for each character addition (example Section05Queen):**

```tsx
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Inside the component, add character ref + animation:
const charRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const el = charRef.current;
  if (!el) return;
  const ctx = gsap.context(() => {
    gsap.fromTo(el,
      { x: 120, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1.2, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: el.closest('section'), start: 'top 70%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.to(el, { y: -8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
  });
  return () => ctx.revert();
}, []);

// In JSX, add:
<div ref={charRef} className="absolute bottom-20 right-[15%] z-30" style={{ opacity: 0 }}>
  <div className="relative" style={{ width: 'clamp(80px, 15vw, 160px)', height: 'clamp(140px, 25vw, 280px)' }}>
    <Image
      src="/images/characters/transparent/snow-queen-02-arms-commanding.png"
      alt="La Reina de las Nieves"
      fill sizes="(max-width: 768px) 80px, 160px"
      className="object-contain drop-shadow-lg"
    />
  </div>
</div>
```

**Step: Implement all sections, then commit**

```bash
git add components/sections/
git commit -m "feat: add character PNG images to sections 04-14 with GSAP entry animations"
```

---

## Layer 4: Effects

### Task 11: Create AuroraEffect Component

**Files:**
- Create: `components/shared/AuroraEffect.tsx`

The SVG aurora effect from the HTML reference — 3 radial gradient ellipses with wave animation. Used in Section01Hero.

```tsx
'use client';

export function AuroraEffect() {
  return (
    <div
      className="pointer-events-none absolute left-[-20%] top-0 z-[2] h-[55%] w-[140%]"
      style={{ animation: 'float 12s ease-in-out infinite alternate' }}
    >
      <svg viewBox="0 0 1440 500" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <radialGradient id="ag1" cx="50%" cy="60%">
            <stop offset="0%" stopColor="rgba(80,200,255,0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ag2" cx="30%" cy="70%">
            <stop offset="0%" stopColor="rgba(80,255,180,0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <radialGradient id="ag3" cx="70%" cy="60%">
            <stop offset="0%" stopColor="rgba(180,80,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <ellipse cx="720" cy="280" rx="800" ry="280" fill="url(#ag1)" />
        <ellipse cx="400" cy="300" rx="500" ry="200" fill="url(#ag2)" />
        <ellipse cx="1050" cy="290" rx="500" ry="200" fill="url(#ag3)" />
      </svg>
    </div>
  );
}
```

**Commit:**
```bash
git add components/shared/AuroraEffect.tsx
git commit -m "feat: add AuroraEffect SVG component"
```

---

### Task 12: Create MountainSilhouette Component

**Files:**
- Create: `components/shared/MountainSilhouette.tsx`

3-layer mountain SVG from the HTML reference. Used in sections 01, 05, 10.

```tsx
'use client';

export function MountainSilhouette() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 z-[4] w-full"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <polygon points="0,320 0,220 120,80 240,180 400,60 560,200 720,40 880,180 1040,70 1200,200 1320,90 1440,180 1440,320" fill="rgba(5,18,45,0.7)" />
      <polygon points="0,320 0,260 80,160 200,240 360,120 520,230 680,100 840,230 1000,130 1160,240 1300,140 1440,220 1440,320" fill="rgba(4,14,34,0.85)" />
      <polygon points="0,320 0,295 200,240 400,280 600,245 800,275 1000,250 1200,280 1440,260 1440,320" fill="rgba(3,10,26,0.95)" />
      {/* Snow caps */}
      <polygon points="120,80 100,110 140,110" fill="rgba(200,230,248,0.3)" />
      <polygon points="400,60 380,95 420,95" fill="rgba(200,230,248,0.4)" />
      <polygon points="720,40 695,80 745,80" fill="rgba(200,230,248,0.5)" />
      <polygon points="1040,70 1018,105 1062,105" fill="rgba(200,230,248,0.35)" />
    </svg>
  );
}
```

**Commit:**
```bash
git add components/shared/MountainSilhouette.tsx
git commit -m "feat: add MountainSilhouette SVG component with snow caps"
```

---

### Task 13: Integrate Aurora + Mountains into Section01Hero

**Files:**
- Modify: `components/sections/Section01Intro.tsx`

Add `AuroraEffect` and `MountainSilhouette` imports and render them inside the SectionWrapper, before the canvas.

**Commit:**
```bash
git add components/sections/Section01Intro.tsx
git commit -m "feat: add aurora and mountains to hero section"
```

---

### Task 14: Add Section-Specific Effects

**Files to modify:**
- Section05Queen — add intense snow particles (increase count)
- Section10Storm — add storm particles (fast, horizontal wind)
- Section13Tears — add heart particles rising
- Section14Finale — add confetti/flower particles

For each, either:
- Reuse the existing SnowParticles with increased density/speed props
- Or add inline canvas/DOM particle effects specific to the section

This task is about adding ambient effects that make each section feel unique. Use GSAP MCP for animation patterns as needed.

**Commit after each section:**
```bash
git commit -m "feat: add ambient effects to sections 05, 10, 13, 14"
```

---

## Layer 5: Polish

### Task 15: Update Globals.css Section IDs

**Files:**
- Modify: `app/globals.css`

Ensure all 14 section IDs are properly styled in the CSS. Remove the old section IDs that no longer match.

**Commit:**
```bash
git add app/globals.css
git commit -m "fix: update globals.css section IDs for 14-section structure"
```

---

### Task 16: Responsive Testing & Fixes

**Files:** Various sections

Run dev server at different viewport sizes (mobile 375px, tablet 768px, desktop 1440px). Fix:
- StoryCard overflow on small screens
- Character sizing/positioning on mobile
- Narrator bubble width on mobile
- ProgressNav visibility on small screens

**Commit:**
```bash
git commit -m "fix: responsive adjustments for mobile/tablet viewports"
```

---

### Task 17: Performance Check

**Files:** Various

- Ensure all images use Next.js `<Image>` with proper `sizes` attribute
- Ensure videos use `muted autoPlay loop playsInline` (no audio autoplay issues)
- Ensure GSAP ScrollTrigger cleanup in all useEffect returns
- Ensure `will-change: transform` only on actively animated elements
- Run `npm run build` to check for errors

**Commit:**
```bash
git commit -m "perf: optimize images, cleanup ScrollTrigger, build verification"
```

---

### Task 18: Final Build Verification

Run: `npm run build`
Expected: Build succeeds with no errors.

Run: `npm run dev` and scroll through all 14 sections.
Expected: Smooth scrolling, all sections visible, Lumi updates, dots track, characters animate, effects play.

---

## Summary

| Layer | Tasks | What it delivers |
|-------|-------|-----------------|
| 1: Structure | Tasks 1-7 | All 14 sections visible with text + backgrounds + Narrator + Nav |
| 2: Scroll | Tasks 8-9 | Smooth flow + horizontal scroll on mirror section |
| 3: Characters | Task 10 | PNG characters with entry animations in all story sections |
| 4: Effects | Tasks 11-14 | Aurora, mountains, storms, hearts, confetti |
| 5: Polish | Tasks 15-18 | Responsive, performance, build verification |

Total: ~18 tasks, each 2-15 minutes.
