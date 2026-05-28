import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "solid" | "outline" | "inverse";
};

export function ButtonLink({
  children,
  className = "",
  variant = "solid",
  style,
  ...props
}: ButtonLinkProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition";
  const variants = {
    solid:
      "bg-[#0f172a] text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] hover:bg-[#111827]",
    outline:
      "border border-[#cbd5e1] bg-white text-[#0f172a] hover:border-[#0f172a]",
    inverse:
      "border border-white text-white hover:bg-white hover:text-[#0f172a]",
  };
  const variantStyles: Record<NonNullable<ButtonLinkProps["variant"]>, CSSProperties> = {
    solid: {
      backgroundColor: "#0f172a",
      color: "#ffffff",
    },
    outline: {},
    inverse: {
      color: "#ffffff",
    },
  };

  return (
    <a
      className={`${base} ${variants[variant]} ${className}`.trim()}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </a>
  );
}
