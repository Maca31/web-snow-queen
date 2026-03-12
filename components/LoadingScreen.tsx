'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const tl = gsap.timeline({
                onComplete: () => setIsHidden(true),
            });

            tl.to('.loading-text', { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' })
                .to('.loading-bar-container', { scaleX: 0, duration: 0.8, ease: 'power4.inOut' })
                .to('.loading-screen', {
                    clipPath: 'circle(0% at 50% 50%)',
                    duration: 1.2,
                    ease: 'expo.inOut',
                });
        }
    }, [progress]);

    if (isHidden) return null;

    const title = 'SNOW';
    const accent = 1; // index of the accent letter (N)

    return (
        <div className="loading-screen fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0B1628 0%, #0F2044 100%)' }}
        >
            {/* Background ambient light */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(30,58,138,0.3),_transparent_70%)]" />

            <div className="relative z-10 flex flex-col items-center">
                <div className="loading-text mb-8 flex flex-col items-center">
                    {/* Main title — letter by letter for correct spacing */}
                    <div className="flex items-baseline justify-center" style={{ gap: 'clamp(0.3rem, 1.5vw, 0.8rem)' }}>
                        {title.split('').map((char, i) => (
                            <span
                                key={i}
                                style={{
                                    fontFamily: 'var(--font-title)',
                                    fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                                    fontWeight: 700,
                                    letterSpacing: '0.1em',
                                    lineHeight: 1,
                                    color: i === accent ? '#7dd3fc' : '#f0f9ff',
                                    textShadow: i === accent
                                        ? '0 0 30px rgba(125,211,252,0.5), 0 0 60px rgba(125,211,252,0.2)'
                                        : '0 0 20px rgba(186,230,253,0.15)',
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>

                    {/* Subtitle */}
                    <p
                        className="mt-3 text-center uppercase text-sky-300/50"
                        style={{
                            fontFamily: 'var(--font-title)',
                            fontSize: 'clamp(0.6rem, 1.5vw, 0.85rem)',
                            letterSpacing: '0.8em',
                            fontWeight: 400,
                        }}
                    >
                        EXPERIENCE
                    </p>
                </div>

                {/* Progress bar */}
                <div className="loading-bar-container relative h-[1px] w-64 overflow-hidden md:w-96"
                    style={{ background: 'rgba(186,230,253,0.1)' }}
                >
                    <div
                        className="h-full transition-all duration-300 ease-out"
                        style={{
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #7dd3fc, #bae6fd)',
                            boxShadow: '0 0 12px rgba(125,211,252,0.4)',
                        }}
                    />
                </div>

                {/* Percentage */}
                <div
                    className="loading-text mt-4 text-sky-200/40"
                    style={{
                        fontFamily: 'var(--font-title)',
                        fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                        letterSpacing: '0.3em',
                    }}
                >
                    {progress}%
                </div>
            </div>

            {/* Bottom hint */}
            <div
                className="absolute bottom-10 uppercase text-slate-500/50"
                style={{
                    fontFamily: 'var(--font-kids)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.3em',
                }}
            >
                Preparando el frío...
            </div>
        </div>
    );
}
