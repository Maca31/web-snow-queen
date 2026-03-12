'use client';

import { useEffect, useRef } from 'react';

export default function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = 0;
    const FRAME_INTERVAL = 1000 / 30; // Cap at 30fps — half the GPU cost
    const PARTICLE_COUNT = 25; // Reduced from 50

    interface Flake {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }

    let particles: Flake[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Throttle to 30fps
      if (time - lastTime < FRAME_INTERVAL) return;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > canvas.height) { p.y = -10; p.x = Math.random() * canvas.width; }
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }
    };

    init();
    animationFrameId = requestAnimationFrame(animate);

    // Debounced resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 200);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50 opacity-40"
    />
  );
}
