# Hero Cinematic Intro — Design Document

**Date:** 2026-03-07
**Concept:** "El mundo se congela ante tus ojos" — An 8-step cinematic intro sequence for the hero section.

## Decisions

- **Approach:** Single GSAP Master Timeline
- **Queen silhouette:** Existing Queen PNG with dark filter
- **Background:** Pure code-generated (CSS gradients + SVG aurora + canvas snowflakes) — no background image
- **Mobile cursor effects:** Device gyroscope with touch fallback
- **Replay:** First visit only (sessionStorage); return visits skip to final state

## Architecture

Single rewritten `Section01Intro.tsx` with a GSAP master timeline. Existing `AuroraEffect` and `MountainSilhouette` components are removed (aurora is inlined for timeline control; mountains don't fit the new concept).

New hook `lib/useGyroscope.ts` for device orientation with touch fallback.

```
Page load → Check sessionStorage("heroPlayed")
  ├─ First visit: Play full 8-step timeline (~5s)
  └─ Return visit: Render final state instantly
```

## 8-Step Animation Sequence (~5s total)

| Step | Time | Description |
|------|------|-------------|
| 1 | 0–0.5s | Black void — pure black screen |
| 2 | 0.5–2.0s | Single snowflake drifts to center, lands |
| 3 | 2.0–3.5s | Aurora SVG explodes outward from impact point |
| 4 | 3.0–4.2s | Title crystallizes letter-by-letter from center (elastic stagger) |
| 5 | 3.8–5.0s | Queen PNG silhouette revealed via clip-path freeze (bottom-to-top) |
| 6 | 5.0s+ | Aurora parallax follows cursor/gyroscope (persistent) |
| 7 | 4.5s+ | Bouncing snowflake scroll indicator fades in |
| 8 | 5.0s+ | Cursor/touch spawns micro-snowflakes on canvas (persistent) |

## Technical Details

### Canvas
One `<canvas>` element handles:
- Step 2: Single intro snowflake falling to center
- Step 8: Cursor micro-snowflakes (spawned on mousemove, fade out)
- After aurora explosion: 120 ambient snowflakes start falling

### Aurora SVG
Same 3-ellipse radialGradient approach. Initially `scale(0) opacity(0)`, GSAP scales it up from center. After intro, `mousemove`/gyroscope shifts position via `gsap.quickTo()`.

### Queen Silhouette
`<Image>` with `filter: brightness(0.15) saturate(0)` and `clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)`. Positioned behind title, semi-transparent.

### Gyroscope Hook (`lib/useGyroscope.ts`)
- Desktop: `mousemove` normalized to [-1, 1]
- Mobile: `DeviceOrientationEvent` with `requestPermission()` for iOS
- Fallback: touch position
- Output: `{ x: number, y: number }` via ref for 60fps reads

### Skip Logic
- Timeline `onComplete` → `sessionStorage.setItem('heroPlayed', '1')`
- On mount: if key exists → set CSS to final state, no timeline

## Files Changed

| Action | File |
|--------|------|
| Rewrite | `components/sections/Section01Intro.tsx` |
| Create | `lib/useGyroscope.ts` |
| Delete | `components/shared/AuroraEffect.tsx` |
| Delete | `components/shared/MountainSilhouette.tsx` |
