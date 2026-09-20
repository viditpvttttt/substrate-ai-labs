import { ArrowUpRight, Braces, Check, Eye, FileText, Folder, Gauge, Layers3, Link2, ListChecks, Lock, Mic, Play, Search, Sparkles } from "lucide-react";
import { AuraCard } from "./AuraCard";
import { Reveal } from "@/components/Reveal";

/* ——— miniature interfaces ——— */

function ChatMock() {
  return (
    <div className="tile-aurora overflow-hidden rounded-xl border border-border/70 p-5" style={{ "--tile-a": "#ffd9ec", "--tile-b": "#e3d9ff", "--tile-c": "#fff" } as React.CSSProperties}>
      <div className="flex flex-col gap-3">
        <div className="ml-auto max-w-[78%] rounded-2xl rounded-br-md border border-border/60 bg-white px-4 py-2.5 text-xs leading-relaxed text-foreground shadow-sm">
          Summarize today's design review and pull the research notes.
        </div>
        <div className="max-w-[86%] rounded-2xl rounded-bl-md border border-border/60 bg-white px-4 py-2.5 text-xs leading-relaxed text-foreground shadow-sm">
          Here's the digest — three decisions, two open questions, and the notes are filed:
        </div>
        <div className="rounded-xl border border-border/60 bg-white p-3 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: ListChecks, name: "Review digest", meta: "Gridline · plan draft" },
              { icon: FileText, name: "Research notes", meta: "Folio · filed" },
            ].map((item) => (
              <div key={item.name} className="rounded-lg border border-border/60 bg-background/70 p-3">
                <item.icon className="size-4 text-[#6085ff]" />
                <p className="mt-2 text-xs font-medium text-foreground">{item.name}</p>
                <p className="mt-0.5 text-[0.625rem] text-muted-foreground">{item.meta}</p>
              </div>
            ))}
          </div>
          <button className="mt-3 w-full rounded-full bg-[#e0e7ff] py-2 text-xs font-medium text-[#1e40af]">Open in Folio</button>
        </div>
      </div>
    </div>
  );
}

function PlanMock() {
  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-border/60 px-4 py-2.5 text-[0.625rem] text-muted-foreground">
        <Eye className="size-3.5" />
        <Braces className="size-3.5" />
        <Layers3 className="size-3.5" />
        <span className="ml-auto font-mono">gridline / substrate-web</span>
      </div>
      <div className="space-y-2.5 p-4">
        {[
          { icon: Search, text: "Map the repository — 218 symbols indexed", done: true },
          { icon: ListChecks, text: "Draft the plan — 6 files, 3 verification steps", done: true },
          { icon: Play, text: "Build and verify — 18 checks ready", done: false },
        ].map((step) => (
          <div key={step.text} className="flex items-center gap-3 rounded-lg border border-border/50 bg-background/60 px-3 py-2.5">
            <step.icon className="size-3.5 shrink-0 text-[#6085ff]" />
            <p className="text-[0.6875rem] leading-snug text-foreground/90">{step.text}</p>
            {step.done && <Check className="ml-auto size-3.5 shrink-0 text-emerald-600" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SurfaceMock() {
  const items = [
    { icon: Gauge, label: "Metrics", active: false },
    { icon: Folder, label: "Projects", active: true },
    { icon: FileText, label: "Research", active: false },
    { icon: Mic, label: "Voice notes", active: false },
    { icon: Link2, label: "Connectors", active: false },
    { icon: Lock, label: "Security", active: false },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm">
      <div className="grid grid-cols-2 gap-px bg-border/50 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className={`flex items-center gap-2.5 px-3.5 py-3 ${item.active ? "bg-secondary/70" : "bg-background"}`}>
            <item.icon className="size-3.5 text-muted-foreground" />
            <span className="text-[0.6875rem] text-foreground/80">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ——— section ——— */

const capabilities = [
  {
    title: "Conversations that carry their context",
    badge: "multimodal",
    copy: "Kernel keeps text, images, sound, and video in one thread — and hands its working memory to every surface it touches.",
    glow: "#6085ff",
    glow2: "#ff00ea",
    visual: <ChatMock />,
  },
  {
    title: "Plans before patches",
    badge: "verified",
    copy: "Gridline reads the repository as a connected system, drafts a visible plan, and proves every change before it lands.",
    glow: "#ff00ea",
    glow2: "#ff9f60",
    visual: <PlanMock />,
  },
  {
    title: "A working surface that stays quiet",
    badge: "ambient",
    copy: "Folio holds projects, research, and automation in one calm place — the interface recedes while the work moves forward.",
    glow: "#d8f3dc",
    glow2: "#6085ff",
    visual: <SurfaceMock />,
  },
];

export function CapabilityBento() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <Reveal>
        <p className="rule-label">Built for the work</p>
        <h2 className="mt-5 max-w-3xl text-4xl leading-[1.02] text-foreground sm:text-6xl">
          Small surfaces. Deep machinery underneath.
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {capabilities.map((card, index) => (
          <Reveal key={card.title} delay={index * 0.08} className="h-full">
            <AuraCard
              title={card.title}
              copy={card.copy}
              badge={card.badge}
              glow={card.glow}
              glow2={card.glow2}
              expandable
              className="h-full"
              footer={
                <span className="inline-flex items-center gap-1.5 text-sm text-foreground">
                  <Sparkles className="size-4" aria-hidden />
                  Running on one substrate
                </span>
              }
            >
              {card.visual}
            </AuraCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
