import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/Reveal";
import { BrandLogo } from "@/components/BrandLogo";
import { SpectralGlobe } from "@/components/SpectralGlobe";
import { MediaFeature } from "@/components/MediaFeature";
import { GrowthGraph } from "@/components/GrowthGraph";
import { MagneticButton } from "@/components/anim/MagneticButton";
import { works } from "@/components/work/workData";
import videoPortrait from "@/assets/substrate-motion-portrait.mp4.asset.json";
import videoSquare from "@/assets/substrate-motion-square.mp4.asset.json";
import { ArrowRight, AudioLines, Braces, Eye, Layers3, Network, ScanSearch, Sparkles, Workflow } from "lucide-react";

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

function Index() {
  return (
    <>
      <section className="hero-lab relative isolate overflow-hidden border-b border-border">
        <div className="technical-grid absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[46rem] max-w-7xl items-center gap-4 px-6 py-16 lg:grid-cols-12 lg:py-20">
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
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, delay: .12, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl text-6xl leading-[0.9] text-foreground sm:text-7xl lg:text-[7rem]">
              Intelligence needs<br /><em>better ground.</em>
            </motion.h1>
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
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.35 }} className="relative lg:col-span-5"><SpectralGlobe /></motion.div>
        </div>
      </section>

      <section className="section-rule mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {[{ value: "03", label: "Products, one runtime" }, { value: "05", label: "Native modalities" }, { value: "01", label: "Shared memory layer" }, { value: "∞", label: "Room to compound" }].map((stat, index) => <Reveal key={stat.label} delay={index * .05} className="border-l border-border pl-5"><p className="text-3xl">{stat.value}</p><p className="mt-2 text-sm text-muted-foreground">{stat.label}</p></Reveal>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal><p className="rule-label">The system</p><h2 className="mt-5 max-w-3xl text-4xl leading-[1.02] text-foreground sm:text-6xl">Three products. One continuous layer.</h2></Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-12">
          {works.map((work, i) => <Reveal key={work.slug} delay={i * .08} className={i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : "md:col-span-12"}><Link to={i === 0 ? "/kernel" : i === 1 ? "/folio" : "/gridline"} className={`spectral-card group flex min-h-[24rem] flex-col justify-between rounded-md p-8 ${i === 2 ? "md:min-h-[20rem]" : ""}`}><div className="relative z-10 flex items-center justify-between"><BrandLogo variant={work.logo} className={`h-11 w-11 object-contain ${work.logo === "kernel" ? "w-16" : ""}`} /><span className="rule-label">0{i + 1}</span></div><div className="relative z-10 max-w-xl"><h3 className="text-4xl sm:text-5xl">{work.name}</h3><p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{work.lede}</p><span className="mt-7 inline-flex items-center gap-2 text-sm">Explore {work.name}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span></div></Link></Reveal>)}
        </div>
      </section>

      <section className="section-rule mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal><p className="rule-label">A compounding platform</p><h2 className="mt-5 max-w-3xl text-4xl leading-[1.02] sm:text-6xl">Every new capability strengthens the whole system.</h2></Reveal>
        <div className="mt-14"><GrowthGraph /></div>
      </section>

      <section className="section-rule bg-card/45">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[.75fr_1.25fr] lg:py-32">
          <Reveal><p className="rule-label">Multimodal by design</p><h2 className="mt-5 text-4xl leading-tight sm:text-5xl">The world does not arrive as text alone.</h2><p className="mt-6 max-w-md leading-relaxed text-muted-foreground">Kernel keeps text, images, sound, video, and tools in one conversation and one context.</p></Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
            {[{icon: Eye,label:"Vision"},{icon: AudioLines,label:"Audio"},{icon: Braces,label:"Code"},{icon: Layers3,label:"Context"}].map(({icon:Icon,label},i)=><Reveal key={label} delay={i*.05} className="flex min-h-48 flex-col justify-between bg-background p-6 transition-colors hover:bg-accent/60"><Icon className="size-5"/><div><p className="text-2xl">{label}</p><p className="rule-label mt-2">Native input</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32"><Reveal><p className="rule-label">Our vision</p><h2 className="mt-5 max-w-3xl text-4xl leading-tight sm:text-6xl">Computers should perceive more of the world—and ask less of you.</h2><p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">We are building toward software that can see, listen, reason, and act across the same context. The interface becomes quieter as the intelligence underneath becomes more complete.</p></Reveal><div className="mt-12 grid gap-4 lg:grid-cols-[1.18fr_.82fr]"><MediaFeature src={videoSquare.url} label="Vision study" title="An interface that learns to see." /><MediaFeature src={videoPortrait.url} label="Human expression" title="Intelligence with texture, memory, and point of view." portrait /></div></section>

      <section className="section-rule bg-card/45">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <Reveal><p className="rule-label">How the substrate works</p><h2 className="mt-5 max-w-3xl text-4xl leading-tight sm:text-6xl">One foundation. Specialized experiences.</h2></Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[{ icon: ScanSearch, title: "Perceive", body: "Images, voice, video, documents, and live interfaces enter one shared context." }, { icon: Network, title: "Connect", body: "Memory and tools remain available across products instead of resetting at every surface." }, { icon: Workflow, title: "Act", body: "Agents move from understanding to useful work with visible plans and controlled execution." }, { icon: Sparkles, title: "Improve", body: "Every interaction becomes evidence for a more capable, more coherent system." }].map(({ icon: Icon, title, body }, index) => <Reveal key={title} delay={index * .06} className="ambient-card"><Icon className="size-5"/><div><span className="rule-label">0{index + 1}</span><h3 className="mt-3 text-3xl">{title}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{body}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section-rule relative isolate overflow-hidden"><div className="spectral-field spectral-field-soft" aria-hidden="true"/><Reveal className="relative mx-auto max-w-4xl px-6 py-28 text-center sm:py-36"><p className="rule-label">Build on better ground</p><h2 className="mt-6 text-5xl leading-tight sm:text-7xl">The next interface starts underneath.</h2><p className="mx-auto mt-6 max-w-lg text-muted-foreground">Explore how Substrate turns one shared runtime into three distinct products.</p><Link to="/studio" className="mt-9 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground">Inside the studio <ArrowRight className="size-4" /></Link></Reveal>
      </section>
    </>
  );
}
