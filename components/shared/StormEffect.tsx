'use client';

/**
 * StormEffect — CSS-only diagonal wind/blizzard streaks.
 * Renders a grid of thin white lines that sweep diagonally across the section.
 * Fully pointer-events-none and positioned absolute so it never blocks content.
 */
export function StormEffect({ intensity = 'normal' }: { intensity?: 'light' | 'normal' | 'heavy' }) {
  const count = intensity === 'light' ? 8 : intensity === 'heavy' ? 20 : 14;

  // Pre-calculate deterministic values for each streak to avoid layout shift
  const streaks = Array.from({ length: count }, (_, i) => {
    const seed = i * 7 + 3;
    const top = (seed * 13) % 100;             // vertical start 0-100%
    const left = (seed * 17) % 80;             // horizontal start 0-80%
    const width = 60 + (seed % 80);            // length 60-140px
    const duration = 1.2 + (seed % 15) * 0.1;  // speed 1.2-2.6s
    const delay = (seed % 20) * 0.15;          // stagger 0-3s
    const opacity = 0.15 + (seed % 5) * 0.08;  // opacity 0.15-0.47

    return { top, left, width, duration, delay, opacity };
  });

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {streaks.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.width}px`,
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 40%, rgba(200,230,255,0.6) 70%, transparent 100%)',
            opacity: s.opacity,
            animation: `stormStreak ${s.duration}s linear ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
