import type { ToolDefinition } from "../../lib/tools/tool-types";

const trustCards = [
  {
    title: "Start with an estimate",
    description:
      "Use the result as a planning estimate, not a final quote. Small input changes can meaningfully change the outcome.",
  },
  {
    title: "Compare scenarios",
    description:
      "Adjust one input at a time so you can clearly see which factor has the biggest effect on the result.",
  },
  {
    title: "Review assumptions",
    description:
      "Read the assumptions and methodology sections so you understand what the calculator includes, excludes, and simplifies.",
  },
  {
    title: "Check real-world costs",
    description:
      "Actual rates, fees, taxes, insurance, lender rules, and timing can vary. Confirm important numbers with a qualified professional.",
  },
];

export function ToolTrustPanel({ tool }: { tool: ToolDefinition }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6">
      <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
        How to trust this result
      </p>

      <div className="mt-4 max-w-3xl">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-50">
          Use this calculator as a decision guide, not a final quote.
        </h2>

        <p className="mt-3 text-sm leading-7 text-stone-300">
          Toolorb calculators are built to make the inputs, formula logic,
          assumptions, and tradeoffs easier to understand before you make a
          real-world decision.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {trustCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
          >
            <h3 className="text-lg font-semibold text-stone-50">
              {card.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-stone-300">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-amber-200/10 bg-amber-100/5 p-5">
          <h3 className="text-base font-semibold text-stone-100">
            Methodology matters
          </h3>

          <p className="mt-3 text-sm leading-6 text-stone-300">
            Each Toolorb calculator should show the major assumptions behind its
            result. When a calculator uses estimates, simplified rules, or
            common planning defaults, those limits should be explained on the
            page.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5">
          <h3 className="text-base font-semibold text-stone-100">
            Educational use only
          </h3>

          <p className="mt-3 text-sm leading-6 text-stone-300">
            Toolorb does not provide financial, legal, tax, lending, or
            investment advice. Confirm important decisions with a qualified
            professional.
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-stone-800 bg-stone-950/70 p-5">
        <p className="text-sm leading-6 text-stone-400">
          <span className="font-semibold text-stone-100">Last updated:</span>{" "}
          {tool.meta.lastUpdated}. This page is maintained to improve clarity,
          accuracy, and usefulness over time.
        </p>
      </div>
    </section>
  );
}