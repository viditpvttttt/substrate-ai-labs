import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BrandLogo, type BrandVariant } from "@/components/BrandLogo";
import { FlipText } from "@/components/anim/FlipLink";

const nav: { to: string; label: string; mark?: BrandVariant }[] = [
  { to: "/kernel", label: "Kernel", mark: "kernel" },
  { to: "/folio", label: "Folio", mark: "folio" },
  { to: "/gridline", label: "Gridline", mark: "gridline" },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/leadership", label: "Leadership" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-[var(--spectral-b)]/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80"
        >
          <BrandLogo
            variant="substrate"
            className="h-6 w-6 rounded-full transition-transform duration-300 group-hover:scale-110"
          />
          <span className="rule-label !text-foreground">Substrate</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              activeProps={{ className: "group relative flex items-center gap-1.5 text-sm text-foreground" }}
            >
              {item.mark && (
                <BrandLogo
                  variant={item.mark}
                  alt=""
                  className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 ${
                    item.mark === "kernel" ? "w-6 grayscale-[0.3]" : ""
                  }`}
                />
              )}
              <FlipText text={item.label} />
              <span
                className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

/** Live local-time readout — a tiny, quiet footer detail. */
function LocalTime() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () =>
      setNow(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      );
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
      {now ?? "--:--:--"} — local
    </span>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-border/70 bg-card/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo variant="substrate" className="h-6 w-6 rounded-full" />
            <div>
              <p className="rule-label">Substrate</p>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-muted-foreground">
                The layer underneath everything we build — quiet, local-first, one runtime.
              </p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Substrate — Kernel · Folio · Gridline
          </p>
          <LocalTime />
        </div>
      </div>

      {/* Chromatic base band — the RGB ambience settling at the foot of the page */}
      <div className="spectral-base" aria-hidden="true" />
    </footer>
  );
}
