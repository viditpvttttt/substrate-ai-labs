import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-to-expand — a panel that sits in a tall corridor and expands
 * from a rounded, inset card into a full-bleed frame as you scroll past,
 * then holds. Springed so the growth feels continuous, never snapped.
 */
export function ScrollExpand({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  const width = useTransform(progress, [0, 1], ["min(100% - 6rem, 48rem)", "100%"]);
  const borderRadius = useTransform(progress, [0, 1], ["1.5rem", "0rem"]);
  const shadow = useTransform(progress, (p: number) =>
    `0 ${24 + p * 40}px ${70 + p * 50}px -20px rgba(96, 133, 255, ${0.16 + p * 0.1})`,
  );

  return (
    <div ref={ref} className="relative h-[160vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div style={{ width, borderRadius, boxShadow: shadow }} className={`will-change-transform ${className}`}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
