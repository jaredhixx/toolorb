/**
 * RUNTIME TOOL MANIFEST
 *
 * Add every new tool's runtime-only definition here.
 *
 * This manifest is allowed to feed client calculator behavior.
 * Do NOT import full SEO/content calculator definitions here.
 *
 * New tool checklist:
 * 1. Add the new slug to tool-slugs.ts.
 * 2. Import {toolName}Runtime from its runtime-only cluster file.
 * 3. Add "{tool-slug}": {toolName}Runtime to toolRuntimeManifest.
 * 4. Add the matching full content/SEO entry to tool-definition-manifest.ts.
 * 5. Keep this file runtime-only to protect client bundle size.
 */

import { compoundInterestRuntime } from "./clusters/compound-interest/compound-interest-runtime";
import { autoLoanRuntime } from "./clusters/auto-loan/auto-loan-runtime";
import { loanRuntime } from "./clusters/loan/loan-runtime";
import { mortgageRuntime } from "./clusters/mortgage/mortgage-runtime";
import type { ToolSlug } from "./tool-slugs";
import type { RuntimeToolDefinition } from "./tool-runtime-types";
import { carAffordabilityRuntime } from "./clusters/car-affordability/car-affordability-runtime";

export const toolRuntimeManifest = {
  "auto-loan-calculator": autoLoanRuntime,
  "car-affordability-calculator": carAffordabilityRuntime,
  "compound-interest-calculator": compoundInterestRuntime,
  "loan-calculator": loanRuntime,
  "mortgage-calculator": mortgageRuntime,
} as const satisfies Record<ToolSlug, RuntimeToolDefinition>;