import { motion } from "motion/react";

const points = [
  [0, 188], [75, 180], [142, 164], [210, 157], [282, 132], [340, 122], [402, 88], [470, 69], [545, 27], [620, 5],
] as const;
const path = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");

export function GrowthGraph() {
  return (
    <div className="growth-graph" aria-label="Substrate capability growth over time">
      <div className="growth-graph-copy">
        <p className="rule-label">Compound capability</p>
        <p className="growth-graph-value">One system,<br />gaining range.</p>
        <p className="text-sm text-muted-foreground">Research compounds across every product.</p>
      </div>
      <svg viewBox="0 0 620 210" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="graph-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--spectral-b)" />
            <stop offset="0.55" stopColor="var(--spectral-r)" />
            <stop offset="1" stopColor="var(--spectral-warm)" />
          </linearGradient>
          <linearGradient id="graph-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--spectral-r)" stopOpacity=".22" />
            <stop offset="1" stopColor="var(--spectral-b)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${path} L620 210 L0 210 Z`} fill="url(#graph-fill)" />
        <motion.path d={path} fill="none" stroke="url(#graph-stroke)" strokeWidth="2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: .5 }} transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} />
        {points.slice(3).filter((_, i) => i % 2 === 0).map(([x, y], index) => <motion.circle key={x} cx={x} cy={y} r="4" fill="var(--background)" stroke="var(--spectral-r)" strokeWidth="2" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: .5 + index * .12 }} />)}
      </svg>
    </div>
  );
}