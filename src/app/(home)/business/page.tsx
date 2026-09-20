import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "商业计划书",
  description:
    "Awesome FDE 的产品与服务、盈利模式与价格带：培训验证需求，定制交付结果，标品和订阅持续收费。",
};

const services = [
  {
    stage: "挖水井",
    title: "诊断与顾问",
    price: "按场 / 按月",
    summary: "先当商业医生，再谈工具。把水源、卡点和验收标准问清楚。",
    items: [
      "六步诊断：钱的流向、三本账、赚钱七问、经营瓶颈、部门流程、AKA 切口",
      "老板高管闭门会：对齐 2026 年 AI 边界，以及公司到底要降本还是增收",
      "CEO / 高管陪跑：按月给方向，不让拍板人自己追资讯",
    ],
  },
  {
    stage: "挖水井",
    title: "分层培训",
    price: "2 万起 · 项目制 20–30 万",
    summary: "客户不再为纯课买单。要听得懂、用得上、能力长在他们身上。",
    items: [
      "全员入门：让人感到「动动嘴就能让 AI 操控电脑、搭库、做工作流」",
      "实战带练：问卷 + 半小时访谈后，2～3 天手把手搓知识库和 Skill",
      "项目制培训：约两个月，线下一天 + 线上答疑交叉，筛出各部门 AI 先锋",
    ],
  },
  {
    stage: "挖水井",
    title: "场景定制",
    price: "1 万 / 场景",
    summary: "对外叫智能体或数字员工，对内就是知识库 + Skill + 接口。",
    items: [
      "千元档内容工厂：生图、文案、发布，替代一个运营岗位",
      "万元档管理系统：产品表、客户档案、权限和数据治理",
      "一个场景不超过约 3 个具体诉求，合同写清验收再开工",
    ],
  },
  {
    stage: "铺水管",
    title: "标准化产品",
    price: "可复制标品",
    summary: "井验证过之后，把服务封装成课件、软件和软硬件套件。",
    items: [
      "公开笔记与录播：Awesome FDE 把方法论铺出去，降低获客成本",
      "标准化课件 / 小程序 / App：入门课给入门讲师，定制课给高级讲师",
      "软硬件一体机：知识库、工作流、UI 装进一台机器，客户点一点就能用",
    ],
  },
  {
    stage: "收水费",
    title: "订阅与运维",
    price: "月费 / 年框 / Token",
    summary: "水管铺出去之后，用固定回款养活团队，不再整项目结束再催款。",
    items: [
      "席位订阅：企业 Agent / 飞书一类按人头按月或按年收费",
      "用量计费：Token 中转、API 调用，跟着客户真实使用走",
      "年框运维：小培训 + 小定制 + 值守，保证每月有水进来",
    ],
  },
];

const priceBands = [
  {
    band: "千元档",
    range: "3,000 – 8,000",
    buyer: "门店 / 小团队",
    sell: "一条能周更的内容生产线",
    example: "攀岩馆小红书：生图 3K · 图+文 5K · 含自动发布 8K",
    note: "纯线上就能交付，不必驻场。先连续三轮稳定再结款。",
    accent: {
      badge: "border-amber-500/30 bg-amber-500/10 text-amber-200",
      ring: "hover:border-amber-500/30",
      number: "text-amber-200",
    },
  },
  {
    band: "万元档",
    range: "10,000 – 50,000",
    buyer: "中小公司业务部门",
    sell: "产品库 + 客户档案 + 权限",
    example: "一个具体场景对应一个智能体、对应一万；同一套方法卖给不同的人",
    note: "卖的是结构和权限，不是又一个聊天框。上市公司同套可卖到 5–10 万。",
    accent: {
      badge: "border-cyan-500/30 bg-cyan-500/10 text-cyan-200",
      ring: "hover:border-cyan-500/30",
      number: "text-cyan-200",
    },
  },
  {
    band: "十万档",
    range: "100,000 – 300,000+",
    buyer: "集团 / 上市 / 中型公司",
    sell: "大公司培训 · 中型定制 · 小公司陪跑",
    example: "项目制培训低于 20 万是「看不起他」；50 万和 5 万常干同一件事",
    note: "驻场人天算不回来。大公司做培训或顾问，中等做库和 Skill。",
    accent: {
      badge: "border-violet-500/30 bg-violet-500/10 text-violet-200",
      ring: "hover:border-violet-500/30",
      number: "text-violet-200",
    },
  },
];

const revenueMix = [
  {
    title: "项目收入",
    share: "现在主力",
    desc: "培训、定制、诊断。验证需求、养活团队、攒案例。",
  },
  {
    title: "标品收入",
    share: "复制杠杆",
    desc: "课件、录播、一体机。把验证过的服务变成可批发的水管。",
  },
  {
    title: "经常性收入",
    share: "活下去的水",
    desc: "订阅、Token、年框运维。预付 + 月费，比整项目尾款更安全。",
  },
];

const cycle = [
  { step: "01", title: "获客", body: "自媒体、案例、转介绍。找到有预算的水源。" },
  { step: "02", title: "销转", body: "三档报价 + 试讲 + 脱敏案例，让拍板人觉得钱值。" },
  { step: "03", title: "预付", body: "先收一笔。没服务可退，服务了扣成本，不垫款开工。" },
  { step: "04", title: "交付", body: "AKA 落地：Agent、知识库、Skill，按合同验收。" },
  { step: "05", title: "回款", body: "阶段款或月费。整项目做完再催，现金账会把人拖死。" },
  { step: "06", title: "复购", body: "升单顾问、加场景、转订阅。没有复购就要持续获客。" },
];

const books = [
  {
    title: "利润账",
    body: "营收 − 获客和渠道 − 工资法务 − 税和损失。进账 100 万不是纯利。",
  },
  {
    title: "现金账",
    body: "最伤的是垫款和账期。FDE 活下去靠预付和订阅这两股水。",
  },
  {
    title: "单位经济账",
    body: "每条产品线、每个客户单独算 ROI。不让头部项目养亏损业务。",
  },
];

export default function BusinessPlanPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <section className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.22em] text-neutral-500">
            Business Plan · 2026
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-[1.05] tracking-tight text-neutral-100 sm:text-5xl">
            <span className="bg-gradient-to-br from-neutral-100 via-emerald-100 to-amber-200 bg-clip-text text-transparent">
              Awesome FDE 商业计划书
            </span>
          </h1>
          <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
            帮企业把已经很强、但不落地的 AI，装进业务流程。
            <span className="mt-2 block text-base text-neutral-500">
              培训验证需求 · 定制交付结果 · 标品和订阅持续收费
            </span>
          </p>
        </section>

        <section className="mb-16 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-neutral-900/40 to-amber-500/10 p-6 sm:p-8">
          <p className="mb-3 text-xs uppercase tracking-wider text-emerald-300/80">
            一句话模式
          </p>
          <p className="text-lg leading-relaxed text-neutral-200 sm:text-xl">
            找到有预算的企业，用诊断和培训把需求挖出来，用知识库 + Skill
            把一个场景做成能验收的结果，再把验证过的服务标准化成课、软件和年框，按预付和订阅把水收回来。
          </p>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">
              提供的产品与服务
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              卖的不是某一个模型，而是顾问诊断、能带练的培训、可验收的场景，以及后面的标品和订阅。
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6"
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                    {service.stage}
                  </span>
                  <span className="text-xs text-neutral-500">{service.price}</span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-neutral-100">
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

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">盈利模式</h2>
            <p className="mt-1 text-sm text-neutral-500">
              先找到水源，再挖井、铺管、收水费。井还没出水，不投入做 SaaS 和一体机。
            </p>
          </div>
          <div className="mb-4 grid gap-4 md:grid-cols-3">
            {revenueMix.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6"
              >
                <p className="mb-3 text-xs text-neutral-500">
                  0{index + 1} · {item.share}
                </p>
                <h3 className="mb-2 text-lg font-semibold text-neutral-100">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
          <div className="overflow-x-auto rounded-2xl border border-neutral-800/80">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="bg-neutral-900/80 text-neutral-300">
                <tr>
                  <th className="px-5 py-3 font-medium">阶段</th>
                  <th className="px-5 py-3 font-medium">卖什么</th>
                  <th className="px-5 py-3 font-medium">怎么收钱</th>
                  <th className="px-5 py-3 font-medium">累在哪</th>
                </tr>
              </thead>
              <tbody className="text-neutral-400">
                <tr className="border-t border-neutral-800">
                  <td className="px-5 py-3 text-neutral-200">挖水井</td>
                  <td className="px-5 py-3">诊断、培训、场景定制</td>
                  <td className="px-5 py-3">一次性项目款 · 人天</td>
                  <td className="px-5 py-3">人的时间有上限，复合人才难筛</td>
                </tr>
                <tr className="border-t border-neutral-800 bg-neutral-950/40">
                  <td className="px-5 py-3 text-neutral-200">铺水管</td>
                  <td className="px-5 py-3">课件、软件、一体机</td>
                  <td className="px-5 py-3">标品销售 · 许可</td>
                  <td className="px-5 py-3">单价往往更低，但能批量</td>
                </tr>
                <tr className="border-t border-neutral-800">
                  <td className="px-5 py-3 text-neutral-200">收水费</td>
                  <td className="px-5 py-3">席位、Token、年框运维</td>
                  <td className="px-5 py-3">订阅 · 按量 · 年框</td>
                  <td className="px-5 py-3">要先把管铺出去，再谈躺收</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">价格带</h2>
            <p className="mt-1 text-sm text-neutral-500">
              技术栈可以一样，单子差一个零。差在买家付钱能力和你把价值讲清楚的能力。
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

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">赚钱循环</h2>
            <p className="mt-1 text-sm text-neutral-500">
              断一环就消亡。FDE 重人力，预付和月费比「做完再催」更重要。
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {cycle.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-5"
              >
                <p className="mb-2 text-xs tracking-wider text-emerald-300/80">
                  {item.step}
                </p>
                <h3 className="mb-1.5 text-base font-semibold text-neutral-100">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-neutral-100">
              老板至少看三本账
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              算账是指挥公司活下去，不是给会计交差。
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {books.map((book) => (
              <article
                key={book.title}
                className="rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6"
              >
                <h3 className="mb-2 text-lg font-semibold text-neutral-100">
                  {book.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {book.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 p-6 sm:p-8">
          <h2 className="mb-3 text-lg font-semibold text-neutral-100">
            现阶段不做什么
          </h2>
          <ul className="space-y-2 text-sm leading-relaxed text-neutral-400">
            <li>井还没出水，就投入做通用 SaaS 或一体机。</li>
            <li>只卖八十万咨询方案，不保证学会、用上。</li>
            <li>整项目做完再收款；驻场陪跑把人天算进去必亏。</li>
            <li>文档很少还强卖自研 RAG；或把飞书直接转手，客户何必经过你。</li>
          </ul>
        </section>

        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-900/80 via-neutral-900/40 to-neutral-900/80 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="mb-1 text-lg font-semibold text-neutral-100">
              想看方法怎么拆开
            </h2>
            <p className="text-sm text-neutral-500">
              商业课讲模式，案例课讲报价和交付。计划书只负责把产品、服务和收钱方式放在一张图上。
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/basics/courses/fundamentals/business-model"
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-200 transition-colors hover:border-amber-400/50"
            >
              商业模式课 →
            </Link>
            <Link
              href="/cases/courses/delivery/xiaohongshu-case"
              className="rounded-lg border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 transition-colors hover:border-violet-400/50"
            >
              价格带案例 →
            </Link>
          </div>
        </section>

        <footer className="mt-20 text-center text-xs text-neutral-600 sm:mt-28">
          <p>数字来自第一期训练营笔记，用作方法说明，不是对任何客户的报价承诺。</p>
        </footer>
      </div>
    </main>
  );
}
