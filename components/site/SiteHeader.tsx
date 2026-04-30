import Link from "next/link";
import { siteConfig } from "../../lib/site";
import { toolDefinitions } from "../../lib/tools/tool-registry";

const navigationLinks = [
  {
    label: "Tools",
    href: "/tools",
  },
  ...toolDefinitions.slice(0, 3).map((tool) => ({
    label: tool.shortName,
    href: tool.seo.canonicalPath,
  })),
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-800/80 bg-stone-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-sm font-semibold text-amber-200 shadow-lg shadow-black/20 transition group-hover:border-amber-300/40 group-hover:bg-amber-300/15">
            T
          </span>

          <span>
            <span className="block text-sm font-semibold tracking-tight text-stone-50">
              {siteConfig.name}
            </span>
            <span className="block text-xs text-stone-500">
              Clear calculators
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-900 hover:text-amber-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/tools"
          className="hidden rounded-full border border-amber-300/30 bg-amber-300 px-4 py-2 text-sm font-semibold text-stone-950 shadow-lg shadow-black/20 transition hover:bg-amber-200 md:inline-flex"
        >
          Browse tools
        </Link>

        <details className="group relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-stone-800 bg-stone-900/80 px-4 py-2 text-sm font-medium text-stone-200">
            Menu
            <span className="transition group-open:rotate-180">⌄</span>
          </summary>

          <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-3 shadow-2xl shadow-black/40">
            <div className="grid gap-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl px-4 py-3 text-sm font-medium text-stone-300 transition hover:bg-stone-900 hover:text-amber-200"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/tools"
                className="mt-2 rounded-2xl border border-amber-300/30 bg-amber-300 px-4 py-3 text-center text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              >
                Browse all tools
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}