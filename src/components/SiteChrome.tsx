import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Instagram, Linkedin, Menu, X, Youtube } from "lucide-react";
import { BrandLogo, type BrandVariant } from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

const nav: { to: string; label: string; mark?: BrandVariant }[] = [
  { to: "/kernel", label: "Kernel", mark: "kernel" },
  { to: "/folio", label: "Folio", mark: "folio" },
  { to: "/gridline", label: "Gridline", mark: "gridline" },
  { to: "/work", label: "Work" },
  { to: "/studio", label: "Studio" },
  { to: "/leadership", label: "Leadership" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-[var(--spectral-b)]/40 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6">
        <Link
          to="/"
          className="group flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-80"
        >
          <BrandLogo
            variant="substrate"
            className="h-6 w-6 rounded-full transition-transform duration-300 group-hover:scale-110"
          />
          <span className="text-sm font-semibold text-foreground">Substrate</span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex lg:gap-7">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
              activeProps={{ className: "group relative flex items-center gap-1.5 text-sm text-foreground" }}
            >
              {item.mark && (
                <BrandLogo
                  variant={item.mark}
                  alt=""
                  className={`h-4 w-4 shrink-0 opacity-60 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 ${
                    item.mark === "kernel" ? "w-6 grayscale-[0.3]" : ""
                  }`}
                />
              )}
               <span>{item.label}</span>
              <span
                className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full"
                aria-hidden="true"
              />
            </Link>
          ))}
          <a href="mailto:hello@substrate.dev" className="ml-1 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-transform hover:-translate-y-0.5">Talk to us <ArrowUpRight className="size-3" /></a>
         </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="border-t border-border/60 bg-background px-6 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="grid grid-cols-2 gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center gap-2 border-b border-border/60 px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.mark && <BrandLogo variant={item.mark} alt="" className="size-4 object-contain" />}
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

const socials = [
  { href: "https://github.com/Substrate-devs", label: "GitHub", icon: Github },
  { href: "https://www.instagram.com/substrate.devs/", label: "Instagram", icon: Instagram },
  { href: "https://www.linkedin.com/company/substratedevs", label: "LinkedIn", icon: Linkedin },
  { href: "https://x.com/Substratedevs", label: "X", text: "X" },
  { href: "https://www.youtube.com/@Substrate-devs", label: "YouTube", icon: Youtube },
];

export function SiteFooter() {
  return (
    <footer className="site-footer relative isolate overflow-hidden border-t border-border/40">
      <div className="footer-spectrum" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20">
        <div className="grid gap-12 border-b border-border pb-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
            <BrandLogo variant="substrate" className="h-6 w-6 rounded-full" />
            <div>
              <p className="text-sm font-semibold">Substrate</p>
            </div>
          </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">A research and product studio building the shared layer beneath intelligent software.</p>
          </div>
          <FooterColumn title="Products" links={nav.slice(0, 3)} />
          <FooterColumn title="Company" links={nav.slice(3)} />
          <div>
            <p className="rule-label">Connect</p>
            <a href="mailto:hello@substrate.dev" className="mt-5 inline-flex items-center gap-2 text-sm text-foreground">hello@substrate.dev <ArrowUpRight className="size-3.5" /></a>
            <nav className="mt-6 flex flex-wrap gap-1" aria-label="Social media">
              {socials.map((social) => { const Icon = social.icon; return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="social-link">{Icon ? <Icon className="size-4" /> : <span className="text-xs font-semibold">{social.text}</span>}</a>; })}
            </nav>
          </div>
        </div>
        <Reveal className="overflow-hidden py-12">
          <p className="footer-wordmark select-none" aria-hidden="true">Substrate</p>
        </Reveal>
        <div className="flex flex-col gap-3 border-t border-border py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Substrate — Kernel · Folio · Gridline</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link to="/cookies" className="footer-link-hover inline-block hover:text-foreground">Cookies</Link>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <p>Built with intent. Measured, not claimed.</p>
          </div>
        </div>
      </div>

      {/* Warm spectral wash — the gradient that settles at the foot of the page */}
      <div className="site-footer-wash" aria-hidden="true" />
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: typeof nav }) {
  return <div><p className="rule-label">{title}</p><nav className="mt-5 flex flex-col items-start gap-3">{links.map((item) => <Link key={item.to} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}</nav></div>;
}
