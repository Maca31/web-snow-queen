import { Section01Intro } from "@/components/sections/Section01Intro";
import { Section02Garden } from "@/components/sections/Section02Garden";
import { Section03Mirror } from "@/components/sections/Section03Mirror";
import { Section04IceHeart } from "@/components/sections/Section04IceHeart";
import { Section05Queen } from "@/components/sections/Section05Queen";
import { Section06Search } from "@/components/sections/Section06Search";
import { Section07Garden } from "@/components/sections/Section07Garden";
import { Section08Crow } from "@/components/sections/Section08Crow";
import { Section09Robber } from "@/components/sections/Section09Robber";
import { Section10Storm } from "@/components/sections/Section10Storm";
import { Section11Palace } from "@/components/sections/Section11Palace";
import { Section12Prisoner } from "@/components/sections/Section12Prisoner";
import { Section13Tears } from "@/components/sections/Section13Tears";
import { SectionQueenDefeated } from "@/components/sections/SectionQueenDefeated";
import { Section14Finale } from "@/components/sections/Section14Finale";

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <Section01Intro />
      <Section02Garden />
      <Section03Mirror />
      <Section04IceHeart />
      <Section05Queen />
      <Section06Search />
      <Section07Garden />
      <Section08Crow />
      <Section09Robber />
      <Section10Storm />
      <Section11Palace />
      <Section12Prisoner />
      <Section13Tears />
      <SectionQueenDefeated />
      <Section14Finale />
    </main>
  );
}
