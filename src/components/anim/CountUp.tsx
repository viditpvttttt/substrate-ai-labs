import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 to its final value when scrolled into view.
 */
export function CountUp({
  value,
  suffix = "",
  className = "",
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  );
}
