import { useEffect, useRef, useState, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Global scroll "tik-tik" sound effect — plays a subtle tick when the user
 * scrolls past section boundaries, like a Swiss watch movement.
 * Includes a Haptics ON/OFF toggle in the corner.
 * Respects prefers-reduced-motion.
 */
export function ScrollTickSound() {
  const [enabled, setEnabled] = useState(true);
  const [mounted, setMounted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastTickYRef = useRef(0);
  const tickIntervalRef = useRef(120); // px between ticks

  // Load preference from localStorage
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("haptics-enabled");
    if (stored !== null) {
      setEnabled(stored === "true");
    }
  }, []);

  const playTick = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    // High-frequency "tick" — short, crisp, watch-like
    osc.frequency.value = 1200 + Math.random() * 200;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.015, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let ticking = false;

    const handleScroll = () => {
      if (!enabled || ticking) return;
      ticking = true;

      const y = window.scrollY;
      const delta = Math.abs(y - lastTickYRef.current);

      if (delta >= tickIntervalRef.current) {
        lastTickYRef.current = y;
        playTick();
      }

      requestAnimationFrame(() => {
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled, mounted, playTick]);

  const toggleHaptics = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem("haptics-enabled", String(next));
    if (next) playTick(); // play a tick to confirm it's on
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleHaptics}
      className={cn(
        "fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-foreground/30",
      )}
      aria-label={enabled ? "Disable haptics sound" : "Enable haptics sound"}
      title={enabled ? "Haptics: ON" : "Haptics: OFF"}
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
