import Link from "next/link";
import {
  TRACKS,
  TRACK_META,
  estimateReadingTime,
  getAllCourses,
  getAllLecturesFlat,
  lectureHref,
} from "@/app/lib/content";

const accentByTrack = {
  basics: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    hover:
      "hover:border-amber-500/30 hover:shadow-[0_0_40px_-15px_rgba(245,158,11,0.25)]",
    number:
      "border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-orange-500/15 text-amber-200",
    title: "group-hover:from-amber-100 group-hover:to-orange-200",
    cta: "group-hover:text-amber-400",
  },
  technical: {
    badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
    hover:
      "hover:border-cyan-500/30 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.25)]",
    number:
      "border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/15 text-cyan-200",
    title: "group-hover:from-cyan-100 group-hover:to-blue-200",
    cta: "group-hover:text-cyan-400",
  },
  cases: {
    badge: "border-violet-500/30 bg-violet-500/10 text-violet-300",
    hover:
      "hover:border-violet-500/30 hover:shadow-[0_0_40px_-15px_rgba(167,139,250,0.25)]",
    number:
      "border-violet-500/30 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/15 text-violet-200",
    title: "group-hover:from-violet-100 group-hover:to-fuchsia-200",
    cta: "group-hover:text-violet-400",
  },
} as const;

export default async function Home() {
  const lectures = getAllLecturesFlat();
  const modules = TRACKS.map((track) => {
    const courses = getAllCourses(track);
    const lectureCount = courses.reduce((n, c) => n + c.lectures.length, 0);
    return { track, meta: TRACK_META[track], courses, lectureCount };
  });

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <section className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-neutral-500">
            FDE 实战训练营 · 第一期
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-neutral-100 sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-br from-neutral-100 via-neutral-100 to-violet-300 bg-clip-text text-transparent">
              Awesome FDE
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
            企业 AI 落地的笔记站点
            <span className="mt-2 block text-base text-neutral-500">
              基础认知 · 技术实操 · 案例拆解
            </span>
          </p>
        </section>

        <section className="mb-16 grid gap-4 md:grid-cols-3">
          {modules.map(({ track, meta, lectureCount, courses }) => {
            const first = courses.find((c) => c.lectures.length > 0);
            const href = first
              ? lectureHref(track, first.slug, first.lectures[0].slug)
              : `/${track}`;
            return (
              <Link
                key={track}
                href={href}
                className={`group rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 transition-all hover:-translate-y-0.5 ${accentByTrack[track].hover}`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${meta.accentDot}`}
                  />
                  <span className="text-xs uppercase tracking-wider text-neutral-500">
                    {meta.label}
                  </span>
                </div>
                <h2 className="mb-2 text-xl font-semibold text-neutral-100">
                  {meta.brand}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {meta.subtitle}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{lectureCount} 节笔记</span>
                  <span className={`transition-colors ${accentByTrack[track].cta}`}>
                    进入课程 →
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        <section>
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-lg font-semibold text-neutral-100">全部笔记</h2>
            <p className="text-xs text-neutral-500">{lectures.length} 篇</p>
          </div>

          {lectures.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-800 p-10 text-center text-neutral-500">
              暂无笔记，敬请期待。
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {lectures.map((lecture) => {
                const indexLabel = String(lecture.order).padStart(2, "0");
                const accent = accentByTrack[lecture.track];
                const readingTime = estimateReadingTime(lecture.content);
                return (
                  <Link
                    key={`${lecture.track}-${lecture.slug}`}
                    href={lectureHref(
                      lecture.track,
                      lecture.courseSlug,
                      lecture.slug
                    )}
                    className={`group relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-900/80 p-6 transition-all duration-300 hover:-translate-y-0.5 sm:p-7 ${accent.hover}`}
                  >
                    <div className="relative flex items-start gap-5 sm:gap-6">
                      <div className="flex shrink-0 flex-col items-center gap-2">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-xl border text-lg font-bold tracking-tight shadow-inner ${accent.number}`}
                        >
                          {indexLabel}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${accent.badge}`}
                          >
                            {TRACK_META[lecture.track].label}
                          </span>
                          {lecture.date && (
                            <>
                              <span className="text-neutral-700">·</span>
                              <time className="text-[11px] text-neutral-500">
                                {lecture.date}
                              </time>
                            </>
                          )}
                          <span className="text-neutral-700">·</span>
                          <span className="text-[11px] text-neutral-500">
                            {readingTime} 分钟
                          </span>
                        </div>

                        <h3 className="mb-2 text-xl font-semibold leading-snug tracking-tight">
                          <span
                            className={`bg-gradient-to-r from-neutral-100 to-neutral-300 bg-clip-text text-transparent transition-all ${accent.title}`}
                          >
                            {lecture.title}
                          </span>
                        </h3>

                        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-neutral-400">
                          {lecture.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-between gap-3">
                          {lecture.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {lecture.tags.slice(0, 4).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-neutral-700/40 bg-neutral-800/70 px-2 py-0.5 text-[11px] text-neutral-400"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div
                            className={`inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors ${accent.cta}`}
                          >
                            <span>开始阅读</span>
                            <span>→</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <footer className="mt-20 text-center text-xs text-neutral-600 sm:mt-28">
          <p>© 2026 Awesome FDE · 基于第一期训练营逐字稿整理</p>
        </footer>
      </div>
    </main>
  );
}
