'use client';

import { forwardRef, useRef } from "react";

interface SectionWrapperProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const SectionWrapper = forwardRef<HTMLElement, SectionWrapperProps>(
  ({ id, className, children }, ref) => {
    const internalRef = useRef<HTMLElement | null>(null);
    const sectionRef = (ref as React.RefObject<HTMLElement>) || internalRef;

    return (
      <section id={id} ref={sectionRef} className={className}>
        {children}
      </section>
    );
  }
);

SectionWrapper.displayName = 'SectionWrapper';
