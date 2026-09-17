import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { BrandLogo } from "@/components/BrandLogo";
import { HeroField } from "@/components/HeroField";
import { TiltCard } from "@/components/TiltCard";
import { BoxReveal } from "@/components/anim/BoxReveal";
import { CountUp } from "@/components/anim/CountUp";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { Preloader } from "@/components/anim/Preloader";
import { RotatingText } from "@/components/anim/RotatingText";
import { ScrambleText } from "@/components/anim/ScrambleText";
import { WordsReveal } from "@/components/anim/WordsReveal";
import { VanishForm } from "@/components/ui/skiper-ui/skiper56";
import { GridlineTeaser } from "@/components/gridline/GridlineTeaser";
import { WorkTile } from "@/components/work/WorkTile";
import { works } from "@/components/work/workData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Substrate — Kernel, Folio & Gridline" },
      {
        name: "description",
        content:
          "Substrate is a research and product studio building Kernel, a multimodal LLM chatbot; Folio, a quiet operating surface; and Gridline, a coding agent — all on one substrate.",
      },
      { property: "og:title", content: "Substrate — Kernel, Folio & Gridline" },
      {
        property: "og:description",
        content:
          "A research and product studio for the ambient computer — a multimodal chatbot, an operating surface and a coding agent on one substrate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const marqueeTerms = [
  "Multimodal",
  "Autonomous agents",
  "Local-first",
  "One runtime",
  "Shared memory",
  "Long context",
  "Ambient computing",
  "No translators",
];

const stats = [
  { value: 4, suffix: "", label: "Modalities, one context" },
  { value: 3, suffix: "", label: "Surfaces on the substrate" },
  { value: 128, suffix: "k", label: "Token window" },
  { value: 0, suffix: "", label: "Translators in between" },
];

function Index() {
  return (
    <>
      <Preloader />

      <section className="hero-lab relative isolate overflow-hidden">
        <HeroField />
        <div className="relative mx-auto flex min-h-[88svh] max-w-6xl items-center justify-center px-6 py-20">
          <div className="relative z-10 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex items-center gap-3"
            >
              <BrandLogo variant="substrate" className="h-9 w-9 rounded-full" />
              <span className="rule-label">The layer underneath</span>
            </motion.div>
            <h1 className="text-5xl leading-[1.04] text-foreground sm:text-6xl lg:text-7xl">
              <WordsReveal text="We build the ground" delay={0.15} />
              <br />
              <WordsReveal text="software grows on." delay={0.45} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              A research and product studio building one shared substrate under{" "}
              <RotatingText
                words={[
                  "Kernel, the multimodal chatbot",
                  "Folio, the quiet surface",
                  "Gridline, the coding agent",
                ]}
                className="text-foreground"
              />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-11 flex flex-wrap items-center justify-center gap-x-7 gap-y-4"
            >
              <MagneticButton>
                <Link
                  to="/work"
                  className="btn-shine inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
                >
                  Explore the work
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link
                  to="/kernel"
                  className="group inline-flex items-center gap-2 text-sm text-foreground"
                >
                  Meet Kernel
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-muted-foreground"
          >
            Scroll
          </motion.div>
        </div>
      </section>

      {/* Terms strip */}
      <section className="overflow-hidden border-y border-border/70 bg-card/60 py-4" aria-hidden="true">
        <div className="marquee-track [animation-play-state:running] hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeTerms.map((t) => (
                <span
                  key={`${copy}-${t}`}
                  className="mx-8 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <Reveal className="text-center">
          <p className="rule-label">
            <ScrambleText text="The products" />
          </p>
          <h2 className="mt-5 text-3xl leading-tight text-foreground sm:text-4xl">
            <BoxReveal>Three surfaces, one substrate</BoxReveal>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
            One multimodal chatbot, one operating surface, one coding agent — every product reads
            the same runtime, the same memory, the same substrate.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, i) => (
            <Reveal key={work.slug} delay={i * 0.08} className="h-full">
              <TiltCard className="h-full">
                <WorkTile work={work} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/70 bg-card/50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border/60 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card/80 px-6 py-12 text-center">
              <p className="font-display text-6xl font-light text-foreground">
                <CountUp value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                <ScrambleText text={s.label} />
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gridline section */}
      <GridlineTeaser />

      {/* Closing CTA */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-28">
        <Reveal>
          <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
            <BoxReveal>Want the behind-the-scenes?</BoxReveal>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Ask about Kernel, Folio or Gridline — we answer plainly, with the method attached.
          </p>
          <div className="mx-auto mt-8 max-w-md">
            <VanishForm
              placeholder="Ask anything about Kernel, Folio or Gridline..."
              onSubmit={() => {}}
            />
          </div>
          <div className="mt-8">
            <MagneticButton>
              <Link
                to="/studio"
                className="inline-block rounded-full border border-border bg-card/60 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
              >
                How the studio builds
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
