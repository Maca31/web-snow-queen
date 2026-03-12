'use client';

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/scroll";

import LoadingScreen from "./LoadingScreen";
import CustomCursor from "./CustomCursor";
import SnowParticles from "./SnowParticles";
import { ProgressNav } from "./shared/ProgressNav";
import { Narrator } from "./shared/Narrator";
import { StoryNarrator } from "./StoryNarrator";

interface RootClientProps {
  children: React.ReactNode;
}

export function RootClient({ children }: RootClientProps) {
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      lenis?.destroy?.();
    };
  }, []);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SnowParticles />
      <ProgressNav />
      <Narrator />
      <StoryNarrator />
      {children}
    </>
  );
}
