import logoMark from "@/assets/lode-logo.png";

/**
 * Lode brand mark.
 * Height-only sizing keeps native aspect ratio intact.
 * Responsive: 32px (mobile) → 36px (tablet) → 40px (desktop).
 */
export function LodeLogo({
  className = "",
}: {
  className?: string;
  variant?: "default" | "compact" | "large";
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoMark}
        alt="Lode"
        style={{ height: "100px" }}
        className="w-auto shrink-0 select-none object-contain brightness-110 contrast-110"
        draggable={false}
      />
    </div>
  );
}
