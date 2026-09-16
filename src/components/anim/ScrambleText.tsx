import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@+=*";

/**
 * Decodes text with a character-scramble effect when it scrolls into view.
 */
export function ScrambleText({
  text,
  className = "",
  speed = 28,
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = text.length * 3;
    const id = setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / total) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " " || i < settled) return ch;
            return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          })
          .join(""),
      );
      if (frame >= total) {
        setDisplay(text);
        clearInterval(id);
      }
    }, speed);
    return () => clearInterval(id);
  }, [inView, text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
