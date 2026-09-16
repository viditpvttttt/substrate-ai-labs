import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const DOTS = 12;

/**
 * The Substrate entrance transition: the new brand mark scales in at the
 * centre while twelve dots — the Gridline mark's ellipse — orbit it,
 * converge, and carry the sheet away. The exit slide matches the page's
 * scroll easing so the reveal blends into the first scroll.
 */
export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDone(true), 2400);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden="true"
        >
          <div className="spectral-field" aria-hidden="true" />
          <div className="relative flex items-center justify-center">
            {/* Orbiting dot ellipse — the Gridline mark motif */}
            <motion.div
              className="pointer-events-none absolute h-[19rem] w-[19rem]"
              initial={{ opacity: 0, rotate: 0, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 360, scale: 1 }}
              transition={{
                opacity: { duration: 0.5, delay: 0.2 },
                rotate: { duration: 4.4, repeat: Infinity, ease: "linear" },
                scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              {Array.from({ length: DOTS }).map((_, i) => {
                const angle = (i / DOTS) * Math.PI * 2;
                const rx = 46; // % — wide ellipse
                const ry = 30;
                const x = 50 + rx * Math.cos(angle);
                const y = 50 + ry * Math.sin(angle);
                return (
                  <motion.span
                    key={i}
                    className="absolute rounded-full bg-foreground"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      width: 5,
                      height: 5,
                      translate: "-50% -50%",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.85, 0.55] }}
                    transition={{ delay: 0.25 + i * 0.04, duration: 0.9 }}
                  />
                );
              })}
            </motion.div>

            {/* The brand mark */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10"
            >
              <BrandLogo
                variant="substrate"
                alt=""
                className="h-24 w-24 rounded-full bg-card/60 shadow-xl sm:h-28 sm:w-28"
              />
            </motion.div>
          </div>

          <motion.p
            className="rule-label absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Substrate — the ground software grows on
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
