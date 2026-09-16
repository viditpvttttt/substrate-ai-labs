import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check, Layers, ShieldCheck, Workflow } from "lucide-react";
import { CodeLattice } from "@/components/gridline/CodeLattice";
import { Reveal } from "@/components/Reveal";
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
  { icon: Layers, number: "01", title: "Repository-native context", body: "Symbols, dependencies, tests, and conventions form one local semantic map — not a flattened prompt." },
  { icon: Workflow, number: "02", title: "Plans before patches", body: "Gridline surfaces intent, dependencies, and verification steps before an agent changes the codebase." },
  { icon: ShieldCheck, number: "03", title: "Evidence with every change", body: "Readable diffs, test output, screenshots, and traceable decisions stay attached to the work." },
];

function GridlinePage() {
  return (
    <div className="bg-gridline text-gridline-foreground">
      <section className="gridline-hero">
        <div className="gridline-code-grid" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-28 sm:pb-24 sm:pt-36">
          <Reveal>
            <p className="gridline-label">Substrate / Gridline · public preview</p>
            <h1 className="mt-6 max-w-5xl font-sans text-5xl font-medium leading-[0.98] sm:text-7xl lg:text-8xl">Software engineering,<br /><span className="text-gridline-muted">with an agent in the loop.</span></h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-gridline-muted sm:text-lg">Gridline understands the repository, drafts a plan, asks what matters, and proves its work before anything lands.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button variant="gridline" size="lg" asChild><a href="mailto:hello@substrate.dev?subject=Gridline%20Access">Request access <ArrowUpRight /></a></Button>
              <Button variant="gridlineGhost" size="lg" asChild><a href="#system">Explore the system</a></Button>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-16"><CodeLattice /></Reveal>
        </div>
      </section>

      <section id="system" className="border-y border-gridline-border">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
          <Reveal><p className="gridline-label">A different editor primitive</p><h2 className="mt-5 max-w-3xl font-sans text-4xl font-medium leading-tight sm:text-6xl">The unit of work is no longer a line. It is a verified outcome.</h2></Reveal>
          <div className="mt-16 grid gap-px bg-gridline-border lg:grid-cols-3">
            {principles.map((item, index) => { const Icon = item.icon; return (
              <Reveal key={item.title} delay={index * 0.08} className="h-full bg-gridline-panel p-8 sm:p-10">
                <div className="flex items-center justify-between"><Icon className="size-5 text-gridline-accent" /><span className="gridline-label">{item.number}</span></div>
                <h3 className="mt-20 font-sans text-2xl font-medium">{item.title}</h3><p className="mt-4 text-sm leading-6 text-gridline-muted">{item.body}</p>
              </Reveal>
            ); })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal><p className="gridline-label">The agent loop</p><h2 className="mt-5 font-sans text-4xl font-medium sm:text-5xl">Perceive. Plan. Build. Verify.</h2><p className="mt-5 max-w-md text-gridline-muted">A continuous loop keeps the model grounded in the current state of the work, not yesterday’s snapshot.</p></Reveal>
          <div className="border-t border-gridline-border">
            {["Read the codebase as a connected system", "Turn intent into a visible execution plan", "Edit across files without losing local conventions", "Run checks and return evidence for review"].map((text, index) => (
              <Reveal key={text} delay={index * 0.05} className="flex items-center gap-5 border-b border-gridline-border py-7"><span className="gridline-label">0{index + 1}</span><p className="text-lg">{text}</p><Check className="ml-auto size-4 text-gridline-success" /></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-gridline-border bg-gridline-panel">
        <Reveal className="mx-auto max-w-4xl px-6 py-24 text-center sm:py-32"><p className="gridline-label">Build with context intact</p><h2 className="mt-6 font-sans text-4xl font-medium sm:text-6xl">Give ambitious work a better surface.</h2><p className="mx-auto mt-5 max-w-xl text-gridline-muted">Gridline is in active development with a small group of engineering teams.</p><Button variant="gridline" size="lg" className="mt-9" asChild><a href="mailto:hello@substrate.dev?subject=Gridline%20Access">Join the preview <ArrowUpRight /></a></Button></Reveal>
      </section>
    </div>
  );
}