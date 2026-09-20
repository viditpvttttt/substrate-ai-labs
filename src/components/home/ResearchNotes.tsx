import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SudoFigure, sudo } from "@/components/sudo/SudoFigure";

const notes = [
  { date: "Sep 2026", tag: "Research", title: "Grounding agents in repository structure, not chunks" },
  { date: "Aug 2026", tag: "Product", title: "Why the working surface comes before the app store" },
  { date: "Jul 2026", tag: "Research", title: "Measuring multimodal consistency across long threads" },
  { date: "Jun 2026", tag: "Studio", title: "Notes on building with a shared memory layer" },
];

export function ResearchNotes() {
  return (
    <section className="section-rule mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="relative">
        <Reveal>
          <p className="rule-label">From the studio</p>
          <h2 className="mt-5 max-w-3xl text-4xl leading-[1.02] text-foreground sm:text-6xl">Research, in the open.</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">Sudo reads everything twice and files the good parts. Come read along — method attached, no hand-waving.</p>
        </Reveal>
        <div className="pointer-events-none absolute -top-8 right-0 hidden w-40 xl:block" aria-hidden="true">
          <SudoFigure src={sudo.research.src} alt="" />
        </div>
      </div>
      <div className="mt-14 border-t border-border">
        {notes.map((note, index) => (
          <Reveal key={note.title} delay={index * 0.05}>
            <a
              href="mailto:hello@substrate.dev"
              className="group flex flex-wrap items-baseline gap-x-8 gap-y-1 border-b border-border py-7 transition-colors hover:bg-card/60"
            >
              <span className="font-mono text-xs text-muted-foreground">{note.date}</span>
              <span className="aura-badge aura-badge-outline">{note.tag}</span>
              <span className="min-w-0 flex-1 basis-64 text-lg text-foreground sm:text-xl">{note.title}</span>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
