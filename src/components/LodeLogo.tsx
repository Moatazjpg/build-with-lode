import logoMark from "@/assets/lode-logo.png";

export function LodeLogo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "compact" | "large";
}) {
  const sizeMap = {
    compact: { mark: 32, text: "text-xl" },
    default: { mark: 40, text: "text-2xl" },
    large: { mark: 56, text: "text-3xl" },
  } as const;
  const { mark, text } = sizeMap[variant];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoMark}
        alt="Lode logo"
        width={mark}
        height={mark}
        className="shrink-0 select-none"
        style={{ width: mark, height: mark }}
        draggable={false}
      />
      <span
        className={`font-extrabold tracking-tight leading-none text-foreground ${text}`}
      >
        LODE
      </span>
    </div>
  );
}
