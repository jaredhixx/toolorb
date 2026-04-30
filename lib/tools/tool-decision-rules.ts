import type {
  ToolDecisionSummary,
  ToolResultItem,
  ToolResultTone,
  ToolResultValue,
  ToolValueFormat,
} from "./tool-types";

export type ToolDecisionRule = {
  max?: number;
  label: string;
  value: ToolResultValue;
  valueFormat?: ToolValueFormat;
  helperText?: string;
  tone: ToolResultTone;
  href?: string;
  linkLabel?: string;
};

export type ToolDecisionSummaryRule = ToolDecisionRule & {
  description?: string;
};

export type CreateDecisionSummaryInput = {
  title: string;
  input: number;
  rules: readonly ToolDecisionSummaryRule[];
  additionalItems?: readonly ToolResultItem[];
};

function assertValidDecisionRules(rules: readonly ToolDecisionRule[]): void {
  if (rules.length === 0) {
    throw new Error("Decision rules must include at least one rule.");
  }

  const fallbackRules = rules.filter((rule) => rule.max === undefined);

  if (fallbackRules.length !== 1) {
    throw new Error("Decision rules must include exactly one fallback rule.");
  }

  const fallbackRuleIndex = rules.findIndex((rule) => rule.max === undefined);

  if (fallbackRuleIndex !== rules.length - 1) {
    throw new Error("The fallback decision rule must be the final rule.");
  }

  let previousMax = Number.NEGATIVE_INFINITY;

  rules.forEach((rule, index) => {
    if (!rule.label.trim()) {
      throw new Error(`Decision rule ${index + 1} is missing a label.`);
    }

    if (typeof rule.value === "string" && !rule.value.trim()) {
      throw new Error(`Decision rule ${index + 1} is missing a value.`);
    }

    if (rule.helperText !== undefined && !rule.helperText.trim()) {
      throw new Error(`Decision rule ${index + 1} has an empty helperText.`);
    }

    if (rule.href !== undefined && !rule.href.trim()) {
      throw new Error(`Decision rule ${index + 1} has an empty href.`);
    }

    if (rule.linkLabel !== undefined && !rule.linkLabel.trim()) {
      throw new Error(`Decision rule ${index + 1} has an empty linkLabel.`);
    }

    if (
      (rule.href === undefined && rule.linkLabel !== undefined) ||
      (rule.href !== undefined && rule.linkLabel === undefined)
    ) {
      throw new Error(
        `Decision rule ${index + 1} must include both href and linkLabel when adding a link.`,
      );
    }

    if (rule.max === undefined) {
      return;
    }

    if (!Number.isFinite(rule.max)) {
      throw new Error(`Decision rule ${index + 1} must use a finite max value.`);
    }

    if (rule.max <= previousMax) {
      throw new Error(
        `Decision rule ${index + 1} must use a max value greater than the previous rule.`,
      );
    }

    previousMax = rule.max;
  });
}

function getMatchingDecisionRule<TDecisionRule extends ToolDecisionRule>(
  input: number,
  rules: readonly TDecisionRule[],
): TDecisionRule {
  if (!Number.isFinite(input)) {
    throw new Error("Decision rule input must be a finite number.");
  }

  assertValidDecisionRules(rules);

  const matchingRule = rules.find((rule) => {
    if (rule.max === undefined) {
      return true;
    }

    return input <= rule.max;
  });

  if (!matchingRule) {
    throw new Error("Decision rules must include a fallback rule.");
  }

  return matchingRule;
}

export function evaluateNumberDecisionRule(
  input: number,
  rules: readonly ToolDecisionRule[],
): ToolResultItem {
  const matchingRule = getMatchingDecisionRule(input, rules);

  return {
    label: matchingRule.label,
    value: matchingRule.value,
    valueFormat: matchingRule.valueFormat,
    helperText: matchingRule.helperText,
    tone: matchingRule.tone,
    href: matchingRule.href,
    linkLabel: matchingRule.linkLabel,
  };
}

export function createDecisionSummary({
  title,
  input,
  rules,
  additionalItems = [],
}: CreateDecisionSummaryInput): ToolDecisionSummary {
  if (!title.trim()) {
    throw new Error("Decision summary title is required.");
  }

  const matchingRule = getMatchingDecisionRule(input, rules);

  if (!matchingRule.description?.trim()) {
    throw new Error(
      `Decision summary rule for "${matchingRule.label}" must include a description.`,
    );
  }

  return {
    title,
    description: matchingRule.description,
    items: [
      {
        label: matchingRule.label,
        value: matchingRule.value,
        valueFormat: matchingRule.valueFormat,
        helperText: matchingRule.helperText,
        tone: matchingRule.tone,
        href: matchingRule.href,
        linkLabel: matchingRule.linkLabel,
      },
      ...additionalItems,
    ],
  };
}