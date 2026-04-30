import { toolRuntimeManifest } from "./tool-runtime-manifest";
import type { RuntimeToolDefinition } from "./tool-runtime-types";

const runtimeToolDefinitionsBySlugRecord =
  toolRuntimeManifest satisfies Record<string, RuntimeToolDefinition>;

export const runtimeToolDefinitions = Object.entries(
  runtimeToolDefinitionsBySlugRecord,
).map(([slug, tool]) => {
  if (tool.slug !== slug) {
    throw new Error(
      `[Tool Runtime Registry] Runtime registry key "${slug}" does not match runtime tool slug "${tool.slug}".`,
    );
  }

  return tool;
});

function assertUniqueRuntimeToolSlugs(
  tools: readonly RuntimeToolDefinition[],
): void {
  const seenSlugs = new Set<string>();

  for (const tool of tools) {
    if (seenSlugs.has(tool.slug)) {
      throw new Error(
        `[Tool Runtime Registry] Duplicate runtime tool slug found: ${tool.slug}`,
      );
    }

    seenSlugs.add(tool.slug);
  }
}

assertUniqueRuntimeToolSlugs(runtimeToolDefinitions);

export const runtimeToolDefinitionSlugs = new Set(
  runtimeToolDefinitions.map((tool) => tool.slug),
);

const runtimeToolDefinitionsBySlug = new Map(
  runtimeToolDefinitions.map((tool) => [tool.slug, tool]),
);

export function getRuntimeToolDefinitionBySlug(
  slug: string,
): RuntimeToolDefinition {
  const tool = runtimeToolDefinitionsBySlug.get(slug);

  if (!tool) {
    throw new Error(
      `[Tool Runtime Registry] Missing runtime tool definition for slug: ${slug}`,
    );
  }

  return tool;
}