'use client';

/**
 * RainEffect — CSS-only vertical rain drops.
 * Renders thin lines that fall from top to bottom with slight angle.
 * Fully pointer-events-none and positioned absolute.
 */
export function RainEffect({ intensity = 'normal' }: { intensity?: 'light' | 'normal' | 'heavy' }) {
  const count = intensity === 'light' ? 40 : intensity === 'heavy' ? 100 : 65;

  const drops = Array.from({ length: count }, (_, i) => {
    const seed = i * 11 + 5;
    const left = (seed * 17 + i * 31) % 100;
    const startTop = (seed * 7) % 100;           // spread across full height
    const height = 22 + (seed % 28);
    const duration = 0.8 + (seed % 12) * 0.1;
    const delay = (i * 0.06);                     // stagger evenly
    const opacity = 0.35 + (seed % 4) * 0.12;

    return { left, startTop, height, duration, delay, opacity };
  });

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden" aria-hidden="true">
      {drops.map((d, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: `${d.left}%`,
            top: `${d.startTop}%`,
            width: '2px',
            height: `${d.height}px`,
            background: 'linear-gradient(180deg, transparent 0%, rgba(200,220,255,0.9) 30%, rgba(160,195,240,0.6) 100%)',
            opacity: d.opacity,
            borderRadius: '0 0 2px 2px',
            animation: `rainDrop ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes rainDrop {
          0%   { transform: translateY(0) translateX(0); opacity: 1; }
          100% { transform: translateY(100vh) translateX(-8px); opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
