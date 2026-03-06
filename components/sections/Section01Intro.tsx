'use client';

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "./SectionWrapper";

gsap.registerPlugin(ScrollTrigger);

export function Section01Intro() {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = titleRef.current?.querySelectorAll<HTMLSpanElement>(
        "[data-letter]"
      );

      // Ken Burns sobre el fondo
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          scale: 1.06,
          xPercent: 2,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Título letra por letra
      if (letters && letters.length > 0) {
        gsap.fromTo(
          letters,
          {
            opacity: 0,
            y: 80,
            rotateZ: (index) => (index % 2 === 0 ? -15 : 15),
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateZ: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "elastic.out(1, 0.7)",
            stagger: {
              each: 0.08,
              from: "center",
            },
          }
        );
      }

      // Subtítulo
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.5,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    type Snowflake = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
    };

    const flakes: Snowflake[] = [];
    const FLAKE_COUNT = 120;

    for (let i = 0; i < FLAKE_COUNT; i += 1) {
      flakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 1.2 + 0.3,
        size: Math.random() * 2.5 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      flakes.forEach((flake) => {
        flake.x += flake.vx;
        flake.y += flake.vy;
        flake.rotation += flake.rotationSpeed;

        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }

        if (flake.x > canvas.width) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = canvas.width;
        }

        const gradient = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          flake.size * 2
        );
        gradient.addColorStop(0, "rgba(255,255,255,0.9)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const renderTitle = () => {
    const text = "LA REINA DE LAS NIEVES";
    return text.split("").map((char, index) => {
      if (char === " ") {
        return (
          <span key={`space-${index}`} className="inline-block w-2" aria-hidden>
            &nbsp;
          </span>
        );
      }

      return (
        <span
          key={`${char}-${index}`}
          data-letter
          className="inline-block origin-bottom drop-shadow-[0_0_25px_rgba(248,250,252,0.9)]"
        >
          {char}
        </span>
      );
    });
  };

  return (
    <SectionWrapper
      id="section-01-hero"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950"
    >
      {/* Fondo aurora / noche polar */}
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 z-0 scale-[1.02] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),_transparent_55%),radial-gradient(circle_at_20%_20%,_rgba(196,181,253,0.3),_transparent_50%),radial-gradient(circle_at_80%_0%,_rgba(96,165,250,0.35),_transparent_55%),linear-gradient(to_bottom,_#020617,_#020617_40%,_#020617)]"
      >
        <Image
          src="/images/story/scene-01-intro.webp"
          alt="Aurora boreal sobre la noche ártica"
          fill
          sizes="100vw"
          className="object-cover opacity-70 mix-blend-screen"
          priority
        />
      </div>

      {/* Copos de nieve en canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10"
        aria-hidden="true"
      />

      {/* Círculo de luz central */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,_rgba(248,250,252,0.16),_transparent_55%)]" />

      {/* Contenido principal */}
      <div className="relative z-30 flex max-w-5xl flex-col items-center gap-8 px-6 text-center">
        <p className="text-xs uppercase tracking-[0.45em] text-sky-200/80">
          Un cuento de invierno
        </p>

        <h1
          ref={titleRef}
          className="text-balance text-4xl font-semibold leading-tight text-sky-50 md:text-6xl"
        >
          {renderTitle()}
        </h1>

        <p
          ref={subtitleRef}
          className="max-w-2xl text-balance text-sm text-slate-200/90 md:text-lg"
        >
          Una experiencia cinematográfica interactiva inspirada en el cuento de
          Hans Christian Andersen. Desplázate para volar entre luces del norte,
          espejos rotos y palacios de hielo.
        </p>
      </div>
    </SectionWrapper>
  );
}

