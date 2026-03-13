import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initSmoothScroll = () => {
  if (typeof window === "undefined") return null;

  const lenis = new Lenis({
    duration: 1.0,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
    touchMultiplier: 2,
    autoResize: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  /* ── Snap-to-section (suave) ── */
  let snapTimer: ReturnType<typeof setTimeout> | null = null;
  let isSnapping = false;

  const snapToNearest = () => {
    if (isSnapping) return;

    const sections = document.querySelectorAll("main > section[id]");
    if (!sections.length) return;

    const vh = window.innerHeight;
    let nearest: Element | null = null;
    let minDist = Infinity;

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      const dist = Math.abs(top);
      if (dist < minDist) {
        minDist = dist;
        nearest = section;
      }
    });

    // Only snap if between 5% and 45% misaligned (avoid fighting user scroll)
    if (nearest && minDist > vh * 0.05 && minDist < vh * 0.45) {
      isSnapping = true;
      lenis.scrollTo(nearest as HTMLElement, {
        duration: 0.9,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          setTimeout(() => {
            isSnapping = false;
          }, 200);
        },
      });
    }
  };

  lenis.on("scroll", () => {
    if (isSnapping) return;
    if (snapTimer) clearTimeout(snapTimer);
    snapTimer = setTimeout(snapToNearest, 500);
  });

  return lenis;
};

