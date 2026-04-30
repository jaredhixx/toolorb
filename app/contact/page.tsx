import { siteConfig } from "../../lib/site";

export const metadata = {
  title: "Contact Toolorb",
  description:
    "Contact Toolorb with calculator feedback, correction requests, or general questions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Toolorb",
    description:
      "Contact Toolorb with calculator feedback, correction requests, or general questions.",
    url: `${siteConfig.url}/contact`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Toolorb",
    description:
      "Contact Toolorb with calculator feedback, correction requests, or general questions.",
  },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-300">
        Contact
      </p>

      <h1 className="text-5xl font-semibold tracking-tight text-stone-50">
        Contact Toolorb.
      </h1>

      <div className="mt-8 rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6">
        <p className="text-base leading-8 text-stone-300">
          Have calculator feedback, a correction request, or a general question?
          You can reach Toolorb by email.
        </p>

        <a
          href="mailto:clearpathwebsites@gmail.com"
          className="mt-6 inline-flex rounded-full border border-amber-300/60 px-5 py-3 text-sm font-semibold text-amber-200 transition hover:bg-amber-300 hover:text-stone-950"
        >
          clearpathwebsites@gmail.com
        </a>
      </div>
    </main>
  );
}