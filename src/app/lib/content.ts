import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { TRACKS, TRACK_META, isTrack, type Track } from "./tracks";

export type { Track };
export { TRACKS, TRACK_META, isTrack };

export interface LectureMeta {
  slug: string;
  courseSlug: string;
  order: number;
  title: string;
  description: string;
  date?: string;
  tags: string[];
  content: string;
  raw: string;
}

export interface CourseMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  border: string;
  accent: string;
  topics: string[];
  lectures: LectureMeta[];
}

type CourseOverride = {
  title: string;
  subtitle: string;
  description: string;
  color: string;
  border: string;
  accent: string;
  topics: string[];
};

const courseMetaByTrack: Record<Track, Record<string, CourseOverride>> = {
  basics: {
    fundamentals: {
      title: "基础课",
      subtitle: "Fundamentals",
      description:
        "先对齐市场、工具、组织和商业认知，再谈落地。六节课串成一套给客户做诊断的基本功。",
      color: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/30",
      accent: "text-amber-400",
      topics: ["市场全景", "模型选型", "数据治理", "组织流程", "商业模式", "合规"],
    },
  },
  technical: {
    practice: {
      title: "技术课",
      subtitle: "Hands-on",
      description:
        "把 AKA 框架落到操作：名词、知识库、RAG、工作流和 Agent 部署。",
      color: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-500/30",
      accent: "text-cyan-400",
      topics: ["技术名词", "知识库", "RAG", "工作流", "Agent"],
    },
  },
  cases: {
    delivery: {
      title: "实战案例",
      subtitle: "Case Studies",
      description:
        "用脱敏项目拆千元档、万元档、十万档，以及售前、合同和客户管理。",
      color: "from-violet-500/20 to-fuchsia-500/20",
      border: "border-violet-500/30",
      accent: "text-violet-400",
      topics: ["千元档", "万元档", "十万档", "售前交付"],
    },
  },
};

function contentDir(track: Track): string {
  return path.join(process.cwd(), "content", track);
}

function parseLectureFromFile(
  filePath: string,
  courseSlug: string
): LectureMeta {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: frontmatterContent } = matter(raw);

  const baseName = path.basename(filePath, ".md");
  const orderMatch = baseName.match(/^(\d+)-/);
  const frontmatterLecture = data.lecture as number | undefined;
  const order = orderMatch
    ? parseInt(orderMatch[1], 10)
    : frontmatterLecture
      ? frontmatterLecture
      : 999;
  const slug = baseName.replace(/^\d+-/, "");

  let title: string = data.title ?? "";
  let content = frontmatterContent;

  if (!title) {
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
      content = content.replace(/^#\s+.+\n?/m, "");
    } else {
      title = slug;
    }
  }

  return {
    slug,
    courseSlug,
    order,
    title,
    description: data.description ?? "",
    date: data.date ? String(data.date) : undefined,
    tags: data.tags ?? [],
    content,
    raw,
  };
}

export function getAllCourses(track: Track): CourseMeta[] {
  const courseMetaOverrides = courseMetaByTrack[track];
  const slugOrder = Object.keys(courseMetaOverrides);
  const bySlug = new Map<string, CourseMeta>();
  const dir = contentDir(track);

  for (const slug of slugOrder) {
    const meta = courseMetaOverrides[slug];
    bySlug.set(slug, {
      slug,
      title: meta.title,
      subtitle: meta.subtitle,
      description: meta.description,
      color: meta.color,
      border: meta.border,
      accent: meta.accent,
      topics: meta.topics,
      lectures: [],
    });
  }

  if (fs.existsSync(dir)) {
    const courseDirs = fs
      .readdirSync(dir)
      .filter((d) => fs.statSync(path.join(dir, d)).isDirectory())
      .sort();

    for (const dirName of courseDirs) {
      const coursePath = path.join(dir, dirName);
      const mdFiles = fs
        .readdirSync(coursePath)
        .filter((f) => f.endsWith(".md"))
        .sort();

      const lectures = mdFiles.map((file) =>
        parseLectureFromFile(path.join(coursePath, file), dirName)
      );

      lectures.sort((a, b) => a.order - b.order);

      const existing = bySlug.get(dirName);
      if (existing) {
        existing.lectures = lectures;
      } else {
        const override = courseMetaOverrides[dirName];
        bySlug.set(dirName, {
          slug: dirName,
          title: override?.title ?? dirName,
          subtitle: override?.subtitle ?? dirName,
          description: override?.description ?? lectures[0]?.title ?? dirName,
          color: override?.color ?? "from-neutral-500/20 to-neutral-500/20",
          border: override?.border ?? "border-neutral-500/30",
          accent: override?.accent ?? "text-neutral-400",
          topics: override?.topics ?? [],
          lectures,
        });
      }
    }
  }

  const ordered: CourseMeta[] = [];
  for (const slug of slugOrder) {
    const c = bySlug.get(slug);
    if (c) ordered.push(c);
    bySlug.delete(slug);
  }
  for (const [, c] of bySlug) {
    ordered.push(c);
  }

  return ordered;
}

export function getCourse(
  track: Track,
  slug: string
): CourseMeta | undefined {
  return getAllCourses(track).find((c) => c.slug === slug);
}

export function getLecture(
  track: Track,
  courseSlug: string,
  lectureSlug: string
): LectureMeta | undefined {
  const course = getCourse(track, courseSlug);
  return course?.lectures.find((l) => l.slug === lectureSlug);
}

export interface FlatLecture extends LectureMeta {
  courseSlug: string;
  courseTitle: string;
  courseAccent: string;
  track: Track;
}

export function getAllLecturesFlat(track?: Track): FlatLecture[] {
  const tracks = track ? [track] : TRACKS;
  const flat: FlatLecture[] = [];
  for (const t of tracks) {
    for (const course of getAllCourses(t)) {
      for (const lecture of course.lectures) {
        flat.push({
          ...lecture,
          courseSlug: course.slug,
          courseTitle: course.title,
          courseAccent: course.accent,
          track: t,
        });
      }
    }
  }
  return flat;
}

export function getAdjacentLectures(
  track: Track,
  courseSlug: string,
  lectureSlug: string
): { prev: FlatLecture | null; next: FlatLecture | null } {
  const flat = getAllLecturesFlat();
  const index = flat.findIndex(
    (l) =>
      l.track === track &&
      l.courseSlug === courseSlug &&
      l.slug === lectureSlug
  );
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? flat[index - 1] : null,
    next: index < flat.length - 1 ? flat[index + 1] : null,
  };
}

export function getFirstLecturePath(track: Track): string | null {
  const courses = getAllCourses(track);
  const first = courses.find((c) => c.lectures.length > 0);
  if (!first) return null;
  return `/${track}/courses/${first.slug}/${first.lectures[0].slug}`;
}

export function lectureHref(
  track: Track,
  courseSlug: string,
  lectureSlug: string
): string {
  return `/${track}/courses/${courseSlug}/${lectureSlug}`;
}

export function estimateReadingTime(markdown: string): number {
  const chars = markdown.replace(/\s+/g, "").length;
  return Math.max(1, Math.round(chars / 500));
}
