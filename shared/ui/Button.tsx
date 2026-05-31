import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  CSSProperties,
  ReactNode,
} from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ButtonVariant | "solid" | "outline" | "inverse";
  loading?: boolean;
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
};

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

const base =
  "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] px-5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--accent)] text-white shadow-[0_10px_24px_rgba(37,99,235,0.16)] hover:opacity-90",
  secondary:
    "border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--foreground)] hover:border-[color:var(--foreground)]",
  ghost:
    "text-[color:var(--muted)] hover:bg-black/5 hover:text-[color:var(--foreground)] dark:hover:bg-white/10",
  danger:
    "border border-[color:var(--error-line)] bg-[color:var(--error-surface)] text-[color:var(--error)] hover:opacity-90",
};

function normalizeVariant(
  variant: NonNullable<ButtonLinkProps["variant"]> | undefined,
): ButtonVariant | "inverse" {
  if (variant === "solid") {
    return "primary";
  }

  if (variant === "outline") {
    return "secondary";
  }

  return variant ?? "primary";
}

export function Button({
  children,
  className = "",
  variant = "primary",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? "..." : children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  variant = "primary",
  loading = false,
  style,
  ...props
}: ButtonLinkProps) {
  const normalized = normalizeVariant(variant);
  const linkVariants = {
    ...variants,
    inverse:
      "border border-white text-white hover:bg-white hover:text-[color:var(--foreground)]",
  };

  const variantStyles: Record<ButtonVariant | "inverse", CSSProperties> = {
    primary: {},
    secondary: {},
    ghost: {},
    danger: {},
    inverse: {
      color: "#ffffff",
    },
  };

  return (
    <a
      className={`${base} ${linkVariants[normalized]} ${loading ? "pointer-events-none opacity-60" : ""} ${className}`.trim()}
      aria-busy={loading || undefined}
      style={{ ...variantStyles[normalized], ...style }}
      {...props}
    >
      {loading ? "..." : children}
    </a>
  );
}
