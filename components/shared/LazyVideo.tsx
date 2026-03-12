'use client';

import { useLazyVideo } from '@/lib/useLazyVideo';
import Image from 'next/image';

interface LazyVideoProps {
  src: string;
  className?: string;
  /** Use mix-blend-mode:screen to hide black backgrounds in MP4 videos */
  transparentBg?: boolean;
  /** PNG fallback for mobile (iOS doesn't support mix-blend-mode on video) */
  mobileSrc?: string;
  alt?: string;
}

export function LazyVideo({ src, className, transparentBg = false, mobileSrc, alt = '' }: LazyVideoProps) {
  const videoRef = useLazyVideo();

  if (transparentBg && mobileSrc) {
    return (
      <>
        {/* Desktop: video with blend mode */}
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          className={`${className} hidden md:block`}
          style={{ mixBlendMode: 'screen' }}
        />
        {/* Mobile: PNG with real transparency */}
        <Image
          src={mobileSrc}
          alt={alt}
          fill
          sizes="30vw"
          className={`${className} block md:hidden`}
        />
      </>
    );
  }

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
