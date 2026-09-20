import { createFileRoute } from "@tanstack/react-router";
import { BrandLogo } from "@/components/BrandLogo";
import { Reveal } from "@/components/Reveal";
import { BoxReveal } from "@/components/anim/BoxReveal";
import { FieldCard } from "@/components/cards/FieldCard";
import { SudoFigure, sudo } from "@/components/sudo/SudoFigure";

export const Route = createFileRoute("/folio")({
  head: () => ({
    meta: [
      { title: "Folio — the quiet operating surface for your day" },
      {
        name: "description",
        content:
          "Folio is a Substrate company: an AI dashboard, assistant and agent runner with weather, news, memory, a workbench, work mode and deep research in one surface.",
      },
      { property: "og:title", content: "Folio — a Substrate company" },
      {
        property: "og:description",
        content:
          "One canvas that already knows the shape of your morning — and an assistant that can act on all of it in one sentence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FolioPage,
});

const capabilities = [
  {
    index: "01",
    title: "Weather, properly",
    accent: "#d99a4a",
    body: "Live conditions for anywhere on earth, rendered as a card you actually want to look at — hour by hour, what to wear, when the rain lands.",
  },
  {
    index: "02",
    title: "News you choose",
    accent: "#a55cff",
    body: "Pick your own topics — from world to formula 1 — and Folio keeps a quiet, self-refreshing feed. No algorithm deciding what matters.",
  },
  {
    index: "03",
    title: "Memory that sticks",
    accent: "#2dd4a8",
    body: "Tell it once. Your city, your tone, your stack — editable and deletable line by line, never a shadow profile you cannot see.",
  },
  {
    index: "04",
    title: "Workbench",
    accent: "#6085ff",
    body: "A real editor and your files, with an AI pair-programmer that reads and writes in place while you talk it through.",
  },
  {
    index: "05",
    title: "Work mode",
    accent: "#4dc37f",
    body: "Meeting prep, standups, one-pagers, slide outlines and email drafts — it arrives at the meeting already briefed.",
  },
  {
    index: "06",
    title: "Deep research",
    accent: "#ff00ea",
    body: "It browses, reads and synthesises multiple sources with citations, instead of guessing from stale training data.",
  },
];

const facts = [
  { k: "Shape", v: "Dashboard, assistant and agent runner in one app" },
  { k: "Modes", v: "Home, Work, Workbench, Research" },
  { k: "Sources", v: "Live browsing with citations on every claim" },
  { k: "Memory", v: "Readable, editable, deletable — never a shadow profile" },
  { k: "Platform", v: "macOS first, Windows next" },
  { k: "Status", v: "Private beta — waitlist open" },
];

const privacy = [
  ["Block ads", "On"],
  ["Share content data", "Off"],
  ["Block trackers", "On"],
  ["Personalize new chats", "Off"],
  ["Memory", "On"],
  ["Local-only files", "On"],
  ["Sync encryption", "On"],
];

function FolioPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="spectral-field" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
          <BrandLogo
            variant="folio"
            alt=""
            className="mx-auto h-20 w-20 rounded-2xl bg-card p-1 shadow-sm"
          />
          <p className="rule-label mt-8">A Substrate company</p>
          <h1 className="mt-5 text-5xl leading-[1.05] text-foreground sm:text-6xl">
            Folio is the quiet operating surface for your day.
          </h1>
          <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-muted-foreground">
            One canvas that already knows the shape of your morning: your weather, your news, your
            files, your calendar — and an assistant that can act on all of it in one sentence.
          </p>
          <a
            href="mailto:hello@substrate.dev?subject=Folio%20waitlist"
            className="mt-10 inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Join the waitlist
          </a>
        </Reveal>
      </section>

      <section className="border-y border-border/70 bg-card">
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <h2 className="max-w-xl text-3xl leading-tight text-foreground sm:text-4xl">
            <BoxReveal>Six things, done unusually well.</BoxReveal>
          </h2>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c, i) => (
              <Reveal key={c.index} delay={i * 0.06} className="h-full">
                <FieldCard
                  index={c.index}
                  title={c.title}
                  copy={c.body}
                  accent={c.accent}
                  badge="Folio"
                  className="h-full"
                  style={{ minHeight: "16rem" }}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-14 px-6 py-24 sm:py-28 lg:grid-cols-2">
          <div>
            <p className="rule-label">Inside Folio</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
              One surface instead of five tabs.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Folio starts as a dashboard — the weather you will actually walk through, the four
              topics you care about, what your calendar is about to ask of you. Ask it something and
              the same surface becomes an assistant with your memory already loaded. Hand it a
              repository or a research question and it becomes an agent that works while you watch,
              step by step, with every file edit and every source it opened laid out in the open.
            </p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Nothing is hidden behind a chat transcript. Agents show their plan before they run,
              memory is a list you can read and delete line by line, and every synthesised answer
              keeps the links it came from.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm lg:order-first">
            <img
              src="/images/diagram-spectral-blobs.png"
              alt="Folio surface topology diagram showing multi-agent workspace nodes"
              className="h-auto w-full object-contain mix-blend-multiply transition-transform hover:scale-[1.02]"
            />
            <p className="mt-4 text-center font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
              Dynamic agent surface topology
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/60 grain-veil">
        <div className="relative mx-auto grid max-w-5xl items-center gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[1.15fr_0.7fr_1.15fr]">
          <div>
            <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">
              Privacy first, with you in control
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              You decide what Folio remembers and which tools reach your workflow. Your data is
              never sold or used to build ad profiles — and with Sync, it is end-to-end encrypted.
              Folio for Work adds the guardrails teams need, like SSO and admin controls.
            </p>
          </div>
          <SudoFigure src={sudo.security.src} alt={sudo.security.alt} caption="Sudo holds the keys" className="mx-auto w-full max-w-[13rem]" />
          <ul className="divide-y divide-border border-y border-border">
            {privacy.map(([k, v]) => (
              <li
                key={k}
                className="tick-hover flex items-center justify-between px-3 py-3 transition-colors"
              >
                <span className="text-sm text-foreground">{k}</span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {v}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
        <h2 className="text-3xl leading-tight text-foreground sm:text-4xl">The shape of it</h2>
        <dl className="mt-12 grid gap-x-16 gap-y-8 sm:grid-cols-2">
          {facts.map((f) => (
            <div key={f.k} className="border-t border-border pt-5">
              <dt className="rule-label">{f.k}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
