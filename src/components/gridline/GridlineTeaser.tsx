import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { TrafficDots } from "@/components/gridline/parts";
import { Reveal } from "@/components/Reveal";
import { BoxReveal } from "@/components/anim/BoxReveal";

/**
 * The homepage Gridline section — a dark product slab sitting inside the
 * light site, matching the Gridline page aesthetic: near-black surfaces,
 * white type, and a single orange accent.
 */
export function GridlineTeaser() {
  return (
    <section className="border-t border-border/70 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] px-6 py-16 sm:px-12 sm:py-20">
          {/* soft orange ambience */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(45% 60% at 85% 15%, rgba(249,115,22,0.22), transparent 70%), radial-gradient(40% 50% at 10% 90%, rgba(249,115,22,0.12), transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[#a1a1a1]">
                  Gridline
                </p>
                <h2 className="mt-4 font-sans text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
                  <BoxReveal>Your coding agent for building ambitious software.</BoxReveal>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-[#a3a3a3]">
                  Agents plan, ask clarifying questions, edit across files, and prove their work
                  with artifacts — in the editor, the terminal, and everywhere your team already
                  works.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    to="/gridline"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform duration-300 hover:scale-[1.02]"
                  >
                    Explore Gridline <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="mailto:hello@substrate.dev?subject=Gridline%20Waitlist"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
                  >
                    Join the beta <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
                <p className="mt-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-[#666]">
                  Also on macOS and Linux — free during public beta
                </p>
              </Reveal>
            </div>

            {/* Mini agent window */}
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl shadow-black/50">
                <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
                  <TrafficDots />
                  <span className="ml-1 font-mono text-[0.625rem] text-[#666]">
                    gridline — agent
                  </span>
                </div>
                <div className="space-y-2.5 p-4 font-mono text-[0.6875rem] leading-5">
                  <p className="text-[#a1a1a1]">
                    <span className="text-[#666]">$</span> gridline agent --task "ship the beta"
                  </p>
                  <p className="text-[#d4d4d4]">→ Plan, search, build anything</p>
                  <p className="text-[#10b981]">✓ Thought 4s — plan drafted in feature-prd.md</p>
                  <p className="text-[#10b981]">✓ app/page.tsx +52 -0</p>
                  <p className="text-[#10b981]">✓ app/globals.css +18 -0</p>
                  <p className="text-[#ff7a33]">● Preview ready at localhost:3000</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
