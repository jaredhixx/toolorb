import type {
  ToolCalculationResult,
  ToolField,
  ToolFormValues,
} from "./tool-types";

export type RuntimeToolDefinition = {
  slug: string;
  fields: ToolField[];
  declaredInternalLinks?: readonly string[];
  calculate: (values: ToolFormValues) => ToolCalculationResult;
};