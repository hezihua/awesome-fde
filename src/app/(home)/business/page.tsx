import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "企业 AI 落地服务说明",
  description:
    "面向企业老板和业务负责人的 Awesome FDE 服务说明：了解 AI 落地服务、试点方式、参考投入与合作节奏。",
};

const services = [
  {
    stage: "阶段 1 · 找准问题",
    title: "业务场景诊断",
    price: "先确认范围",
    summary: "先理解工作怎么做、卡在哪里，再判断 AI 是否适合介入。",
    items: [
      "访谈业务负责人和一线员工，梳理当前流程、重复劳动和例外情况",
      "确认可用资料、系统权限、数据边界和需要人工把关的环节",
      "选出一个试点场景，约定参与人、周期和验收指标",
    ],
  },
  {
    stage: "阶段 2 · 小范围验证",
    title: "原型与业务试点",
    price: "按场景评估",
    summary: "把一个明确任务做成可试用的方案，用真实工作检查效果和风险。",
    items: [
      "根据资料、知识库、Skill、现有工具或接口组合出最小可用原型",
      "让实际使用者反复试做真实任务，记录错误、卡点和人工接管情况",
      "对照试点前的耗时、质量或返工情况，决定继续、调整或停止",
    ],
  },
  {
    stage: "阶段 3 · 推广与交接",
    title: "员工带练与持续支持",
    price: "按人数与周期评估",
    summary: "让团队能在日常工作中使用、反馈和维护，而不是只留下一个演示。",
    items: [
      "围绕真实岗位任务做掰开揉碎、问题引导、手把手带练",
      "交付操作说明、测试记录、异常处理方式和资料维护责任",
      "试点有效后再讨论扩展到更多员工、场景或部门",
    ],
  },
];

const priceBands = [
  {
    band: "单场景验证",
    range: "3,000 – 8,000",
    buyer: "门店 / 小团队",
    sell: "一项边界清楚的内容或资料处理任务",
    example: "攀岩馆小红书：生图 3K · 图+文 5K · 含自动发布 8K",
    note: "适用于输入资料和验收范围明确的小试点；是否需要驻场另行评估。",
    accent: {
      badge: "border-amber-500/30 bg-amber-500/10 text-amber-200",
      ring: "hover:border-amber-500/30",
      number: "text-amber-200",
    },
  },
  {
    band: "部门试点",
    range: "10,000 – 50,000",
    buyer: "中小公司业务部门",
    sell: "一个业务场景的原型、资料整理与用户试用",
    example: "例如产品资料问答、客户信息整理或内容生产辅助",
    note: "投入随资料质量、系统接入、权限要求、测试和培训范围变化。",
    accent: {
      badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
      ring: "hover:border-cyan-500/30",
      number: "text-cyan-200",
    },
  },
  {
    band: "多团队项目",
    range: "100,000 – 300,000+",
    buyer: "多部门或较复杂流程的企业",
    sell: "多轮试点、跨部门培训与流程共建",
    example: "包含需求诊断、多个场景、权限协调、员工带练和交接",
    note: "需先确认业务负责人、试点范围、数据条件和验收方式，再估算工作量。",
    accent: {
      badge: "border-violet-500/30 bg-violet-500/10 text-violet-200",
      ring: "hover:border-violet-500/30",
      number: "text-violet-200",
    },
  },
];

const cooperationSteps = [
  { step: "01", title: "梳理现状", body: "访谈业务负责人和一线员工，画出实际流程与主要卡点。" },
  { step: "02", title: "确定试点", body: "选一个场景，确认数据权限、参与人、周期和试点前基线。" },
  { step: "03", title: "共同验证", body: "用真实任务试用原型，持续沟通并记录错误、返工和人工接管。" },
  { step: "04", title: "验收交接", body: "按事先约定的指标验收，完成带练、说明文档和维护责任交接。" },
];

const fitSignals = [
  "有一个反复发生、能描述清楚的业务问题",
  "有业务负责人愿意参与，并能安排真实使用者试点",
  "可以在合规前提下提供必要资料，并共同确认验收指标",
];

const notFitSignals = [
  "希望一次部署就让全公司完全自动运行",
  "没有业务负责人，也无法安排员工参与试用",
  "数据权限、系统条件和错误责任尚未明确",
];

export default function BusinessPlanPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <section className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-neutral-500">
            面向企业老板与业务负责人
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-neutral-100 sm:text-5xl">
            <span className="bg-gradient-to-br from-neutral-100 via-emerald-100 to-amber-200 bg-clip-text text-transparent">
              Awesome FDE 企业 AI 落地服务说明
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
            正在评估 AI 怎么进入业务流程？这里说明我们能提供什么、如何合作，以及怎样从小范围试点开始。
            <span className="mt-2 block text-base text-neutral-500">
              不是融资 BP，也不是通用报价单；具体范围与费用以需求诊断和双方合同为准。
            </span>
          </p>
        </section>

        <section className="mb-16 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-neutral-900/40 to-amber-500/10 p-6 sm:p-8">
          <p className="mb-3 text-xs uppercase tracking-wider text-emerald-300/80">
            合作原则
          </p>
          <p className="text-lg leading-relaxed text-neutral-200 sm:text-xl">
            不从买工具开始。先和业务团队找准一个真实问题，再用小范围试点验证效果；有效后再决定是否推广。
          </p>
        </section>

        <section className="mb-16 border-y border-neutral-800 py-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-neutral-100">
                适合这样的企业
              </h2>
              <ul className="space-y-3 text-sm leading-relaxed text-neutral-300">
                {fitSignals.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-emerald-400">+</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-lg font-semibold text-neutral-100">
                暂时不适合的情况
              </h2>
              <ul className="space-y-3 text-sm leading-relaxed text-neutral-400">
                {notFitSignals.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="text-neutral-600">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">
              可以一起解决什么
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              从一个场景开始。最终交付以双方确认的业务问题和验收范围为准。
            </p>
          </div>
          <div className="grid gap-6 border-y border-neutral-800 py-6 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="py-2 lg:border-r lg:border-neutral-800 lg:pr-6 last:lg:border-r-0"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium text-emerald-300">
                    {service.stage}
                  </span>
                  <span className="text-xs text-neutral-500">{service.price}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-100">
                  {service.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                  {service.summary}
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-neutral-300">
                  {service.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400/80" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 border-b border-neutral-800 pb-8">
          <h2 className="mb-4 text-lg font-semibold text-neutral-100">
            可按需要增加的支持
          </h2>
          <div className="grid gap-6 text-sm leading-relaxed text-neutral-400 md:grid-cols-2">
            <p>
              <span className="font-medium text-neutral-200">培训与流程共建：</span>
              面向管理者对齐目标和风险，带员工练习岗位任务，并沉淀可复用的资料、Skill 和操作规范。
            </p>
            <p>
              <span className="font-medium text-neutral-200">上线后维护：</span>
              按约定频率检查运行状态、资料更新和用户反馈；响应时间、服务范围与费用事先写入协议。
            </p>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">合作怎么推进</h2>
            <p className="mt-1 text-sm text-neutral-500">
              每一步都和业务团队一起确认，试点无效时可以停下或调整，不默认扩成大项目。
            </p>
          </div>
          <div className="grid gap-6 border-y border-neutral-800 py-6 sm:grid-cols-2 lg:grid-cols-4">
            {cooperationSteps.map((step) => (
              <article key={step.step}>
                <p className="mb-3 text-xs font-medium text-emerald-300">{step.step}</p>
                <h3 className="mb-2 text-base font-semibold text-neutral-100">{step.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">参考投入与范围</h2>
            <p className="mt-1 text-sm text-neutral-500">
              以下区间来自训练营案例，仅帮助判断投入量级。正式报价前会先确认流程、系统、资料、参与人数和验收标准。
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {priceBands.map((tier) => (
              <article
                key={tier.band}
                className={`rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 transition-colors ${tier.accent.ring}`}
              >
                <span
                  className={`mb-4 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tier.accent.badge}`}
                >
                  {tier.band}
                </span>
                <p
                  className={`mb-1 text-2xl font-semibold tracking-tight ${tier.accent.number}`}
                >
                  ¥{tier.range}
                </p>
                <p className="mb-4 text-xs text-neutral-500">{tier.buyer}</p>
                <p className="mb-3 text-sm font-medium text-neutral-200">
                  {tier.sell}
                </p>
                <p className="mb-3 text-sm leading-relaxed text-neutral-400">
                  {tier.example}
                </p>
                <p className="text-xs leading-relaxed text-neutral-500">
                  {tier.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-10 border-y border-neutral-800 py-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-neutral-100">
              怎么判断试点有效
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-neutral-300">
              <li>开始前记录基线：处理时长、错误率、返工量或等待时间。</li>
              <li>试点中用员工真实任务测试，记录质量、人工复核和异常接管。</li>
              <li>结束时按同一口径比较，再由业务负责人决定扩大、调整或停止。</li>
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-lg font-semibold text-neutral-100">
              开始沟通前，准备这些信息
            </h2>
            <ul className="space-y-3 text-sm leading-relaxed text-neutral-400">
              <li>一项具体、反复发生的工作任务，以及现在的处理步骤。</li>
              <li>参与试点的业务负责人和一线员工。</li>
              <li>可提供资料的范围、系统限制和必须遵守的数据要求。</li>
            </ul>
          </div>
        </section>

        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-900/80 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="mb-1 text-lg font-semibold text-neutral-100">
              下一步：先判断一个场景值不值得试
            </h2>
            <p className="text-sm text-neutral-500">
              带着具体流程、当前卡点和参与人开始沟通；先把问题和验收说清，再决定要不要做原型。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/basics/courses/fundamentals/business-model"
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-200 transition-colors hover:border-amber-400/50"
            >
              查看商业诊断方法 →
            </Link>
            <Link
              href="/cases/courses/delivery/xiaohongshu-case"
              className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 transition-colors hover:border-violet-400/50"
            >
              查看场景交付案例 →
            </Link>
          </div>
        </section>

        <footer className="mt-20 text-center text-xs text-neutral-600 sm:mt-28">
          <p>价格区间取自第一期训练营案例，仅供理解投入量级；具体交付与费用以诊断结果和双方合同为准。</p>
        </footer>
      </div>
    </main>
  );
}
