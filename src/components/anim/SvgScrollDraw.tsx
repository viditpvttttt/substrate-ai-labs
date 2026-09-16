import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * A meandering SVG line whose stroke draws itself as the section scrolls
 * through the viewport.
 */
export function SvgScrollDraw({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.35"],
  });
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} className={className} aria-hidden="true">
      <svg viewBox="0 0 120 600" fill="none" className="h-full w-full" preserveAspectRatio="none">
        <motion.path
          d="M60 0
             C 60 60, 20 80, 20 140
             C 20 200, 100 210, 100 270
             C 100 330, 20 340, 20 400
             C 20 460, 100 470, 100 530
             C 100 570, 60 580, 60 600"
          stroke="url(#draw-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient
            id="draw-gradient"
            x1="0"
            y1="0"
            x2="0"
            y2="600"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--spectral-b)" />
            <stop offset="0.5" stopColor="var(--spectral-r)" />
            <stop offset="1" stopColor="var(--spectral-g)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
