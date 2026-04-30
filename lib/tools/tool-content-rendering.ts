import type {
  ToolContentRenderRule,
  ToolContentTokenValue,
  ToolContentTokens,
  ToolDefinition,
} from "./tool-types";

const unresolvedTokenPattern = /\{([a-zA-Z0-9_]+)\}/g;
const tokenNamePattern = /^[a-zA-Z0-9_]+$/;

function stringifyTokenValue(value: ToolContentTokenValue): string {
  return String(value);
}

function assertValidTokenName(
  tool: ToolDefinition,
  label: string,
  tokenName: string,
): void {
  if (!tokenName.trim()) {
    throw new Error(`${tool.slug} has an empty ${label}.`);
  }

  if (!tokenNamePattern.test(tokenName)) {
    throw new Error(
      `${tool.slug} has invalid ${label}: ${tokenName}. Token names may only use letters, numbers, and underscores.`,
    );
  }
}

function assertContentTokenContract(tool: ToolDefinition): void {
  const tokens = tool.contentTokens ?? {};
  const rules = tool.contentRenderRules ?? [];

  for (const tokenName of Object.keys(tokens)) {
    assertValidTokenName(tool, "content token name", tokenName);
  }

  for (const rule of rules) {
    assertValidTokenName(tool, "render rule whenToken", rule.whenToken);
    assertValidTokenName(tool, "render rule replaceToken", rule.replaceToken);

    if (!(rule.whenToken in tokens)) {
      throw new Error(
        `${tool.slug} has content render rule for unknown whenToken: ${rule.whenToken}.`,
      );
    }

    if (tokens[rule.whenToken] !== rule.equals) {
      continue;
    }

    if (!rule.withValue.trim()) {
      throw new Error(
        `${tool.slug} has an active content render rule with an empty withValue for token: ${rule.replaceToken}.`,
      );
    }
  }
}

function assertNoUnresolvedTokens(tool: ToolDefinition): void {
  const searchableContent = JSON.stringify({
    description: tool.description,
    seo: tool.seo,
    content: tool.content,
  });

  const unresolvedTokens = Array.from(
    searchableContent.matchAll(unresolvedTokenPattern),
    (match) => match[0],
  );

  if (unresolvedTokens.length > 0) {
    throw new Error(
      `${tool.slug} has unresolved content tokens: ${[
        ...new Set(unresolvedTokens),
      ].join(", ")}`,
    );
  }
}

function applyTokenRules(
  text: string,
  tokens: ToolContentTokens,
  rules: ToolContentRenderRule[],
): string {
  let renderedText = text;

  for (const rule of rules) {
    if (tokens[rule.whenToken] === rule.equals) {
      renderedText = renderedText.replaceAll(
        `{${rule.replaceToken}}`,
        rule.withValue,
      );
    }
  }

  return renderedText;
}

function renderTemplateText(
  text: string,
  tokens: ToolContentTokens,
  rules: ToolContentRenderRule[],
): string {
  const textAfterRules = applyTokenRules(text, tokens, rules);

  return textAfterRules.replace(unresolvedTokenPattern, (match, tokenName) => {
    const tokenValue = tokens[tokenName];

    if (tokenValue === undefined) {
      return match;
    }

    return stringifyTokenValue(tokenValue);
  });
}

function renderTemplateValue<T>(
  value: T,
  tokens: ToolContentTokens,
  rules: ToolContentRenderRule[],
): T {
  if (typeof value === "string") {
    return renderTemplateText(value, tokens, rules) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      renderTemplateValue(item, tokens, rules),
    ) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        renderTemplateValue(item, tokens, rules),
      ]),
    ) as T;
  }

  return value;
}

export function renderToolDefinitionContent(
  tool: ToolDefinition,
): ToolDefinition {
  assertContentTokenContract(tool);

  const tokens = tool.contentTokens ?? {};
  const rules = tool.contentRenderRules ?? [];

  const renderedTool = {
    ...tool,
    description: renderTemplateValue(tool.description, tokens, rules),
    seo: renderTemplateValue(tool.seo, tokens, rules),
    content: renderTemplateValue(tool.content, tokens, rules),
  };

  assertNoUnresolvedTokens(renderedTool);

  return renderedTool;
}