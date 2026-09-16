"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * skiper86 — Apple Intelligence border gradient (recreated from Skiper UI Pro).
 * Animated rotating gradient border with sound effects on toggle.
 */

function Skiper86({
  className = "",
  children,
  enableSound = true,
  defaultActive = false,
}: {
  className?: string;
  children?: React.ReactNode;
  enableSound?: boolean;
  defaultActive?: boolean;
}) {
  const [isActive, setIsActive] = useState(defaultActive);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = (on: boolean) => {
    if (!enableSound) return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    filter.type = "lowpass";
    filter.frequency.value = on ? 800 : 400;
    osc.frequency.setValueAtTime(on ? 300 : 200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(on ? 600 : 100, ctx.currentTime + 0.15);
    osc.type = "sine";
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  const toggle = () => {
    const next = !isActive;
    setIsActive(next);
    playSound(next);
  };

  return (
    <div
      className={cn("relative", className)}
      onClick={toggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && toggle()}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute -inset-px rounded-[inherit]"
            style={{
              background:
                "conic-gradient(from var(--angle, 0deg), oklch(0.7 0.25 0), oklch(0.7 0.25 120), oklch(0.7 0.25 240), oklch(0.7 0.25 360))",
              animation: "skiper86-rotate 4s linear infinite",
              filter: "blur(8px)",
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 rounded-[inherit] transition-all duration-500",
          isActive ? "bg-card/90" : "bg-card/60",
        )}
        style={{
          boxShadow: isActive
            ? "0 0 24px oklch(0.7 0.25 0 / 0.15), inset 0 0 1px oklch(0.7 0.25 0 / 0.3)"
            : "none",
        }}
      >
        {children ?? (
          <div className="flex items-center gap-3 p-4">
            <span
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-colors",
                isActive ? "bg-primary" : "bg-muted-foreground",
              )}
            />
            <span className="text-sm text-foreground">
              {isActive ? "Gradient active — click to turn off" : "Click to see the border gradient"}
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes skiper86-rotate {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
      `}</style>
    </div>
  );
}

export { Skiper86 };
