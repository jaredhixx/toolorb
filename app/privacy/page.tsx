import { siteConfig } from "../../lib/site";

export const metadata = {
  title: "Privacy Policy | Toolorb",
  description:
    "Read Toolorb's privacy policy for information about calculator use, analytics, advertising, and data handling.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Toolorb",
    description:
      "Read Toolorb's privacy policy for information about calculator use, analytics, advertising, and data handling.",
    url: `${siteConfig.url}/privacy`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | Toolorb",
    description:
      "Read Toolorb's privacy policy for information about calculator use, analytics, advertising, and data handling.",
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
        Privacy Policy
      </p>

      <h1 className="text-5xl font-semibold tracking-tight text-stone-50">
        Privacy Policy
      </h1>

      <div className="mt-8 grid gap-6 text-base leading-8 text-stone-300">
        <p>
          Toolorb provides educational calculators and planning tools. The
          numbers entered into calculators are used to display results in your
          browser.
        </p>

        <p>
          Toolorb may use analytics tools to understand general site usage, such
          as page views, traffic sources, device types, and performance. This
          helps improve the website and calculator experience.
        </p>

        <p>
          Toolorb may display advertising in the future. Advertising partners
          may use cookies or similar technologies to provide, measure, and
          improve ads.
        </p>

        <p>
          Toolorb does not ask for sensitive personal financial account
          credentials. Do not enter private account numbers, passwords, Social
          Security numbers, or other sensitive information into calculator
          fields.
        </p>

        <p>
          This policy may be updated as Toolorb grows and adds new features,
          advertising, analytics, or contact options.
        </p>
      </div>
    </main>
  );
}