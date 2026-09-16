import { ChevronDown, Clock, Plus, Slack } from "lucide-react";
import { TrafficDots } from "@/components/gridline/parts";

/**
 * The Automations window — an always-on agent config with triggers and
 * instructions. Recreated from the Gridline product reference.
 */
export function AutomationsWindow() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl shadow-black/50">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
        <TrafficDots />
        <span className="ml-1 text-xs text-[#a1a1a1]">Gridline — Automations</span>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-semibold text-white">Fix CI failures on main</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#262626] px-2.5 py-0.5 text-[0.625rem] text-[#a1a1a1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#666]" /> Inactive
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <Dropdown>site</Dropdown>
          <Dropdown>main</Dropdown>
        </div>

        {/* Triggers */}
        <p className="mt-5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-[#666]">
          Triggers
        </p>
        <div className="mt-2 space-y-2">
          <TriggerRow>
            <Clock className="h-3.5 w-3.5 text-[#a1a1a1]" />
            <span className="text-xs text-[#ededed]">Every hour</span>
          </TriggerRow>
          <TriggerRow>
            <Slack className="h-3.5 w-3.5 text-[#a1a1a1]" />
            <span className="text-xs text-[#ededed]">New message in #bug-reports</span>
            <Dropdown>in gridline-website</Dropdown>
            <Dropdown>on main</Dropdown>
          </TriggerRow>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-white/10 px-3 py-2 text-xs text-[#666] transition-colors hover:border-white/20 hover:text-[#a1a1a1]"
          >
            <Plus className="h-3.5 w-3.5" /> Add trigger
          </button>
        </div>

        {/* Agent instructions */}
        <p className="mt-5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-[#666]">
          Agent Instructions
        </p>
        <div className="mt-2 rounded-lg border border-white/10 bg-[#1f1f1f] p-3 text-xs leading-6 text-[#d4d4d4]">
          Your task is to fix CI failures on main. Avoid racing other agents. Root cause by
          checking logs. Report with{" "}
          <code className="rounded bg-[#ccaa00]/20 px-1 py-0.5 font-mono text-[0.6875rem] text-[#e5c114]">
            /apply-report-format
          </code>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-[#666]">
            Tools
          </p>
          <Dropdown>Kernel 4.6</Dropdown>
        </div>
      </div>
    </div>
  );
}

function TriggerRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-[#1f1f1f] px-3 py-2.5">
      {children}
    </div>
  );
}

function Dropdown({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-[#262626] px-2.5 py-1 text-[0.6875rem] text-[#a1a1a1] transition-colors hover:text-white"
    >
      {children}
      <ChevronDown className="h-3 w-3" />
    </button>
  );
}
