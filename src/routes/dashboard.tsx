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
  { name: "Northwind Coffee", url: "lode.ai/northwind", status: "Published" },
  { name: "Helio Studio", url: "lode.ai/helio", status: "Published" },
  { name: "Quanta Labs", url: "lode.ai/quanta", status: "Draft" },
];

const metrics = [
  { label: "Total Visits", value: "12,847", delta: "+12.4%", icon: Eye },
  { label: "Conversions", value: "1,204", delta: "+8.1%", icon: MousePointerClick },
  { label: "New Users", value: "3,491", delta: "+5.7%", icon: Users },
  { label: "Avg. Session", value: "2m 14s", delta: "+1.2%", icon: Clock },
];

// Sparkline-ish line chart points (0-100 normalized)
const points = [20, 32, 28, 45, 38, 52, 48, 65, 58, 72, 68, 84];

function DashboardPage() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="flex w-60 shrink-0 flex-col border-r border-border/60 bg-sidebar">
        <div className="flex h-16 items-center pl-6 pr-5 border-b border-border">
          <LodeLogo />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {[
            { icon: LayoutGrid, label: "Overview" },
            { icon: FolderKanban, label: "Projects", active: true },
            { icon: BarChart3, label: "Analytics" },
            { icon: Settings, label: "Settings" },
          ].map((i) => (
            <button
              key={i.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                i.active
                  ? "bg-brand/15 text-brand"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              }`}
            >
              <i.icon className="h-4 w-4" />
              {i.label}
            </button>
          ))}
        </nav>
        <div className="border-t border-border/60 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
            <HelpCircle className="h-4 w-4" /> Help & Docs
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border pl-6 pr-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Projects</h1>
            <p className="text-xs text-muted-foreground">
              Manage your sites, analytics, and deployments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors">
              <Search className="h-4 w-4" />
            </button>
            <Link
              to="/editor"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4" /> New project
            </Link>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand to-violet-accent ring-2 ring-border" />
          </div>
        </header>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {/* Project cards */}
          <section>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((p) => (
                <article
                  key={p.name}
                  className="group rounded-2xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-elevated"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 overflow-hidden rounded-xl border border-border bg-background">
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in oklab, var(--brand) 30%, transparent), color-mix(in oklab, var(--violet-accent) 30%, transparent))",
                      }}
                    />
                    <div className="absolute inset-3 rounded-lg bg-background/80 p-3 backdrop-blur">
                      <div className="flex gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted" />
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
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold">{p.name}</h3>
                      <a
                        href="#"
                        className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground hover:text-cyan-accent"
                      >
                        {p.url} <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-surface-elevated hover:text-foreground transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        p.status === "Published"
                          ? "bg-brand/15 text-brand"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${p.status === "Published" ? "bg-brand" : "bg-muted-foreground"}`} />
                      {p.status}
                    </span>
                    <span className="text-xs text-muted-foreground">Updated 2h ago</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Analytics */}
          <section className="mt-10">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h2 className="text-lg font-semibold">Analytics</h2>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {/* Chart */}
              <div className="rounded-2xl border border-border bg-surface p-6 lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Visits over time</p>
                    <p className="mt-1 text-2xl font-bold">12,847</p>
                  </div>
                  <span className="rounded-full border border-cyan-accent/40 bg-cyan-accent/10 px-2.5 py-0.5 text-xs font-medium text-cyan-accent">
                    +12.4%
                  </span>
                </div>
                <div className="mt-6 h-56 w-full">
                  <Sparkline points={points} />
                </div>
              </div>

              {/* Metrics 2x2 */}
              <div className="grid grid-cols-2 gap-4">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-brand/40"
                  >
                    <div className="flex items-center justify-between">
                      <m.icon className="h-4 w-4 text-cyan-accent" />
                      <span className="text-[10px] font-medium text-cyan-accent">{m.delta}</span>
                    </div>
                    <p className="mt-3 text-2xl font-bold text-brand">{m.value}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Deployment info */}
          <section className="mt-10">
            <div className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-elevated">
                    <GitBranch className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Deployment Info</p>
                    <p className="text-xs text-muted-foreground">
                      main · commit a3f9c21 · synced from GitHub 12 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-cyan-accent/40 bg-cyan-accent/10 px-3 py-1 text-xs font-medium text-cyan-accent">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Build successful
                </div>
              </div>
            </div>
          </section>
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
          <stop offset="0%" stopColor="var(--cyan-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--cyan-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Grid */}
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
