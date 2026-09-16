import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * A colored box sweeps across the content, revealing it in its wake.
 */
export function BoxReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <span ref={ref} className={`relative inline-block overflow-hidden ${className}`}>
      <motion.span
        className="inline-block"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.42, duration: 0.01 }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute inset-0 z-10 bg-clay"
        initial={{ x: "-102%" }}
        animate={inView ? { x: ["-102%", "0%", "102%"] } : {}}
        transition={{
          delay,
          duration: 0.9,
          times: [0, 0.45, 1],
          ease: [0.76, 0, 0.24, 1],
        }}
        aria-hidden="true"
      />
    </span>
  );
}
