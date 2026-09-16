import { Link } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";
import type { Work } from "@/components/work/workData";

/**
 * A single aurora-gradient product tile linking to its work detail page.
 * Shared between the work index and the homepage product grid.
 */
export function WorkTile({ work }: { work: Work }) {
  return (
    <Link
      to="/work/$slug"
      params={{ slug: work.slug }}
      className="tile-aurora group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-3xl p-8 shadow-lg transition-shadow hover:shadow-2xl"
      style={
        {
          "--tile-a": work.colors.a,
          "--tile-b": work.colors.b,
          "--tile-c": work.colors.c,
        } as React.CSSProperties
      }
    >
      <div className="relative z-10 flex items-center justify-between">
        <BrandLogo
          variant={work.logo}
          alt=""
          className={`h-10 w-10 rounded-full bg-white/80 p-1 ${
            work.logo === "kernel" ? "w-14" : ""
          }`}
        />
        <span className="rounded-full border border-white/40 px-2.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-white/85">
          {work.badge}
        </span>
      </div>
      <div className="relative z-10">
        <h2 className="font-display text-4xl text-white drop-shadow-sm">{work.name}</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/85">{work.hero}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm text-white">
          Read the detail
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
