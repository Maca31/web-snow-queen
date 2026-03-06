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
