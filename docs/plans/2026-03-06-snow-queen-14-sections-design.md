# Design: La Reina de las Nieves — 14-Section Interactive Storybook

**Date**: 2026-03-06
**Approach**: Layer Cake (incremental layers)
**Stack**: Next.js 16 + React 19 + GSAP 3.14 + Lenis 1.0.42 + Tailwind v4

---

## Architecture

### Component Structure

```
components/
  sections/
    Section01Hero.tsx           # Portada (keep existing Section01Intro)
    Section02Village.tsx        # El Pueblo en Invierno
    Section03Mirror.tsx         # El Espejo Maldito (horizontal scroll)
    Section04IceHeart.tsx       # El Corazón de Hielo
    Section05Queen.tsx          # La Reina Llega
    Section06Search.tsx         # Gerda Sale a Buscar
    Section07Garden.tsx         # El Jardín Encantado
    Section08Crow.tsx           # El Cuervo y la Princesa
    Section09Robber.tsx         # La Niña Ladrona
    Section10Storm.tsx          # El Reno y la Tormenta
    Section11Palace.tsx         # El Palacio de Hielo
    Section12Prisoner.tsx       # Kay Prisionero (pin parallax)
    Section13Tears.tsx          # Las Lágrimas de Gerda
    Section14Finale.tsx         # De Vuelta a Casa
  shared/
    Narrator.tsx                # Lumi — fixed narrator at bottom
    StoryCard.tsx               # Glassmorphism card (dark/light variants)
    ParallaxBg.tsx              # Background: image/video/gradient + parallax
    AuroraEffect.tsx            # Aurora borealis SVG animated
    MountainSilhouette.tsx      # SVG mountain layers
    StormParticles.tsx          # Blizzard particle system
    ProgressNav.tsx             # 14-dot navigation (right side)
  [keep existing]: CustomCursor, LoadingScreen, SnowParticles, ProgressIndicator,
                   Character, StoryBubbles, RootClient, SectionWrapper
```

### Scroll System

- **Lenis**: duration 1.8s, exponential ease, syncTouch: false, touchMultiplier: 2
- **ScrollTrigger**: snap per section (power2.inOut, 0.5-1s)
- **Section 03**: Horizontal scroll pinned (2 internal panels: mirror + Kay transformation)
- **Section 12**: Pin parallax (ice layers with depth)
- **ProgressNav**: 14 fixed dots, click → `lenis.scrollTo(section)`

---

## Section Mapping

### 01 — Hero / Portada
- **Background**: scene-01-intro.webp (70% opacity, mix-blend-screen)
- **Characters**: None
- **Effects**: Aurora SVG + mountain silhouettes parallax + canvas snow (120 flakes)
- **Card**: Title "La Reina de las Nieves" with letter-by-letter elastic stagger
- **Lumi**: "¡Hola! Soy Lumi. Tu guía en este cuento mágico. ¡Desplázate para comenzar!"
- **Note**: Keep existing Section01Intro, rename to Section01Hero

### 02 — El Pueblo en Invierno
- **Background**: SECCION2.png (image) + JARDINGERDAYKAY.mp4 (video option)
- **Characters**: gerda-01-standing-happy.webp (left) + kay-normal-02-laughing-playing.webp (right)
- **Effects**: Warm window glow, smoke from chimney, gentle snow
- **Card** (dark): Capítulo I — "Kay y Gerda" — "En un pueblo pequeño y acogedor, cubierto de nieve todo el año, vivían dos amigos inseparables. Se querían con todo el corazón."
- **Lumi**: "¡Mira qué bonito pueblo! Aquí viven Kay y Gerda."
- **Interaction**: Tap characters → dialog bubbles

### 03 — El Espejo Maldito (Horizontal Scroll)
- **Background**: SECCION3.png (panel A) + ESPEJO ROTO.mp4 (video overlay)
- **Characters**: None (mirror is protagonist)
- **Effects**: Floating spell particles, crystal shards on break
- **Layout**: Horizontal scroll pinned, 2 panels (100vw each)
  - Panel A: Mirror with crack animation + "Un duende malvado creó un espejo terrible..."
  - Panel B: Shard fragments dispersing + "Uno de esos pedacitos cayó en el ojo de Kay..."
- **Card** (dark): Capítulo II — "El Espejo Maldito"
- **Lumi**: "¡Oh no! Ese espejo es muy peligroso... ¡Cuidado!"
- **Interaction**: Tap mirror → cracks appear (minimal)

### 04 — El Corazón de Hielo
- **Background**: SECCION4.mp4 (video) + gradient fallback (#B0C4D8)
- **Characters**: kay-normal-02 (warm) → kay-frozen-04-transition-awakening (cold) on scroll
- **Effects**: Frost overlay growing from edges, ice particles floating
- **Card** (dark): Capítulo III — "El Corazón de Hielo" — "Con el fragmento en el ojo, Kay ya no veía la belleza. Las flores le parecían aburridas. La nieve, perfecta. Gerda le pareció tonta. Su corazón se fue enfriando poco a poco… como el invierno que tanto amaba."
- **Lumi**: "Pobre Kay... algo cambió dentro de él."

### 05 — La Reina Llega
- **Background**: SECCION5.png (image) + NIEVE.mp4 (video overlay for blizzard)
- **Characters**: snow-queen-02-arms-commanding.png (center, dramatic entrance)
- **Effects**: Intense snowstorm, ice shards flying, wind sound visual (streaks)
- **Card** (dark): Capítulo IV — "La Reina de las Nieves" — "La Reina de las Nieves llegó en su trineo de cristal. Era bella y terrible. Se llevó a Kay entre la ventisca, hacia su palacio de hielo eterno."
- **Lumi**: "¡La Reina de las Nieves! ¡Es bellísima pero muy fría!"

### 06 — Gerda Sale a Buscar
- **Background**: GERDACAMINANDO.mp4 (video) + gradient fallback (#F0F8FF)
- **Characters**: gerda-02-walking-determined.png (animated walking cycle)
- **Effects**: Soft snow, dawn/dusk gradient transition
- **Card** (dark): Capítulo V — "El Viaje de Gerda" — "Gerda no se rindió. Aunque todos decían que Kay se había ido para siempre, ella salió a buscarlo. El camino era largo y frío, pero su corazón estaba lleno de amor."
- **Lumi**: "¡Gerda es tan valiente! Va a buscar a su amigo."

### 07 — El Jardín Encantado
- **Background**: Gradient green-floral (#C8E6C9 → #A5D6A7) or reuse garden imagery
- **Characters**: gerda-08-looking-up-wonder.png + witch-01-standing-welcoming.png
- **Effects**: Floating flower petals, warm light beams, magical sparkles
- **Card** (light): Capítulo VI — "El Jardín Mágico" — "En el camino, Gerda encontró un jardín mágico. Una anciana amable la invitó a quedarse. Las flores cantaban historias… pero ninguna hablaba de Kay."
- **Lumi**: "¡Qué jardín tan mágico! Pero Kay no está aquí..."

### 08 — El Cuervo y la Princesa
- **Background**: Gradient night blue (#0c1830 → #1a2d50)
- **Characters**: gerda-07-pointing-discovery.png
- **Effects**: Starry night, moonlight glow, castle silhouette in background
- **Card** (dark): Capítulo VII — "El Cuervo Sabio" — "Un cuervo sabio le contó a Gerda sobre un príncipe que se parecía a Kay. Corrió al castillo… pero no era él. La princesa, conmovida, le dio un abrigo cálido y un trineo dorado."
- **Lumi**: "El cuervo es muy listo. ¡Ayuda a Gerda!"

### 09 — La Niña Ladrona
- **Background**: Gradient dark forest (#2d4a14 → #1a3010)
- **Characters**: robber-girl-02-sitting-relaxed.png
- **Effects**: Campfire glow (warm orange circle), dark forest trees, fireflies
- **Card** (dark): Capítulo VIII — "La Niña Ladrona" — "Unos bandidos la atraparon en el bosque. Pero la hija de la jefa, una niña valiente y curiosa, se hizo su amiga. 'Te ayudaré', dijo. Y le dio su reno más fuerte."
- **Lumi**: "La niña ladrona tiene buen corazón. ¡Mira el reno!"

### 10 — El Reno y la Tormenta
- **Background**: NIEVE.mp4 (video) + gradient (#030a18)
- **Characters**: gerda-03-running-urgent.png (riding pose)
- **Effects**: Maximum blizzard particles, wind streaks, dramatic parallax mountains
- **Card** (dark): Capítulo IX — "La Tormenta" — "El reno corrió por la nieve con Gerda en su lomo. La tormenta era terrible, pero Gerda no tenía miedo. Su amor por Kay la hacía más fuerte que el viento."
- **Lumi**: "¡Vamos reno, corre! ¡La tormenta es terrible!"

### 11 — El Palacio de Hielo
- **Background**: Gradient deep ice (#041224 → #010710)
- **Characters**: snow-queen-04-walking-gliding.png (distant silhouette)
- **Effects**: Ice crystal parallax layers, cold shimmer, geometric ice patterns
- **Card** (dark): Capítulo X — "El Palacio de Hielo" — "Al fin llegaron. El palacio brillaba como un diamante helado. Todo era frío, silencioso y enorme. La Reina no estaba… pero Kay sí."
- **Lumi**: "El palacio brilla como un diamante... pero qué frío."

### 12 — Kay Prisionero (Pin Parallax)
- **Background**: Gradient void (#020810 → #030c1a)
- **Characters**: kay-frozen-04-transition-awakening.png (sitting, frozen)
- **Effects**: Pin parallax with ice depth layers, frost fog, ice letter tiles ("ETERNIDAD")
- **Layout**: Pinned section with parallax scroll revealing layers
- **Card** (dark): Capítulo XI — "El Prisionero de Hielo" — "Kay estaba sentado en el suelo de hielo, intentando formar la palabra 'ETERNIDAD' con pedazos de cristal. No sentía frío. No sentía nada."
- **Lumi**: "Kay está ahí... pero no siente nada. ¡Ánimo Gerda!"

### 13 — Las Lágrimas de Gerda
- **Background**: Gradient transition blue → gold (#0d2a50 → #FFF8E7)
- **Characters**: gerda-05-arms-open-joy.png + kay-normal-04-crying-relief.png
- **Effects**: Heart particles rising, golden light explosion, ice melting visual, warm glow spreading
- **Card** (transitioning dark→light): Capítulo XII — "Las Lágrimas Mágicas" — "Gerda corrió hacia Kay y lo abrazó. Lloró con todo su corazón. Sus lágrimas calientes cayeron sobre el pecho de Kay… y derritieron la astilla de hielo. Kay parpadeó. Y recordó todo."
- **Lumi**: "¡Las lágrimas de Gerda son mágicas! ¡El amor lo puede todo!"

### 14 — De Vuelta a Casa
- **Background**: Gradient warm gold (#FFF8E7 → #FFE4B5)
- **Characters**: kay-normal-05-hugging-grateful.png + gerda-05-arms-open-joy.png
- **Effects**: Confetti, blooming flowers, butterflies, spring colors, celebration
- **Card** (light): Capítulo XIII — "Final Feliz" — "Volvieron a casa tomados de la mano. Las rosas del jardín florecieron. El invierno se fue. Y el amor, como siempre, venció al frío."
- **Lumi**: "¡Final feliz! El amor siempre vence al frío."
- **Extras**: "Fin" title with golden glow, replay button

---

## Narrator Lumi

- **Position**: `fixed`, bottom: 0, left: 0, width: 100%, z-index: 400
- **Avatar**: 🦋 emoji inside gradient circle (gold → rose), floating animation (3s)
- **Bubble**: White rounded, max-width 340px, font Nunito 700, shadow
- **Behavior**: Text updates on section enter via ScrollTrigger `onEnter`
- **Transition**: gsap opacity 0 → update text → opacity 1 (0.3s each)

## StoryCard Component

- **Dark variant**: `bg rgba(4,16,30,.72)`, backdrop-blur 20px, border ice/10
- **Light variant**: `bg rgba(255,255,255,.82)`, backdrop-blur 20px, border white
- **Structure**: Eyebrow (gold, uppercase, tracking wide) → Rule (gradient line) → Title (serif italic) → Body (round) → Hint (optional)
- **Entry animation**: GSAP fade + slide up, triggered by ScrollTrigger

## ParallaxBg Component

- **Props**: `imageSrc?`, `videoSrc?`, `gradient`, `parallaxSpeed` (0.1-0.5)
- **Image mode**: Next.js `<Image fill>` with parallax Y via ScrollTrigger
- **Video mode**: `<video muted autoPlay loop playsInline>` with gradient overlay
- **Fallback**: CSS gradient from section palette
- **Ken Burns**: Subtle scale animation (1 → 1.06 over 12s)

## ProgressNav

- **14 dots** fixed right side, centered vertically
- **Active dot**: enlarged (5→7px width, 5→22px height), ice glow, accent color
- **Click**: `lenis.scrollTo(targetSection, { duration: 1.5 })`
- **Update**: ScrollTrigger toggleClass per section

## Implementation Layers (Layer Cake approach)

1. **Layer 1 — Structure + Content**: All 14 section shells with backgrounds (image/video/gradient) + StoryCard text + Narrator Lumi
2. **Layer 2 — Scroll System**: Lenis + ScrollTrigger snap + horizontal scroll (S03) + pin parallax (S12) + ProgressNav
3. **Layer 3 — Characters**: PNG images with Character component, entry animations, breathing, parallax
4. **Layer 4 — Effects**: Aurora, mountains, snow particles, storm, frost, petals, crystals, hearts, confetti per section
5. **Layer 5 — Polish**: Transitions between sections, loading screen, custom cursor refinement, responsive tuning, performance optimization

---

## Available Assets

### Character Images (transparent PNG/WebP)
- gerda-01-standing-happy (.png/.webp)
- gerda-02-walking-determined
- gerda-03-running-urgent
- gerda-04-kneeling-crying
- gerda-05-arms-open-joy
- gerda-07-pointing-discovery
- gerda-08-looking-up-wonder
- kay-normal-02-laughing-playing (.png/.webp)
- kay-normal-04-crying-relief
- kay-normal-05-hugging-grateful
- kay-frozen-04-transition-awakening
- snow-queen-02-arms-commanding
- snow-queen-04-walking-gliding
- snow-queen-05-pointing-decree
- robber-girl-02-sitting-relaxed
- witch-01-standing-welcoming
- witch-02-gardening-tending

### Scene Backgrounds
- scene-01-intro.png/.webp
- SECCION2.png
- SECCION3.png
- SECCION5.png

### Videos
- JARDINGERDAYKAY.mp4 (garden scene)
- ESPEJO ROTO.mp4 (mirror breaking)
- SECCION4.mp4 (shard/ice heart)
- NIEVE.mp4 (snow/blizzard)
- GERDACAMINANDO.mp4 (Gerda walking)

### Character Videos (background-removed)
- KAYFELIZTRISTE-Picsart-BackgroundRemover.mp4
- KAYLLORANDO-Picsart-BackgroundRemover.mp4
- KAYSUSPIRA-Picsart-BackgroundRemover.mp4
- GERDAFELIZTRISTE-Picsart-BackgroundRemover.mp4
- GERDALLORANDO-Picsart-BackgroundRemover.mp4
