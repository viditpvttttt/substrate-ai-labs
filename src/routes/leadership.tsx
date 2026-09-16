import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { BoxReveal } from "@/components/anim/BoxReveal";
import { ScrambleText } from "@/components/anim/ScrambleText";
import { WordsReveal } from "@/components/anim/WordsReveal";
import { RotatingText } from "@/components/anim/RotatingText";
import { Spotlight } from "@/components/anim/Spotlight";
import { ParallaxY } from "@/components/anim/ParallaxY";
import { TextGradientFill } from "@/components/anim/TextGradientFill";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { CountUp } from "@/components/anim/CountUp";
import { HoverExpand } from "@/components/anim/HoverExpand";
import type { HoverExpandItem } from "@/components/anim/HoverExpand";
import { wavePalettes } from "@/components/WaveGridBackground";

export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — Substrate" },
      {
        name: "description",
        content:
          "Meet the founder and CEO of Substrate, the research and product studio building Kernel, VOID, and Folio on one shared runtime.",
      },
      { property: "og:title", content: "Leadership — Substrate" },
      {
        property: "og:description",
        content:
          "The founder and CEO of Substrate — a research and product studio building Kernel, VOID, and Folio on one shared runtime.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeadershipPage,
});

const stats = [
  { value: 3, suffix: "", label: "Products shipped", sub: "Kernel · VOID · Folio" },
  { value: 1, suffix: "", label: "Shared runtime", sub: "One substrate underneath" },
  { value: 100, suffix: "%", label: "Self-hosted", sub: "No one else's infrastructure" },
];

const values: HoverExpandItem[] = [
  {
    key: "complete",
    index: "01",
    title: "Complete",
    body: "Nothing half-built. If it ships, it works end to end — the model, the browser, the surface.",
    colors: wavePalettes.violet,
  },
  {
    key: "working",
    index: "02",
    title: "Working",
    body: "Every build verified clean — the site, the model, the browser. Reproducible or it doesn't ship.",
    colors: wavePalettes.teal,
  },
  {
    key: "accountable",
    index: "03",
    title: "Accountable",
    body: "No one else's infrastructure. The runtime is ours — moved off its original scaffolding onto an independent, self-hosted stack.",
    colors: wavePalettes.magenta,
  },
];

function LeadershipPage() {
  return (
    <>
      {/* Hero — scramble label, word-by-word headline, rotating product names, spotlight glow */}
      <section className="relative isolate overflow-hidden">
        <div className="spectral-field" aria-hidden="true" />
        <Spotlight />
        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <Reveal>
            <p className="rule-label">
              <ScrambleText text="Leadership" />
            </p>
          </Reveal>
          <h1 className="mt-6 text-5xl leading-[1.05] text-foreground sm:text-6xl">
            <WordsReveal text="The people behind the substrate" />
          </h1>
          <Reveal delay={0.6}>
            <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Substrate is built by a small team that works close to the code across{" "}
              <RotatingText
                words={["Kernel", "VOID", "Folio"]}
                className="font-medium text-foreground"
              />
              . Every product is held to the same standard: complete, working, and accountable to
              no one else's infrastructure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats strip — count-up numbers */}
      <section className="border-y border-border/70 bg-card">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-10 sm:grid-cols-3">
            {stats.map((s, idx) => (
              <Reveal key={s.label} delay={idx * 0.12} className="text-center">
                <div className="text-5xl font-bold text-foreground sm:text-6xl">
                  <CountUp value={s.value} suffix={s.suffix} duration={2} />
                </div>
                <p className="mt-3 text-sm font-medium text-foreground">{s.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder feature — tilt portrait, parallax, scramble name, scroll-fill bio, magnetic CTA */}
      <section className="relative isolate overflow-hidden border-b border-border/70 bg-card grain-veil">
        <Spotlight />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <Reveal className="mb-16">
            <p className="rule-label">Founder</p>
          </Reveal>

          <div className="grid items-start gap-12 lg:grid-cols-[400px_1fr] lg:gap-16">
            {/* Portrait — parallax + 3D tilt */}
            <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
              <ParallaxY from={30} to={-30}>
                <TiltCard className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 shadow-sm">
                  <img
                    src="/images/vidit-portrait.jpg"
                    alt="Portrait of Vidit Sharma, Founder and CEO of Substrate"
                    className="aspect-[4/5] h-auto w-full object-cover"
                  />
                </TiltCard>
              </ParallaxY>
              <div className="mt-5 px-1">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Founder and CEO
                </p>
                <h2 className="mt-1.5 text-2xl font-semibold text-foreground">
                  <ScrambleText text="Vidit Sharma" />
                </h2>
              </div>
            </Reveal>

            {/* Bio — scroll-fill gradient text + magnetic CTA */}
            <Reveal delay={0.1} className="lg:pt-2">
              <h3 className="text-3xl leading-tight text-foreground sm:text-4xl">
                <BoxReveal>Close to the code</BoxReveal>
              </h3>
              <TextGradientFill
                text="Vidit Sharma founded Substrate and leads research, product, and engineering across Kernel, VOID, and Folio. He works close to the code — the studio's own site was rebuilt from the ground up, moved off its original scaffolding onto an independent, self-hosted stack, with every build verified clean before shipping. That's the standard applied across all three products: complete, working, and accountable to no one else's infrastructure."
                className="mt-7 text-base leading-relaxed text-muted-foreground"
              />

              {/* Focus areas — staggered reveal + hover scale */}
              <div className="mt-10 flex flex-wrap gap-2.5">
                {["Research", "Product", "Engineering"].map((area, i) => (
                  <Reveal key={area} delay={0.3 + i * 0.1}>
                    <span className="inline-block rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-sm text-muted-foreground transition-transform duration-200 hover:scale-110 hover:border-foreground/30 hover:text-foreground">
                      {area}
                    </span>
                  </Reveal>
                ))}
              </div>

              {/* Magnetic CTA */}
              <div className="mt-10">
                <MagneticButton strength={0.4}>
                  <a
                    href="mailto:hello@substrate.dev"
                    className="inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Get in touch
                  </a>
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values — skiper-style hover-expand panels */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <Reveal>
          <h2 className="max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
            <BoxReveal>How we build</BoxReveal>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            The standard applied across all three products — hover to explore.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-14">
          <HoverExpand items={values} />
        </Reveal>
      </section>
    </>
  );
}
