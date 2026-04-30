import Link from "next/link";
import { siteConfig } from "../../lib/site";
import { toolDefinitions } from "../../lib/tools/tool-registry";

const trustLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Privacy Policy",
    href: "/privacy",
  },
  {
    label: "Terms of Use",
    href: "/terms",
  },
  {
    label: "Disclaimer",
    href: "/disclaimer",
  },
];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const toolLinks = [
    {
      label: "All tools",
      href: "/tools",
    },
    ...toolDefinitions.map((tool) => ({
      label: tool.name,
      href: tool.seo.canonicalPath,
    })),
  ];

  return (
    <footer className="border-t border-stone-800/80 bg-stone-950/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-sm font-semibold text-amber-200">
                T
              </span>

              <span className="text-sm font-semibold tracking-tight text-stone-50">
                {siteConfig.name}
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-stone-400">
              Premium calculators built to make real decisions clearer, faster,
              and easier to understand.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-stone-100">Tools</p>

            <div className="mt-4 grid gap-3">
              {toolLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-400 transition hover:text-amber-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-stone-100">Trust</p>

            <div className="mt-4 grid gap-3">
              {trustLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-400 transition hover:text-amber-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-stone-800 pt-6 text-xs leading-6 text-stone-500 md:grid-cols-[1fr_auto] md:items-center">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>

          <p>
            Toolorb provides educational estimates only, not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}