import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BoxReveal } from "@/components/anim/BoxReveal";

/**
 * The studio journal — blogs, open roles and press, the way mature
 * research companies publish. Lives inside /studio, never in the nav.
 */

const posts = [
  {
    tag: "Research",
    date: "Sep 2026",
    minutes: "9 min",
    title: "Grounding agents in repository structure, not chunks",
    excerpt:
      "Why a lattice of symbols beats a flattened prompt — and what 218 indexed repositories taught us about agent mistakes.",
    colors: { a: "#d9e6ff", b: "#e3d9ff", c: "#ffd9ec" },
  },
  {
    tag: "Product",
    date: "Aug 2026",
    minutes: "6 min",
    title: "Why the working surface comes before the app store",
    excerpt:
      "Folio's bet: the next platform is not another marketplace of widgets, it is a calmer ground that already knows your morning.",
    colors: { a: "#fde8d8", b: "#ffd9ec", c: "#d9f3e8" },
  },
  {
    tag: "Studio",
    date: "Jul 2026",
    minutes: "7 min",
    title: "Notes on building with a shared memory layer",
    excerpt:
      "One memory across Kernel, Folio and Gridline sounds simple. The hard part is deciding what deserves to be remembered.",
    colors: { a: "#f0e8d9", b: "#e8ffd9", c: "#d9e8ff" },
  },
];

const roles = [
  { title: "Research engineer — multimodal", team: "Kernel", place: "Remote · IST", type: "Full-time" },
  { title: "Product engineer — runtime", team: "Folio", place: "Remote · IST", type: "Full-time" },
  { title: "Agent engineer — verification", team: "Gridline", place: "Remote · IST", type: "Full-time" },
];

const press = [
  { outlet: "Runtime Weekly", quote: "“The most coherent three-product bet we have seen this year.”" },
  { outlet: "The Model Ledger", quote: "“Substrate treats the joins between products as the actual product.”" },
  { outlet: "Ambient Computing Review", quote: "“Quiet software, loud ambition.”" },
];

export function StudioJournal() {
  return (
    <>
      {/* ——— Blog ——— */}
      <section className="section-rule relative isolate overflow-hidden">
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Reveal>
            <p className="rule-label">From the journal</p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>Writing, in the open</BoxReveal>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Research notes, product thinking, and the occasional post about why we removed a
              feature. Method attached to every claim.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.title} delay={i * 0.07} className="h-full">
                <a href="mailto:hello@substrate.dev?subject=Journal%20request" className="group block h-full">
                  <article className="field-card h-full transition-transform duration-500 group-hover:-translate-y-1" style={{ minHeight: "24rem" }}>
                    <div className="field-glow" aria-hidden="true" />
                    <div
                      className="tile-aurora relative z-10 mx-6 mt-6 h-36 overflow-hidden rounded-xl border border-border/60 sm:mx-7"
                      style={{ "--tile-a": post.colors.a, "--tile-b": post.colors.b, "--tile-c": post.colors.c } as React.CSSProperties}
                      aria-hidden="true"
                    />
                    <div className="relative z-10 px-6 pb-6 pt-5 sm:px-7 sm:pb-7">
                      <div className="flex items-center gap-3">
                        <span className="aura-badge aura-badge-outline">{post.tag}</span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                          <Clock3 className="size-3" /> {post.minutes}
                        </span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl leading-snug text-foreground">{post.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                      <p className="mt-5 flex items-center justify-between border-t border-border pt-4">
                        <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">{post.date}</span>
                        <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
                          Read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </p>
                    </div>
                  </article>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Careers ——— */}
      <section className="section-rule bg-card/45">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Reveal>
            <p className="rule-label">Careers</p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>Build the layer underneath</BoxReveal>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              A small team that works close to the code. No playbook theater, no roadmap
              committees — just the standard: complete, working, accountable.
            </p>
          </Reveal>
          <div className="mt-12 border-t border-border">
            {roles.map((role, i) => (
              <Reveal key={role.title} delay={i * 0.05}>
                <a
                  href={`mailto:hello@substrate.dev?subject=${encodeURIComponent(`Application — ${role.title}`)}`}
                  className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-border py-6 transition-colors hover:bg-background/70"
                >
                  <span className="min-w-0 flex-1 basis-64 text-lg text-foreground sm:text-xl">{role.title}</span>
                  <span className="aura-badge aura-badge-outline">{role.team}</span>
                  <span className="font-mono text-xs text-muted-foreground">{role.place}</span>
                  <span className="font-mono text-xs text-muted-foreground">{role.type}</span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Press ——— */}
      <section className="section-rule">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
          <Reveal>
            <p className="rule-label">Press</p>
            <h2 className="mt-5 max-w-2xl text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>Said about the substrate</BoxReveal>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {press.map((mention, i) => (
              <Reveal key={mention.outlet} delay={i * 0.06} className="h-full">
                <blockquote className="field-card h-full" style={{ minHeight: "12rem" }}>
                  <div className="field-glow" aria-hidden="true" />
                  <p className="relative z-10 px-6 pt-7 font-display text-xl leading-snug text-foreground sm:px-7">
                    {mention.quote}
                  </p>
                  <cite className="relative z-10 mt-auto block px-6 pb-6 pt-5 font-mono text-[0.625rem] uppercase not-italic tracking-[0.2em] text-muted-foreground sm:px-7 sm:pb-7">
                    {mention.outlet}
                  </cite>
                </blockquote>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10">
            <a href="mailto:hello@substrate.dev?subject=Press" className="group inline-flex items-center gap-2 text-sm text-foreground">
              Press enquiries
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
