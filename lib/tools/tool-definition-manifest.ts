/**
 * FULL TOOL DEFINITION MANIFEST
 *
 * Add every new tool's full SEO/content definition here.
 *
 * This manifest is for server/content/SEO usage.
 * Do NOT import this manifest into client calculator components.
 *
 * New tool checklist:
 * 1. Add the new slug to tool-slugs.ts.
 * 2. Import {toolName}Calculator from its cluster.
 * 3. Add "{tool-slug}": {toolName}Calculator to toolDefinitionManifest.
 * 4. Add the matching runtime entry to tool-runtime-manifest.ts.
 * 5. Add reciprocal relatedToolSlugs when tools relate to each other.
 */

import { compoundInterestCalculator } from "./clusters/compound-interest/compound-interest-calculator";
import { loanCalculator } from "./clusters/loan/loan-calculator";
import { mortgageCalculator } from "./clusters/mortgage/mortgage-calculator";
import type { ToolSlug } from "./tool-slugs";
import type { ToolDefinition } from "./tool-types";
import { autoLoanCalculator } from "./clusters/auto-loan/auto-loan-calculator";
import { carAffordabilityCalculator } from "./clusters/car-affordability/car-affordability-calculator";

export const toolDefinitionManifest = {
  "auto-loan-calculator": autoLoanCalculator,
  "car-affordability-calculator": carAffordabilityCalculator,
  "compound-interest-calculator": compoundInterestCalculator,
  "loan-calculator": loanCalculator,
  "mortgage-calculator": mortgageCalculator,
} as const satisfies Record<ToolSlug, ToolDefinition>;