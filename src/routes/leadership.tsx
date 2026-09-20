import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { BoxReveal } from "@/components/anim/BoxReveal";
import { ScrambleText } from "@/components/anim/ScrambleText";
import { WordsReveal } from "@/components/anim/WordsReveal";
import { Spotlight } from "@/components/anim/Spotlight";
import { ParallaxY } from "@/components/anim/ParallaxY";
import { TextGradientFill } from "@/components/anim/TextGradientFill";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { CountUp } from "@/components/anim/CountUp";
import { FieldCard } from "@/components/cards/FieldCard";
import { SudoFigure, sudo } from "@/components/sudo/SudoFigure";


export const Route = createFileRoute("/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — Substrate" },
      {
        name: "description",
        content:
          "Meet the founder and CEO of Substrate, the research and product studio building Kernel, Folio, and Gridline on one shared runtime.",
      },
      { property: "og:title", content: "Leadership — Substrate" },
      {
        property: "og:description",
        content:
          "The founder and CEO of Substrate — a research and product studio building Kernel, Folio, and Gridline on one shared runtime.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LeadershipPage,
});

const stats = [
  { value: 3, suffix: "", label: "Products in development", sub: "Kernel · Folio · Gridline" },
  { value: 1, suffix: "", label: "Shared runtime", sub: "One substrate underneath" },
  { value: 100, suffix: "%", label: "Self-hosted", sub: "No one else's infrastructure" },
];

const values = [
  {
    index: "01",
    title: "Complete",
    accent: "#a55cff",
    body: "Nothing half-built. If it ships, it works end to end — the model, the browser, the surface.",
  },
  {
    index: "02",
    title: "Working",
    accent: "#2dd4a8",
    body: "Every build verified clean — the site, the model, the browser. Reproducible or it doesn't ship.",
  },
  {
    index: "03",
    title: "Accountable",
    accent: "#ff00ea",
    body: "No one else's infrastructure. The runtime is ours — moved off its original scaffolding onto an independent, self-hosted stack.",
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
              Substrate is built by a small team that works close to the code across Kernel, Folio, and Gridline. Every product is held to the same standard: complete, working, and accountable to
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
                text="Vidit Sharma founded Substrate and leads research, product, and engineering across Kernel, Folio, and Gridline. He works close to the code — across model research, product systems, and the interfaces that connect them. The same standard applies across all three products: complete, working, and accountable."
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

      {/* Values — the standard, with Sudo keeping score */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <h2 className="max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>How we build</BoxReveal>
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              The standard applied across all three products. Sudo checks every box twice — we only
              print what survives the audit.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mx-auto w-full max-w-[12rem] lg:mb-1">
            <SudoFigure src={sudo.success.src} alt={sudo.success.alt} />
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.index} delay={0.1 + i * 0.06} className="h-full">
              <FieldCard
                index={v.index}
                title={v.title}
                copy={v.body}
                accent={v.accent}
                badge="Standard"
                className="h-full"
                style={{ minHeight: "15rem" }}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
