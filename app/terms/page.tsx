import { siteConfig } from "../../lib/site";

export const metadata = {
  title: "Terms of Use | Toolorb",
  description:
    "Read Toolorb's terms of use for educational calculators, estimates, and website content.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Use | Toolorb",
    description:
      "Read Toolorb's terms of use for educational calculators, estimates, and website content.",
    url: `${siteConfig.url}/terms`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Terms of Use | Toolorb",
    description:
      "Read Toolorb's terms of use for educational calculators, estimates, and website content.",
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
        Terms of Use
      </p>

      <h1 className="text-5xl font-semibold tracking-tight text-stone-50">
        Terms of Use
      </h1>

      <div className="mt-8 grid gap-6 text-base leading-8 text-stone-300">
        <p>
          By using Toolorb, you agree to use the website and calculators for
          informational and educational purposes only.
        </p>

        <p>
          Calculator results are estimates based on the inputs, formulas, and
          assumptions provided. Actual payments, costs, rates, taxes, insurance,
          fees, investment returns, and other outcomes may vary.
        </p>

        <p>
          Toolorb does not provide financial, legal, tax, lending, investment,
          real estate, or professional advice. You should confirm important
          decisions with a qualified professional.
        </p>

        <p>
          Toolorb may update, change, remove, or improve calculators, content,
          formulas, pages, and features at any time.
        </p>
      </div>
    </main>
  );
}