import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Layers, Network, Rocket, ShieldCheck, Workflow } from "lucide-react";
import { CodeLattice } from "@/components/gridline/CodeLattice";
import { Reveal } from "@/components/Reveal";
import { AuraCard } from "@/components/home/AuraCard";
import { SudoFigure, sudo } from "@/components/sudo/SudoFigure";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gridline")({
  head: () => ({ meta: [
    { title: "Gridline — Agentic code editor by Substrate" },
    { name: "description", content: "Gridline is an agentic code editor that plans, edits across files, and verifies every change with local repository context." },
    { property: "og:title", content: "Gridline — Agentic code editor" },
    { property: "og:description", content: "Plan, build, and verify ambitious software with a coding agent grounded in your repository." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: GridlinePage,
});

const principles = [
  { icon: Layers, number: "01", glow: "#6085ff", title: "Repository-native context", body: "Symbols, dependencies, tests, and conventions form one local semantic map — not a flattened prompt." },
  { icon: Workflow, number: "02", glow: "#a55cff", title: "Plans before patches", body: "Gridline surfaces intent, dependencies, and verification steps before an agent changes the codebase." },
  { icon: ShieldCheck, number: "03", glow: "#ff00ea", title: "Evidence with every change", body: "Readable diffs, test output, screenshots, and traceable decisions stay attached to the work." },
];

const loop = [
  "Read the codebase as a connected system",
  "Turn intent into a visible execution plan",
  "Edit across files without losing local conventions",
  "Run checks and return evidence for review",
];

const evidence = [
  { value: "218", label: "symbols indexed locally" },
  { value: "06", label: "files per average plan" },
  { value: "18", label: "checks per change" },
];

function GridlinePage() {
  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
          <Reveal>
            <p className="rule-label">Substrate / Gridline · public preview</p>
            <h1 className="mt-6 max-w-5xl text-5xl leading-[0.98] text-foreground sm:text-7xl lg:text-8xl">Software engineering,<br /><em>with an agent in the loop.</em></h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Gridline understands the repository, drafts a plan, asks what matters, and proves its work before anything lands.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button size="lg" asChild><a href="mailto:hello@substrate.dev?subject=Gridline%20Access">Request access <ArrowUpRight /></a></Button>
              <Button variant="outline" size="lg" asChild><a href="#system">Explore the system</a></Button>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-16"><CodeLattice /></Reveal>
        </div>
      </section>

      <section id="system" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal><p className="rule-label">A different editor primitive</p><h2 className="mt-5 max-w-3xl text-4xl leading-tight text-foreground sm:text-6xl">The unit of work is no longer a line. It is a verified outcome.</h2></Reveal>
        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {principles.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="h-full">
              <AuraCard
                title={item.title}
                badge={item.number}
                glow={item.glow}
                glow2="#ff9f60"
                className="h-full"
                style={{ minHeight: "18rem" }}
                footer={<p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>}
                visual={<item.icon className="size-5" />}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-rule bg-card/45">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 py-24 sm:py-32 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal><p className="rule-label">The agent loop</p><h2 className="mt-5 text-4xl sm:text-5xl">Perceive. Plan. Build. Verify.</h2><p className="mt-5 max-w-md text-muted-foreground">A continuous loop keeps the model grounded in the current state of the work, not yesterday’s snapshot.</p></Reveal>
          <div className="border-t border-border">
            {loop.map((text, index) => (
              <Reveal key={text} delay={index * 0.05} className="flex items-center gap-5 border-b border-border py-7"><span className="rule-label">0{index + 1}</span><p className="text-lg">{text}</p><Check className="ml-auto size-4 text-emerald-600" /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-rule mx-auto max-w-6xl px-6 py-24 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="mx-auto w-full max-w-[16rem]">
            <SudoFigure src={sudo.deploy.src} alt={sudo.deploy.alt} caption="Sudo ships on Fridays" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="rule-label">From plan to production</p>
            <h2 className="mt-5 max-w-xl text-3xl leading-tight text-foreground sm:text-5xl">
              The repository is the launch pad, not the bottleneck.
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground">
              A plan that a human can read, diffs that stay small enough to review, checks that run
              before anything merges — and automations that keep the whole loop running while you
              sleep. Gridline was built for the last mile of software: the part where verified work
              actually leaves the ground.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["Automations", "Review queues", "18/18 checks"].map((chip, i) => (
                <span key={chip} className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-foreground/30 hover:text-foreground" style={{ transitionDelay: `${i * 20}ms` }}>
                  <Rocket className="size-3.5" /> {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {evidence.map((stat, index) => <Reveal key={stat.label} delay={index * 0.05} className="border-l border-border pl-5"><p className="text-3xl">{stat.value}</p><p className="mt-2 text-sm text-muted-foreground">{stat.label}</p></Reveal>)}
        </div>
      </section>

      <section className="section-rule relative isolate overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal>
            <div className="tile-aurora grain-veil relative overflow-hidden rounded-lg p-10 text-center sm:p-16" style={{ "--tile-a": "#fde8d8", "--tile-b": "#ffd9ec", "--tile-c": "#d9e6ff" } as React.CSSProperties}>
              <div className="relative z-10">
                <p className="rule-label">Build with context intact</p>
                <h2 className="mx-auto mt-6 max-w-2xl text-4xl leading-tight text-foreground sm:text-6xl">Give ambitious work a better surface.</h2>
                <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 sm:text-base">Gridline is in active development with a small group of engineering teams.</p>
                <Button size="lg" className="mt-9" asChild><a href="mailto:hello@substrate.dev?subject=Gridline%20Access">Join the preview <ArrowUpRight /></a></Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24 text-center sm:pb-32">
        <Reveal>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Network className="size-4" aria-hidden />
            <p className="text-sm">Gridline runs on the Substrate runtime — the same layer beneath Kernel and Folio.</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
