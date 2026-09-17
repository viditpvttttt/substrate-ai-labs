import { motion, useReducedMotion } from "motion/react";

const paths = Array.from({ length: 13 }, (_, index) => {
  const inset = 18 + index * 27;
  return `M ${-80 + inset} 510 C ${50 + inset} ${230 - index * 8}, ${240 + index * 12} ${110 + index * 7}, ${420 + index * 20} ${170 + index * 5} S ${760 + index * 16} ${390 - index * 4}, ${980 + index * 25} ${145 + index * 10}`;
});

export function HeroField() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-field" aria-hidden="true">
      <svg viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice">
        {paths.map((path, index) => (
          <motion.path
            key={path}
            d={path}
            pathLength={1}
            initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.22 + index * 0.025 }}
            transition={{ duration: 2.2, delay: index * 0.055, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </svg>
      <motion.div
        className="hero-field-scan"
        {...(!reduceMotion ? { animate: { x: ["-20%", "120%"] } } : {})}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}