import type { CSSProperties, ReactNode } from "react";
import { Maximize2 } from "lucide-react";

/**
 * The site's primary card language — a quiet white panel with a soft
 * ambient glow pooling in its lower corner, an optional mono badge,
 * and room for a miniature interface inside. Lovable/Stripe flavored,
 * Substrate tempered.
 */
export function AuraCard({
  title,
  copy,
  badge,
  visual,
  footer,
  glow = "#6085ff",
  glow2 = "#ff00ea",
  expandable = false,
  className = "",
  style,
}: {
  title: ReactNode;
  copy?: ReactNode;
  badge?: string;
  visual?: ReactNode;
  footer?: ReactNode;
  glow?: string;
  glow2?: string;
  expandable?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      className={`aura-card ${className}`}
      style={{ "--glow": glow, "--glow-2": glow2, ...style } as CSSProperties}
    >
      <header className="relative z-10 flex items-start justify-between gap-4 px-6 pt-6 sm:px-7 sm:pt-7">
        <h3 className="text-2xl leading-snug text-foreground">{title}</h3>
        <div className="flex shrink-0 items-center gap-2">
          {badge && <span className="aura-badge">{badge}</span>}
          {expandable && <Maximize2 className="size-4 text-muted-foreground/70" aria-hidden />}
        </div>
      </header>
      {visual && <div className="relative z-10 mx-6 mt-6 sm:mx-7">{visual}</div>}
      {copy && <p className="relative z-10 px-6 pb-6 pt-6 text-sm leading-relaxed text-muted-foreground sm:px-7 sm:pb-7">{copy}</p>}
      {footer && <div className="relative z-10 mt-auto px-6 pb-6 sm:px-7 sm:pb-7">{footer}</div>}
    </article>
  );
}
