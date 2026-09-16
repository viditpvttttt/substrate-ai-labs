import { useState } from "react";

const AXES = [
  "Reasoning",
  "Vision",
  "Audio",
  "Video",
  "Long context",
  "Agentic",
  "Factuality",
  "Latency",
];

type Series = { name: string; color: string; values: number[]; dash?: string };

const SERIES: Series[] = [
  {
    name: "Kernel",
    color: "var(--spectral-b)",
    values: [0.86, 0.9, 0.82, 0.78, 0.92, 0.74, 0.8, 0.7],
  },
  {
    name: "Text-only baseline",
    color: "var(--spectral-r)",
    values: [0.8, 0.34, 0.2, 0.14, 0.7, 0.55, 0.72, 0.86],
    dash: "5 5",
  },
  {
    name: "Adapter stack",
    color: "var(--spectral-g)",
    values: [0.7, 0.72, 0.6, 0.55, 0.6, 0.5, 0.62, 0.42],
    dash: "2 6",
  },
];

const SIZE = 420;
const R = 150;
const C = SIZE / 2;

function point(i: number, v: number) {
  const a = (Math.PI * 2 * i) / AXES.length - Math.PI / 2;
  return [C + Math.cos(a) * R * v, C + Math.sin(a) * R * v] as const;
}

export function BenchRadar() {
  const [active, setActive] = useState<string | null>("Kernel");

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-12">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-md"
        role="img"
        aria-label="Radar chart comparing Kernel against a text-only baseline and an adapter stack"
      >
        {[0.25, 0.5, 0.75, 1].map((r) => (
          <polygon
            key={r}
            points={AXES.map((_, i) => point(i, r).join(",")).join(" ")}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}
        {AXES.map((label, i) => {
          const [x, y] = point(i, 1);
          const [lx, ly] = point(i, 1.16);
          return (
            <g key={label}>
              <line x1={C} y1={C} x2={x} y2={y} stroke="var(--border)" strokeWidth={1} />
              <text
                x={lx}
                y={ly}
                textAnchor={lx > C + 4 ? "start" : lx < C - 4 ? "end" : "middle"}
                dominantBaseline="middle"
                fontSize="10"
                fill="var(--muted-foreground)"
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
              >
                {label}
              </text>
            </g>
          );
        })}
        {SERIES.map((s) => {
          const dim = active !== null && active !== s.name;
          return (
            <g
              key={s.name}
              opacity={dim ? 0.18 : 1}
              onMouseEnter={() => setActive(s.name)}
              style={{ transition: "opacity 200ms" }}
            >
              <polygon
                points={s.values.map((v, i) => point(i, v).join(",")).join(" ")}
                fill={s.color}
                fillOpacity={0.1}
                stroke={s.color}
                strokeWidth={1.8}
                strokeDasharray={s.dash}
              />
              {s.values.map((v, i) => {
                const [x, y] = point(i, v);
                return <circle key={i} cx={x} cy={y} r={3.2} fill={s.color} />;
              })}
            </g>
          );
        })}
      </svg>

      <ul className="w-full max-w-xs space-y-3" onMouseLeave={() => setActive("Kernel")}>
        {SERIES.map((s) => (
          <li key={s.name}>
            <button
              type="button"
              onMouseEnter={() => setActive(s.name)}
              onFocus={() => setActive(s.name)}
              className="flex w-full items-center gap-3 border-t border-border pt-3 text-left"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-sm text-foreground">{s.name}</span>
              <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                {Math.round((s.values.reduce((a, b) => a + b, 0) / s.values.length) * 100)}
              </span>
            </button>
          </li>
        ))}
        <li className="pt-2 text-xs leading-relaxed text-muted-foreground">
          Internal evaluations, normalised 0–100. Hover a series to isolate it.
        </li>
      </ul>
    </div>
  );
}
