import type { ReactNode } from "react";

/** Shared chrome for the Gridline (dark, Cursor-style) product surfaces. */

export function TrafficDots() {
  return (
    <div className="flex gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

/**
 * A macOS-style dark window: traffic lights, an optional title bar, and
 * a body. Everything sits on #141414 with a hairline white/10 border.
 */
export function WindowShell({
  title,
  children,
  className = "",
  bodyClassName = "",
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl shadow-black/40 ${className}`}
    >
      {title !== undefined && (
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
          <TrafficDots />
          <div className="flex-1 text-center text-xs text-[#a1a1a1]">{title}</div>
          <div className="w-10" aria-hidden="true" />
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/** Small rounded label used across the Gridline windows. */
export function Chip({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: "muted" | "accent";
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[0.6875rem] leading-4 ${
        tone === "accent"
          ? "border border-[#f97316]/40 bg-[#2a221a] text-[#ff7a33]"
          : "border border-white/10 bg-white/5 text-[#a1a1a1]"
      } ${className}`}
    >
      {children}
    </span>
  );
}

/** Orange arrow link used for Gridline section headers. */
export function SectionLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="mailto:hello@substrate.dev?subject=Gridline%20Waitlist"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#f97316] transition-colors hover:text-[#ff7a33]"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
