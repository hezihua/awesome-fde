import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import matter from "gray-matter";

function getGrillArticles() {
  const dir = path.join(process.cwd(), "grill");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .sort()
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { content, data } = matter(raw);
      const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
      const slug = file.replace(/\.md$/, "");
      return {
        slug,
        title: String(data.title ?? heading ?? slug),
        category: String(data.category ?? "项目问答"),
        description: String(
          data.description ?? content.replace(/^#\s+.+\n?/, "").trim().split("\n")[0]
        ).replace(/^>\s*/, ""),
      };
    });
}

export default function GrillDirectoryPage() {
  const articles = getGrillArticles();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-10 border-b border-neutral-800 pb-7">
          <p className="mb-3 text-xs uppercase tracking-wider text-rose-300">
            FDE 项目复盘
          </p>
          <h1 className="mb-3 text-3xl font-bold text-neutral-100">Q&A</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
            用真实业务问题检验项目理解，把回答中的盲点整理成可复用的 FDE 方法。
          </p>
        </header>

        <section aria-label="Q&A 文章目录">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-neutral-100">专题问答</h2>
            <span className="text-xs text-neutral-500">{articles.length} 篇</span>
          </div>
          {articles.length ? (
            <div className="divide-y divide-neutral-800 border-y border-neutral-800">
              {articles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/grill/${article.slug}`}
                  className="group flex items-start gap-4 py-5 transition-colors hover:bg-neutral-900/40 sm:gap-6 sm:px-3"
                >
                  <span className="pt-0.5 font-mono text-sm text-rose-300/80">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-neutral-100 group-hover:text-rose-200">
                        {article.title}
                      </span>
                      <span className="rounded border border-neutral-700 px-1.5 py-0.5 text-[11px] text-neutral-500">
                        {article.category}
                      </span>
                    </span>
                    <span className="block text-sm leading-relaxed text-neutral-400">
                      {article.description}
                    </span>
                  </span>
                  <span className="pt-0.5 text-sm text-neutral-500 group-hover:text-rose-300">
                    阅读 →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="border-y border-neutral-800 py-8 text-sm text-neutral-500">
              暂无复盘文章。
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
