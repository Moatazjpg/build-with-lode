import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LodeLogo } from "@/components/LodeLogo";
import { Mail, Lock, User, ArrowRight, Github as GithubIcon, Check } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — Lode" },
      { name: "description", content: "Create your free Lode account and start building in minutes." },
    ],
  }),
  component: SignupPage,
});

const perks = [
  "Free forever plan, no credit card",
  "Publish unlimited sites to lode.ai",
  "Built-in analytics, SEO, and SSL",
];

function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(50% 40% at 50% 0%, color-mix(in oklab, var(--violet-accent) 25%, transparent) 0%, transparent 70%)",
        }}
      />
      <header className="relative mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link to="/"><LodeLogo /></Link>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-cyan-accent hover:underline">
            Log in
          </Link>
        </p>
      </header>

      <main className="relative mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-2">
        {/* Left — value */}
        <div className="hidden lg:flex lg:flex-col lg:justify-center">
          <h2 className="text-4xl font-bold leading-tight tracking-tight">
            Build a website
            <br />
            <span className="bg-gradient-to-r from-brand via-cyan-accent to-violet-accent bg-clip-text text-transparent">
              in minutes.
            </span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Join thousands of teams using Lode to ship beautiful, multi-page sites without the busywork.
          </p>
          <ul className="mt-8 space-y-3">
            {perks.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-accent/15 text-cyan-accent">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">It takes less than a minute.</p>

          <div className="mt-8 rounded-2xl border border-border bg-surface/70 p-7 shadow-elevated backdrop-blur">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm font-medium hover:bg-surface transition-colors">
                <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#fff" d="M21.35 11.1H12v3.2h5.35c-.23 1.4-1.7 4.1-5.35 4.1-3.22 0-5.85-2.66-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.06.78 3.76 1.45l2.56-2.46C16.79 4.07 14.6 3.1 12 3.1 6.97 3.1 2.9 7.17 2.9 12.2s4.07 9.1 9.1 9.1c5.25 0 8.73-3.69 8.73-8.88 0-.6-.07-1.05-.15-1.32z"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-2.5 text-sm font-medium hover:bg-surface transition-colors">
                <Github className="h-4 w-4" /> GitHub
              </button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Full name</span>
                <div className="relative mt-1.5">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Cooper"
                    className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Work email</span>
                <div className="relative mt-1.5">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">Password</span>
                <div className="relative mt-1.5">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-lg border border-border bg-background pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>
              </label>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Create account
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            By signing up, you agree to Lode's{" "}
            <a href="#" className="underline hover:text-foreground">Terms</a> and{" "}
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
