/**
 * The expanding architecture panel — three stacked layers of the
 * substrate, revealed inside the scroll-to-expand corridor.
 */
const layers = [
  {
    index: "01",
    name: "Model",
    product: "Kernel",
    body: "One multimodal runtime that reads text, images, audio, and video — and keeps the thread across products.",
    accent: "#6085ff",
  },
  {
    index: "02",
    name: "Surface",
    product: "Folio",
    body: "A quiet operating layer where projects, research, and automations live together without tabs, copying, or re-upload.",
    accent: "#ff00ea",
  },
  {
    index: "03",
    name: "Agent",
    product: "Gridline",
    body: "A coding agent grounded in the repository — visible plans, editable diffs, verified outcomes.",
    accent: "#ff9f60",
  },
];

export function ArchitectureStack() {
  return (
    <div className="tile-aurora grain-veil relative flex min-h-[32rem] flex-col justify-center gap-4 overflow-hidden p-8 sm:p-14" style={{ "--tile-a": "#d8f3dc", "--tile-b": "#ffcd89", "--tile-c": "#ff85a2", "--radius": "0px" } as React.CSSProperties}>
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="rule-label">One runtime, three layers</p>
          <h2 className="mt-4 text-4xl leading-tight text-foreground sm:text-6xl">The substrate, end to end.</h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-foreground/70">
          Every layer is optional alone and compounding together — fewer seams between the model, the surface, and the agent.
        </p>
      </div>
      <div className="relative z-10 mt-6 grid gap-3">
        {layers.map((layer) => (
          <div key={layer.index} className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-foreground/10 bg-white/70 px-6 py-5 backdrop-blur-sm">
            <span className="font-mono text-[0.625rem] tracking-[0.22em] text-foreground/50">{layer.index}</span>
            <span className="font-display text-2xl text-foreground">{layer.name}</span>
            <span className="rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium text-white" style={{ background: layer.accent }}>{layer.product}</span>
            <p className="min-w-0 flex-1 basis-64 text-sm leading-relaxed text-foreground/70">{layer.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
