import { Chip, TrafficDots } from "@/components/gridline/parts";

/**
 * The "everywhere" window stack — a team Slack window behind a Gridline
 * agent terminal, overlapping. Recreated from the Gridline product
 * reference.
 */
export function EverywhereWindows() {
  return (
    <div className="relative mx-auto max-w-xl" aria-hidden="true">
      {/* Slack window — behind, offset up-left */}
      <div className="translate-x-4 -translate-y-6 sm:translate-x-10 sm:-translate-y-10">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#171717] shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
            <TrafficDots />
            <span className="ml-1 text-xs font-medium text-[#ededed]">Slack</span>
          </div>
          <div className="px-4 py-3">
            <div className="flex items-baseline justify-between">
              <p className="text-xs font-semibold text-white">#feature-realtime-sync</p>
              <p className="text-[0.625rem] text-[#666]">8 members</p>
            </div>
            <div className="mt-3 space-y-3">
              <Message
                name="swhitmore"
                ago="5m"
                body="i wanna be able to go to gridline.sh/changelog#1.0 to see the 1.0 changelog"
              />
              <Message name="eric" ago="4m" body="checks out" />
              <div className="flex gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#f97316]/20 text-[0.5625rem] font-bold text-[#f97316]">
                  G
                </span>
                <div className="min-w-0">
                  <p className="flex items-baseline gap-2">
                    <span className="text-[0.6875rem] font-semibold text-white">Gridline APP</span>
                    <span className="text-[0.5625rem] text-[#666]">2m</span>
                  </p>
                  <p className="text-[0.6875rem] leading-5 text-[#a1a1a1]">
                    I added dire constraints. <span className="text-[#f97316]">View PR</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agent terminal — front, overlapping */}
      <div className="relative z-10 -mt-16 sm:-mt-20">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#141414] shadow-2xl shadow-black/60">
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2.5">
            <TrafficDots />
            <span className="ml-1 text-xs text-[#a1a1a1]">gridline-agent</span>
          </div>
          <div className="p-4">
            <p className="font-mono text-[0.6875rem] text-[#a1a1a1]">
              <span className="text-[#666]">&gt;</span> agent
            </p>
            <p className="mt-0.5 font-mono text-[0.6875rem] font-medium text-white">
              Gridline Agent
            </p>
            <p className="font-mono text-[0.6875rem] text-[#666]">~/substrate/research - main</p>
            <div className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-[#1f1f1f] px-3 py-2.5">
              <span className="text-[#f97316]">→</span>
              <span className="text-xs text-[#666]">Plan, search, build anything</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip tone="accent">
                Kernel 4.6
                <span className="text-[#a1a1a1]">Extra High Fast</span>
              </Chip>
              <Chip>/ commands</Chip>
              <Chip>@ files</Chip>
              <Chip>! shell</Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Message({ name, ago, body }: { name: string; ago: string; body: string }) {
  return (
    <div className="flex gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[0.5625rem] font-bold text-[#d4d4d4]">
        {name.slice(0, 1).toUpperCase()}
      </span>
      <div className="min-w-0">
        <p className="flex items-baseline gap-2">
          <span className="text-[0.6875rem] font-semibold text-white">{name}</span>
          <span className="text-[0.5625rem] text-[#666]">{ago}</span>
        </p>
        <p className="break-words text-[0.6875rem] leading-5 text-[#a1a1a1]">{body}</p>
      </div>
    </div>
  );
}
