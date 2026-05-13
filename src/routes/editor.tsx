import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { LodeLogo } from "@/components/LodeLogo";
import { Send, Sparkles, Monitor, Smartphone, RotateCcw, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "Editor — Lode" },
      { name: "description", content: "Chat with Lode to build your website in real time." },
    ],
  }),
  component: EditorPage,
});

type Message = { id: number; from: "ai" | "user"; text: string };

const initialMessages: Message[] = [
  {
    id: 1,
    from: "ai",
    text: "Hi! I'm Lode. Tell me about your business and I'll start building your site.",
  },
  { id: 2, from: "user", text: "I run a small SaaS for indie creators." },
  {
    id: 3,
    from: "ai",
    text: "Got it. What kind of business is this? Pick one or describe in your own words.",
  },
];

const quickSelects = ["SaaS Product", "Service Agency", "Personal Brand"];

const loadingSteps = [
  "Analyzing your project...",
  "Building the structure...",
  "Adding design...",
  "Polishing the details...",
  "Almost there...",
];

function EditorPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<string>("SaaS Product");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [generatedHtml, setGeneratedHtml] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isGenerating) return;
    setStepIndex(0);
    const id = setInterval(() => {
      setStepIndex((i) => (i + 1) % loadingSteps.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isGenerating]);

  const SYSTEM_PROMPT =
    "You are a world-class UI designer and frontend developer. Your job is to generate breathtaking, modern websites that look like they were designed by a senior designer at Apple or Linear. RULES YOU MUST FOLLOW: 1) Always use a dark background (#0F172A or similar dark navy/black) 2) Always import Google Fonts at the top (Syne or Inter) 3) Use CSS gradients on buttons and hero sections (blue to purple: #2563EB to #7C3AED) 4) Add CSS animations: fadeIn on load, hover transforms on cards 5) Use CSS Grid or Flexbox for all layouts 6) Add box-shadows and border-radius on all cards (border-radius: 12px) 7) Include a navigation bar at the top with the brand name 8) Hero section must have a large bold headline (font-size: 72px), a subtitle, and a gradient CTA button 9) Service/feature cards must have dark card backgrounds (#1E293B), icons (use emoji), and hover effects 10) All CSS must be inside a style tag in the head 11) NEVER output plain unstyled HTML 12) Output ONLY the complete HTML code starting with <!DOCTYPE html> and nothing else";

  const generateFromOllama = async (userMessage: string): Promise<string> => {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "deepseek-coder:6.7b",
        system: SYSTEM_PROMPT,
        prompt: userMessage,
        stream: false,
      }),
    });
    if (!res.ok) throw new Error(`Ollama error: ${res.status}`);
    const data = (await res.json()) as { response?: string };
    return data.response ?? "";
  };

  const extractHtml = (raw: string): string => {
    const fence = raw.match(/```(?:html)?\s*([\s\S]*?)```/i);
    const candidate = (fence ? fence[1] : raw).trim();
    const docMatch = candidate.match(/<!DOCTYPE html[\s\S]*<\/html>/i);
    return (docMatch ? docMatch[0] : candidate).trim();
  };

  const send = async (text: string) => {
    if (!text.trim() || isGenerating) return;
    const next = messages.length + 1;
    setMessages((m) => [...m, { id: next, from: "user", text }]);
    setInput("");
    setIsGenerating(true);
    setGenError(null);
    try {
      const raw = await generateFromOllama(text);
      const html = extractHtml(raw);
      setGeneratedHtml(html);
      setMessages((m) => [
        ...m,
        { id: next + 1, from: "ai", text: "Generated — check the preview on the right." },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to reach Ollama";
      setGenError(msg);
      setMessages((m) => [
        ...m,
        { id: next + 1, from: "ai", text: `⚠️ ${msg}. Make sure Ollama is running locally.` },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/85 pl-6 pr-6 backdrop-blur-xl">
        <LodeLogo />
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-foreground/80">Step 2 of 5</span>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i <= 1 ? "w-8 bg-brand" : "w-2 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
        <Link
          to="/dashboard"
          className="rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground/90 hover:bg-surface-elevated hover:text-foreground transition-colors"
        >
          Exit
        </Link>
      </header>

      {/* Split layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left — chat (35%) */}
        <aside className="flex w-[35%] min-w-[360px] flex-col border-r border-border/60 bg-surface">
          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
            {messages.map((m) =>
              m.from === "ai" ? (
                <div key={m.id} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-accent text-violet-accent-foreground">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-border bg-surface-elevated px-4 py-2.5 text-sm">
                    {m.text}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {m.text}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Input + quick selects */}
          <div className="border-t border-border/60 bg-surface px-6 py-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="relative"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 200))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                placeholder="Describe your business..."
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 pr-14 text-sm placeholder:text-muted-foreground focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
              <button
                type="submit"
                aria-label="Send"
                className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
              </button>
              <span className="absolute bottom-3 left-4 text-[10px] text-muted-foreground">
                {input.length}/200
              </span>
            </form>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickSelects.map((q) => {
                const active = selected === q;
                return (
                  <button
                    key={q}
                    onClick={() => setSelected(q)}
                    className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                      active
                        ? "border-brand bg-brand text-primary-foreground shadow-glow"
                        : "border-violet-accent/50 text-foreground hover:bg-violet-accent/10"
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>

            <p className="mt-4 text-center text-[11px] text-muted-foreground">
              5 questions · takes ~2 minutes
              <br />
              <span className="opacity-70">Your data is never shared</span>
            </p>
          </div>
        </aside>

        {/* Right — preview (65%) */}
        <main className="flex flex-1 flex-col bg-background">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface p-1">
              <button
                onClick={() => setDevice("desktop")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  device === "desktop"
                    ? "bg-brand text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" /> Desktop
              </button>
              <button
                onClick={() => setDevice("mobile")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  device === "mobile"
                    ? "bg-brand text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" /> Mobile
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors">
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-auto p-10">
            <div
              className={`flex flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated ring-1 ring-white/5 transition-all ${
                device === "desktop" ? "w-full max-w-5xl" : "w-[400px]"
              }`}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-border bg-surface-elevated/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/90" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/90" />
                <span className="h-3 w-3 rounded-full bg-green-500/90" />
                <div className="ml-4 flex flex-1 items-center gap-2 rounded-md border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent" />
                  https://lode.ai/your-site
                </div>
              </div>
              {generatedHtml ? (
                <iframe
                  title="Generated preview"
                  srcDoc={generatedHtml}
                  sandbox="allow-same-origin"
                  className="min-h-[520px] w-full flex-1 bg-white"
                />
              ) : (
                <div className="relative flex min-h-[520px] flex-1 items-center justify-center overflow-hidden bg-background px-6 py-20 text-center">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                      background:
                        "radial-gradient(60% 50% at 50% 30%, color-mix(in oklab, var(--brand) 18%, transparent), transparent 70%)",
                    }}
                  />
                  {isGenerating ? (
                    <div className="relative flex flex-col items-center gap-6">
                      <div className="relative h-16 w-16">
                        <div className="absolute inset-0 rounded-full border-4 border-brand/20" />
                        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand" />
                        <Sparkles className="absolute inset-0 m-auto h-6 w-6 text-brand animate-pulse" />
                      </div>
                      <p className="text-2xl font-semibold text-foreground/80 md:text-3xl">
                        Generating your website
                        <span className="animate-pulse">...</span>
                      </p>
                      <p
                        key={stepIndex}
                        className="animate-fade-in text-base font-medium text-foreground/60 md:text-lg"
                      >
                        {loadingSteps[stepIndex]}
                      </p>
                      <div className="flex gap-1.5">
                        {loadingSteps.map((_, i) => (
                          <span
                            key={i}
                            className={`h-1.5 rounded-full transition-all ${
                              i === stepIndex ? "w-6 bg-brand" : "w-1.5 bg-border"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ) : genError ? (
                    <p className="relative text-2xl font-semibold text-red-400/80 md:text-3xl">
                      {genError}
                    </p>
                  ) : (
                    <p className="relative text-2xl font-semibold text-foreground/60 md:text-3xl">
                      Your website preview
                      <br />
                      <span className="text-foreground/40">will appear here</span>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
