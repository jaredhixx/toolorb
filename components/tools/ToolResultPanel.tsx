"use client";

import Link from "next/link";
import { useState } from "react";
import type {
  NormalizedToolCalculationResult,
  ToolResultValue,
  ToolValueFormat,
} from "../../lib/tools/tool-types";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "../../lib/tools/tool-formatters";
import ToolChart from "./ToolChart";

type ToolResultPanelProps = {
  result: NormalizedToolCalculationResult;
};

function formatResultValue(
  value: ToolResultValue,
  valueFormat?: ToolValueFormat,
): string {
  if (typeof value === "object") {
    return `${formatResultValue(
      value.value,
      value.valueFormat ?? valueFormat,
    )}${value.suffix ?? ""}`;
  }

  if (typeof value === "string") {
    return value;
  }

  if (valueFormat === "currency") {
    return formatCurrency(value);
  }

  if (valueFormat === "percent") {
    return formatPercent(value);
  }

  if (valueFormat === "number") {
    return formatNumber(value);
  }

  return String(value);
}

export function ToolResultPanel({ result }: ToolResultPanelProps) {
  const [isTableOpen, setIsTableOpen] = useState(false);

  return (
    <section className="rounded-[1.75rem] border border-stone-800 bg-stone-950/80 p-5 shadow-xl shadow-black/20 lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
      <div>
        <p className="text-sm font-medium text-stone-400">
          {result.primaryLabel}
        </p>

        <p className="mt-2 text-4xl font-semibold tracking-tight text-stone-50">
          {formatResultValue(result.primaryValue, result.primaryValueFormat)}
        </p>

        <p className="mt-3 text-sm leading-6 text-stone-400">
          {result.primaryHelperText}
        </p>
      </div>

      {result.summaryCards.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {result.summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-stone-800 bg-stone-900/45 p-4"
            >
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                {card.label}
              </p>

              <p className="mt-2 text-lg font-semibold text-stone-100">
                {formatResultValue(card.value, card.valueFormat)}
              </p>

              {card.helperText && (
                <p className="mt-2 text-sm leading-5 text-stone-400">
                  {card.helperText}
                </p>
              )}

              {card.href && card.linkLabel && (
                <Link
                  href={card.href}
                  className="mt-3 inline-block text-xs font-medium text-amber-300 transition-colors hover:text-amber-200"
                >
                  {card.linkLabel}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}

      {result.rows.length > 0 && (
        <div className="mt-6 space-y-3">
          {result.rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 border-b border-stone-800/80 pb-3 last:border-b-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium text-stone-300">
                  {row.label}
                </p>

                {row.helperText && (
                  <p className="mt-1 text-xs leading-5 text-stone-500">
                    {row.helperText}
                  </p>
                )}

                {row.href && row.linkLabel && (
                  <Link
                    href={row.href}
                    className="mt-2 inline-block text-xs font-medium text-amber-300 transition-colors hover:text-amber-200"
                  >
                    {row.linkLabel}
                  </Link>
                )}
              </div>

              <p className="shrink-0 text-right text-sm font-semibold text-stone-100">
                {formatResultValue(row.value, row.valueFormat)}
              </p>
            </div>
          ))}
        </div>
      )}

      {result.resultGuidance && result.resultGuidance.items.length > 0 && (
        <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-900/35 p-4">
          <p className="text-sm font-semibold text-stone-100">
            {result.resultGuidance.title}
          </p>

          {result.resultGuidance.description && (
            <p className="mt-2 text-sm leading-6 text-stone-400">
              {result.resultGuidance.description}
            </p>
          )}

          <div className="mt-4 space-y-3">
            {result.resultGuidance.items.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-stone-800/80 bg-stone-950/45 p-4"
              >
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

      {result.decisionSummary.items.length > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-400/15 bg-amber-400/5 p-4">
          <p className="text-sm font-semibold text-stone-100">
            {result.decisionSummary.title}
          </p>

          <p className="mt-2 text-sm leading-6 text-stone-400">
            {result.decisionSummary.description}
          </p>

          <div className="mt-4 space-y-3">
            {result.decisionSummary.items.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-stone-300">{item.label}</p>
                  <p className="text-sm font-semibold text-amber-200">
                    {formatResultValue(item.value, item.valueFormat)}
                  </p>
                </div>

{item.helperText && (
  <p className="mt-1 text-xs leading-5 text-stone-500">
    {item.helperText}
  </p>
)}

                {item.href && item.linkLabel && (
                  <Link
                    href={item.href}
                    className="mt-2 inline-block text-xs font-medium text-amber-300 transition-colors hover:text-amber-200"
                  >
                    {item.linkLabel}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {result.ratioBreakdown && (
        <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-900/35 p-4">
          <p className="text-sm font-semibold text-stone-100">
            {result.ratioBreakdown.title}
          </p>

          <div className="mt-4 space-y-4">
            {result.ratioBreakdown.items.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-stone-300">{item.label}</span>
                  <span className="font-semibold text-stone-100">
                    {formatResultValue(
                      item.value,
                      item.valueFormat ?? "percent",
                    )}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-stone-800">
                  <div
                    className={`h-full rounded-full ${
                      index % 2 === 0 ? "bg-amber-300/80" : "bg-stone-500/80"
                    }`}
                    style={{
                      width: `${Math.round(item.value * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.chartData && <ToolChart data={result.chartData} />}

      {result.secondaryChartData && (
        <ToolChart data={result.secondaryChartData} />
      )}

      {result.scenarioComparison.rows.length > 0 && (
        <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-900/35 p-4">
          <p className="text-sm font-semibold text-stone-100">
            {result.scenarioComparison.title}
          </p>

          {result.scenarioComparison.description && (
            <p className="mt-2 text-sm leading-6 text-stone-400">
              {result.scenarioComparison.description}
            </p>
          )}

          <div className="mt-4 space-y-3">
            {result.scenarioComparison.rows.map((row) => (
              <div
                key={row.label}
                className="rounded-2xl border border-stone-800/80 bg-stone-950/45 p-4"
              >
                <p className="text-sm font-semibold text-stone-100">
                  {row.label}
                </p>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {row.values.map((value, index) => (
                    <div key={`${row.label}-${index}`}>
                      <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
                        {result.scenarioComparison.headers[index] ??
                          `Value ${index + 1}`}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-stone-200">
                        {formatResultValue(value)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.tableSection && (
        <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-900/35 p-4">
          <button
            type="button"
            onClick={() => setIsTableOpen((currentValue) => !currentValue)}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <div>
              <p className="text-sm font-semibold text-stone-100">
                {result.tableSection.title}
              </p>

              {result.tableSection.description && (
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {result.tableSection.description}
                </p>
              )}
            </div>

            <span className="shrink-0 rounded-full border border-stone-700 px-3 py-1 text-xs font-medium text-stone-300">
              {isTableOpen ? "Hide" : "Show"}
            </span>
          </button>

          {isTableOpen && (
            <div className="mt-4 space-y-3">
              {result.tableSection.rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="rounded-2xl border border-stone-800/80 bg-stone-950/45 p-4"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    {row.cells.map((cell, cellIndex) => (
                      <div key={`${rowIndex}-${cellIndex}`}>
                        <p className="text-xs font-medium uppercase tracking-[0.14em] text-stone-500">
                          {result.tableSection?.columns[cellIndex] ??
                            `Column ${cellIndex + 1}`}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-stone-200">
                          {formatResultValue(cell)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}