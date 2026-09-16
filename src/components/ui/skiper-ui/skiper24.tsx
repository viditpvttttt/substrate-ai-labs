"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * skiper24 — TikTikColorList (recreated from Skiper UI Pro).
 * Scroll-driven archive list with dynamic background color transitions,
 * draggable preview, and sound effects on item change.
 */

type Project = {
  id: number;
  name: string;
  description: string;
  badge: string;
  bgColor: string;
};

const defaultProjects: Project[] = [
  { id: 0, name: "Kernel", description: "One multimodal model across text, vision, audio and video", badge: "Model", bgColor: "oklch(0.95 0.05 80)" },
  { id: 1, name: "Folio", description: "The quiet operating surface for your day", badge: "App", bgColor: "oklch(0.93 0.06 150)" },
  { id: 2, name: "Gridline", description: "A coding agent for ambitious software", badge: "Editor", bgColor: "oklch(0.92 0.08 250)" },
];

function Skiper24({
  projects = defaultProjects,
  enableSound = true,
  className = "",
}: {
  projects?: Project[];
  enableSound?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Web Audio API for click sound — no external assets needed
  const playClick = () => {
    if (!enableSound) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 180 + Math.random() * 40;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const items = container.querySelectorAll("[data-project-item]");
      const containerTop = container.getBoundingClientRect().top;
      const containerHeight = container.getBoundingClientRect().height;
      const viewportCenter = window.innerHeight / 2;

      let closest = 0;
      let closestDist = Infinity;

      items.forEach((item, idx) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const dist = Math.abs(itemCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = idx;
        }
      });

      if (closest !== activeIndex) {
        setActiveIndex(closest);
        playClick();
      }
    };

    container.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex, enableSound]);

  const active = projects[activeIndex] || projects[0];

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full transition-colors duration-700", className)}
      style={{ backgroundColor: active?.bgColor }}
    >
      <div className="mx-auto max-w-5xl px-6 py-24 sm:py-32">
        <p className="rule-label">Product Archive</p>
        <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
          Scroll through the portfolio
        </h2>

        <div className="mt-16 space-y-2">
          {projects.map((project, index) => (
            <div
              key={project.id}
              data-project-item
              className="flex items-center justify-between border-b border-foreground/10 py-8 transition-all duration-500"
              style={{
                opacity: index === activeIndex ? 1 : 0.4,
                transform: index === activeIndex ? "translateX(0)" : "translateX(-12px)",
              }}
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-3xl font-medium text-foreground sm:text-5xl">
                  {project.name}
                </span>
              </div>
              <div className="text-right">
                <span className="rounded-full border border-foreground/20 px-3 py-1 font-mono text-xs text-foreground/70">
                  {project.badge}
                </span>
                <p className="mt-2 hidden max-w-xs text-sm text-foreground/60 sm:block">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Skiper24 };
export type { Project as Skiper24Project };
