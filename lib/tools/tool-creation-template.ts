/**
 * TOOL CREATION TEMPLATE (DO NOT IMPORT IN APP)
 *
 * Purpose:
 * This file defines the exact pattern for creating new tools in Toolorb.
 *
 * Every new tool MUST follow this structure.
 *
 * Files required for each tool:
 *
 * 1. lib/tools/clusters/{tool}/
 *    - {tool}-formulas.ts
 *    - {tool}-runtime.ts
 *    - {tool}-calculator.ts
 *
 * 2. Register in:
 *    - tool-definition-manifest.ts
 *    - tool-runtime-manifest.ts
 *
 * 3. Add reciprocal relatedToolSlugs
 *
 * 4. Add declaredInternalLinks if runtime creates conditional links
 *
 * ------------------------------------------------------------
 *
 * RUNTIME CONTRACT (VERY IMPORTANT)
 *
 * calculate(values) MUST return:
 *
 * - primaryLabel
 * - primaryValue
 * - primaryHelperText
 * - decisionSummary
 * - scenarioComparison
 * - resultGuidance
 * - rows
 *
 * Missing ANY of these will break build.
 *
 * ------------------------------------------------------------
 *
 * CONTENT CONTRACT (VERY IMPORTANT)
 *
 * Required:
 *
 * - overview.body must be >= 80 words
 * - SEO description must be 120–170 characters
 *
 * ------------------------------------------------------------
 *
 * COMMON MISTAKES
 *
 * - Forgetting to register runtime in tool-runtime-manifest
 * - Forgetting reciprocal relatedToolSlugs
 * - Returning incorrect runtime shape
 * - Missing SEO/content requirements
 *
 * ------------------------------------------------------------
 *
 * GOAL
 *
 * This template ensures:
 * - fast tool creation
 * - zero regression risk
 * - consistent SEO + UX quality
 *
 */