import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

/**
 * A statement paragraph whose words fill from muted to full foreground
 * color as the reader scrolls through it.
 */
export function TextGradientFill({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
      {"\u00A0"}
    </span>
  );
}
