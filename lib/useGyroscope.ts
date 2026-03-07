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
    const gamma = e.gamma ?? 0;
    const beta = e.beta ?? 0;
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
