import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "elevated" | "interactive" | "muted";
};

const variants = {
  default:
    "border border-[color:var(--line)] bg-[color:var(--surface)]",
  elevated:
    "border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[0_20px_70px_rgba(15,23,42,0.08)]",
  interactive:
    "border border-[color:var(--line)] bg-[color:var(--surface)] transition hover:-translate-y-0.5 hover:border-[color:var(--foreground)]",
  muted:
    "border border-[color:var(--line)] bg-[color:var(--surface-subtle)]",
};

export function Card({
  children,
  className = "",
  variant = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius)] p-5 ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
