import { useState } from "react";
import { Check, GitBranch, Play, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const tasks = [
  { title: "Map the repository", detail: "218 symbols indexed locally", icon: GitBranch },
  { title: "Draft the plan", detail: "6 files · 3 verification steps", icon: Terminal },
  { title: "Build and verify", detail: "18 checks ready to run", icon: Check },
];

export function CodeLattice() {
  const [active, setActive] = useState(1);

  return (
    <div className="gridline-window">
      <div className="gridline-window-bar">
        <span className="status-dot" />
        <span>gridline / substrate-web</span>
        <span className="ml-auto">local context</span>
      </div>
      <div className="grid gap-px bg-gridline-border lg:grid-cols-[15rem_1fr]">
        <div className="bg-gridline-panel p-3">
          <p className="gridline-label px-2 py-3">Execution plan</p>
          {tasks.map((task, index) => {
            const Icon = task.icon;
            return (
              <Button
                key={task.title}
                variant={active === index ? "gridline" : "gridlineGhost"}
                className="mb-1 h-auto w-full justify-start gap-3 whitespace-normal px-3 py-3 text-left"
                onClick={() => setActive(index)}
              >
                <Icon className="size-4 shrink-0" />
                <span><strong className="block text-xs">{task.title}</strong><span className="mt-1 block text-[0.625rem] opacity-60">{task.detail}</span></span>
              </Button>
            );
          })}
        </div>
        <div className="relative min-h-[22rem] overflow-hidden bg-gridline p-5 sm:p-8">
          <div className="gridline-code-grid" aria-hidden="true" />
          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center gap-3">
              <span className="gridline-label">Agent trace 03</span>
              <span className="gridline-chip">Kernel multimodal</span>
            </div>
            <div className="mt-8 space-y-3 font-mono text-xs leading-6 text-gridline-muted">
              <p><span className="text-gridline-accent">01</span> Read design references and current routes</p>
              <p><span className="text-gridline-accent">02</span> Resolve shared tokens and interface boundaries</p>
              <p><span className="text-gridline-accent">03</span> Implement the selected plan across 6 files</p>
              <p className="text-gridline-success">✓ No unresolved imports · preview ready</p>
            </div>
            <div className="mt-auto flex items-center justify-between border-t border-gridline-border pt-5">
              <span className="text-xs text-gridline-muted">Every change remains reviewable.</span>
              <Button variant="gridline" size="sm"><Play className="size-3" /> Run plan</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}