import Link from "next/link";
import { siteConfig } from "../../lib/site";
import { toolDefinitions } from "../../lib/tools/tool-registry";

export const metadata = {
  title: "Free Financial Calculators for Loans, Mortgages, Cars & Savings | Toolorb",
  description:
    "Use Toolorb's free financial calculators to estimate payments, compare loan costs, plan car affordability, calculate compound interest, and make clearer money decisions.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Free Financial Calculators for Loans, Mortgages, Cars & Savings | Toolorb",
    description:
      "Use Toolorb's free financial calculators to estimate payments, compare loan costs, plan car affordability, calculate compound interest, and make clearer money decisions.",
    url: `${siteConfig.url}/tools`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Financial Calculators for Loans, Mortgages, Cars & Savings | Toolorb",
    description:
      "Use Toolorb's free financial calculators to estimate payments, compare loan costs, plan car affordability, calculate compound interest, and make clearer money decisions.",
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

const clusterContent: Record<
  string,
  {
    eyebrow: string;
    title: string;
    description: string;
    bestFor: string[];
  }
> = {
  Loan: {
    eyebrow: "Loan calculators",
    title: "Loan and auto calculators",
    description:
      "Estimate monthly payments, compare borrowing costs, and understand how loan amount, interest rate, down payment, and term length affect the total price you pay.",
    bestFor: [
      "Comparing monthly loan payments",
      "Estimating car affordability before shopping",
      "Understanding how interest changes total cost",
    ],
  },
  Investment: {
    eyebrow: "Savings and investing calculators",
    title: "Savings and growth calculators",
    description:
      "Plan long-term growth by estimating how deposits, interest rates, time, and compounding frequency can affect future value.",
    bestFor: [
      "Projecting compound growth",
      "Comparing saving scenarios",
      "Understanding time and interest tradeoffs",
    ],
  },
  Mortgage: {
    eyebrow: "Mortgage calculators",
    title: "Mortgage and home payment calculators",
    description:
      "Estimate home loan payments and understand how principal, interest, taxes, insurance, and loan term can affect monthly housing costs.",
    bestFor: [
      "Estimating mortgage payments",
      "Comparing home loan scenarios",
      "Planning monthly housing costs",
    ],
  },
};

const decisionPaths = [
  {
    title: "Buying a car",
    description:
      "Start with car affordability to set a realistic budget, then use the auto loan calculator to estimate the payment after price, down payment, taxes, fees, rate, and term.",
    links: [
      {
        label: "Car Affordability Calculator",
        href: "/tools/car-affordability-calculator",
      },
      {
        label: "Auto Loan Calculator",
        href: "/tools/auto-loan-calculator",
      },
    ],
  },
  {
    title: "Comparing a loan",
    description:
      "Use the loan calculator to estimate payment and total interest, then compare the result against other borrowing or saving decisions.",
    links: [
      {
        label: "Loan Calculator",
        href: "/tools/loan-calculator",
      },
      {
        label: "Compound Interest Calculator",
        href: "/tools/compound-interest-calculator",
      },
    ],
  },
  {
    title: "Planning for a home",
    description:
      "Use the mortgage calculator to estimate monthly housing costs before comparing affordability, savings, or other long-term financial tradeoffs.",
    links: [
      {
        label: "Mortgage Calculator",
        href: "/tools/mortgage-calculator",
      },
      {
        label: "Loan Calculator",
        href: "/tools/loan-calculator",
      },
    ],
  },
];

const libraryStats = [
  {
    label: "Financial calculators",
    value: String(toolDefinitions.length),
    description: "Free tools for loans, cars, mortgages, and savings.",
  },
  {
    label: "Calculator categories",
    value: String(Object.keys(groupedTools).length),
    description: "Grouped by the financial decision you are trying to make.",
  },
  {
    label: "Built for",
    value: "Clear decisions",
    description: "Each calculator explains results, tradeoffs, and next steps.",
  },
];

const trustPoints = [
  "Clear formulas and assumptions",
  "Decision-focused result summaries",
  "Scenario comparisons where useful",
  "No sign-up required",
  "Free to use",
  "Built for mobile and desktop",
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
            name: "Free financial calculators",
            description:
              "A library of free financial calculators for loans, mortgages, cars, savings, and investing decisions.",
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
              Free financial calculators
            </p>

            <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-stone-50">
              Financial calculators for loans, cars, mortgages, and savings.
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-300">
              Use Toolorb&apos;s free financial calculators to estimate payments,
              compare scenarios, understand interest costs, and make clearer
              money decisions before you borrow, buy, save, or invest.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/car-affordability-calculator"
                className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              >
                Start with car affordability
              </Link>

              <Link
                href="/tools/loan-calculator"
                className="rounded-full border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-300/60 hover:text-amber-200"
              >
                Compare loan payments
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-200/10 bg-amber-100/5 p-6">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
              Why use Toolorb?
            </p>

            <p className="mt-4 text-sm leading-6 text-stone-300">
              Most calculator pages stop at the number. Toolorb is designed to
              show the result, explain what it means, surface the tradeoffs, and
              point you toward the next calculator when a decision needs more
              context.
            </p>

            <div className="mt-5 grid gap-2">
              {trustPoints.slice(0, 4).map((point) => (
                <div
                  key={point}
                  className="rounded-2xl border border-stone-800 bg-stone-950/70 px-4 py-3 text-sm text-stone-300"
                >
                  {point}
                </div>
              ))}
            </div>
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
              <p className="mt-3 text-sm leading-6 text-stone-400">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-14 rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
            Choose by decision
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50">
            Not sure which financial calculator to use first?
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-300">
            Start with the decision you are making. A car purchase, loan
            comparison, home payment, or savings goal usually needs more than
            one number, so these paths connect related calculators together.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {decisionPaths.map((path) => (
              <div
                key={path.title}
                className="rounded-[1.5rem] border border-stone-800 bg-stone-900/60 p-5"
              >
                <h3 className="text-xl font-semibold text-stone-50">
                  {path.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {path.description}
                </p>

                <div className="mt-5 grid gap-2">
                  {path.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-amber-200 transition hover:border-amber-300/60 hover:bg-amber-300/10"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-10">
          {Object.entries(groupedTools).map(([clusterName, tools]) => {
            const content = clusterContent[clusterName] ?? {
              eyebrow: `${clusterName} calculators`,
              title: `${clusterName} calculators`,
              description:
                "Use these calculators to estimate results, compare scenarios, and understand the tradeoffs behind the numbers.",
              bestFor: [
                "Estimating financial outcomes",
                "Comparing scenarios",
                "Making clearer money decisions",
              ],
            };

            return (
              <div key={clusterName}>
                <div className="mb-5 border-b border-stone-800 pb-5">
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
                    {content.eyebrow}
                  </p>

                  <div className="mt-2 grid gap-4 md:grid-cols-[1fr_0.7fr] md:items-end">
                    <div>
                      <h2 className="text-3xl font-semibold tracking-tight text-stone-50">
                        {content.title}
                      </h2>

                      <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-300">
                        {content.description}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-stone-800 bg-stone-950/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                        Best for
                      </p>

                      <ul className="mt-3 grid gap-2 text-sm text-stone-300">
                        {content.bestFor.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
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
                          Free calculator
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
            );
          })}
        </section>

        <section className="mt-14 grid gap-5 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
              Calculator quality
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50">
              Built to make the numbers easier to trust.
            </h2>

            <p className="mt-4 text-sm leading-6 text-stone-300">
              Toolorb calculators are structured around practical inputs,
              transparent result breakdowns, plain-English guidance, and
              related tools that help you keep comparing instead of stopping at
              one isolated number.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-stone-800 bg-stone-950/70 p-4 text-sm text-stone-300"
              >
                {point}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-amber-200/10 bg-amber-100/5 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
            Start calculating
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50">
            Compare the payment, the total cost, and the tradeoff.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-300">
            A financial calculator is most useful when it helps you see the
            decision from more than one angle. Start with the calculator that
            matches your situation, then compare related tools to understand the
            bigger picture.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools/auto-loan-calculator"
              className="rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
            >
              Use Auto Loan Calculator
            </Link>

            <Link
              href="/tools/mortgage-calculator"
              className="rounded-full border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-300/60 hover:text-amber-200"
            >
              Use Mortgage Calculator
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}