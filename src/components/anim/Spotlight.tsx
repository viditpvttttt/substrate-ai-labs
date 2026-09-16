import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";

/**
 * A soft radial glow that follows the pointer across its parent section.
 * Absolutely positioned; the parent must be `position: relative`.
 */
export function Spotlight({ className = "" }: { className?: string }) {
  const x = useMotionValue(50);
  const y = useMotionValue(35);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth) * 100);
      y.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  const background = useMotionTemplate`radial-gradient(34rem circle at ${sx}% ${sy}%, color-mix(in oklab, var(--spectral-b) 14%, transparent), transparent 70%)`;

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ background }}
      aria-hidden="true"
    />
  );
}
