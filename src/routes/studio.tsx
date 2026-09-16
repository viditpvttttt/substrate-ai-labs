import { createFileRoute } from "@tanstack/react-router";
import { SignalDoodle } from "@/components/SignalDoodle";
import { Reveal } from "@/components/Reveal";
import { BoxReveal } from "@/components/anim/BoxReveal";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — how Substrate builds" },
      {
        name: "description",
        content:
          "Substrate is a research and product studio building Kernel, VOID and Folio on one shared runtime. How we build, and how to reach us.",
      },
      { property: "og:title", content: "Studio — how Substrate builds" },
      {
        property: "og:description",
        content:
          "A small research and product studio for the ambient computer: Kernel, VOID and Folio on one substrate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudioPage,
});

const principles = [
  {
    index: "01",
    title: "One substrate",
    body: "Kernel, VOID and Folio share the same runtime, the same memory, the same notion of context. Nothing is bolted on afterwards.",
  },
  {
    index: "02",
    title: "Modality-agnostic",
    body: "Text, image, audio, video and structured data enter through one interface. The model is not a chat box with adapters.",
  },
  {
    index: "03",
    title: "Local first",
    body: "Weights, files and browsing state stay as close to the person as the hardware allows. Remote compute is an option, not a default.",
  },
  {
    index: "04",
    title: "Quiet by default",
    body: "No engagement surface. Software that recedes when it has nothing worth saying.",
  },
  {
    index: "05",
    title: "Fewer moving parts",
    body: "Every layer we add has to earn its milliseconds. When a piece stops paying for itself, it goes.",
  },
  {
    index: "06",
    title: "Measured, not claimed",
    body: "Numbers come from runs we can reproduce. If we cannot show the method, we do not print the figure.",
  },
];

const faqs = [
  {
    q: "What is the substrate?",
    a: "It is the shared runtime underneath all four products: one model, one memory, one notion of context. Kernel, VOID, Folio and Gridline are surfaces on top of it — they inherit everything the layer below already knows.",
  },
  {
    q: "Why build a model, a browser, an editor and a surface together?",
    a: "Because the interesting problems live in the joins. A browser that assumes a model is nearby behaves differently from one that treats it as a plugin. Building all four on one runtime lets us solve the join once, properly.",
  },
  {
    q: "Can I use one product without the others?",
    a: "Yes. Each surface stands on its own. They only get better together: Gridline inherits the same AST lattice Arcadia uses, and VOID can read anything Kernel has already seen.",
  },
  {
    q: "How do you handle my data?",
    a: "Local first. Weights, files and browsing state stay on your device unless you explicitly hand them to remote compute — and Folio's memory is a list you can read, edit and delete line by line.",
  },
  {
    q: "What does 'measured, not claimed' mean?",
    a: "Every number we print comes from a run we can reproduce. If we cannot show the method, we do not show the figure.",
  },
];

function StudioPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="spectral-field" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <p className="rule-label">Studio</p>
          <h1 className="mt-6 text-5xl leading-[1.05] text-foreground sm:text-6xl">
            The layer underneath
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Substrate is a small research and product studio for the ambient computer. We build the
            model, the browser and the surface people work on — and we build them on the same ground
            so they behave like one thing.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border/70 bg-card">
        <div className="mx-auto grid max-w-5xl items-center gap-14 px-6 py-24 sm:py-28 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm">
              <img
                src="/images/diagram-grid-topology.png"
                alt="System topology coordinate matrix"
                className="h-auto w-full object-contain mix-blend-multiply transition-transform hover:scale-[1.02]"
              />
            </div>
          </div>
          <div>
            <p className="rule-label">Architecture</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
              Layers, each one replaceable
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              A runtime, a model, a memory, a surface. Each layer speaks a narrow interface to the
              one above it, so any of them can be swapped without the rest noticing. That is the
              whole discipline: fewer moving parts, measured in milliseconds.
            </p>
          </div>
        </div>
      </section>

      <section className="relative border-b border-border/70 bg-card/60 grain-veil">
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <h2 className="max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
            <BoxReveal>How we build</BoxReveal>
          </h2>
          <SignalDoodle className="mt-6 h-8 w-56 text-muted-foreground" aria-hidden="true" />
          <div className="mt-14 grid gap-x-16 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, idx) => (
              <Reveal
                key={p.index}
                delay={(idx % 3) * 0.08}
                className="tick-hover border-t border-border p-3 pt-6 transition-colors"
              >
                <p className="rule-label">{p.index}</p>
                <h3 className="mt-3 text-2xl text-foreground">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/60 grain-veil">
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <Reveal>
            <h2 className="max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>Questions, answered plainly</BoxReveal>
            </h2>
          </Reveal>
          <div className="mt-10">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05}>
                <details className="group border-t border-border py-6 last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg text-foreground transition-colors hover:text-muted-foreground [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="text-2xl font-light text-muted-foreground transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-28">
        <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
          Early, and open to company
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
          If you are building at the same layer — models, runtimes, browsers — we would like to hear
          from you.
        </p>
        <a
          href="mailto:hello@substrate.dev"
          className="mt-9 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Get in touch
        </a>
      </section>
    </>
  );
}
