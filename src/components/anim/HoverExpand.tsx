import { useState } from "react";
import { WaveGridBackground } from "@/components/WaveGridBackground";

export interface HoverExpandItem {
  key: string;
  index: string;
  title: string;
  body: string;
  colors: { a: string; b: string; c: string };
}

/**
 * A row of gradient panels where the hovered (or tapped) one expands to
 * show its description while the rest compress.
 */
export function HoverExpand({ items }: { items: HoverExpandItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 lg:h-[26rem] lg:flex-row">
      {items.map((item, i) => {
        const isActive = i === active;
        return (
          <div
            key={item.key}
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            tabIndex={0}
            role="button"
            aria-expanded={isActive}
            className="relative flex cursor-pointer flex-col justify-end overflow-hidden rounded-3xl p-8 shadow-lg transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={
              {
                flexGrow: isActive ? 5 : 1,
                flexBasis: 0,
                minHeight: isActive ? "16rem" : "4.5rem",
              } as React.CSSProperties
            }
          >
            <WaveGridBackground colors={item.colors} seed={i + 1} />
            <div className="relative z-10 flex flex-col justify-end">
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/75">
                {item.index}
              </p>
              <h3 className="mt-2 text-2xl leading-snug text-white drop-shadow-sm">{item.title}</h3>
              <p
                className="mt-3 max-w-sm text-sm leading-relaxed text-white/85 transition-opacity duration-500"
                style={{ opacity: isActive ? 1 : 0, maxHeight: isActive ? "10rem" : 0 }}
              >
                {item.body}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
