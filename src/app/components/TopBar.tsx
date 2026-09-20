"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    key: "basics",
    label: "基础课",
    href: "/basics",
    active:
      "border-amber-500/40 bg-amber-500/10 text-amber-200 hover:border-amber-400/60 hover:bg-amber-500/15",
    idle: "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
  },
  {
    key: "technical",
    label: "技术课",
    href: "/technical",
    active:
      "border-cyan-500/40 bg-cyan-500/10 text-cyan-200 hover:border-cyan-400/60 hover:bg-cyan-500/15",
    idle: "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
  },
  {
    key: "cases",
    label: "实战案例",
    href: "/cases",
    active:
      "border-violet-500/40 bg-violet-500/10 text-violet-200 hover:border-violet-400/60 hover:bg-violet-500/15",
    idle: "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
  },
  {
    key: "business",
    label: "商业计划",
    href: "/business",
    active:
      "border-emerald-500/40 bg-emerald-500/10 text-emerald-200 hover:border-emerald-400/60 hover:bg-emerald-500/15",
    idle: "border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200",
  },
] as const;

export function TopBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-neutral-100 transition-colors hover:text-violet-200"
        >
          Awesome FDE
        </Link>

        <nav className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          {items.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const className = `rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all sm:px-3.5 sm:text-sm ${
              isActive ? item.active : item.idle
            }`;
            return (
              <Link key={item.key} href={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
