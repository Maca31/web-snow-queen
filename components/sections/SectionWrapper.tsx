'use client';

import { useEffect, useRef, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, className, children }, ref) => {
    const internalRef = useRef<HTMLElement | null>(null);
    const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;

    useEffect(() => {
      const section = sectionRef.current;
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
      });

      // Entry animation for section content
      const content = section.querySelector(':scope > div:not(.pointer-events-none)');
      if (content) {
        gsap.fromTo(content,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      return () => {
        trigger.kill();
      };
    }, []);

    return (
      <section id={id} ref={sectionRef} className={`${className} transition-all duration-700`}>
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';

