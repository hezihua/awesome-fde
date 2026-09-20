# Awesome FDE

> FDE 实战训练营第一期笔记 — 企业 AI 落地

单一 Next.js 站点，顶栏三个 Tab 切换内容：

| Tab | 内容 |
| --- | --- |
| **基础课** | 市场、选型、数据治理、组织、商业、合规 |
| **技术课** | 名词、知识库、RAG、工作流、Agent 交付 |
| **实战案例** | 千元档 / 万元档 / 十万档 / 售前与客户管理 |

笔记整理自桌面 `fde` 目录 15 节逐字稿（docx / pdf），写成结构化 Markdown，不是会议原文堆砌。

技术栈对齐 [ai-tutorial](https://github.com/hezihua/ai-tutorial)。

## 仓库结构

```
awesome-fde/
├── content/
│   ├── basics/fundamentals/   # 01–06
│   ├── technical/practice/     # 07–11
│   └── cases/delivery/         # 12–15
├── src/app/                    # Next.js App Router
├── package.json
└── vercel.json
```

## 技术栈

- Next.js (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- Markdown / MDX（gray-matter + next-mdx-remote）
- pnpm
- Vercel

## 本地开发

前置：Node.js 24，pnpm ≥ 8

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build
pnpm start
```

## 写笔记

- 基础课：`content/basics/fundamentals/{序号}-{slug}.md`
- 技术课：`content/technical/practice/{序号}-{slug}.md`
- 案例：`content/cases/delivery/{序号}-{slug}.md`

Frontmatter 示例：

```md
---
title: 笔记标题
description: 一句话摘要
date: "2026-08-01"
tags: [标签1, 标签2]
lecture: 1
---
```

路由形如 `/basics/courses/fundamentals/{lecture}`。

## 部署

Vercel 导入本仓库即可，构建命令 `pnpm build`。配置见 `vercel.json`。

## 开源协议

MIT License
