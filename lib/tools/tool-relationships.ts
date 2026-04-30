import { toolDefinitions } from "./tool-registry";
import type { ToolDefinition } from "./tool-types";

const MAX_RELATED_TOOLS = 3;

const RELATIONSHIP_SCORE = {
  manual: 100,
  cluster: 50,
  category: 25,
  sharedIntentWord: 10,
} as const;

type RelatedToolCandidate = {
  tool: ToolDefinition;
  score: number;
};

function tokenizeText(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((word) => word.trim())
    .filter((word) => word.length >= 4);
}

function getIntentWords(tool: ToolDefinition): Set<string> {
  return new Set([
    ...tokenizeText(tool.name),
    ...tokenizeText(tool.seo.title),
    ...tokenizeText(tool.seo.description),
  ]);
}

function getSharedIntentWordCount(
  sourceTool: ToolDefinition,
  candidateTool: ToolDefinition,
): number {
  const sourceIntentWords = getIntentWords(sourceTool);
  const candidateIntentWords = getIntentWords(candidateTool);

  let sharedIntentWordCount = 0;

  sourceIntentWords.forEach((word) => {
    if (candidateIntentWords.has(word)) {
      sharedIntentWordCount += 1;
    }
  });

  return sharedIntentWordCount;
}

function getManualRelationshipScore(
  sourceTool: ToolDefinition,
  candidateTool: ToolDefinition,
): number {
  if (sourceTool.meta.relatedToolSlugs.includes(candidateTool.slug)) {
    return RELATIONSHIP_SCORE.manual;
  }

  return 0;
}

function getClusterRelationshipScore(
  sourceTool: ToolDefinition,
  candidateTool: ToolDefinition,
): number {
  if (sourceTool.meta.cluster === candidateTool.meta.cluster) {
    return RELATIONSHIP_SCORE.cluster;
  }

  return 0;
}

function getCategoryRelationshipScore(
  sourceTool: ToolDefinition,
  candidateTool: ToolDefinition,
): number {
  if (sourceTool.meta.category === candidateTool.meta.category) {
    return RELATIONSHIP_SCORE.category;
  }

  return 0;
}

function getIntentRelationshipScore(
  sourceTool: ToolDefinition,
  candidateTool: ToolDefinition,
): number {
  return (
    getSharedIntentWordCount(sourceTool, candidateTool) *
    RELATIONSHIP_SCORE.sharedIntentWord
  );
}

function getRelatedToolScore(
  sourceTool: ToolDefinition,
  candidateTool: ToolDefinition,
): number {
  return (
    getManualRelationshipScore(sourceTool, candidateTool) +
    getClusterRelationshipScore(sourceTool, candidateTool) +
    getCategoryRelationshipScore(sourceTool, candidateTool) +
    getIntentRelationshipScore(sourceTool, candidateTool)
  );
}

function getRelatedToolCandidates(
  tool: ToolDefinition,
): RelatedToolCandidate[] {
  return toolDefinitions
    .filter((candidateTool) => candidateTool.slug !== tool.slug)
    .map((candidateTool) => ({
      tool: candidateTool,
      score: getRelatedToolScore(tool, candidateTool),
    }))
    .filter((candidate) => candidate.score > 0)
    .sort((firstCandidate, secondCandidate) => {
      if (secondCandidate.score !== firstCandidate.score) {
        return secondCandidate.score - firstCandidate.score;
      }

      return firstCandidate.tool.name.localeCompare(secondCandidate.tool.name);
    });
}

export function getRelatedTools(tool: ToolDefinition): ToolDefinition[] {
  return getRelatedToolCandidates(tool)
    .slice(0, MAX_RELATED_TOOLS)
    .map((candidate) => candidate.tool);
}