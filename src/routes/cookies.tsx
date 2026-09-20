import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Cookie, Lock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SudoFigure, sudo } from "@/components/sudo/SudoFigure";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookies — Substrate" },
      {
        name: "description",
        content:
          "Substrate's cookie policy, in plain terms: what we set, why we set it, and the switches you control.",
      },
      { property: "og:title", content: "Cookies — Substrate" },
      {
        property: "og:description",
        content: "What we set, why we set it, and the switches you control.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CookiesPage,
});

const controls = [
  {
    key: "essential",
    title: "Essential",
    body: "Keeps the site standing — session integrity, load balancing, CSRF protection. Without these the pages do not render.",
    locked: true,
  },
  {
    key: "preferences",
    title: "Preferences",
    body: "Remembers your choices here — theme, motion, and whether you have dismissed this banner. Stored on your device, never read by a third party.",
    locked: false,
  },
  {
    key: "analytics",
    title: "Analytics",
    body: "Anonymous, aggregated counts of which pages are read. No cross-site tracking, no ad networks, no fingerprinting.",
    locked: false,
  },
];

const rows = [
  { name: "substrate_session", purpose: "Session integrity", duration: "Session", scope: "Essential" },
  { name: "substrate_prefs", purpose: "Your interface preferences", duration: "1 year", scope: "Preferences" },
  { name: "substrate_stats", purpose: "Aggregated page counts", duration: "90 days", scope: "Analytics" },
];

function Toggle({ on, locked }: { on: boolean; locked?: boolean }) {
  if (locked) {
    return (
      <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground" aria-label="Always on">
        <Lock className="size-3.5" />
      </span>
    );
  }
  return (
    <span
      className={`relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border transition-colors duration-300 ${
        on ? "border-transparent bg-[#6085ff]" : "border-border bg-muted"
      }`}
    >
      <span
        className={`absolute top-1/2 size-7 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-300 ${
          on ? "left-[2.05rem]" : "left-1"
        }`}
      />
    </span>
  );
}

function CookiesPage() {
  const [prefs, setPrefs] = useState({ preferences: true, analytics: false });

  const setAll = (value: boolean) => setPrefs({ preferences: value, analytics: value });

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="rule-label">Substrate / Cookie policy</p>
            <h1 className="mt-6 text-5xl leading-[1.02] text-foreground sm:text-6xl">
              Cookies, in <em className="font-light">plain terms.</em>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted-foreground">
              We bake as few as possible. This page is the whole list — what we set, why we set it,
              and the switches you control. No ad networks, no cross-site trackers, no shadow
              profiles. If it is not on this page, we did not set it.
            </p>
          </Reveal>
          <Reveal delay={0.12} className="mx-auto w-full max-w-sm">
            <SudoFigure src={sudo.cookies.src} alt={sudo.cookies.alt} caption="Sudo guards the switches" />
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="rule-label">Your switches</p>
              <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
                You decide what stays.
              </h2>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setAll(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Check className="size-3.5" /> Accept all
              </button>
              <button
                onClick={() => setAll(false)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium text-foreground transition-colors hover:bg-accent"
              >
                Essential only
              </button>
            </div>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {controls.map((control, index) => {
            const on = control.locked || prefs[control.key as keyof typeof prefs];
            return (
              <Reveal key={control.key} delay={index * 0.06} className="h-full">
                <article className="field-card h-full">
                  <div className="field-glow" aria-hidden="true" />
                  <div className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-7 sm:pt-7">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                      <Cookie className="size-4 text-muted-foreground" />
                      {control.title}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={on}
                      aria-label={`${control.title} cookies ${on ? "on" : "off"}`}
                      disabled={control.locked}
                      onClick={() =>
                        !control.locked &&
                        setPrefs((p) => ({ ...p, [control.key]: !p[control.key as keyof typeof p] }))
                      }
                      className="disabled:cursor-default"
                    >
                      <Toggle on={on} locked={control.locked} />
                    </button>
                  </div>
                  <p className="relative z-10 px-6 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-7 sm:pb-7">
                    {control.body}
                  </p>
                  <p className="relative z-10 px-6 pb-6 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground/70 sm:px-7 sm:pb-7">
                    {control.locked ? "Always on" : on ? "On" : "Off"}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-rule bg-card/45">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <Reveal>
            <p className="rule-label">The whole list</p>
            <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl">
              Every cookie we set, and nothing else.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/60">
                    {["Cookie", "Purpose", "Duration", "Scope"].map((h) => (
                      <th key={h} className="rule-label px-5 py-3.5 font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.name} className="border-b border-border/70 last:border-0 transition-colors hover:bg-accent/40">
                      <td className="px-5 py-4 font-mono text-xs text-foreground">{row.name}</td>
                      <td className="px-5 py-4 text-muted-foreground">{row.purpose}</td>
                      <td className="px-5 py-4 text-muted-foreground">{row.duration}</td>
                      <td className="px-5 py-4">
                        <span className="aura-badge aura-badge-outline">{row.scope}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Preferences live on your device and never leave it. Deleting the cookies above resets
              this page to its defaults — Essential on, everything else yours to choose again.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="spectral-field spectral-field-soft" aria-hidden="true" />
        <Reveal className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <p className="rule-label">Still here?</p>
          <h2 className="mt-5 text-4xl leading-tight text-foreground sm:text-5xl">
            Back to the <em className="font-light">substrate.</em>
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-shine inline-block rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground">
              Home
            </Link>
            <Link to="/studio" className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-7 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card">
              Inside the studio <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
