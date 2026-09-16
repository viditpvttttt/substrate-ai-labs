import { Check, ChevronDown, FileDiff, FileText, Folder, FolderOpen } from "lucide-react";
import { SectionLink } from "@/components/gridline/parts";

/**
 * The three-column Gridline feature cards — each a headline, an orange
 * link, and a framed UI window. Recreated from the Gridline product
 * reference.
 */
export function FeatureCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Card 1 — model picker */}
      <FeatureCard
        title="Use the best model for every task"
        body="Switch between frontier and local models mid-task. Gridline keeps the context and re-plans around whichever engine is running."
        link="Explore models"
      >
        <div className="rounded-xl border border-white/10 bg-[#171717] p-4">
          <p className="text-xs text-[#a1a1a1]">Ask Gridline to plan or build anything</p>
          <div className="mt-3 rounded-lg border border-white/10 bg-[#1f1f1f] px-3 py-2 text-xs text-[#d4d4d4]">
            <div className="flex items-center justify-between">
              <span className="font-medium text-white">GPT-5.6 Sol</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#666]" />
            </div>
            <div className="mt-2.5 space-y-1.5 border-t border-white/10 pt-2.5 text-[#a1a1a1]">
              {["Grok 4.6", "Fable 5.1", "Opus 5", "Kernel 4.6 (local)"].map((m) => (
                <p key={m} className="flex items-center gap-2">
                  {m === "Fable 5.1" && <Check className="h-3 w-3 text-[#10b981]" />}
                  {m}
                </p>
              ))}
            </div>
          </div>
        </div>
      </FeatureCard>

      {/* Card 2 — all repos */}
      <FeatureCard
        title="Every repo, one worklist"
        body="Gridline keeps a single queue of running, reviewing and shipped work across all your repositories — with status you can trust."
        link="Explore repos"
      >
        <div className="rounded-xl border border-white/10 bg-[#171717] p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-xs font-semibold text-white">All Repos</p>
            <p className="text-[0.625rem] text-[#666]">today</p>
          </div>
          <div className="mt-3 space-y-3">
            {[
              { name: "Fix sign-in redirect on iOS", repo: "gridline/mobile", status: "Working" },
              { name: "Add rate limits to public routes", repo: "gridline/api", status: "Working" },
              { name: "Refactor checkout telemetry", repo: "gridline/web", status: "Merged" },
            ].map((task) => (
              <div key={task.name} className="flex items-start gap-2.5">
                <span
                  className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                    task.status === "Working" ? "bg-[#f97316]" : "bg-[#10b981]"
                  }`}
                />
                <div className="min-w-0">
                  <p className="truncate text-xs text-[#ededed]">{task.name}</p>
                  <p className="font-mono text-[0.625rem] text-[#666]">{task.repo}</p>
                </div>
                <span className="ml-auto shrink-0 text-[0.625rem] text-[#a1a1a1]">
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FeatureCard>

      {/* Card 3 — reviewable diffs */}
      <FeatureCard
        title="Keep every change reviewable"
        body="Agents edit in place, but nothing lands unseen — every diff is a small, readable commit you can walk line by line."
        link="Explore reviews"
      >
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171717]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
            <p className="flex items-center gap-2 font-mono text-[0.6875rem] text-[#a1a1a1]">
              <FolderOpen className="h-3 w-3 text-[#666]" /> gridline/web
            </p>
            <p className="flex items-center gap-1 font-mono text-[0.625rem] text-[#666]">
              <FileDiff className="h-3 w-3" /> 2 files changed
            </p>
          </div>
          <div className="space-y-1 p-4 font-mono text-[0.625rem] leading-5">
            <p className="flex items-center gap-2 text-[#666]">
              <Folder className="h-3 w-3" /> src/routes
            </p>
            <p className="flex items-center gap-2 text-[#a1a1a1]">
              <FileText className="h-3 w-3" /> page.tsx
              <span className="ml-auto text-[#10b981]">+52</span>
              <span className="text-[#f87171]">-3</span>
            </p>
            <p>
              <span className="text-[#f87171]">- const refresh = useInterval(ctx)</span>
            </p>
            <p>
              <span className="text-[#10b981]">+ const lattice = useAstLattice(ctx)</span>
            </p>
            <p className="pt-1 text-[#666]">✓ commit ready — "switch page to lattice context"</p>
          </div>
        </div>
      </FeatureCard>
    </div>
  );
}

function FeatureCard({
  title,
  body,
  link,
  children,
}: {
  title: string;
  body: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2.5 text-sm leading-6 text-[#a3a3a3]">{body}</p>
        <p className="mt-3">
          <SectionLink>{link}</SectionLink>
        </p>
      </div>
      {children}
    </div>
  );
}
