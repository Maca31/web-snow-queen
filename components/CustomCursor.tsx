'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // quickTo creates a single reusable tween — much faster than gsap.to() per event
    const cursorX = gsap.quickTo(cursor, 'x', { duration: 0.1, ease: 'power2.out' });
    const cursorY = gsap.quickTo(cursor, 'y', { duration: 0.1, ease: 'power2.out' });
    const followerX = gsap.quickTo(follower, 'x', { duration: 0.4, ease: 'power2.out' });
    const followerY = gsap.quickTo(follower, 'y', { duration: 0.4, ease: 'power2.out' });

    const moveCursor = (e: MouseEvent) => {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });

    const scaleCursor = () => {
      gsap.to([cursor, follower], { scale: 1.5, duration: 0.2 });
      gsap.to([cursor, follower], { scale: 1, duration: 0.2, delay: 0.2 });
    };
    window.addEventListener('mousedown', scaleCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', scaleCursor);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-full w-full text-white">
          <path
            d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/5 opacity-50 backdrop-blur-[1px]"
      />
    </>
  );
}
