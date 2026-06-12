// Supabase-style dark backdrop: near-black base, a fine dot grid that fades out,
// a soft green aurora and faint side glows. Pure CSS, theme-aware.

export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Dot grid, fading toward the edges */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(var(--line) 1px, transparent 1.2px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 30%, #000 25%, transparent 78%)",
        }}
      />

      {/* Soft green aurora high up */}
      <div
        className="absolute left-1/2 top-[-6%] h-[560px] w-[1100px] -translate-x-1/2 rounded-full opacity-[0.18] blur-[14px]"
        style={{ background: "radial-gradient(ellipse at center, #3ecf8e 0%, transparent 64%)" }}
      />

      {/* Faint side glows for depth */}
      <div
        className="absolute left-[6%] top-[44%] h-[320px] w-[320px] -translate-y-1/2 rounded-full opacity-[0.08] blur-[10px]"
        style={{ background: "radial-gradient(circle, #2dd4bf 0%, transparent 70%)" }}
      />
      <div
        className="absolute right-[6%] top-[38%] h-[340px] w-[340px] -translate-y-1/2 rounded-full opacity-[0.07] blur-[10px]"
        style={{ background: "radial-gradient(circle, #3ecf8e 0%, transparent 70%)" }}
      />

      {/* Fine top highlight line */}
      <div
        className="absolute inset-x-0 top-0 h-px opacity-50"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
    </div>
  );
}
