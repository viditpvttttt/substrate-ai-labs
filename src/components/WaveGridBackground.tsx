import { useId } from "react";

export type WavePalette = { a: string; b: string; c: string };

/**
 * Card background recreated from the reference textures: a smooth radial
 * gradient with a faint white topographic ring pattern (the "gridline"
 * wave grid) and a soft grain finish. Anchored light at the top-left,
 * saturated mid, deep at the bottom-right so white card text stays legible.
 */
export const wavePalettes = {
  violet: { a: "#8B77C2", b: "#D95F38", c: "#701F12" },
  gold: { a: "#F2D48E", b: "#B96A34", c: "#2D2522" },
  teal: { a: "#B8D8D5", b: "#2F8A78", c: "#143F3A" },
  magenta: { a: "#E0691B", b: "#94305A", c: "#3A0B30" },
  blue: { a: "#FDB86D", b: "#5A7FB5", c: "#2C3E62" },
  forest: { a: "#9ACD32", b: "#2E7D4F", c: "#0B362E" },
} satisfies Record<string, WavePalette>;

export function WaveGridBackground({
  colors,
  seed = 2,
  className = "",
}: {
  colors: WavePalette;
  seed?: number;
  className?: string;
}) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const rings = Array.from({ length: 12 }, (_, i) => 26 + i * 30);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(130% 130% at 16% 10%, ${colors.a} 0%, ${colors.b} 48%, ${colors.c} 100%)`,
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id={`wgb-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012 0.016"
              numOctaves={2}
              seed={seed}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="22"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <g
          filter={`url(#wgb-${uid})`}
          stroke="#ffffff"
          strokeWidth="0.9"
          fill="none"
          opacity="0.3"
        >
          {rings.map((r) => (
            <circle key={r} cx="200" cy="210" r={r} />
          ))}
        </g>
      </svg>
      <div
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px)",
          backgroundSize: "3px 3px",
        }}
      />
    </div>
  );
}
