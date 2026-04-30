import Link from "next/link";
import { getRelatedTools } from "../../lib/tools/tool-relationships";
import type { ToolDefinition } from "../../lib/tools/tool-types";

export function RelatedTools({ tool }: { tool: ToolDefinition }) {
  const relatedTools = getRelatedTools(tool);

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
        Related tools
      </p>

      <h2 className="mt-3 text-2xl font-semibold text-stone-50">
        Continue with related calculators
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {relatedTools.map((relatedTool) => (
          <Link
            key={relatedTool.slug}
            href={relatedTool.seo.canonicalPath}
            className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 transition hover:border-amber-300/40 hover:bg-stone-900"
          >
            <p className="text-sm font-medium text-amber-300">
              {relatedTool.meta.cluster}
            </p>

            <h3 className="mt-2 text-lg font-semibold text-stone-50">
              {relatedTool.name}
            </h3>

            <p className="mt-2 text-sm leading-6 text-stone-300">
              {relatedTool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}