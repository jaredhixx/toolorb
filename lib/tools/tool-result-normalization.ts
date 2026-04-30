import type {
  NormalizedToolCalculationResult,
  NormalizedToolDecisionSummary,
  NormalizedToolResultGuidance,
  NormalizedToolScenarioComparison,
  ToolCalculationResult,
  ToolChartData,
  ToolDecisionSummary,
  ToolDisplayValue,
  ToolResultGuidance,
  ToolResultValue,
  ToolScenarioComparison,
} from "./tool-types";

function isInvalidDisplayValue(
  value: ToolDisplayValue | undefined | null,
): boolean {
  if (typeof value === "number") {
    return !Number.isFinite(value);
  }

  if (typeof value !== "string") {
    return true;
  }

  const normalizedValue = value.trim().toLowerCase();

  return (
    normalizedValue === "" ||
    normalizedValue.includes("nan") ||
    normalizedValue.includes("infinity")
  );
}

function normalizeDisplayValue(
  value: ToolDisplayValue | undefined | null,
): ToolDisplayValue {
  if (isInvalidDisplayValue(value)) {
    return "Not available";
  }

  return value as ToolDisplayValue;
}

function isStructuredDisplayValue(
  value: ToolResultValue | undefined | null,
): value is Exclude<ToolResultValue, ToolDisplayValue> {
  return typeof value === "object" && value !== null && "value" in value;
}

function normalizeResultValue(
  value: ToolResultValue | undefined | null,
): ToolResultValue {
  if (isStructuredDisplayValue(value)) {
    return {
      ...value,
      value: normalizeDisplayValue(value.value),
    };
  }

  return normalizeDisplayValue(value);
}

function normalizeNumberValue(value: number | undefined | null): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 0;
  }

  return value;
}

function normalizeChartData(
  chartData: ToolChartData | undefined,
): ToolChartData | null {
  if (!chartData) {
    return null;
  }

  return {
    ...chartData,
    items:
      chartData.items?.map((item) => ({
        ...item,
        value: normalizeNumberValue(item.value),
      })) ?? undefined,
    series:
      chartData.series?.map((series) => ({
        ...series,
        points: series.points.map((point) => ({
          ...point,
          value: normalizeNumberValue(point.value),
        })),
      })) ?? undefined,
  };
}

function normalizeDecisionSummary(
  decisionSummary: ToolDecisionSummary | undefined,
): NormalizedToolDecisionSummary {
  if (!decisionSummary) {
    return {
      title: "Decision summary",
      description: "Not available",
      items: [],
    };
  }

  return {
    ...decisionSummary,
    title: normalizeDisplayValue(decisionSummary.title) as string,
    description: normalizeDisplayValue(
      decisionSummary.description,
    ) as string,
    items:
      decisionSummary.items?.map((item) => ({
        ...item,
        label: normalizeDisplayValue(item.label) as string,
        value: normalizeResultValue(item.value),
        helperText: item.helperText
          ? (normalizeDisplayValue(item.helperText) as string)
          : item.helperText,
        href: item.href,
        linkLabel: item.linkLabel,
      })) ?? [],
  };
}

function normalizeResultGuidance(
  resultGuidance: ToolResultGuidance | undefined,
): NormalizedToolResultGuidance | null {
  if (!resultGuidance) {
    return null;
  }

  return {
    ...resultGuidance,
    title: normalizeDisplayValue(resultGuidance.title) as string,
    description: resultGuidance.description
      ? (normalizeDisplayValue(resultGuidance.description) as string)
      : resultGuidance.description,
    items: resultGuidance.items.map((item) => ({
      ...item,
      title: normalizeDisplayValue(item.title) as string,
      description: normalizeDisplayValue(item.description) as string,
    })),
  };
}

function normalizeScenarioComparison(
  scenarioComparison: ToolScenarioComparison | undefined,
): NormalizedToolScenarioComparison {
  if (!scenarioComparison) {
    return {
      title: "Scenario comparison",
      description: "Not available",
      headers: [],
      rows: [],
    };
  }

  const normalizedRows = scenarioComparison.rows.map((row) => ({
    ...row,
    label: normalizeDisplayValue(row.label) as string,
    values: row.values.map((value) => normalizeResultValue(value)),
  }));

  const rawHeaders =
    scenarioComparison.headers ?? scenarioComparison.columns ?? [];

  const largestValueCount = Math.max(
    0,
    ...normalizedRows.map((row) => row.values.length),
  );

  const headers =
    rawHeaders.length === largestValueCount + 1
      ? rawHeaders.slice(1)
      : rawHeaders;

  return {
    ...scenarioComparison,
    title: normalizeDisplayValue(scenarioComparison.title) as string,
    description: scenarioComparison.description
      ? (normalizeDisplayValue(scenarioComparison.description) as string)
      : scenarioComparison.description,
    headers: headers.map((header) => normalizeDisplayValue(header) as string),
    rows: normalizedRows,
  };
}

export function normalizeToolCalculationResult(
  result: ToolCalculationResult,
): NormalizedToolCalculationResult {
  return {
    ...result,
    primaryLabel: normalizeDisplayValue(result.primaryLabel) as string,
    primaryValue: normalizeResultValue(result.primaryValue),
    primaryHelperText: normalizeDisplayValue(
      result.primaryHelperText,
    ) as string,

    rows: result.rows.map((row) => ({
      ...row,
      label: normalizeDisplayValue(row.label) as string,
      value: normalizeResultValue(row.value),
      helperText: row.helperText
        ? (normalizeDisplayValue(row.helperText) as string)
        : row.helperText,
    })),

    summaryCards:
      result.summaryCards?.map((card) => ({
        ...card,
        label: normalizeDisplayValue(card.label) as string,
        value: normalizeResultValue(card.value),
        helperText: card.helperText
          ? (normalizeDisplayValue(card.helperText) as string)
          : card.helperText,
      })) ?? [],

    decisionSummary: normalizeDecisionSummary(result.decisionSummary),

    scenarioComparison: normalizeScenarioComparison(
      result.scenarioComparison,
    ),

    resultGuidance: normalizeResultGuidance(result.resultGuidance),

    chartData: normalizeChartData(result.chartData),
    secondaryChartData: normalizeChartData(result.secondaryChartData),

    tableSection: result.tableSection
      ? {
          ...result.tableSection,
          title: normalizeDisplayValue(result.tableSection.title) as string,
          description: result.tableSection.description
            ? (normalizeDisplayValue(
                result.tableSection.description,
              ) as string)
            : result.tableSection.description,
          columns: result.tableSection.columns.map(
            (column) => normalizeDisplayValue(column) as string,
          ),
          rows: result.tableSection.rows.map((row) => ({
            ...row,
            cells: row.cells.map((cell) => normalizeResultValue(cell)),
          })),
        }
      : null,

    ratioBreakdown: result.ratioBreakdown
      ? {
          ...result.ratioBreakdown,
          title: normalizeDisplayValue(
            result.ratioBreakdown.title,
          ) as string,
          items: result.ratioBreakdown.items.map((item) => ({
            ...item,
            label: normalizeDisplayValue(item.label) as string,
            value: normalizeNumberValue(item.value),
          })),
        }
      : null,
  };
}