'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxBgProps {
  imageSrc?: string;
  videoSrc?: string;
  imageAlt?: string;
  gradient?: string;
  parallaxSpeed?: number;
  imageOpacity?: number;
  blendMode?: string;
  kenBurns?: boolean;
}

export function ParallaxBg({
  imageSrc,
  videoSrc,
  imageAlt = 'Scene background',
  gradient,
  parallaxSpeed = 0.2,
  imageOpacity = 0.6,
  blendMode = 'normal',
  kenBurns = false,
}: ParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const media = mediaRef.current;
    if (!container || !media) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(media,
        { yPercent: -parallaxSpeed * 50 },
        {
          yPercent: parallaxSpeed * 50,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      if (kenBurns) {
        gsap.to(media, {
          scale: 1.06,
          xPercent: 2,
          duration: 12,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }
    });

    return () => ctx.revert();
  }, [parallaxSpeed, kenBurns]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {gradient && (
        <div className="absolute inset-0" style={{ background: gradient }} />
      )}

      <div
        ref={mediaRef}
        data-parallax-media
        className="absolute inset-0 scale-110"
        style={{ opacity: imageOpacity, mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'] }}
      >
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        )}
        {imageSrc && !videoSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
