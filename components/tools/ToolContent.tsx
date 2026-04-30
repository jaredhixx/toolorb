import Link from "next/link";
import type { ToolDefinition } from "../../lib/tools/tool-types";

export function ToolContent({ tool }: { tool: ToolDefinition }) {
  const resultGuidance = tool.content.resultGuidance;
  const commonMistakes = tool.content.commonMistakes;
  const definitions = tool.content.definitions;
  const methodology = tool.content.methodology;
  const formula = tool.content.formula;
  const examples = tool.content.examples;
  const comparison = tool.content.comparison;
  const assumptions = tool.content.assumptions;
  const steps = tool.content.steps;

  const hasResultGuidance =
    (resultGuidance?.goodResults?.length ?? 0) > 0 ||
    (resultGuidance?.cautionResults?.length ?? 0) > 0 ||
    (resultGuidance?.improvementTips?.length ?? 0) > 0;

  const hasCommonMistakes = (commonMistakes?.items.length ?? 0) > 0;

  const hasDefinitions = (definitions?.items.length ?? 0) > 0;

  const hasMethodology = (methodology?.items.length ?? 0) > 0;

  const hasExamples = (examples?.items.length ?? 0) > 0;

  const hasComparison = (comparison?.rows.length ?? 0) > 0;

  const hasAssumptions = (assumptions?.items.length ?? 0) > 0;

  const hasSteps = (steps?.items.length ?? 0) > 0;

  return (
    <section className="mt-12 grid gap-6">
      <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
        <h2 className="text-2xl font-semibold text-stone-50">
          {tool.content.overview.title}
        </h2>

        <p className="mt-4 text-base leading-8 text-stone-300">
          {tool.content.overview.body}
        </p>
      </article>

      <article className="rounded-[2rem] border border-amber-200/10 bg-amber-100/5 p-6">
        <h2 className="text-2xl font-semibold text-stone-50">
          {tool.content.keyTakeaways.title}
        </h2>

        <ul className="mt-5 grid gap-3 text-base leading-7 text-stone-300">
          {tool.content.keyTakeaways.items.map((takeaway) => (
            <li key={takeaway}>• {takeaway}</li>
          ))}
        </ul>
      </article>

      {hasResultGuidance && resultGuidance && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {resultGuidance.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-stone-300">
            {resultGuidance.description}
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {resultGuidance.goodResults &&
              resultGuidance.goodResults.length > 0 && (
                <div className="rounded-2xl border border-green-400/20 bg-green-400/5 p-5">
                  <h3 className="text-base font-semibold text-green-200">
                    Strong result signals
                  </h3>

                  <div className="mt-4 grid gap-4">
                    {resultGuidance.goodResults.map((item) => (
                      <div key={item.title}>
                        <p className="text-sm font-semibold text-stone-100">
                          {item.title}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-stone-400">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {resultGuidance.cautionResults &&
              resultGuidance.cautionResults.length > 0 && (
                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
                  <h3 className="text-base font-semibold text-amber-200">
                    When to be careful
                  </h3>

                  <div className="mt-4 grid gap-4">
                    {resultGuidance.cautionResults.map((item) => (
                      <div key={item.title}>
                        <p className="text-sm font-semibold text-stone-100">
                          {item.title}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-stone-400">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {resultGuidance.improvementTips &&
              resultGuidance.improvementTips.length > 0 && (
                <div className="rounded-2xl border border-stone-700 bg-stone-900/60 p-5">
                  <h3 className="text-base font-semibold text-amber-200">
                    How to improve this result
                  </h3>

                  <div className="mt-4 grid gap-4">
                    {resultGuidance.improvementTips.map((item) => (
                      <div key={item.title}>
                        <p className="text-sm font-semibold text-stone-100">
                          {item.title}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-stone-400">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </article>
      )}

      {formula && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {formula.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-stone-300">
            {formula.body}
          </p>
        </article>
      )}

      {hasExamples && examples && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {examples.title}
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {examples.items.map((example) => (
              <div
                key={example.title}
                className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
              >
                <h3 className="text-lg font-semibold text-stone-50">
                  {example.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </article>
      )}

      {hasComparison && comparison && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {comparison.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-stone-300">
            {comparison.description}
          </p>

          <div className="mt-6 grid gap-3">
            {comparison.rows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 rounded-2xl border border-stone-800 bg-stone-900/60 p-5 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <h3 className="text-base font-semibold text-stone-50">
                    {row.label}
                  </h3>

                  {row.helperText && (
                    <p className="mt-2 text-sm leading-6 text-stone-400">
                      {row.helperText}
                    </p>
                  )}
                </div>

                <p className="text-sm font-semibold text-amber-300">
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </article>
      )}

      {hasCommonMistakes && commonMistakes && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {commonMistakes.title}
          </h2>

          {commonMistakes.description && (
            <p className="mt-4 text-base leading-8 text-stone-300">
              {commonMistakes.description}
            </p>
          )}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {commonMistakes.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
              >
                <h3 className="text-base font-semibold text-stone-50">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-stone-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </article>
      )}

      {hasDefinitions && definitions && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {definitions.title}
          </h2>

          {definitions.description && (
            <p className="mt-4 text-base leading-8 text-stone-300">
              {definitions.description}
            </p>
          )}

          <div className="mt-6 grid gap-3">
            {definitions.items.map((item) => (
              <div
                key={item.term}
                className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
              >
                <h3 className="text-base font-semibold text-stone-50">
                  {item.term}
                </h3>

                <p className="mt-2 text-sm leading-6 text-stone-300">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </article>
      )}

      {hasAssumptions && assumptions && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {assumptions.title}
          </h2>

          <ul className="mt-4 grid gap-3 text-base leading-7 text-stone-300">
            {assumptions.items.map((assumption) => (
              <li key={assumption}>• {assumption}</li>
            ))}
          </ul>
        </article>
      )}

      {hasMethodology && methodology && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {methodology.title}
          </h2>

          <ul className="mt-4 grid gap-3 text-base leading-7 text-stone-300">
            {methodology.items.map((methodologyItem) => (
              <li key={methodologyItem}>• {methodologyItem}</li>
            ))}
          </ul>
        </article>
      )}

      {hasSteps && steps && (
        <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
          <h2 className="text-2xl font-semibold text-stone-50">
            {steps.title}
          </h2>

          <ol className="mt-4 grid gap-3 text-base leading-7 text-stone-300">
            {steps.items.map((step, index) => (
              <li key={step}>
                <span className="text-amber-300">{index + 1}.</span> {step}
              </li>
            ))}
          </ol>
        </article>
      )}

      {tool.content.relatedDecision && (
        <article className="rounded-[2rem] border border-amber-200/10 bg-amber-100/5 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-amber-300">
            {tool.content.relatedDecision.eyebrow}
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-stone-50">
            {tool.content.relatedDecision.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-stone-300">
            {tool.content.relatedDecision.description}
          </p>

          {tool.content.relatedDecision.href &&
            tool.content.relatedDecision.linkLabel && (
              <Link
                href={tool.content.relatedDecision.href}
                className="mt-5 inline-flex rounded-full border border-amber-300/30 bg-amber-300 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-200"
              >
                {tool.content.relatedDecision.linkLabel}
              </Link>
            )}
        </article>
      )}

      <article className="rounded-[2rem] border border-stone-800 bg-stone-950/60 p-6">
        <h2 className="text-2xl font-semibold text-stone-50">
          {tool.content.faqs.title}
        </h2>

        <div className="mt-5 grid gap-4">
          {tool.content.faqs.items.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5"
            >
              <h3 className="text-lg font-semibold text-stone-50">
                {faq.question}
              </h3>

              <p className="mt-3 text-sm leading-6 text-stone-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}