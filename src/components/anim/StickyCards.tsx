import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

export interface StickyCardItem {
  key: string;
  content: ReactNode;
}

/**
 * Cards that pin below the header and stack over one another as you
 * scroll, earlier cards easing back in scale. The scale is springed
 * so the shrink follows the scroll smoothly instead of snapping.
 */
export function StickyCards({ items }: { items: StickyCardItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <StickyCard key={item.key} index={i} total={items.length}>
          {item.content}
        </StickyCard>
      ))}
    </div>
  );
}

function StickyCard({
  children,
  index,
  total,
}: {
  children: ReactNode;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Spring the raw scroll so the shrink eases in and out instead of
  // tracking every pixel of the wheel — no tilt, cards stay flat.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.6 });
  const isLast = index === total - 1;
  const scale = useTransform(progress, [0, 1], [1, isLast ? 1 : 0.94]);

  return (
    <div ref={ref} className="h-[86svh]">
      <div
        className="sticky"
        style={{ top: `calc(5.5rem + ${index * 1.25}rem)`, zIndex: index + 1 }}
      >
        <motion.div style={{ scale }} className="origin-top will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
