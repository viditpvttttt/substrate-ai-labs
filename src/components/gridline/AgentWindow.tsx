import { ArrowUpRight, Check, FileText } from "lucide-react";
import { Chip, TrafficDots } from "@/components/gridline/parts";

/**
 * The hero Gridline window — a three-pane agent IDE: a task rail on the
 * left, the agent console in the middle, and a live preview on the right.
 * Recreated from the Gridline product reference.
 */
export function AgentWindow() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#161616] shadow-2xl shadow-black/50">
      {/* Global window bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
          Gridline
        </span>
        <nav className="hidden items-center gap-6 text-xs text-[#a1a1a1] md:flex">
          <span>Models</span>
          <span>Product</span>
          <span>Enterprise</span>
          <span>Resources</span>
        </nav>
        <div className="flex items-center gap-3 text-xs text-[#a1a1a1]">
          <span className="hidden sm:inline">Sign in</span>
          <span className="hidden rounded-full border border-white/20 px-3 py-1 sm:inline">
            Contact sales
          </span>
          <span className="rounded-full bg-white px-3 py-1 font-medium text-black">Download</span>
        </div>
      </div>

      <div className="grid md:grid-cols-[230px_1fr] lg:grid-cols-[230px_1fr_280px]">
        {/* Left — task rail */}
        <div className="hidden border-r border-white/10 md:block">
          <p className="px-4 pt-4 pb-2 text-[0.6875rem] uppercase tracking-[0.14em] text-[#666]">
            Ready for review <span className="text-[#a1a1a1]">5</span>
          </p>
          {tasks.map((task) => (
            <div key={task.name} className="border-t border-white/5 px-4 py-3 first:border-t-0">
              <div className="flex items-center gap-2">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#10b981]/15 text-[#10b981]">
                  <Check className="h-2.5 w-2.5" />
                </span>
                <span className="text-xs font-medium text-[#ededed]">{task.name}</span>
                <span className="ml-auto text-[0.625rem] text-[#666]">{task.ago}</span>
              </div>
              <p className="mt-1.5 pl-6 text-[0.6875rem] leading-4 text-[#666]">{task.body}</p>
            </div>
          ))}
        </div>

        {/* Center — agent console */}
        <div className="flex min-w-0 flex-col border-white/10 lg:border-r">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <span className="text-xs font-semibold text-white">Build Landing Page</span>
            <Chip>autonomous</Chip>
          </div>
          <div className="flex-1 space-y-2.5 p-4">
            <div className="rounded-lg border border-white/10 bg-[#1f1f1f] p-3 text-xs leading-5 text-[#d4d4d4]">
              make a landing page based on the acme labs brand book — soft serif, warm neutrals,
              and a projects index
            </div>
            <div className="space-y-1.5 font-mono text-[0.6875rem] text-[#a1a1a1]">
              <p className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-[#666]" /> Read about-acme.md
              </p>
              <p className="flex items-center gap-2">
                <FileText className="h-3 w-3 text-[#666]" /> Read brand-guidelines.pdf
              </p>
              <p>Thought 6s</p>
              <p className="text-[#10b981]">✓ Preview ready at localhost:3000</p>
            </div>
            <div className="space-y-1">
              <DiffRow file="app/page.tsx" added={52} removed={0} />
              <DiffRow file="app/globals.css" added={18} removed={0} />
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2.5">
            <span className="flex-1 rounded-md border border-white/10 bg-[#1f1f1f] px-3 py-1.5 text-xs text-[#666]">
              Add follow-up...
            </span>
            <Chip tone="accent">Kernel Agent</Chip>
          </div>
        </div>

        {/* Right — live preview */}
        <div className="hidden border-white/10 lg:block">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <TrafficDots />
            <span className="ml-1 text-[0.625rem] text-[#666]">localhost:3000</span>
          </div>
          <div className="p-5">
            <h3 className="font-serif text-2xl italic text-white">Acme Labs</h3>
            <p className="mt-3 text-[0.6875rem] leading-5 text-[#a1a1a1]">
              Software creation is changing. We are a group of researchers, engineers and designers
              building what comes next.
            </p>
            <div className="mt-4 rounded-md border border-[#f97316]/40 bg-[#2a221a]/60 px-3 py-2 text-[0.6875rem] text-[#ff7a33]">
              We have much to learn, try, and build.
            </div>
            <a
              href="mailto:hello@substrate.dev?subject=Gridline%20Waitlist"
              className="mt-4 inline-flex items-center gap-1 text-[0.6875rem] font-medium text-[#f97316]"
            >
              See projects <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const tasks = [
  {
    name: "Build Landing Page",
    ago: "now",
    body: "Acme Labs landing page with a serif voice and warm neutrals.",
  },
  {
    name: "Plan Mission Control",
    ago: "10m",
    body: "Expose-style window manager grid for the desktop shell.",
  },
];

function DiffRow({ file, added, removed }: { file: string; added: number; removed: number }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-white/10 bg-[#1f1f1f] px-2.5 py-1.5 font-mono text-[0.6875rem]">
      <FileText className="h-3 w-3 text-[#666]" />
      <span className="text-[#d4d4d4]">{file}</span>
      <span className="ml-auto text-[#10b981]">+{added}</span>
      {removed > 0 && <span className="text-[#f87171]">-{removed}</span>}
    </div>
  );
}
