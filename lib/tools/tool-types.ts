import type { ToolContent } from "./tool-content-types";
import type { ToolMeta, ToolSeo } from "./tool-seo-types";

export type ToolFormValue = string | number | boolean;

export type ToolFormValues = Record<string, ToolFormValue>;

export type ToolFieldOption = {
  label: string;
  value: string;
};

export type ToolBaseField = {
  name: string;
  label: string;
  required?: boolean;
  helperText?: string;
};

export type ToolNumberField = ToolBaseField & {
  type: "number";
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  suffix?: string;
};

export type ToolSelectField = ToolBaseField & {
  type: "select";
  defaultValue: string;
  options: ToolFieldOption[];
};

export type ToolCheckboxField = ToolBaseField & {
  type: "checkbox";
  defaultValue: boolean;
};

export type ToolDateField = ToolBaseField & {
  type: "date";
  defaultValue: string;
  min?: string;
  max?: string;
};

export type ToolField =
  | ToolNumberField
  | ToolSelectField
  | ToolCheckboxField
  | ToolDateField;

export type ToolResultTone = "positive" | "warning" | "neutral" | "strong";

export type ToolValueFormat = "currency" | "percent" | "number" | "text";

export type ToolDisplayValue = string | number;

export type ToolStructuredDisplayValue = {
  value: ToolDisplayValue;
  valueFormat?: ToolValueFormat;
  suffix?: string;
};

export type ToolResultValue = ToolDisplayValue | ToolStructuredDisplayValue;

export type ToolResultItem = {
  label: string;
  value: ToolResultValue;
  valueFormat?: ToolValueFormat;
  helperText?: string;
  tone?: ToolResultTone;
  href?: string;
  linkLabel?: string;
};

export type ToolResultRow = ToolResultItem;

export type ToolSummaryCard = ToolResultItem;

export type ToolChartDatum = {
  label: string;
  value: number;
};

export type ToolChartData = {
  type: "bar" | "pie" | "line";
  title?: string;
  description?: string;
  valueFormat?: ToolValueFormat;
  centerLabel?: string;
  centerValue?: ToolResultValue;
  centerValueFormat?: ToolValueFormat;
  centerHelperText?: string;
  items?: ToolChartDatum[];
  series?: {
    label: string;
    points: ToolChartDatum[];
  }[];
};

export type ToolTableCell = ToolResultValue;

export type ToolTableRow = {
  cells: ToolTableCell[];
};

export type ToolTableSection = {
  title: string;
  description?: string;
  columns: string[];
  rows: ToolTableRow[];
};

export type ToolDecisionSummary = {
  title: string;
  description: string;
  items?: ToolResultRow[];
};

export type NormalizedToolDecisionSummary = {
  title: string;
  description: string;
  items: ToolResultRow[];
};

export type ToolScenarioComparison = {
  title: string;
  description?: string;
  headers?: string[];
  columns?: string[];
  rows: {
    label: string;
    values: ToolResultValue[];
  }[];
};

export type NormalizedToolScenarioComparison = {
  title: string;
  description?: string;
  headers: string[];
  rows: {
    label: string;
    values: ToolResultValue[];
  }[];
};

export type ToolResultGuidanceItem = {
  title: string;
  description: string;
};

export type ToolResultGuidance = {
  title: string;
  description?: string;
  items: ToolResultGuidanceItem[];
};

export type NormalizedToolResultGuidance = {
  title: string;
  description?: string;
  items: ToolResultGuidanceItem[];
};

export type ToolCalculationResult = {
  primaryLabel: string;
  primaryValue: ToolResultValue;
  primaryValueFormat?: ToolValueFormat;
  primaryHelperText: string;
  decisionSummary: ToolDecisionSummary;
  scenarioComparison: ToolScenarioComparison;
  resultGuidance?: ToolResultGuidance;
  rows: ToolResultRow[];
  summaryCards?: ToolSummaryCard[];
  chartData?: ToolChartData;
  secondaryChartData?: ToolChartData;
  tableSection?: ToolTableSection;
  ratioBreakdown?: {
    title: string;
    items: {
      label: string;
      value: number;
      valueFormat?: "percent";
    }[];
  };
};

export type NormalizedToolCalculationResult = Omit<
  ToolCalculationResult,
  | "summaryCards"
  | "chartData"
  | "secondaryChartData"
  | "tableSection"
  | "ratioBreakdown"
  | "decisionSummary"
  | "scenarioComparison"
  | "resultGuidance"
> & {
  summaryCards: ToolSummaryCard[];
  decisionSummary: NormalizedToolDecisionSummary;
  scenarioComparison: NormalizedToolScenarioComparison;
  resultGuidance: NormalizedToolResultGuidance | null;
  chartData: ToolChartData | null;
  secondaryChartData: ToolChartData | null;
  tableSection: ToolTableSection | null;
  ratioBreakdown: {
    title: string;
    items: {
      label: string;
      value: number;
      valueFormat?: "percent";
    }[];
  } | null;
};

export type ToolContentTokenValue = string | number | boolean;

export type ToolContentTokens = Record<string, ToolContentTokenValue>;

export type ToolContentRenderRule = {
  whenToken: string;
  equals: ToolContentTokenValue;
  replaceToken: string;
  withValue: string;
};

export type ToolDefinition = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  seo: ToolSeo;
  meta: ToolMeta;
  content: ToolContent;
  contentTokens?: ToolContentTokens;
  contentRenderRules?: ToolContentRenderRule[];
  fields: ToolField[];
  calculate: (values: ToolFormValues) => ToolCalculationResult;
};
