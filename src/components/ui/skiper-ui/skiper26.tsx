"use client";

import { motion, AnimatePresence } from "motion/react";
import { Moon, Sun } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * skiper26 — Theme toggle with View Transition API (adapted from Skiper UI).
 * Uses the document.startViewTransition API for smooth circular reveals.
 * Falls back to instant toggle in browsers without View Transition support.
 */
function Skiper26({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleTheme = useCallback(async () => {
    const newIsDark = !isDark;

    const applyTheme = () => {
      setIsDark(newIsDark);
      document.documentElement.classList.toggle("dark", newIsDark);
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
    };

    if (
      "startViewTransition" in document &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      (document as any).startViewTransition(() => {
        applyTheme();
      });
    } else {
      applyTheme();
    }
  }, [isDark]);

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-foreground/30",
        className,
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export { Skiper26 };
