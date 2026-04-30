import { siteConfig } from "../../lib/site";

export const metadata = {
  title: "Disclaimer | Toolorb",
  description:
    "Toolorb calculators provide educational estimates only and are not financial, legal, tax, lending, or investment advice.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Disclaimer | Toolorb",
    description:
      "Toolorb calculators provide educational estimates only and are not financial, legal, tax, lending, or investment advice.",
    url: `${siteConfig.url}/disclaimer`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Disclaimer | Toolorb",
    description:
      "Toolorb calculators provide educational estimates only and are not financial, legal, tax, lending, or investment advice.",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
        Disclaimer
      </p>

      <h1 className="text-5xl font-semibold tracking-tight text-stone-50">
        Educational estimates, not professional advice.
      </h1>

      <div className="mt-8 grid gap-6 text-base leading-8 text-stone-300">
        <p>
          Toolorb calculators are designed to help users estimate, compare, and
          better understand financial scenarios.
        </p>

        <p>
          Results should not be treated as guaranteed outcomes. Actual results
          may vary based on market conditions, lender rules, taxes, insurance,
          fees, personal circumstances, and other factors outside Toolorb’s
          control.
        </p>

        <p>
          Toolorb does not provide financial, legal, tax, lending, investment,
          or real estate advice. Before making important decisions, consult a
          qualified professional.
        </p>
      </div>
    </main>
  );
}