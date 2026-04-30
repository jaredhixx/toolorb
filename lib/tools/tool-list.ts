import { toolDefinitionManifest } from "./tool-definition-manifest";
import { toolSlugs } from "./tool-slugs";
import type { ToolDefinition } from "./tool-types";

const toolDefinitionsBySlug = toolDefinitionManifest satisfies Record<
  string,
  ToolDefinition
>;

const tools = toolSlugs.map((slug) => {
  const tool = toolDefinitionsBySlug[slug];

  if (!tool) {
    throw new Error(`[Tool List] Missing tool definition for slug: ${slug}`);
  }

  if (tool.slug !== slug) {
    throw new Error(
      `[Tool List] Tool registry key "${slug}" does not match tool slug "${tool.slug}".`,
    );
  }

  return tool;
});

function assertUniqueToolSlugs(tools: readonly ToolDefinition[]): void {
  const seenSlugs = new Set<string>();

  for (const tool of tools) {
    if (seenSlugs.has(tool.slug)) {
      throw new Error(`[Tool List] Duplicate tool slug detected: ${tool.slug}`);
    }

    seenSlugs.add(tool.slug);
  }
}

assertUniqueToolSlugs(tools);

export const toolList = tools;