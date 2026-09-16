import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BoxReveal } from "@/components/anim/BoxReveal";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { ScrambleText } from "@/components/anim/ScrambleText";
import { TiltCard } from "@/components/TiltCard";
import { BrandLogo } from "@/components/BrandLogo";
import { getWork, works } from "@/components/work/workData";

export const Route = createFileRoute("/work/$slug")({
  head: () => ({
    meta: [{ title: "Work — Substrate" }],
  }),
  component: WorkDetail,
});

const productRouteBySlug = {
  kernel: "/kernel",
  folio: "/folio",
  gridline: "/gridline",
} as const;

function WorkDetail() {
  const { slug } = Route.useParams();
  const work = getWork(slug);

  // Reset scroll on slug change so the next work enters from the top, aligned.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!work) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="text-4xl text-foreground">No such work</h1>
        <p className="mt-4 text-muted-foreground">
          That page does not exist — yet. Head back to the index.
        </p>
        <Link
          to="/work"
          className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
        >
          All work
        </Link>
      </section>
    );
  }

  const idx = works.findIndex((w) => w.slug === work.slug);
  const next = works[(idx + 1) % works.length];

  return (
    <motion.div
      key={slug}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="spectral-field" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <BrandLogo
            variant={work.logo}
            alt=""
            className={`mx-auto h-20 w-20 rounded-2xl bg-card p-1 shadow-sm ${
              work.logo === "kernel" ? "w-28" : ""
            }`}
          />
          <div className="mt-8 flex items-center justify-center gap-3">
            <p className="rule-label">{work.name}</p>
            <span className="rounded-full border border-border px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
              {work.status}
            </span>
          </div>
          <h1 className="mt-5 text-5xl leading-[1.05] text-foreground sm:text-6xl">{work.hero}</h1>
          <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            {work.lede}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link
                to={productRouteBySlug[work.slug as keyof typeof productRouteBySlug]}
                className="btn-shine inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
              >
                Visit the {work.name} page
              </Link>
            </MagneticButton>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 text-sm text-foreground"
            >
              All work
              <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border/70 bg-card/50">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-border/60 lg:grid-cols-4">
          {work.stats.map((s) => (
            <div key={s.label} className="bg-card/80 px-6 py-12 text-center">
              <p className="font-display text-5xl font-light text-foreground">{s.value}</p>
              <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                <ScrambleText text={s.label} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Problem / Approach */}
      <section className="relative isolate overflow-hidden">
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-5xl gap-14 px-6 py-24 sm:py-28 lg:grid-cols-2">
          <Reveal>
            <p className="rule-label">The problem</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>Why this work exists</BoxReveal>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{work.problem}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="rule-label">The approach</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>How we went at it</BoxReveal>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">{work.approach}</p>
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-y border-border/70 bg-card/60 grain-veil">
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <Reveal>
            <p className="rule-label">Milestones</p>
            <h2 className="mt-4 max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>How it took shape</BoxReveal>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {work.milestones.map((m, i) => (
              <Reveal key={m.title} delay={i * 0.08} className="h-full">
                <div className="flex h-full flex-col gap-3 rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
                  <p className="rule-label">{m.date}</p>
                  <h3 className="text-xl text-foreground">{m.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The shape of it */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">The shape of it</h2>
        <dl className="mt-12 grid gap-x-16 gap-y-8 sm:grid-cols-2">
          {work.specs.map((s) => (
            <div key={s.k} className="border-t border-border pt-5">
              <dt className="rule-label">{s.k}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Gallery */}
      <section className="border-y border-border/70 bg-card/40">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <Reveal>
            <p className="rule-label">Surfaces</p>
            <h2 className="mt-4 max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>What it looks like in the hand</BoxReveal>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {work.gallery.map((g, i) => (
              <Reveal key={g.title} delay={i * 0.08} className="h-full">
                <TiltCard className="h-full">
                  <div
                    className="tile-aurora flex h-full min-h-[16rem] flex-col justify-between rounded-3xl p-8 shadow-lg"
                    style={
                      {
                        "--tile-a": work.colors.a,
                        "--tile-b": work.colors.b,
                        "--tile-c": work.colors.c,
                      } as React.CSSProperties
                    }
                  >
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-white/70">
                      0{i + 1}
                    </p>
                    <div>
                      <h3 className="text-2xl text-white drop-shadow-sm">{g.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/85">{g.caption}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-28">
        <Reveal>
          <blockquote className="font-display text-3xl leading-snug text-foreground sm:text-4xl">
            “{work.quote.text}”
          </blockquote>
          <p className="rule-label mt-6">— {work.quote.by}</p>
        </Reveal>
      </section>

      {/* Next work */}
      <section className="border-t border-border/70 bg-card/40">
        <Reveal className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group flex items-center justify-between gap-6 rounded-3xl border border-border/70 bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <span>
              <p className="rule-label">Next work</p>
              <p className="mt-2 font-display text-4xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl">
                {next.name}
              </p>
            </span>
            <span className="flex items-center gap-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              {next.hero}
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </Reveal>
      </section>
    </motion.div>
  );
}
