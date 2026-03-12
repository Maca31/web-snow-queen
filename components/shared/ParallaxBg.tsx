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
  objectFit?: 'cover' | 'contain';
  bgColor?: string;
}

export function ParallaxBg({
  imageSrc,
  videoSrc,
  imageAlt = 'Scene background',
  gradient,
  parallaxSpeed = 0.2,
  imageOpacity = 0.6,
  blendMode = 'normal',
  objectFit = 'cover',
  bgColor,
}: ParallaxBgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);

  // Parallax movement
  useEffect(() => {
    const container = containerRef.current;
    const media = mediaRef.current;
    if (!container || !media || parallaxSpeed === 0) return;

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
    });

    return () => ctx.revert();
  }, [parallaxSpeed]);

  // Video: play/pause based on visibility
  useEffect(() => {
    const video = videoElRef.current;
    if (!video || !videoSrc) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoSrc]);

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
        className="absolute inset-0"
        style={{ opacity: imageOpacity, mixBlendMode: blendMode as React.CSSProperties['mixBlendMode'], backgroundColor: bgColor }}
      >
        {videoSrc && (
          <video
            ref={videoElRef}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="none"
            className={`h-full w-full ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
          />
        )}
        {imageSrc && !videoSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className={objectFit === 'contain' ? 'object-contain' : 'object-cover'}
          />
        )}
      </div>
    </div>
  );
}
