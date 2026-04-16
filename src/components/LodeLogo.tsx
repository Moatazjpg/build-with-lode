export function LodeLogo({
  className = "",
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "compact";
}) {
  const size = variant === "compact" ? 24 : 28;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lode-mark-grad" x1="4" y1="6" x2="36" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        {/* Speech bubble */}
        <path
          d="M8 6h20a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H18l-7 6v-6H8a6 6 0 0 1-6-6V12a6 6 0 0 1 6-6Z"
          fill="url(#lode-mark-grad)"
        />
        {/* Three dots */}
        <circle cx="13" cy="18" r="2.2" fill="white" />
        <circle cx="20" cy="18" r="2.2" fill="white" />
        <circle cx="27" cy="18" r="2.2" fill="white" />
      </svg>
      <span className="text-lg font-extrabold tracking-tight leading-none">LODE</span>
    </div>
  );
}
