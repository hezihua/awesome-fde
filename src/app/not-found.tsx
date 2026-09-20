import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center">
      <p className="text-sm text-neutral-500">404</p>
      <h1 className="text-2xl font-semibold text-neutral-100">页面不存在</h1>
      <p className="text-sm text-neutral-400">这篇笔记可能还没写，或链接写错了。</p>
      <Link
        href="/"
        className="mt-2 rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-300 transition-colors hover:border-neutral-600 hover:text-neutral-100"
      >
        返回首页
      </Link>
    </div>
  );
}
