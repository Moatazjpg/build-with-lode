import { createFileRoute, Link } from "@tanstack/react-router";
import { LodeLogo } from "@/components/LodeLogo";
import { Rocket, Wand2, Globe, BarChart3, Layers, Sparkles, ArrowRight, Check, TrendingUp } from "lucide-react";

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
    mock: "live" as const,
  },
  {
    icon: Globe,
    title: "Build sites with multiple pages",
    body: "Landing, about, pricing, blog — Lode structures the whole sitemap for you.",
    bullets: ["Auto sitemap", "SEO meta", "Internal links"],
    mock: "pages" as const,
  },
  {
    icon: Sparkles,
    title: "Use your own domain name",
    body: "Hook up any domain in seconds with managed DNS and free SSL.",
    tag: "1-click",
    mock: "domain" as const,
  },
  {
    icon: BarChart3,
    title: "Track what matters to your site",
    body: "Built-in analytics show traffic, conversions, and content performance.",
    bullets: ["Realtime visits", "Conversions", "Top pages"],
    mock: "analytics" as const,
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <LodeLogo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-foreground/70 md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#steps" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Backdrop layers */}
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 0%, color-mix(in oklab, var(--brand) 35%, transparent) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "linear-gradient(120deg, var(--brand), var(--violet-accent))" }}
        />
        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-24 text-center md:pt-32">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-accent" />
            </span>
            New — AI-native builder, now in public beta
          </div>
          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl lg:text-[5.5rem]">
            Build a website
            <br />
            <span className="bg-gradient-to-r from-brand via-cyan-accent to-violet-accent bg-clip-text text-transparent">
              just by chatting.
            </span>
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-base text-muted-foreground md:text-lg">
            Lode turns a short conversation into a polished, multi-page site —
            designed, written, and deployed in minutes.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/editor"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Start building free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:bg-surface-elevated"
            >
              View live demo
            </Link>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-accent" />No credit card</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-accent" />Free forever plan</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-accent" />Publish in 1 click</span>
          </div>

          {/* Hero product preview */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div
              className="absolute -inset-6 -z-10 rounded-3xl opacity-60 blur-2xl"
              style={{ background: "linear-gradient(120deg, var(--brand), var(--violet-accent))" }}
            />
            <div className="overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-elevated ring-1 ring-white/10 backdrop-blur">
              <div className="flex items-center gap-1.5 border-b border-border bg-surface-elevated/70 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/90" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/90" />
                <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1 text-[11px] text-muted-foreground">
                  <Globe className="h-3 w-3 text-cyan-accent" />
                  lode.ai/editor
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-5 border-r border-border bg-background/60 p-4">
                  <div className="mb-3 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-violet-accent" /> Chat with Lode
                  </div>
                  <div className="space-y-2.5">
                    <div className="ml-auto w-fit max-w-[80%] rounded-lg rounded-tr-sm bg-primary/90 px-3 py-2 text-left text-[11px] text-primary-foreground">
                      Build a landing page for my coffee roastery in Brooklyn.
                    </div>
                    <div className="w-fit max-w-[85%] rounded-lg rounded-tl-sm border border-border bg-surface px-3 py-2 text-left text-[11px] text-foreground/90">
                      On it. Generating hero, menu, story & contact pages…
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-cyan-accent">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-accent opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                      </span>
                      Generating section 3 of 5…
                    </div>
                  </div>
                </div>
                <div className="col-span-7 p-4">
                  <div className="rounded-lg bg-gradient-to-br from-amber-900/40 via-orange-900/30 to-background p-4">
                    <div className="text-[10px] uppercase tracking-widest text-amber-300/80">Brooklyn · Est. 2019</div>
                    <div className="mt-1 text-lg font-bold leading-tight text-foreground">Slow-roasted, small batch.</div>
                    <div className="mt-1 text-[10px] text-foreground/70">Single-origin coffee delivered fresh from our roastery.</div>
                    <div className="mt-3 flex gap-1.5">
                      <div className="rounded-md bg-amber-400 px-2 py-1 text-[9px] font-semibold text-amber-950">Shop beans</div>
                      <div className="rounded-md border border-border px-2 py-1 text-[9px] text-foreground/80">Visit café</div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="aspect-square rounded-md bg-gradient-to-br from-amber-700/40 to-amber-900/40" />
                    <div className="aspect-square rounded-md bg-gradient-to-br from-orange-700/40 to-amber-800/40" />
                    <div className="aspect-square rounded-md bg-gradient-to-br from-amber-600/40 to-orange-900/40" />
                  </div>
                </div>
              </div>
            </div>
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
                <div className="mt-8">
                  <FeatureMock kind={f.mock} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-accent">Pricing</p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Simple plans that scale with you</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Start free. Upgrade when you're ready to publish to your own domain or unlock advanced AI.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$0",
                period: "/forever",
                tagline: "For exploring and prototyping.",
                cta: "Get started",
                features: [
                  "1 project",
                  "Lode subdomain (.lode.app)",
                  "Up to 5 pages",
                  "Community support",
                  "Basic AI generation",
                ],
              },
              {
                name: "Pro",
                price: "$19",
                period: "/month",
                tagline: "For founders and indie builders.",
                cta: "Start 14-day trial",
                highlight: true,
                features: [
                  "10 projects",
                  "Custom domains + SSL",
                  "Unlimited pages",
                  "Built-in analytics",
                  "Advanced AI (GPT-class)",
                  "Email support",
                ],
              },
              {
                name: "Team",
                price: "$49",
                period: "/month",
                tagline: "For agencies and teams shipping at scale.",
                cta: "Contact sales",
                features: [
                  "Unlimited projects",
                  "Up to 10 collaborators",
                  "Roles & permissions",
                  "Priority AI queue",
                  "SSO & audit logs",
                  "24/7 priority support",
                ],
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={
                  plan.highlight
                    ? "relative rounded-2xl border border-brand/50 bg-gradient-to-b from-brand/10 via-surface/60 to-surface/60 p-8 shadow-glow ring-1 ring-brand/30"
                    : "relative rounded-2xl border border-border bg-surface/60 p-8 transition-colors hover:border-brand/30 hover:bg-surface-elevated"
                }
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-brand to-violet-accent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </div>
                <Link
                  to="/signup"
                  className={
                    plan.highlight
                      ? "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                      : "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-elevated"
                  }
                >
                  {plan.cta}
                </Link>
                <ul className="mt-7 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground/85">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-accent" />Cancel anytime</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-cyan-accent" />Secure payments by Stripe</span>
            <span className="inline-flex items-center gap-1.5"><TrendingUp className="h-3.5 w-3.5 text-cyan-accent" />Switch plans anytime</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60 bg-surface/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <LodeLogo />
              <p className="mt-4 max-w-xs text-sm text-muted-foreground">
                Lode is the conversational website builder. Describe your business — ship a polished, multi-page site in minutes.
              </p>
              <div className="mt-5 flex items-center gap-2">
                <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-brand/40 transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2H21l-6.52 7.45L22 22h-6.84l-4.78-6.26L4.8 22H2l6.98-7.97L2 2h6.96l4.32 5.71L18.244 2zm-2.4 18h1.84L8.24 4H6.28l9.564 16z"/></svg>
                </a>
                <a href="#" aria-label="GitHub" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-brand/40 transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18a10.96 10.96 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56C20.21 21.39 23.5 17.07 23.5 12 23.5 5.65 18.35.5 12 .5z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:border-brand/40 transition-colors">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
                </a>
              </div>
            </div>

            <div className="grid gap-8 md:col-span-8 grid-cols-2 sm:grid-cols-4">
              {[
                { title: "Product", links: ["Features", "Pricing", "Templates", "Changelog"] },
                { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
                { title: "Resources", links: ["Docs", "Help center", "Community", "Status"] },
                { title: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
              ].map((col) => (
                <div key={col.title}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/90">{col.title}</p>
                  <ul className="mt-4 space-y-2.5">
                    {col.links.map((l) => (
                      <li key={l}>
                        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 md:flex-row md:items-center">
            <p className="text-xs text-muted-foreground">© 2026 Lode, Inc. All rights reserved.</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500/90 shadow-[0_0_10px_var(--color-cyan-accent)]" />
              All systems operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureMock({ kind }: { kind: "live" | "pages" | "domain" | "analytics" }) {
  if (kind === "live") {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-background/80 shadow-elevated ring-1 ring-white/5">
        <div className="flex items-center gap-1.5 border-b border-border bg-surface-elevated/60 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-red-500/90" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/90" />
          <span className="h-2 w-2 rounded-full bg-green-500/90" />
          <span className="ml-2 truncate text-[10px] text-muted-foreground">lode.ai/preview</span>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-2 border-r border-border bg-surface/40 p-3">
            <div className="flex items-start gap-1.5">
              <span className="mt-1 h-4 w-4 shrink-0 rounded-full bg-violet-accent/30" />
              <div className="space-y-1">
                <div className="h-1.5 w-20 rounded bg-muted" />
                <div className="h-1.5 w-16 rounded bg-muted/70" />
              </div>
            </div>
            <div className="mt-3 ml-auto w-fit rounded-md bg-primary/80 px-2 py-1">
              <div className="h-1.5 w-16 rounded bg-white/60" />
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[9px] text-cyan-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-accent" />
              </span>
              Building...
            </div>
          </div>
          <div className="col-span-3 p-3">
            <div className="h-2 w-2/3 rounded bg-foreground/80" />
            <div className="mt-1.5 h-1.5 w-full rounded bg-muted/60" />
            <div className="mt-1 h-1.5 w-4/5 rounded bg-muted/40" />
            <div className="mt-3 h-12 rounded-md bg-gradient-to-br from-brand/40 to-violet-accent/40" />
            <div className="mt-2 flex gap-1.5">
              <div className="h-5 w-12 rounded bg-primary/80" />
              <div className="h-5 w-12 rounded border border-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "pages") {
    const pages = [
      { name: "Home", path: "/", active: true },
      { name: "About", path: "/about" },
      { name: "Pricing", path: "/pricing" },
      { name: "Blog", path: "/blog" },
      { name: "Contact", path: "/contact" },
    ];
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-background/80">
        <div className="flex items-center justify-between border-b border-border bg-surface-elevated/60 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <Globe className="h-3 w-3 text-cyan-accent" />
            <span className="text-[10px] font-medium text-foreground/90">Sitemap</span>
          </div>
          <span className="text-[10px] text-muted-foreground">5 pages · auto-linked</span>
        </div>
        <ul className="divide-y divide-border/60">
          {pages.map((p) => (
            <li
              key={p.path}
              className={`flex items-center justify-between px-3 py-2 text-[11px] ${
                p.active ? "bg-brand/10" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${p.active ? "bg-brand" : "bg-muted-foreground/40"}`} />
                <span className="font-medium text-foreground/90">{p.name}</span>
                <span className="text-muted-foreground">{p.path}</span>
              </div>
              <span className="rounded bg-cyan-accent/10 px-1.5 py-0.5 text-[9px] font-medium text-cyan-accent">
                SEO ✓
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (kind === "domain") {
    return (
      <div className="overflow-hidden rounded-xl border border-border bg-background/80 p-4">
        <div className="flex items-center gap-2 rounded-md border border-border bg-surface-elevated/70 px-3 py-2">
          <span className="text-cyan-accent">🔒</span>
          <span className="text-xs font-mono text-foreground/90">https://</span>
          <span className="flex-1 truncate text-xs font-mono font-semibold text-foreground">acme.com</span>
          <span className="rounded-full border border-cyan-accent/40 bg-cyan-accent/10 px-2 py-0.5 text-[10px] font-medium text-cyan-accent">
            SSL active
          </span>
        </div>
        <div className="mt-3 space-y-1.5">
          {[
            { type: "A", host: "@", value: "76.76.21.21", ok: true },
            { type: "CNAME", host: "www", value: "lode.ai", ok: true },
            { type: "TXT", host: "_lode", value: "verified", ok: true },
          ].map((r) => (
            <div key={r.type + r.host} className="flex items-center gap-2 rounded-md bg-surface/50 px-2 py-1.5 text-[10px]">
              <span className="w-12 font-mono font-semibold text-violet-accent">{r.type}</span>
              <span className="w-10 font-mono text-muted-foreground">{r.host}</span>
              <span className="flex-1 truncate font-mono text-foreground/80">{r.value}</span>
              <Check className="h-3 w-3 text-cyan-accent" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // analytics
  const bars = [40, 55, 35, 70, 60, 85, 75, 90, 80, 95, 70, 88];
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background/80 p-4">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Visitors today</p>
          <p className="mt-0.5 text-2xl font-bold text-foreground">12,847</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-cyan-accent/10 px-2 py-0.5 text-[10px] font-medium text-cyan-accent">
          <TrendingUp className="h-3 w-3" />
          +12.4%
        </span>
      </div>
      <div className="mt-4 flex h-16 items-end gap-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-brand/60 to-cyan-accent/80"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>Mon</span><span>Wed</span><span>Fri</span><span>Sun</span>
      </div>
    </div>
  );
}
