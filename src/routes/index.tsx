import { createFileRoute, Link } from "@tanstack/react-router";
import { LodeLogo } from "@/components/LodeLogo";
import { Rocket, Wand2, Globe, BarChart3, Layers, Sparkles, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lode — Build a website in minutes" },
      {
        name: "description",
        content:
          "Lode turns a short conversation into a production-ready website. Describe your business and watch it build itself.",
      },
      { property: "og:title", content: "Lode — Build a website in minutes" },
      {
        property: "og:description",
        content: "Conversational AI website builder. From idea to live site in minutes.",
      },
    ],
  }),
  component: LandingPage,
});

const steps = [
  {
    icon: Wand2,
    title: "Tell Lode your vision",
    body: "Describe your business in plain language. Lode asks the right follow-ups.",
  },
  {
    icon: Sparkles,
    title: "Watch AI construct",
    body: "Pages, copy, and visuals are generated live as you chat.",
  },
  {
    icon: Rocket,
    title: "Your site goes live instantly",
    body: "Publish to a Lode subdomain or connect your own — one click.",
  },
];

const features = [
  {
    icon: Layers,
    title: "See changes as you build",
    body: "Every message updates the live preview in real time. No reloads, no guesswork.",
    tag: "Live",
  },
  {
    icon: Globe,
    title: "Build sites with multiple pages",
    body: "Landing, about, pricing, blog — Lode structures the whole sitemap for you.",
    bullets: ["Auto sitemap", "SEO meta", "Internal links"],
  },
  {
    icon: Sparkles,
    title: "Use your own domain name",
    body: "Hook up any domain in seconds with managed DNS and free SSL.",
    tag: "1-click",
  },
  {
    icon: BarChart3,
    title: "Track what matters to your site",
    body: "Built-in analytics show traffic, conversions, and content performance.",
    bullets: ["Realtime visits", "Conversions", "Top pages"],
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <LodeLogo />
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#steps" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <button className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-elevated transition-colors">
            Log in
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--brand) 30%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "linear-gradient(120deg, var(--brand), var(--violet-accent))" }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center md:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" />
            New — AI-native builder, now in public beta
          </div>
          <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
            Build a website
            <br />
            <span className="bg-gradient-to-r from-brand via-cyan-accent to-violet-accent bg-clip-text text-transparent">
              in minutes.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Lode is a conversational website builder. Describe your business — get a polished,
            multi-page site that ships the moment you're ready.
          </p>
          <div className="mt-10 flex items-center justify-center gap-3">
            <Link
              to="/editor"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Get started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
            >
              View dashboard
            </Link>
          </div>

          {/* Logo strip */}
          <div className="mt-20">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Trusted by teams shipping every day
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
              {["Northwind", "Helio", "Vector", "Quanta", "Lumen", "Orbit", "Pixel"].map((b) => (
                <span key={b} className="text-sm font-semibold tracking-wide text-muted-foreground">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section id="steps" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-accent">How it works</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Three simple steps</h2>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-surface/60 p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:bg-surface-elevated"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/15 text-brand">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">0{i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section id="features" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/60 p-8 transition-all hover:border-brand/40 hover:bg-surface-elevated"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-violet-accent/15 text-violet-accent">
                    <f.icon className="h-5 w-5" />
                  </div>
                  {f.tag && (
                    <span className="rounded-full border border-cyan-accent/40 bg-cyan-accent/10 px-2.5 py-0.5 text-xs font-medium text-cyan-accent">
                      {f.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
                {f.bullets && (
                  <ul className="mt-5 space-y-2">
                    {f.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-cyan-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {/* Mock visual */}
                <div className="mt-8 h-32 rounded-xl border border-border bg-background/60 p-3">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-muted" />
                    <span className="h-2 w-2 rounded-full bg-muted" />
                    <span className="h-2 w-2 rounded-full bg-muted" />
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-2/3 rounded bg-muted" />
                    <div className="h-2 w-1/2 rounded bg-muted/70" />
                    <div className="h-2 w-3/4 rounded bg-muted/50" />
                    <div className="mt-3 h-8 w-24 rounded-md bg-brand/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Start building now</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            Free to try. No credit card required. Publish to Lode for free, forever.
          </p>
          <Link
            to="/editor"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary/90"
          >
            Get started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <LodeLogo />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Lode, Inc.</p>
        </div>
      </footer>
    </div>
  );
}
