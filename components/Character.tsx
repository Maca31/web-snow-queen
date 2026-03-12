'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

interface CharacterProps {
    src: string;
    alt: string;
    depth?: number; // 1 (closest) to 5 (furthest)
    className?: string;
    alive?: boolean;
}

export default function Character({ src, alt, depth = 3, className = '', alive = false }: CharacterProps) {
    const charRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const char = charRef.current;
        if (!char) return;

        // quickTo reuses a single tween — avoids creating 120+ tweens/sec
        const moveX = gsap.quickTo(char, 'x', { duration: 0.8, ease: 'power2.out' });
        const moveY = gsap.quickTo(char, 'y', { duration: 0.8, ease: 'power2.out' });

        const factor = 10 / depth;

        const handleMouseMove = (e: MouseEvent) => {
            const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
            const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;
            moveX(xPercent * 20 * factor);
            moveY(yPercent * 20 * factor);
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [depth]);

    const scale = 1 + (5 - depth) * 0.1;
    const blur = `${(depth - 1) * 0.5}px`;

    return (
        <div
            ref={charRef}
            className={`character-wrapper ${className} ${alive ? 'is-alive' : ''}`}
            style={{
                zIndex: 10 + (5 - depth),
                '--scale': scale,
                '--blur': blur,
            } as React.CSSProperties}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="20vw"
                className="character-image drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                loading="lazy"
            />
            <div className="character-shadow" style={{ '--depth': depth } as React.CSSProperties} />
        </div>
    );
}
