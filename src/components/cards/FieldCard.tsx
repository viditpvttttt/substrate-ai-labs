import type { CSSProperties, ReactNode } from "react";

/**
 * FieldCard — the site's second card language. A calm paper panel with a
 * ghost index, a solid accent badge, and a corner spectral pool that warms
 * up on hover. Used for the capability, values and product grids.
 */
export function FieldCard({
  index,
  badge,
  accent = "#6085ff",
  title,
  copy,
  visual,
  footer,
  className = "",
  style,
}: {
  index: string;
  badge?: string;
  accent?: string;
  title: ReactNode;
  copy?: ReactNode;
  visual?: ReactNode;
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      className={`field-card ${className}`}
      style={{ "--glow": accent, ...style } as CSSProperties}
    >
      <div className="field-glow" aria-hidden="true" />
      <span className="field-index" aria-hidden="true">{index}</span>
      <header className="relative z-10 flex items-center justify-between gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
        {badge && <span className="field-badge" style={{ background: accent }}>{badge}</span>}
      </header>
      {visual && <div className="relative z-10 px-6 pt-6 sm:px-7">{visual}</div>}
      <h3 className="relative z-10 px-6 pt-6 font-display text-2xl leading-snug text-foreground sm:px-7">
        {title}
      </h3>
      {copy && (
        <p className="relative z-10 px-6 pb-6 pt-3 text-sm leading-relaxed text-muted-foreground sm:px-7 sm:pb-7">
          {copy}
        </p>
      )}
      {footer && <div className="relative z-10 mt-auto px-6 pb-6 sm:px-7 sm:pb-7">{footer}</div>}
    </article>
  );
}
