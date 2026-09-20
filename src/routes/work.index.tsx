import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BoxReveal } from "@/components/anim/BoxReveal";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { ScrambleText } from "@/components/anim/ScrambleText";
import { FieldCard } from "@/components/cards/FieldCard";
import { BrandLogo } from "@/components/BrandLogo";
import { works } from "@/components/work/workData";
import { VanishForm } from "@/components/ui/skiper-ui/skiper56";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — the Substrate portfolio" },
      {
        name: "description",
        content:
          "Deep dives into everything Substrate builds: Kernel, the multimodal LLM chatbot; Folio, the quiet operating surface; and Gridline, the coding agent.",
      },
      { property: "og:title", content: "Work — the Substrate portfolio" },
      {
        property: "og:description",
        content: "Deep dives into Kernel, Folio and Gridline — one substrate underneath.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorkIndex,
});

const accents = ["#d99a4a", "#6085ff", "#ff00ea"];

function WorkIndex() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="spectral-field" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <p className="rule-label">
            <ScrambleText text="Work" />
          </p>
          <h1 className="mt-6 text-5xl leading-[1.05] text-foreground sm:text-6xl">
            Every work, in <em className="font-light">detail</em>
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Three products on one substrate. Each page holds the problem, the approach, the
            milestones and the shape of the thing as it stands today.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
        <div className="grid gap-4 md:grid-cols-3">
          {works.map((work, i) => (
            <Reveal key={work.slug} delay={i * 0.08} className="h-full">
              <Link to="/work/$slug" params={{ slug: work.slug }} className="block h-full">
                <FieldCard
                  index={`0${i + 1}`}
                  badge={work.badge}
                  accent={accents[i] ?? "#6085ff"}
                  title={work.name}
                  className="h-full transition-transform duration-500 hover:-translate-y-1"
                  style={{ minHeight: "21rem" }}
                  visual={
                    <div className="flex items-center justify-between">
                      <BrandLogo
                        variant={work.logo}
                        alt=""
                        className={`h-12 w-12 rounded-full bg-card object-contain p-1 shadow-sm ${work.logo === "kernel" ? "w-16" : ""}`}
                      />
                      <span className="inline-flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                        <span className="pulse-dot" style={{ "--dot": accents[i] } as React.CSSProperties} />
                        {work.status}
                      </span>
                    </div>
                  }
                  copy={work.hero}
                  footer={
                    <div className="flex items-center justify-between border-t border-border pt-4">
                      <span className="inline-flex items-center gap-2 text-sm text-foreground">
                        Read the detail <ArrowRight className="size-4" />
                      </span>
                      <span className="rule-label">{(work.specs[0] ?? work.specs.at(-1))?.v.split(",")[0] ?? work.status}</span>
                    </div>
                  }
                />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Vision — where all of it is heading */}
      <section className="section-rule relative isolate overflow-hidden">
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:py-32 lg:grid-cols-2">
          <Reveal>
            <p className="rule-label">Vision</p>
            <h2 className="mt-5 max-w-xl text-4xl leading-tight text-foreground sm:text-5xl">
              One runtime, moving like a single organism.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Every product on this page runs on the same ground — so a decision made in Kernel
              shows up in Folio, an edit from Gridline lands with evidence, and nothing is ever
              translated twice. This is the motion we are building toward.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Shared context", "Verified work", "Local first"].map((chip, i) => (
                <span
                  key={chip}
                  className="rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-foreground/30 hover:text-foreground"
                  style={{ transitionDelay: `${i * 20}ms` }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="gradient-border relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_110px_-32px_rgba(255,0,234,0.28)]">
              <video
                src="/videos/substrate-flow.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="aspect-video w-full object-cover"
                aria-label="Substrate — the runtime in motion"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" aria-hidden="true" />
              <span className="frame-chip left-4 top-4">substrate · 2026</span>
              <span className="frame-chip bottom-4 right-4"><span className="pulse-dot" style={{ "--dot": "#4dc37f" } as React.CSSProperties} /> one layer</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/70 bg-card/40">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>Want the behind-the-scenes?</BoxReveal>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Ask about any of the works — we answer plainly, with the method attached.
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
                  How the studio builds <ArrowUpRight className="ml-1 inline size-4" />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
