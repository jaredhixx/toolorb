import { siteConfig } from "../../lib/site";

export const metadata = {
  title: "About Toolorb | Clear Financial Calculators",
  description:
    "Learn about Toolorb, a financial calculator platform built to make estimates, scenarios, and decision tradeoffs easier to understand.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Toolorb | Clear Financial Calculators",
    description:
      "Learn about Toolorb, a financial calculator platform built to make estimates, scenarios, and decision tradeoffs easier to understand.",
    url: `${siteConfig.url}/about`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Toolorb | Clear Financial Calculators",
    description:
      "Learn about Toolorb, a financial calculator platform built to make estimates, scenarios, and decision tradeoffs easier to understand.",
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
        About Toolorb
      </p>

      <h1 className="text-5xl font-semibold tracking-tight text-stone-50">
        Financial calculators built for clarity.
      </h1>

      <div className="mt-8 grid gap-6 text-base leading-8 text-stone-300">
        <p>
          Toolorb is a financial calculator platform designed to help people
          estimate payments, compare scenarios, and better understand the
          tradeoffs behind important money decisions.
        </p>

        <p>
          Our goal is to make calculators that are clear, practical, and useful.
          Toolorb focuses on transparent inputs, understandable formulas,
          scenario comparison, and plain-language result guidance.
        </p>

        <p>
          Toolorb calculators are educational tools. They are not a replacement
          for professional financial, legal, tax, lending, or investment advice.
        </p>
      </div>
    </main>
  );
}