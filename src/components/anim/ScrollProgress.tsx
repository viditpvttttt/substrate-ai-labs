import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin spectral progress bar pinned to the top of the viewport.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-[var(--spectral-b)] via-[var(--spectral-r)] to-[var(--spectral-g)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
