import Link from "next/link";
import { siteConfig } from "../../lib/site";
import { toolDefinitions } from "../../lib/tools/tool-registry";

export const metadata = {
  title: "Financial Calculators and Planning Tools | Toolorb",
  description:
    "Browse Toolorb's free financial calculators for mortgages, loans, savings, investing, and everyday money decisions. Compare scenarios and understand the tradeoffs before you decide.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Financial Calculators and Planning Tools | Toolorb",
    description:
      "Browse Toolorb's free financial calculators for mortgages, loans, savings, investing, and everyday money decisions. Compare scenarios and understand the tradeoffs before you decide.",
    url: `${siteConfig.url}/tools`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Financial Calculators and Planning Tools | Toolorb",
    description:
      "Browse Toolorb's free financial calculators for mortgages, loans, savings, investing, and everyday money decisions. Compare scenarios and understand the tradeoffs before you decide.",
  },
};

const groupedTools = toolDefinitions.reduce<Record<string, typeof toolDefinitions>>(
  (groups, tool) => {
    const groupName = tool.meta.cluster;

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push(tool);

    return groups;
  },
  {},
);

const libraryStats = [
  {
    label: "Calculator categories",
    value: String(Object.keys(groupedTools).length),
  },
  {
    label: "Available tools",
    value: String(toolDefinitions.length),
  },
  {
    label: "Built for",
    value: "Real decisions",
  },
];

const futureClusters = [
  "Mortgage and home affordability",
  "Loans and payoff planning",
  "Savings and compound growth",
  "Debt and interest comparison",
  "Investing and retirement planning",
];

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Toolorb calculator library",
            url: `${siteConfig.url}/tools`,
            itemListElement: toolDefinitions.map((tool, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: tool.name,
              url: `${siteConfig.url}${tool.seo.canonicalPath}`,
            })),
          }),
        }}
      />

      <main className="mx-auto max-w-6xl px-6 py-16">
      <section className="grid gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-end">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
            Calculator library
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-stone-50">
            Financial calculators built for clear decisions.
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-300">
            Browse Toolorb calculators by category. Each tool is designed to
            show the result, explain the tradeoffs, and help you compare
            scenarios before making a financial decision.
          </p>
        </div>

        <div className="rounded-[2rem] border border-amber-200/10 bg-amber-100/5 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
            Library focus
          </p>

          <p className="mt-4 text-sm leading-6 text-stone-300">
            Toolorb is being built around reusable calculator systems, shared
            result logic, transparent assumptions, and decision-focused guidance
            so the library can scale without sacrificing quality.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-3 md:grid-cols-3">
        {libraryStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-stone-800 bg-stone-950/70 p-5"
          >
            <p className="text-sm text-stone-400">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-stone-50">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-10">
        {Object.entries(groupedTools).map(([clusterName, tools]) => (
          <div key={clusterName}>
            <div className="mb-5 flex flex-col gap-2 border-b border-stone-800 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
                  {tools[0]?.meta.category}
                </p>

                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-stone-50">
                  {clusterName}
                </h2>
              </div>

              <p className="text-sm text-stone-400">
                {tools.length} {tools.length === 1 ? "calculator" : "calculators"}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.seo.canonicalPath}
                  className="rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6 shadow-xl shadow-black/20 transition hover:border-amber-300/40 hover:bg-stone-900/80"
                >
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
                    {tool.shortName}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold text-stone-50">
                    {tool.name}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-stone-300">
                    {tool.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-stone-700 px-3 py-1 text-xs text-stone-300">
                      Scenario comparison
                    </span>

                    <span className="rounded-full border border-stone-700 px-3 py-1 text-xs text-stone-300">
                      Decision summary
                    </span>

                    <span className="rounded-full border border-stone-700 px-3 py-1 text-xs text-stone-300">
                      Updated {tool.meta.lastUpdated}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mt-14 rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
          Built to expand
        </p>

        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50">
          More calculator categories are planned.
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-300">
          Toolorb is starting with high-value financial decisions first. Future
          tools should use the same shared engine, result structure, trust
          panel, schema system, and content model before they are added to the
          library.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {futureClusters.map((cluster) => (
            <div
              key={cluster}
              className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 text-sm text-stone-300"
            >
              {cluster}
            </div>
          ))}
        </div>
      </section>
      </main>
    </>
  );
}