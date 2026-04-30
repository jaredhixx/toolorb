import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { toolDefinitions } from "@/lib/tools/tool-registry";

export const metadata = {
  title: "Free Financial Calculators for Real Decisions | Toolorb",
  description:
    "Use Toolorb's clear financial calculators to estimate mortgage payments, compare scenarios, understand tradeoffs, and make better money decisions.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Financial Calculators for Real Decisions | Toolorb",
    description:
      "Use Toolorb's clear financial calculators to estimate mortgage payments, compare scenarios, understand tradeoffs, and make better money decisions.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Free Financial Calculators for Real Decisions | Toolorb",
    description:
      "Use Toolorb's clear financial calculators to estimate mortgage payments, compare scenarios, understand tradeoffs, and make better money decisions.",
  },
};

const featuredTools = toolDefinitions.slice(0, 3);
const primaryFeaturedTool = featuredTools[0];

const trustPoints = [
  "Clear formulas and assumptions",
  "Decision-focused results",
  "Built for mortgages, loans, savings, and investing",
];

const platformSteps = [
  {
    title: "Enter your numbers",
    description:
      "Start with the details that matter most for the decision you are making.",
  },
  {
    title: "Compare the result",
    description:
      "Review the payment, scenario, chart, and decision summary in one place.",
  },
  {
    title: "Understand the tradeoffs",
    description:
      "Use the guidance sections to see what the result means before you move forward.",
  },
];

export default function HomePage() {
  if (!primaryFeaturedTool) {
    return null;
  }

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.08fr_0.92fr] md:items-center md:py-24">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
            {siteConfig.name}
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-stone-50 md:text-6xl">
            Clear financial calculators for decisions that matter.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-300">
            Toolorb helps you estimate payments, compare scenarios, and
            understand the real-world tradeoffs behind major financial
            decisions.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="rounded-full bg-amber-300 px-6 py-3 text-center text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
            >
              Browse calculators
            </Link>

            <Link
              href={primaryFeaturedTool.seo.canonicalPath}
              className="rounded-full border border-stone-700 px-6 py-3 text-center text-sm font-semibold text-stone-100 transition hover:border-amber-300/70 hover:bg-stone-900"
            >
              Start with {primaryFeaturedTool.shortName.toLowerCase()}
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-stone-800 bg-stone-950/70 p-4 text-sm leading-6 text-stone-300"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-stone-800 bg-stone-950/80 p-6 shadow-2xl shadow-black/30">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
            Featured tool
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-50">
            {primaryFeaturedTool.name}
          </h2>

          <p className="mt-4 text-sm leading-6 text-stone-300">
            {primaryFeaturedTool.description}
          </p>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Result clarity
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-50">
                Payment + scenario + decision summary
              </p>
            </div>

            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Built for
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-50">
                Planning, comparing, and understanding tradeoffs
              </p>
            </div>
          </div>

          <Link
            href={primaryFeaturedTool.seo.canonicalPath}
            className="mt-6 inline-flex rounded-full border border-amber-300/60 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300 hover:text-stone-950"
          >
            Open {primaryFeaturedTool.shortName.toLowerCase()}
          </Link>
        </div>
      </section>

      <section className="border-y border-stone-800 bg-stone-950/50">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
            How Toolorb works
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {platformSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[2rem] border border-stone-800 bg-stone-950/80 p-6"
              >
                <p className="text-sm font-semibold text-amber-300">
                  Step {index + 1}
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-stone-50">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
              Calculator library
            </p>

            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-stone-50">
              Start with a trusted calculator.
            </h2>
          </div>

          <Link
            href="/tools"
            className="text-sm font-semibold text-amber-200 transition hover:text-amber-100"
          >
            View all calculators
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {featuredTools.map((tool) => (
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

              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-stone-500">
                Updated {tool.meta.lastUpdated}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
                Calculator directory
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-50">
                Explore every Toolorb calculator.
              </h2>
            </div>

            <Link
              href="/tools"
              className="text-sm font-semibold text-amber-200 transition hover:text-amber-100"
            >
              Browse the full library
            </Link>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/tools"
              className="rounded-2xl border border-stone-800 bg-stone-900/45 p-4 text-sm font-semibold text-stone-100 transition hover:border-amber-300/40 hover:bg-stone-900"
            >
              All calculators
            </Link>

            {toolDefinitions.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.seo.canonicalPath}
                className="rounded-2xl border border-stone-800 bg-stone-900/45 p-4 text-sm font-semibold text-stone-100 transition hover:border-amber-300/40 hover:bg-stone-900"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}