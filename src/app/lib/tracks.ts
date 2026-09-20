export type Track = "basics" | "technical" | "cases";

export const TRACKS: Track[] = ["basics", "technical", "cases"];

export const TRACK_META: Record<
  Track,
  {
    label: string;
    brand: string;
    subtitle: string;
    accentDot: string;
    tocAccent: "violet" | "blue" | "cyan";
  }
> = {
  basics: {
    label: "基础课",
    brand: "基础认知",
    subtitle: "市场 · 选型 · 组织 · 商业 · 合规",
    accentDot: "bg-amber-400",
    tocAccent: "blue",
  },
  technical: {
    label: "技术课",
    brand: "技术实操",
    subtitle: "名词 · 知识库 · RAG · 工作流 · Agent",
    accentDot: "bg-cyan-400",
    tocAccent: "cyan",
  },
  cases: {
    label: "实战案例",
    brand: "案例拆解",
    subtitle: "千元档 · 万元档 · 十万档 · 售前交付",
    accentDot: "bg-violet-400",
    tocAccent: "violet",
  },
};

export function isTrack(value: string): value is Track {
  return value === "basics" || value === "technical" || value === "cases";
}
