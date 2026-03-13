'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ProgressIndicator() {
    const [progress, setProgress] = useState(0);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        gsap.registerPlugin(ScrollTrigger);

        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const percentage = (scrolled / scrollHeight) * 100;
            setProgress(percentage);
        };

        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed right-6 top-1/2 z-[100] -translate-y-1/2 flex flex-col items-center gap-4">
            <div className="h-40 w-[1px] bg-white/10 relative overflow-hidden">
                <div
                    className="absolute top-0 w-full bg-sky-300 transition-all duration-300 ease-out"
                    style={{ height: `${progress}%` }}
                />
            </div>
            <div className="text-[10px] font-mono text-sky-200/50 vertical-text tracking-widest uppercase">
                Story Progress
            </div>

            <style>{`
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>
        </div>
    );
}
