import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

export interface HoverPreviewItem {
  key: string;
  row: ReactNode;
  preview: ReactNode;
}

/**
 * An index list where hovering a row reveals a floating preview card that
 * trails the cursor. Skiper-style image reveal.
 */
export function HoverPreviewList({ items }: { items: HoverPreviewItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 20, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 160, damping: 20, mass: 0.4 });

  const activeItem = items.find((i) => i.key === active);

  return (
    <div
      ref={containerRef}
      className="relative"
      onPointerMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onPointerLeave={() => setActive(null)}
    >
      {items.map((item) => (
        <div key={item.key} onPointerEnter={() => setActive(item.key)}>
          {item.row}
        </div>
      ))}
      <motion.div
        className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block"
        style={{ x: sx, y: sy }}
        animate={{ opacity: activeItem ? 1 : 0, scale: activeItem ? 1 : 0.85 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="-translate-x-1/2 -translate-y-1/2">{activeItem?.preview}</div>
      </motion.div>
    </div>
  );
}
