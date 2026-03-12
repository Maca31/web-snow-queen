'use client';

import { useLazyVideo } from '@/lib/useLazyVideo';

interface LazyVideoProps {
  src: string;
  className?: string;
  /** Use mix-blend-mode:screen to hide black backgrounds in MP4 videos */
  transparentBg?: boolean;
}

export function LazyVideo({ src, className, transparentBg = false }: LazyVideoProps) {
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
      style={transparentBg ? { mixBlendMode: 'screen' } : undefined}
    />
  );
}
