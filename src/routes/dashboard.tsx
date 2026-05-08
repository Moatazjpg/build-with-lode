import { createFileRoute, Link } from "@tanstack/react-router";
import { LodeLogo } from "@/components/LodeLogo";
import {
  LayoutGrid,
  FolderKanban,
  BarChart3,
  Settings,
  HelpCircle,
  Search,
  MoreHorizontal,
  GitBranch,
  CheckCircle2,
  Plus,
  ArrowUpRight,
  Eye,
  MousePointerClick,
  Users,
  Clock,
  Bell,
  Globe,
  Rocket,
  Zap,
  TrendingUp,
  Filter,
  ChevronDown,
  Activity,
  Server,
  Command,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Lode" },
      { name: "description", content: "Manage your Lode projects, analytics, and deployments." },
    ],
  }),
  component: DashboardPage,
});

const projects = [
  {
    name: "Northwind Coffee",
    url: "northwind.lode.app",
    status: "Published",
    framework: "Next.js",
    visits: "4,213",
    updated: "2h ago",
    accent: "from-amber-500/40 to-rose-500/30",
    initials: "NC",
  },
  {
    name: "Helio Studio",
    url: "helio.lode.app",
    status: "Published",
    framework: "Astro",
    visits: "2,847",
    updated: "Yesterday",
    accent: "from-cyan-400/40 to-violet-500/30",
    initials: "HS",
  },
  {
    name: "Quanta Labs",
    url: "quanta.lode.app",
    status: "Draft",
    framework: "Remix",
    visits: "—",
    updated: "3d ago",
    accent: "from-emerald-400/40 to-teal-500/30",
    initials: "QL",
  },
  {
    name: "Atlas Finance",
    url: "atlas.lode.app",
    status: "Building",
    framework: "Next.js",
    visits: "1,092",
    updated: "12m ago",
    accent: "from-indigo-500/40 to-sky-500/30",
    initials: "AF",
  },
];

const metrics = [
  { label: "Total Visits", value: "12,847", delta: "+12.4%", icon: Eye, trend: "up" },
  { label: "Conversions", value: "1,204", delta: "+8.1%", icon: MousePointerClick, trend: "up" },
  { label: "New Users", value: "3,491", delta: "+5.7%", icon: Users, trend: "up" },
  { label: "Avg. Session", value: "2m 14s", delta: "−1.2%", icon: Clock, trend: "down" },
];

const points = [20, 32, 28, 45, 38, 52, 48, 65, 58, 72, 68, 84];

const activity = [
  { who: "Sarah Chen", what: "deployed", target: "Northwind Coffee", branch: "main", when: "2m ago", color: "bg-emerald-500" },
  { who: "You", what: "edited", target: "Helio Studio · Pricing page", when: "18m ago", color: "bg-cyan-accent" },
  { who: "Marco Lee", what: "merged PR #142 in", target: "Atlas Finance", when: "1h ago", color: "bg-violet-accent" },
  { who: "CI", what: "build failed for", target: "Quanta Labs", when: "3h ago", color: "bg-rose-500" },
  { who: "Priya Shah", what: "invited a teammate to", target: "Helio Studio", when: "Yesterday", color: "bg-amber-500" },
];

const topPages = [
  { path: "/", views: 4821, change: "+14%" },
  { path: "/pricing", views: 2104, change: "+9%" },
  { path: "/blog/launching-lode-v2", views: 1876, change: "+42%" },
  { path: "/docs/getting-started", views: 1245, change: "+3%" },
  { path: "/contact", views: 612, change: "−2%" },
];

const sources = [
  { name: "Direct", pct: 38, color: "var(--brand)" },
  { name: "Google", pct: 27, color: "var(--cyan-accent)" },
  { name: "Twitter / X", pct: 14, color: "var(--violet-accent)" },
  { name: "GitHub", pct: 11, color: "oklch(0.75 0.15 145)" },
  { name: "Referral", pct: 10, color: "oklch(0.78 0.13 70)" },
];

const team = [
  { name: "Sarah Chen", initials: "SC", color: "from-rose-500 to-amber-500" },
  { name: "Marco Lee", initials: "ML", color: "from-cyan-400 to-blue-600" },
  { name: "Priya Shah", initials: "PS", color: "from-violet-500 to-fuchsia-500" },
  { name: "Mehdi Karoui", initials: "MK", color: "from-emerald-400 to-teal-600" },
];

function DashboardPage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border/60 bg-sidebar">
        <div className="flex h-16 items-center pl-6 pr-5 border-b border-border">
          <LodeLogo />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {[
            { icon: LayoutGrid, label: "Overview" },
            { icon: FolderKanban, label: "Projects", active: true, badge: "4" },
            { icon: BarChart3, label: "Analytics" },
            { icon: Rocket, label: "Deployments" },
            { icon: Users, label: "Team" },
            { icon: Settings, label: "Settings" },
          ].map((i) => (
            <button
              key={i.label}
              className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                i.active
                  ? "bg-brand/15 text-brand"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-3">
                <i.icon className="h-4 w-4" />
                {i.label}
              </span>
              {i.badge && (
                <span className="rounded-md bg-background/60 px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  {i.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Workspace usage */}
        <div className="mx-3 mb-3 rounded-xl border border-border/60 bg-surface/60 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium">Workspace usage</span>
            <span className="text-muted-foreground">68%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-background/80">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-brand to-cyan-accent" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">12.3 GB of 18 GB used</p>
          <button className="mt-2 w-full rounded-md border border-border bg-surface-elevated px-2 py-1 text-[11px] font-medium hover:border-brand/40 transition-colors">
            Upgrade plan
          </button>
        </div>

        <div className="border-t border-border/60 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-4 w-4" /> Help & Docs
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border pl-6 pr-6 gap-4">
          <div className="min-w-0 flex items-center gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Acme Inc.</span>
                <ChevronDown className="h-3 w-3" />
              </div>
              <h1 className="truncate text-lg font-semibold tracking-tight">Projects</h1>
            </div>
          </div>

          <div className="flex flex-1 max-w-md items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-muted-foreground focus-within:border-brand/50 transition-colors">
            <Search className="h-4 w-4" />
            <input
              placeholder="Search projects, pages, deployments…"
              className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground/70 text-foreground"
            />
            <kbd className="hidden md:inline-flex items-center gap-1 rounded border border-border bg-background/60 px-1.5 py-0.5 text-[10px] font-medium">
              <Command className="h-3 w-3" /> K
            </kbd>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-cyan-accent" />
            </button>
            <Link
              to="/editor"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-glow"
            >
              <Plus className="h-4 w-4" /> New project
            </Link>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 ring-2 ring-border flex items-center justify-center text-[11px] font-semibold">
              MK
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6">
          {/* Welcome strip */}
          <section className="rounded-2xl border border-border bg-gradient-to-br from-surface via-surface to-background p-5 relative overflow-hidden">
            <div
              className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--brand), transparent 70%)" }}
            />
            <div
              className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, var(--violet-accent), transparent 70%)" }}
            />
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-accent font-semibold">Friday, May 8</p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight">Good morning, Mehdi Karoui</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  4 active projects · 2 deployments today · all systems normal
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm font-medium hover:border-brand/40 transition-colors">
                  <Zap className="h-4 w-4 text-cyan-accent" /> Invite teammate
                </button>
                <Link
                  to="/editor"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Rocket className="h-4 w-4" /> Start new build
                </Link>
              </div>
            </div>
          </section>

          {/* Metrics row */}
          <section className="mt-6 grid gap-4 grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background/60">
                    <m.icon className="h-4 w-4 text-cyan-accent" />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      m.trend === "up"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-rose-500/15 text-rose-400"
                    }`}
                  >
                    <TrendingUp className={`h-3 w-3 ${m.trend === "down" ? "rotate-180" : ""}`} />
                    {m.delta}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold">{m.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Your projects</h2>
                <p className="text-xs text-muted-foreground">4 of 4 — sorted by last updated</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center rounded-lg border border-border bg-surface p-0.5 text-xs">
                  {["All", "Published", "Draft", "Building"].map((t, i) => (
                    <button
                      key={t}
                      className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                        i === 0 ? "bg-surface-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <Filter className="h-3.5 w-3.5" /> Filter
                </button>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => (
                <article
                  key={p.name}
                  className="group rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elevated"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 overflow-hidden rounded-xl border border-border bg-background">
                    <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
                    <div className="absolute inset-3 rounded-lg bg-background/80 p-3 backdrop-blur">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
                        </div>
                        <div className="rounded bg-muted/60 px-1.5 py-0.5 text-[8px] text-muted-foreground">
                          {p.url}
                        </div>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="h-2 w-1/2 rounded bg-muted" />
                        <div className="h-2 w-2/3 rounded bg-muted/70" />
                        <div className="h-2 w-1/3 rounded bg-muted/50" />
                        <div className="mt-3 flex gap-1.5">
                          <div className="h-6 w-14 rounded bg-brand/40" />
                          <div className="h-6 w-14 rounded border border-border" />
                        </div>
                      </div>
                    </div>
                    <div className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ${p.accent} text-[11px] font-bold text-foreground shadow-elevated`}>
                      {p.initials}
                    </div>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{p.name}</h3>
                      <a
                        href="#"
                        className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground hover:text-cyan-accent"
                      >
                        <Globe className="h-3 w-3" /> {p.url} <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-elevated hover:text-foreground transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-medium ${
                        p.status === "Published"
                          ? "bg-emerald-500/15 text-emerald-400"
                          : p.status === "Building"
                          ? "bg-amber-500/15 text-amber-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.status === "Published"
                            ? "bg-emerald-400 animate-pulse"
                            : p.status === "Building"
                            ? "bg-amber-400 animate-pulse"
                            : "bg-muted-foreground"
                        }`}
                      />
                      {p.status}
                    </span>
                    <span className="text-muted-foreground">{p.framework} · {p.visits} visits</span>
                  </div>

                  <div className="mt-2 text-[11px] text-muted-foreground">Updated {p.updated}</div>
                </article>
              ))}

              {/* New project tile */}
              <Link
                to="/editor"
                className="group flex h-full min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface/40 p-4 text-center transition-all hover:border-brand/60 hover:bg-surface"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/15 text-brand transition-transform group-hover:scale-110">
                  <Plus className="h-6 w-6" />
                </div>
                <p className="mt-3 font-semibold">Start a new project</p>
                <p className="mt-1 text-xs text-muted-foreground">Describe it in plain English. Lode does the rest.</p>
              </Link>
            </div>
          </section>

          {/* Analytics + Sources */}
          <section className="mt-8 grid gap-5 lg:grid-cols-3">
            {/* Chart */}
            <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">Visits over time</p>
                  <p className="mt-1 text-2xl font-bold">12,847</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">vs. 11,427 last period</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-lg border border-border bg-background p-0.5 text-xs">
                    {["7d", "30d", "90d"].map((r, i) => (
                      <button
                        key={r}
                        className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
                          i === 1 ? "bg-surface-elevated text-foreground" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                    +12.4%
                  </span>
                </div>
              </div>
              <div className="mt-6 h-56 w-full">
                <Sparkline points={points} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-xs">
                <div>
                  <p className="text-muted-foreground">Bounce rate</p>
                  <p className="mt-0.5 text-base font-semibold">38.2%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pages / session</p>
                  <p className="mt-0.5 text-base font-semibold">3.4</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Live now</p>
                  <p className="mt-0.5 text-base font-semibold flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    47 visitors
                  </p>
                </div>
              </div>
            </div>

            {/* Traffic sources */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Traffic sources</p>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </div>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="mt-5 space-y-3.5">
                {sources.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{s.name}</span>
                      <span className="text-muted-foreground">{s.pct}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-background">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${s.pct}%`, background: s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Top pages + Activity + Team */}
          <section className="mt-8 grid gap-5 lg:grid-cols-3">
            {/* Top pages */}
            <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold">Top pages</p>
                <button className="text-xs text-muted-foreground hover:text-foreground">View all</button>
              </div>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-background/50 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium">Path</th>
                      <th className="px-4 py-2.5 text-right font-medium">Views</th>
                      <th className="px-4 py-2.5 text-right font-medium">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPages.map((row, i) => (
                      <tr key={row.path} className={i !== 0 ? "border-t border-border" : ""}>
                        <td className="px-4 py-2.5 font-mono text-xs">{row.path}</td>
                        <td className="px-4 py-2.5 text-right tabular-nums">{row.views.toLocaleString()}</td>
                        <td className={`px-4 py-2.5 text-right text-xs font-medium ${row.change.startsWith("−") ? "text-rose-400" : "text-emerald-400"}`}>
                          {row.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity */}
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold">Recent activity</p>
                <button className="text-xs text-muted-foreground hover:text-foreground">All</button>
              </div>
              <ul className="space-y-4">
                {activity.map((a, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="relative flex flex-col items-center">
                      <span className={`mt-1.5 h-2 w-2 rounded-full ${a.color}`} />
                      {i !== activity.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
                    </div>
                    <div className="flex-1 pb-1 text-sm">
                      <p className="leading-snug">
                        <span className="font-medium">{a.who}</span>{" "}
                        <span className="text-muted-foreground">{a.what}</span>{" "}
                        <span className="font-medium">{a.target}</span>
                        {a.branch && (
                          <span className="ml-1.5 inline-flex items-center gap-1 rounded bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
                            <GitBranch className="h-2.5 w-2.5" /> {a.branch}
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">{a.when}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Deployment + Team */}
          <section className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-5 lg:col-span-2">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Latest deployment · Northwind Coffee</p>
                    <p className="text-xs text-muted-foreground font-mono">
                      main · a3f9c21 · "Add testimonials section" · 2m ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ready · 24s
                  </span>
                  <button className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium hover:border-brand/40 transition-colors">
                    View logs
                  </button>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-2">
                {["Cloned", "Installed", "Built", "Deployed"].map((step, i) => (
                  <div key={step} className="rounded-lg border border-border bg-background/40 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Step {i + 1}</span>
                    </div>
                    <p className="mt-1 text-xs font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Team</p>
                <button className="text-xs text-cyan-accent hover:underline">Invite</button>
              </div>
              <ul className="mt-4 space-y-3">
                {team.map((m) => (
                  <li key={m.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-[11px] font-semibold`}>
                        {m.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium leading-none">{m.name}</p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {m.name === "You" ? "Owner" : "Editor"}
                        </p>
                      </div>
                    </div>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" title="Online" />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="h-8" />
        </div>
      </div>
    </div>
  );
}

function Sparkline({ points }: { points: number[] }) {
  const w = 600;
  const h = 200;
  const stepX = w / (points.length - 1);
  const max = Math.max(...points);
  const coords = points.map((p, i) => [i * stepX, h - (p / max) * (h - 20) - 10] as const);
  const path = coords
    .map((c, i) => (i === 0 ? `M ${c[0]} ${c[1]}` : `L ${c[0]} ${c[1]}`))
    .join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full">
      <defs>
        <linearGradient id="lode-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--cyan-accent)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--cyan-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line
          key={g}
          x1={0}
          x2={w}
          y1={h * g}
          y2={h * g}
          stroke="var(--border)"
          strokeDasharray="3 6"
          strokeWidth="1"
        />
      ))}
      <path d={area} fill="url(#lode-area)" />
      <path
        d={path}
        fill="none"
        stroke="var(--cyan-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="var(--background)" stroke="var(--cyan-accent)" strokeWidth="2" />
      ))}
    </svg>
  );
}
