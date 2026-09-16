import { Check, FileText, Square } from "lucide-react";
import { Chip, TrafficDots } from "@/components/gridline/parts";

/**
 * The "Plan Mission Control" window — Gridline drafting a feature PRD,
 * asking clarifying questions, and tracking tasks. Recreated from the
 * Gridline product reference.
 */
export function PlanWindow() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171717] shadow-2xl shadow-black/50">
      {/* Tab bar */}
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <TrafficDots />
        <div className="ml-2 flex items-center gap-1">
          <span className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[0.6875rem] text-white">
            feature-prd.md
          </span>
          <span className="rounded-md px-2.5 py-1 font-mono text-[0.6875rem] text-[#666]">
            presence.ts
          </span>
        </div>
        <span className="ml-auto hidden font-mono text-[0.625rem] text-[#666] sm:block">
          Plans &gt; feature-prd.md
        </span>
      </div>

      <div className="grid lg:grid-cols-[1fr_260px]">
        {/* Left — the plan conversation */}
        <div className="border-white/10 p-4 lg:border-r sm:p-5">
          <h3 className="text-sm font-semibold text-white">Plan Mission Control</h3>
          <div className="mt-3 rounded-lg border border-white/10 bg-[#1f1f1f] p-3 text-xs leading-5 text-[#d4d4d4]">
            let's build a mission control interface, similar to the expose-style window manager on
            macOS
          </div>
          <div className="mt-3 space-y-1.5 font-mono text-[0.6875rem] text-[#a1a1a1]">
            <p>Thought 4s</p>
            <p>Read AppManager.tsx</p>
            <p>Searched expose patterns</p>
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-md border border-white/10 bg-[#1f1f1f] px-2.5 py-1.5 font-mono text-[0.6875rem]">
            <FileText className="h-3 w-3 text-[#666]" />
            <span className="text-[#d4d4d4]">feature-prd.md</span>
            <span className="text-[#10b981]">+68</span>
          </div>
          <p className="mt-4 text-xs leading-5 text-[#a1a1a1]">
            Drafted implementation steps in{" "}
            <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[0.6875rem] text-[#d4d4d4]">
              feature-prd.md
            </code>
            . A few quick questions before I start building:
          </p>

          {/* Questions */}
          <p className="mt-5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-[#666]">
            Questions
          </p>
          <p className="mt-2 text-xs font-medium text-[#ededed]">
            How should Mission Control be triggered?
          </p>
          <div className="mt-2.5 space-y-1.5">
            {[
              "1  Gesture (swipe up with 3 fingers)",
              "2  Keyboard shortcut (e.g. F3 or Ctrl+F3)",
              "3  Both keyboard and button",
            ].map((option, i) => (
              <button
                key={option}
                type="button"
                className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs transition-colors ${
                  i === 1
                    ? "border-[#f97316]/50 bg-[#2a221a]/70 text-white"
                    : "border-white/10 bg-[#1f1f1f] text-[#a1a1a1] hover:border-white/20"
                }`}
              >
                <span className="font-mono text-[0.625rem] text-[#666]">{option.slice(0, 1)}</span>
                {option.slice(2)}
              </button>
            ))}
          </div>

          {/* Footer actions */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-md border border-white/10 bg-[#1f1f1f] px-3.5 py-1.5 text-xs text-[#a1a1a1] transition-colors hover:text-white"
              >
                Skip
              </button>
              <button
                type="button"
                className="rounded-md bg-[#f97316] px-3.5 py-1.5 text-xs font-medium text-black transition-colors hover:bg-[#ff7a33]"
              >
                Continue
              </button>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              <Chip>Plan</Chip>
              <Chip>Kernel 4.6</Chip>
            </div>
          </div>
        </div>

        {/* Right — the drafted PRD */}
        <div className="hidden p-5 lg:block">
          <h4 className="text-xs font-semibold text-white">Mission Control Interface</h4>
          <p className="mt-2 text-[0.6875rem] leading-5 text-[#a1a1a1]">
            A grid view of all open windows as scaled previews, allowing quick selection to bring
            any window to front.
          </p>
          <p className="mt-4 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-[#666]">
            Trigger
          </p>
          <p className="mt-1.5 text-[0.6875rem] leading-5 text-[#a1a1a1]">
            Menu item in MenuBar.tsx (View → Mission Control), hotkey F3, or double-tap on desktop.
          </p>
          <p className="mt-4 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-[#666]">
            3 Tasks
          </p>
          <div className="mt-2 space-y-2">
            {[
              "Add multiplayer mode to useAppStore.ts",
              "Create MissionControlView.tsx component",
              "Update AppManager.tsx to apply expose modes",
            ].map((task) => (
              <p key={task} className="flex items-start gap-2 text-[0.6875rem] leading-5 text-[#a1a1a1]">
                <Square className="mt-0.5 h-3 w-3 shrink-0 text-[#666]" />
                {task}
              </p>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-1.5 font-mono text-[0.625rem] text-[#666]">
            <Check className="h-3 w-3 text-[#10b981]" /> plan synced to repository
          </p>
        </div>
      </div>
    </div>
  );
}
