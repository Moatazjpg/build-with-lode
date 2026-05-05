import logoMark from "@/assets/lode-logo.png";

export function LodeLogo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "compact" | "large";
}) {
  const sizeMap = {
    compact: 28,
    default: 32,
    large: 40,
  } as const;
  const mark = sizeMap[variant];

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoMark}
        alt="Lode"
        width={mark}
        height={mark}
        className="shrink-0 select-none"
        style={{ width: mark, height: mark }}
        draggable={false}
      />
    </div>
  );
}
