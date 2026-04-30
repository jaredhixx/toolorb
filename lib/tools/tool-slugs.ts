/**
 * CANONICAL TOOL SLUG LIST
 *
 * Add every live tool slug here exactly once.
 *
 * This file is intentionally tiny and safe to import from both the
 * server/content registry and the runtime/client registry because it contains
 * only strings and TypeScript types.
 */

export const toolSlugs = [
  "auto-loan-calculator",
  "car-affordability-calculator",
  "compound-interest-calculator",
  "loan-calculator",
  "mortgage-calculator",
] as const;

export type ToolSlug = (typeof toolSlugs)[number];