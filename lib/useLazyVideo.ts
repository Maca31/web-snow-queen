'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook that plays/pauses a video based on IntersectionObserver visibility.
 * Prevents all videos from autoplaying simultaneously.
 */
export function useLazyVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return videoRef;
}
