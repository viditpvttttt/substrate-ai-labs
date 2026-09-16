import { motion } from "motion/react";

/**
 * Word-by-word masked rise + blur-in reveal for display headlines.
 */
export function WordsReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "108%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {"\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
