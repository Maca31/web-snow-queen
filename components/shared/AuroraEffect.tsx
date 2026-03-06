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
