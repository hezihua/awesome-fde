import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { rehypeSlugify } from "@/app/lib/rehype-slugify";

const qaContentDir = path.join(process.cwd(), "content", "q&a");

function findArticle(slug: string) {
  const filePath = path.join(qaContentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(raw);
  const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
  return {
    title: String(data.title ?? heading ?? slug),
    description: String(data.description ?? ""),
    category: String(data.category ?? "项目问答"),
    content: heading ? content.replace(/^#\s+.+\n?/, "") : content,
  };
}

export function generateStaticParams() {
  if (!fs.existsSync(qaContentDir)) return [];
  return fs
    .readdirSync(qaContentDir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({ slug: file.replace(/\.md$/, "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  return article ? { title: article.title, description: article.description } : {};
}

export default async function QaArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/qa"
          className="mb-8 inline-flex text-sm text-neutral-400 transition-colors hover:text-rose-300"
        >
          ← 返回 Q&A 目录
        </Link>
        <header className="mb-8 border-b border-neutral-800 pb-7">
          <p className="mb-3 text-xs uppercase tracking-wider text-rose-300">
            Q&A · {article.category}
          </p>
          <h1 className="mb-3 text-3xl font-bold leading-tight text-neutral-100">
            {article.title}
          </h1>
          {article.description && (
            <p className="text-sm leading-relaxed text-neutral-400">
              {article.description}
            </p>
          )}
        </header>
        <article className="prose prose-invert max-w-none">
          <MDXRemote
            source={article.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeSlugify, rehypeHighlight, rehypeKatex],
              },
            }}
          />
        </article>
      </div>
    </main>
  );
}
