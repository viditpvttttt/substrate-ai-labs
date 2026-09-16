"use client";

import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import { cn } from "@/lib/utils";
import { BrandLogo } from "@/components/BrandLogo";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  return (
    <motion.span
      className={cn("inline-block text-foreground", isSpace && "w-4")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV2 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [Math.abs(distanceFromCenter) * 50, 0]);
  return (
    <motion.span
      className="inline-block"
      style={{ x, scale, y, transformOrigin: "center" }}
    >
      {char}
    </motion.span>
  );
};

const CharacterV3 = ({ char, index, centerIndex, scrollYProgress }: CharacterProps) => {
  const distanceFromCenter = index - centerIndex;
  const x = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 90, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [distanceFromCenter * 50, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [-Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  return (
    <motion.span
      className="inline-block"
      style={{ x, rotate, y, scale, transformOrigin: "center", perspective: "500px" }}
    >
      {char}
    </motion.span>
  );
};

const appLogos = [
  { variant: "kernel" as const, name: "Kernel" },
  { variant: "folio" as const, name: "Folio" },
  { variant: "gridline" as const, name: "Gridline" },
];

/**
 * skiper31 — Text & icon scroll animation (adapted from Skiper UI).
 * Shows app names and logos with parallax scroll effects.
 */
function Skiper31() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({ target: targetRef2 });

  const text = "one substrate every product";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);
  const iconCenterIndex = Math.floor(appLogos.length / 2);

  return (
    <div className="w-full">
      <div
        ref={targetRef}
        className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-background p-[2vw]"
      >
        <div
          className="w-full max-w-4xl text-center text-5xl font-bold uppercase tracking-tighter text-foreground sm:text-6xl"
          style={{ perspective: "500px" }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
      <div
        ref={targetRef2}
        className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-8 overflow-hidden bg-background p-[2vw]"
      >
        <p className="flex items-center justify-center gap-3 text-xl font-medium tracking-tight text-muted-foreground">
          <Bracket className="h-10 text-foreground" />
          <span>built on one runtime</span>
          <Bracket className="h-10 scale-x-[-1] text-foreground" />
        </p>
        <div className="flex items-center justify-center gap-6 sm:gap-10">
          {appLogos.map((app, index) => (
            <CharacterV2
              key={app.name}
              char={app.name}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress2}
            />
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-8">
          {appLogos.map((app, index) => (
            <CharacterV3
              key={`icon-${app.name}`}
              char={app.name}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress2}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-center gap-6">
          {appLogos.map((app) => (
            <BrandLogo
              key={`mark-${app.name}`}
              variant={app.variant}
              alt=""
              className={`h-12 w-12 rounded-full bg-card p-1 shadow-sm ${
                app.variant === "kernel" ? "w-16" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { CharacterV1, CharacterV2, CharacterV3, Skiper31 };

const Bracket = ({ className }: { className: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
    <path
      fill="currentColor"
      d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
    />
  </svg>
);
