export function LodeLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-7 w-7">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brand to-violet-accent" />
        <div className="absolute inset-[3px] rounded-md bg-background flex items-center justify-center">
          <span className="text-[11px] font-extrabold bg-gradient-to-br from-brand to-cyan-accent bg-clip-text text-transparent">
            L
          </span>
        </div>
      </div>
      <span className="text-lg font-bold tracking-tight">Lode</span>
    </div>
  );
}
