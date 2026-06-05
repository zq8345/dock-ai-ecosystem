"use client";

type BrandMarkProps = {
  className?: string;
  showWordmark?: boolean;
  iconOnly?: boolean;
};

export function BrandMark({ className = "", showWordmark = true, iconOnly = false }: BrandMarkProps) {
  const icon = (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      className="h-8 w-8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Geometric D: hexagon-inspired flat mark */}
      <path
        d="M8 4h10c5.5 0 10 4.5 10 10v4c0 5.5-4.5 10-10 10H8V4z"
        fill="var(--accent)"
      />
      {/* Inner cutout creating the D letterform */}
      <path
        d="M13 8h5c3.9 0 7 3.1 7 7v2c0 3.9-3.1 7-7 7h-5V8z"
        fill="var(--background)"
      />
    </svg>
  );

  if (iconOnly) {
    return <span className={`inline-flex shrink-0 items-center justify-center ${className}`.trim()}>{icon}</span>;
  }

  return (
    <span className={`inline-flex min-w-0 items-center gap-2.5 ${className}`.trim()}>
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center">
        {icon}
      </span>
      {showWordmark && (
        <span className="text-[15px] font-semibold tracking-[-0.01em] text-[color:var(--foreground)]">
          Dock<span className="text-[color:var(--accent)]">Docs</span>
        </span>
      )}
    </span>
  );
}
