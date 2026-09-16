import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { BoxReveal } from "@/components/anim/BoxReveal";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { ScrambleText } from "@/components/anim/ScrambleText";
import { TiltCard } from "@/components/TiltCard";
import { works } from "@/components/work/workData";
import { WorkTile } from "@/components/work/WorkTile";
import { VanishForm } from "@/components/ui/skiper-ui/skiper56";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — the Substrate portfolio" },
      {
        name: "description",
        content:
          "Deep dives into everything Substrate builds: Kernel, the multimodal LLM chatbot; Folio, the quiet operating surface; and Gridline, the coding agent.",
      },
      { property: "og:title", content: "Work — the Substrate portfolio" },
      {
        property: "og:description",
        content: "Deep dives into Kernel, Folio and Gridline — one substrate underneath.",
      },
    ],
  }),
  component: WorkIndex,
});

function WorkIndex() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="spectral-field" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <p className="rule-label">
            <ScrambleText text="Work" />
          </p>
          <h1 className="mt-6 text-5xl leading-[1.05] text-foreground sm:text-6xl">
            Every work, in <em className="font-light">detail</em>
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Three products on one substrate. Each page holds the problem, the approach, the
            milestones and the shape of the thing as it stands today.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24 sm:pb-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((work, i) => (
            <Reveal key={work.slug} delay={i * 0.08} className="h-full">
              <TiltCard className="h-full">
                <WorkTile work={work} />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border/70 bg-card/40">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center sm:py-28">
          <Reveal>
            <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
              <BoxReveal>Want the behind-the-scenes?</BoxReveal>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Ask about any of the works — we answer plainly, with the method attached.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <VanishForm
                placeholder="Ask anything about Kernel, Folio or Gridline..."
                onSubmit={() => {}}
              />
            </div>
            <div className="mt-8">
              <MagneticButton>
                <Link
                  to="/studio"
                  className="inline-block rounded-full border border-border bg-card/60 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
                >
                  How the studio builds
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
