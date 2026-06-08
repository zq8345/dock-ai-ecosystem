// 占位组件:替代"有页面但功能是桩、会下载空文件"的工具页。诚实地显示"即将推出",不再假装处理。
type Props = { locale?: "en" | "zh"; name: string; nameZh?: string };

export function ComingSoonTool({ locale = "en", name, nameZh }: Props) {
  const zh = locale === "zh";
  const label = zh ? nameZh || name : name;
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center sm:py-36">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--surface-subtle)] text-2xl">🛠️</div>
      <h1 className="mt-6 text-[26px] font-semibold tracking-[-0.014em]">{label}</h1>
      <p className="mt-3 text-[15px] font-semibold text-[color:var(--accent-strong)]">{zh ? "即将推出" : "Coming soon"}</p>
      <p className="mt-3 text-[14px] leading-relaxed text-[color:var(--muted)]">
        {zh
          ? "这个工具正在开发中,暂未上线。先去看看我们已经能用的工具吧。"
          : "This tool is under construction and not available yet. In the meantime, try the tools that are ready."}
      </p>
      <a
        href={zh ? "/zh/" : "/"}
        className="mt-7 inline-flex min-h-11 items-center rounded-[var(--radius)] bg-[color:var(--accent)] px-5 text-[14px] font-semibold text-white transition hover:bg-[color:var(--accent-hover)]"
      >
        {zh ? "查看全部工具" : "Browse all tools"}
      </a>
    </div>
  );
}
