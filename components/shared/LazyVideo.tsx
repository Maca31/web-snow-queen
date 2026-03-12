'use client';

import { useLazyVideo } from '@/lib/useLazyVideo';

interface LazyVideoProps {
  src: string;
  className?: string;
}

export function LazyVideo({ src, className }: LazyVideoProps) {
  const videoRef = useLazyVideo();

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
