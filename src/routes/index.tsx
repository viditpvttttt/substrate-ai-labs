import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { BrandLogo } from "@/components/BrandLogo";
import { SpectralGlobe } from "@/components/SpectralGlobe";
import { MediaFeature } from "@/components/MediaFeature";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { WordsReveal } from "@/components/anim/WordsReveal";
import { works } from "@/components/work/workData";
import videoPortrait from "@/assets/substrate-motion-portrait.mp4.asset.json";
import videoSquare from "@/assets/substrate-motion-square.mp4.asset.json";
import { ArrowRight, AudioLines, Braces, Eye, Layers3 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Substrate — Kernel, Folio & Gridline" },
      {
        name: "description",
        content:
          "Substrate is a research and product studio building Kernel, a multimodal LLM chatbot; Folio, a quiet operating surface; and Gridline, a coding agent — all on one substrate.",
      },
      { property: "og:title", content: "Substrate — Kernel, Folio & Gridline" },
      {
        property: "og:description",
        content:
          "A research and product studio for the ambient computer — a multimodal chatbot, an operating surface and a coding agent on one substrate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const marqueeTerms = [
  "Multimodal",
  "Autonomous agents",
  "Local-first",
  "One runtime",
  "Shared memory",
  "Long context",
  "Ambient computing",
  "No translators",
];

function Index() {
  return (
    <>
      <section className="hero-lab relative isolate overflow-hidden border-b border-border">
        <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-8 px-6 py-14 lg:grid-cols-12 lg:py-20">
          <div className="relative z-10 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 inline-flex items-center gap-3"
            >
              <BrandLogo variant="substrate" className="h-9 w-9 rounded-full" />
              <span className="rule-label">Research and product studio</span>
            </motion.div>
            <h1 className="max-w-3xl text-6xl leading-[0.92] text-foreground sm:text-7xl lg:text-[7.5rem]">
              <WordsReveal text="Intelligence needs" delay={0.15} />
              <br />
              <em><WordsReveal text="better ground." delay={0.45} /></em>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              Substrate builds the model, the working surface, and the coding agent as one connected system — fewer seams, more capable software.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <MagneticButton>
                <Link
                  to="/work"
                  className="btn-shine inline-block rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
                >
                   Explore our work
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link
                  to="/kernel"
                  className="group inline-flex items-center gap-2 text-sm text-foreground"
                >
                   Meet Kernel
                  <span className="text-muted-foreground transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.35 }} className="relative lg:col-span-5"><SpectralGlobe /><div className="absolute bottom-8 left-0 rounded-md border border-border bg-background/80 px-4 py-3 shadow-lg backdrop-blur-xl"><p className="rule-label">One shared context</p><p className="mt-1 text-sm">Text · vision · audio · code</p></div></motion.div>
        </div>
      </section>

      {/* Terms strip */}
      <section className="overflow-hidden border-y border-border/70 bg-card/60 py-4" aria-hidden="true">
        <div className="marquee-track [animation-play-state:running] hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {marqueeTerms.map((t) => (
                <span
                  key={`${copy}-${t}`}
                  className="mx-8 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal><p className="rule-label">The system</p><h2 className="mt-5 max-w-3xl text-4xl leading-[1.02] text-foreground sm:text-6xl">Three products. One continuous layer.</h2></Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-12">
          {works.map((work, i) => <Reveal key={work.slug} delay={i * .08} className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"}><Link to={i === 0 ? "/kernel" : i === 1 ? "/folio" : "/gridline"} className={`spectral-card group flex min-h-[24rem] flex-col justify-between rounded-md p-8 ${i === 2 ? "md:min-h-[20rem]" : ""}`}><div className="relative z-10 flex items-center justify-between"><BrandLogo variant={work.logo} className={`h-11 w-11 object-contain ${work.logo === "kernel" ? "w-16" : ""}`} /><span className="rule-label">0{i + 1}</span></div><div className="relative z-10 max-w-xl"><h3 className="text-4xl sm:text-5xl">{work.name}</h3><p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{work.lede}</p><span className="mt-7 inline-flex items-center gap-2 text-sm">Explore {work.name}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div></Link></Reveal>)}
        </div>
      </section>

      <section className="section-rule bg-card/45">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[.75fr_1.25fr] lg:py-32">
          <Reveal><p className="rule-label">Multimodal by design</p><h2 className="mt-5 text-4xl leading-tight sm:text-5xl">The world does not arrive as text alone.</h2><p className="mt-6 max-w-md leading-relaxed text-muted-foreground">Kernel keeps text, images, sound, video, and tools in one conversation and one context.</p></Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
            {[{icon: Eye,label:"Vision"},{icon: AudioLines,label:"Audio"},{icon: Braces,label:"Code"},{icon: Layers3,label:"Context"}].map(({icon:Icon,label},i)=><Reveal key={label} delay={i*.05} className="flex min-h-48 flex-col justify-between bg-background p-6 transition-colors hover:bg-accent/60"><Icon className="size-5"/><div><p className="text-2xl">{label}</p><p className="rule-label mt-2">Native input</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32"><Reveal><p className="rule-label">In motion</p><h2 className="mt-5 max-w-2xl text-4xl leading-tight sm:text-5xl">Interfaces that explain themselves by moving.</h2></Reveal><div className="mt-12 grid gap-4 lg:grid-cols-[.78fr_1.22fr]"><MediaFeature src={videoPortrait.url} label="Product study 01" title="A vertical interface built for continuous attention." portrait /><MediaFeature src={videoSquare.url} label="Product study 02" title="Motion as feedback, not decoration." /></div></section>

      <section className="section-rule relative isolate overflow-hidden"><div className="spectral-field spectral-field-soft" aria-hidden="true"/><Reveal className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:py-36"><p className="rule-label">Build on better ground</p><h2 className="mt-6 text-5xl leading-tight sm:text-7xl">The next interface starts underneath.</h2><p className="mx-auto mt-6 max-w-lg text-muted-foreground">Explore how Substrate turns one shared runtime into three distinct products.</p><Link to="/studio" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground">Inside the studio <ArrowRight className="size-4" /></Link></Reveal>
      </section>
    </>
  );
}
