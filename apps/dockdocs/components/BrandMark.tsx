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
      className="h-7 w-7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="dd-mark" x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6ee7b8" />
          <stop offset="0.55" stopColor="#3ecf8e" />
          <stop offset="1" stopColor="#1f9d6a" />
        </linearGradient>
      </defs>
      {/* Squircle */}
      <rect x="2" y="2" width="28" height="28" rx="9" fill="url(#dd-mark)" />
      {/* Crisp white "D" monogram with a forward notch (speed / conversion) */}
      <path
        d="M11 9.5h5.4c3.9 0 6.6 2.9 6.6 6.5s-2.7 6.5-6.6 6.5H11V9.5zm3.4 3v7h2c2 0 3.3-1.4 3.3-3.5s-1.3-3.5-3.3-3.5h-2z"
        fill="#06140d"
        fillOpacity="0.92"
      />
    </svg>
  );

  if (iconOnly) {
    return <span className={`inline-flex shrink-0 items-center justify-center ${className}`.trim()}>{icon}</span>;
  }

  return (
    <span className={`inline-flex min-w-0 items-center gap-2 ${className}`.trim()}>
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center">{icon}</span>
      {showWordmark && (
        <span className="text-[15.5px] font-semibold tracking-[-0.02em] text-[color:var(--foreground)]">
          DockDocs
        </span>
      )}
    </span>
  );
}
