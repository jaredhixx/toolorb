import { renderToolDefinitionContent } from "./tool-content-rendering";
import { createInitialToolValues } from "./tool-input-normalization";
import { toolList } from "./tool-list";
import { normalizeToolCalculationResult } from "./tool-result-normalization";
import {
  getRuntimeToolDefinitionBySlug,
  runtimeToolDefinitions,
  runtimeToolDefinitionSlugs,
} from "./tool-runtime-registry";
import type {
  ToolDefinition,
  ToolField,
  ToolResultValue,
  ToolValueFormat,
} from "./tool-types";

const registeredTools = toolList.map(
  renderToolDefinitionContent,
) satisfies ToolDefinition[];

const allowedValueFormats = new Set<ToolValueFormat>([
  "currency",
  "percent",
  "number",
  "text",
]);

function assertNonEmptyString(
  tool: ToolDefinition,
  label: string,
  value: string,
): void {
  if (!value.trim()) {
    throw new Error(`${tool.slug} is missing required ${label}.`);
  }
}

function assertMinimumWordCount(
  tool: ToolDefinition,
  label: string,
  value: string,
  minimumWords: number,
): void {
  const wordCount = value.trim().split(/\s+/).length;

  if (wordCount < minimumWords) {
    throw new Error(
      `${tool.slug} has insufficient ${label}: requires at least ${minimumWords} words, found ${wordCount}`,
    );
  }
}

function assertStringLength(
  tool: ToolDefinition,
  label: string,
  value: string,
  minLength: number,
  maxLength: number,
): void {
  const length = value.trim().length;

  if (length < minLength || length > maxLength) {
    throw new Error(
      `${tool.slug} ${label} must be between ${minLength} and ${maxLength} characters.`,
    );
  }
}

function assertValidDateString(
  tool: ToolDefinition,
  label: string,
  value: string,
): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${tool.slug} ${label} must use YYYY-MM-DD format.`);
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== value
  ) {
    throw new Error(`${tool.slug} ${label} must be a real calendar date.`);
  }
}

function assertRequiredList(
  tool: ToolDefinition,
  label: string,
  values: readonly unknown[],
  minimumCount: number,
): void {
  if (values.length < minimumCount) {
    throw new Error(
      `${tool.slug} must include at least ${minimumCount} ${label}.`,
    );
  }
}

function assertUniqueToolSlugs(tools: readonly ToolDefinition[]): void {
  const seenSlugs = new Set<string>();

  for (const tool of tools) {
    if (seenSlugs.has(tool.slug)) {
      throw new Error(`Duplicate tool slug found: ${tool.slug}`);
    }

    seenSlugs.add(tool.slug);
  }
}

function assertValidToolClusters(tools: readonly ToolDefinition[]): void {
  const seenClusters = new Set<string>();

  for (const tool of tools) {
    const cluster = tool.meta.cluster;

    if (!cluster || !cluster.trim()) {
      throw new Error(`${tool.slug} must define a valid cluster.`);
    }

    const normalizedCluster = cluster.trim();

    if (normalizedCluster !== cluster) {
      throw new Error(`${tool.slug} cluster cannot start or end with spaces.`);
    }

    seenClusters.add(normalizedCluster);
  }

  if (tools.length >= 5 && seenClusters.size === tools.length) {
    throw new Error(
      "Every tool is in its own cluster. Clusters should group related tools once the registry has enough tools to evaluate taxonomy quality.",
    );
  }
}

function assertUniqueFieldNames(tool: ToolDefinition): void {
  const seenFieldNames = new Set<string>();

  for (const field of tool.fields) {
    if (seenFieldNames.has(field.name)) {
      throw new Error(`${tool.slug} has duplicate field name: ${field.name}`);
    }

    seenFieldNames.add(field.name);
  }
}

function assertFieldContract(tool: ToolDefinition, field: ToolField): void {
  assertNonEmptyString(tool, `field name for ${field.label}`, field.name);
  assertNonEmptyString(tool, `field label for ${field.name}`, field.label);

  if (field.type === "number") {
    if (!Number.isFinite(field.defaultValue)) {
      throw new Error(
        `${tool.slug} field ${field.name} must have a finite number defaultValue.`,
      );
    }

    if (field.min !== undefined && field.defaultValue < field.min) {
      throw new Error(
        `${tool.slug} field ${field.name} defaultValue cannot be below min.`,
      );
    }

    if (field.max !== undefined && field.defaultValue > field.max) {
      throw new Error(
        `${tool.slug} field ${field.name} defaultValue cannot be above max.`,
      );
    }
  }

  if (field.type === "select") {
    assertRequiredList(tool, `options for ${field.name}`, field.options, 2);

    const optionValues = new Set<string>();

    for (const option of field.options) {
      assertNonEmptyString(tool, `option label for ${field.name}`, option.label);
      assertNonEmptyString(tool, `option value for ${field.name}`, option.value);

      if (optionValues.has(option.value)) {
        throw new Error(
          `${tool.slug} field ${field.name} has duplicate option value: ${option.value}`,
        );
      }

      optionValues.add(option.value);
    }

    if (!optionValues.has(field.defaultValue)) {
      throw new Error(
        `${tool.slug} field ${field.name} defaultValue must match one of its options.`,
      );
    }
  }

  if (field.type === "date") {
    assertNonEmptyString(
      tool,
      `date defaultValue for ${field.name}`,
      field.defaultValue,
    );
    assertValidDateString(
      tool,
      `field ${field.name} defaultValue`,
      field.defaultValue,
    );

    if (field.min !== undefined) {
      assertValidDateString(tool, `field ${field.name} min`, field.min);

      if (field.defaultValue < field.min) {
        throw new Error(
          `${tool.slug} field ${field.name} defaultValue cannot be before min.`,
        );
      }
    }

    if (field.max !== undefined) {
      assertValidDateString(tool, `field ${field.name} max`, field.max);

      if (field.defaultValue > field.max) {
        throw new Error(
          `${tool.slug} field ${field.name} defaultValue cannot be after max.`,
        );
      }
    }
  }
}

function assertToolFieldsContract(tool: ToolDefinition): void {
  assertRequiredList(tool, "fields", tool.fields, 1);
  assertUniqueFieldNames(tool);

  for (const field of tool.fields) {
    assertFieldContract(tool, field);
  }
}

function assertContentTextList(
  tool: ToolDefinition,
  label: string,
  values: readonly string[],
  minimumCount: number,
): void {
  assertRequiredList(tool, label, values, minimumCount);

  values.forEach((value, index) => {
    assertNonEmptyString(tool, `${label} item ${index + 1}`, value);
  });
}

function assertFaqList(
  tool: ToolDefinition,
  label: string,
  items: readonly { question: string; answer: string }[],
  minimumCount: number,
): void {
  assertRequiredList(tool, label, items, minimumCount);

  items.forEach((item, index) => {
    assertNonEmptyString(tool, `${label} item ${index + 1} question`, item.question);
    assertNonEmptyString(tool, `${label} item ${index + 1} answer`, item.answer);
  });
}

function assertExamplesList(
  tool: ToolDefinition,
  label: string,
  items: readonly { title: string; description: string }[],
  minimumCount: number,
): void {
  assertRequiredList(tool, label, items, minimumCount);

  items.forEach((item, index) => {
    assertNonEmptyString(tool, `${label} item ${index + 1} title`, item.title);
    assertNonEmptyString(tool, `${label} item ${index + 1} description`, item.description);
  });
}

function assertDefinitionsList(
  tool: ToolDefinition,
  label: string,
  items: readonly { term: string; definition: string }[],
  minimumCount: number,
): void {
  assertRequiredList(tool, label, items, minimumCount);

  items.forEach((item, index) => {
    assertNonEmptyString(tool, `${label} item ${index + 1} term`, item.term);
    assertNonEmptyString(tool, `${label} item ${index + 1} definition`, item.definition);
  });
}

function assertDecisionList(
  tool: ToolDefinition,
  label: string,
  items: readonly { title: string; description: string }[],
  minimumCount: number,
): void {
  assertRequiredList(tool, label, items, minimumCount);

  items.forEach((item, index) => {
    assertNonEmptyString(tool, `${label} item ${index + 1} title`, item.title);
    assertNonEmptyString(
      tool,
      `${label} item ${index + 1} description`,
      item.description,
    );
  });
}

function assertComparisonRows(
  tool: ToolDefinition,
  label: string,
  rows: readonly { label: string; value: string; helperText?: string }[],
  minimumCount: number,
): void {
  assertRequiredList(tool, label, rows, minimumCount);

  rows.forEach((row, index) => {
    assertNonEmptyString(tool, `${label} row ${index + 1} label`, row.label);
    assertNonEmptyString(tool, `${label} row ${index + 1} value`, row.value);

    if (row.helperText) {
      assertNonEmptyString(
        tool,
        `${label} row ${index + 1} helperText`,
        row.helperText,
      );
    }
  });
}

function assertResultGuidanceSection(
  tool: ToolDefinition,
  section: {
    title: string;
    description: string;
    goodResults?: readonly { title: string; description: string }[];
    cautionResults?: readonly { title: string; description: string }[];
    improvementTips?: readonly { title: string; description: string }[];
  },
): void {
  assertNonEmptyString(tool, "result guidance title", section.title);
  assertNonEmptyString(tool, "result guidance description", section.description);

  const totalGuidanceItems =
    (section.goodResults?.length ?? 0) +
    (section.cautionResults?.length ?? 0) +
    (section.improvementTips?.length ?? 0);

  if (totalGuidanceItems < 3) {
    throw new Error(
      `${tool.slug} result guidance must include at least 3 total guidance items.`,
    );
  }

  if (section.goodResults) {
    assertDecisionList(tool, "good result guidance", section.goodResults, 1);
  }

  if (section.cautionResults) {
    assertDecisionList(tool, "caution result guidance", section.cautionResults, 1);
  }

  if (section.improvementTips) {
    assertDecisionList(
      tool,
      "improvement tips result guidance",
      section.improvementTips,
      1,
    );
  }
}

function assertToolContentContract(tool: ToolDefinition): void {
  assertNonEmptyString(tool, "overview title", tool.content.overview.title);
  assertNonEmptyString(tool, "overview body", tool.content.overview.body);
  assertMinimumWordCount(tool, "overview body", tool.content.overview.body, 80);
  if (tool.content.formula) {
    assertNonEmptyString(tool, "formula title", tool.content.formula.title);
    assertNonEmptyString(tool, "formula body", tool.content.formula.body);
    assertMinimumWordCount(tool, "formula body", tool.content.formula.body, 40);
  }

  assertContentTextList(tool, "key takeaways", tool.content.keyTakeaways.items, 3);

  if (tool.content.assumptions) {
    assertContentTextList(tool, "assumptions", tool.content.assumptions.items, 3);
  }

  if (tool.content.methodology) {
    assertContentTextList(
      tool,
      "methodology items",
      tool.content.methodology.items,
      3,
    );
  }

  if (tool.content.steps) {
    assertContentTextList(tool, "steps", tool.content.steps.items, 3);
  }

  if (tool.content.examples) {
    assertExamplesList(tool, "examples", tool.content.examples.items, 3);
  }

  if (tool.content.comparison) {
    assertNonEmptyString(
      tool,
      "comparison title",
      tool.content.comparison.title,
    );
    assertNonEmptyString(
      tool,
      "comparison description",
      tool.content.comparison.description,
    );
    assertComparisonRows(tool, "comparison rows", tool.content.comparison.rows, 3);
  }

  assertFaqList(tool, "FAQs", tool.content.faqs.items, 3);

  if (tool.content.resultGuidance) {
    assertResultGuidanceSection(tool, tool.content.resultGuidance);
  }

  if (tool.content.commonMistakes) {
    assertNonEmptyString(
      tool,
      "common mistakes title",
      tool.content.commonMistakes.title,
    );

    if (tool.content.commonMistakes.description) {
      assertNonEmptyString(
        tool,
        "common mistakes description",
        tool.content.commonMistakes.description,
      );
    }

    assertDecisionList(
      tool,
      "common mistakes",
      tool.content.commonMistakes.items,
      3,
    );
  }

  if (tool.content.definitions) {
    assertDefinitionsList(tool, "definitions", tool.content.definitions.items, 3);
  }

  if (tool.content.relatedDecision) {
    const { href, linkLabel } = tool.content.relatedDecision;

    assertNonEmptyString(
      tool,
      "related decision eyebrow",
      tool.content.relatedDecision.eyebrow,
    );
    assertNonEmptyString(
      tool,
      "related decision title",
      tool.content.relatedDecision.title,
    );
    assertNonEmptyString(
      tool,
      "related decision description",
      tool.content.relatedDecision.description,
    );

    if ((href && !linkLabel) || (!href && linkLabel)) {
      throw new Error(
        `${tool.slug} related decision links must include href and linkLabel together.`,
      );
    }

    if (href && !href.startsWith("/")) {
      throw new Error(`${tool.slug} related decision href must be internal.`);
    }
  }
}

function assertToolSeoContract(tool: ToolDefinition): void {
  const expectedCanonicalPath = `/tools/${tool.slug}`;

  assertNonEmptyString(tool, "slug", tool.slug);
  assertNonEmptyString(tool, "name", tool.name);
  assertNonEmptyString(tool, "shortName", tool.shortName);
  assertNonEmptyString(tool, "description", tool.description);
  assertNonEmptyString(tool, "SEO title", tool.seo.title);
  assertNonEmptyString(tool, "SEO description", tool.seo.description);
  assertNonEmptyString(tool, "category", tool.meta.category);
  assertNonEmptyString(tool, "cluster", tool.meta.cluster);
  assertNonEmptyString(tool, "lastUpdated", tool.meta.lastUpdated);

  assertStringLength(tool, "SEO title", tool.seo.title, 25, 65);
  assertStringLength(tool, "SEO description", tool.seo.description, 120, 170);

  if (tool.seo.canonicalPath !== expectedCanonicalPath) {
    throw new Error(
      `${tool.slug} canonicalPath must be ${expectedCanonicalPath}.`,
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(tool.meta.lastUpdated)) {
    throw new Error(`${tool.slug} lastUpdated must use YYYY-MM-DD format.`);
  }
}

function assertRelatedToolSlugs(tools: readonly ToolDefinition[]): void {
  const toolsBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

  for (const tool of tools) {
    if (tools.length > 1 && tool.meta.relatedToolSlugs.length === 0) {
      throw new Error(
        `${tool.slug} must include at least one related tool once multiple tools exist.`,
      );
    }

    const seenRelatedSlugs = new Set<string>();

    for (const relatedToolSlug of tool.meta.relatedToolSlugs) {
      if (relatedToolSlug === tool.slug) {
        throw new Error(`${tool.slug} cannot list itself as a related tool.`);
      }

      if (seenRelatedSlugs.has(relatedToolSlug)) {
        throw new Error(
          `${tool.slug} has duplicate related tool slug: ${relatedToolSlug}`,
        );
      }

      seenRelatedSlugs.add(relatedToolSlug);

      const relatedTool = toolsBySlug.get(relatedToolSlug);

      if (!relatedTool) {
        throw new Error(
          `${tool.slug} has unknown related tool slug: ${relatedToolSlug}`,
        );
      }

      if (!relatedTool.meta.relatedToolSlugs.includes(tool.slug)) {
        throw new Error(
          `${tool.slug} and ${relatedToolSlug} must list each other as related tools.`,
        );
      }
    }
  }
}

function assertValidInternalToolLinks(tools: readonly ToolDefinition[]): void {
  const validToolPaths = new Set(tools.map((tool) => tool.seo.canonicalPath));

  function assertHref(
    href: string | undefined,
    context: string,
    toolSlug: string,
  ): void {
    if (!href) {
      return;
    }

    if (!href.startsWith("/tools/")) {
      return;
    }

    if (!validToolPaths.has(href)) {
      throw new Error(
        `[Tool Registry] Invalid internal tool link "${href}" found in ${context} for tool "${toolSlug}".`,
      );
    }
  }

  for (const tool of tools) {
    // EXISTING: relatedDecision
    assertHref(tool.content.relatedDecision?.href, "relatedDecision", tool.slug);

    // EXISTING: runtime-derived validation (default path)
    const initialValues = createInitialToolValues(tool);
    const result = normalizeToolCalculationResult(tool.calculate(initialValues));

    for (const item of result.decisionSummary.items) {
      assertHref(item.href, "decision summary item", tool.slug);
    }

    for (const row of result.rows) {
      assertHref(row.href, "result row", tool.slug);
    }

    for (const card of result.summaryCards) {
      assertHref(card.href, "summary card", tool.slug);
    }

    // NEW: declaredInternalLinks (THIS FIXES THE AUDIT ISSUE)
    const runtime = getRuntimeToolDefinitionBySlug(tool.slug);

    for (const href of runtime.declaredInternalLinks ?? []) {
      assertHref(href, "declaredInternalLinks", tool.slug);
    }
  }
}

function assertResultValueFormat(
  tool: ToolDefinition,
  label: string,
  valueFormat: ToolValueFormat | undefined,
): void {
  if (valueFormat && !allowedValueFormats.has(valueFormat)) {
    throw new Error(`${tool.slug} has invalid valueFormat in ${label}.`);
  }
}

function assertResultValue(
  tool: ToolDefinition,
  label: string,
  value: ToolResultValue,
): void {
  if (typeof value === "number" && !Number.isFinite(value)) {
    throw new Error(`${tool.slug} has invalid number value in ${label}.`);
  }

  if (typeof value === "string" && !value.trim()) {
    throw new Error(`${tool.slug} has empty string value in ${label}.`);
  }

  if (typeof value === "object") {
    assertResultValue(tool, `${label}.value`, value.value);
    assertResultValueFormat(tool, `${label}.valueFormat`, value.valueFormat);
  }
}

function assertToolResultContract(tool: ToolDefinition): void {
  const initialValues = createInitialToolValues(tool);
  const result = normalizeToolCalculationResult(tool.calculate(initialValues));

  function assertChartContract(
    label: string,
    chartData: typeof result.chartData,
  ): void {
    if (!chartData) {
      return;
    }

    assertResultValueFormat(tool, `${label} valueFormat`, chartData.valueFormat);
    assertResultValueFormat(
      tool,
      `${label} centerValueFormat`,
      chartData.centerValueFormat,
    );

    if (chartData.title) {
      assertNonEmptyString(tool, `${label} title`, chartData.title);
    }

    if (chartData.description) {
      assertNonEmptyString(tool, `${label} description`, chartData.description);
    }

    if (chartData.centerLabel) {
      assertNonEmptyString(tool, `${label} centerLabel`, chartData.centerLabel);
    }

    if (chartData.centerHelperText) {
      assertNonEmptyString(
        tool,
        `${label} centerHelperText`,
        chartData.centerHelperText,
      );
    }

    if (chartData.centerValue !== undefined) {
      assertResultValue(tool, `${label} centerValue`, chartData.centerValue);
    }

    if (chartData.items) {
      assertRequiredList(tool, `${label} chart items`, chartData.items, 1);

      for (const item of chartData.items) {
        assertNonEmptyString(tool, `${label} chart item label`, item.label);

        if (!Number.isFinite(item.value)) {
          throw new Error(
            `${tool.slug} has invalid ${label} chart value for ${item.label}.`,
          );
        }
      }
    }

    if (chartData.series) {
      assertRequiredList(tool, `${label} chart series`, chartData.series, 1);

      for (const series of chartData.series) {
        assertNonEmptyString(tool, `${label} chart series label`, series.label);
        assertRequiredList(
          tool,
          `${label} chart series points`,
          series.points,
          1,
        );

        for (const point of series.points) {
          assertNonEmptyString(tool, `${label} chart point label`, point.label);

          if (!Number.isFinite(point.value)) {
            throw new Error(
              `${tool.slug} has invalid ${label} chart point value for ${point.label}.`,
            );
          }
        }
      }
    }

    if (!chartData.items && !chartData.series) {
      throw new Error(
        `${tool.slug} ${label} must include chart items or chart series.`,
      );
    }
  }

  assertNonEmptyString(tool, "primary result label", result.primaryLabel);
  assertResultValue(tool, "primary result value", result.primaryValue);
  assertResultValueFormat(tool, "primaryValueFormat", result.primaryValueFormat);
  assertNonEmptyString(tool, "primary helper text", result.primaryHelperText);

  assertRequiredList(tool, "result rows", result.rows, 1);
  assertRequiredList(
    tool,
    "decision summary items",
    result.decisionSummary.items,
    1,
  );
  assertRequiredList(
    tool,
    "scenario comparison rows",
    result.scenarioComparison.rows,
    1,
  );

  for (const row of result.rows) {
    assertNonEmptyString(tool, "result row label", row.label);
    assertResultValue(tool, `result row ${row.label}`, row.value);
    assertResultValueFormat(tool, `result row ${row.label}`, row.valueFormat);

    if (row.helperText) {
      assertNonEmptyString(tool, `result row ${row.label} helperText`, row.helperText);
    }
  }

  for (const card of result.summaryCards) {
    assertNonEmptyString(tool, "summary card label", card.label);
    assertResultValue(tool, `summary card ${card.label}`, card.value);
    assertResultValueFormat(tool, `summary card ${card.label}`, card.valueFormat);

    if (card.helperText) {
      assertNonEmptyString(
        tool,
        `summary card ${card.label} helperText`,
        card.helperText,
      );
    }
  }

  assertNonEmptyString(
    tool,
    "decision summary title",
    result.decisionSummary.title,
  );
  assertNonEmptyString(
    tool,
    "decision summary description",
    result.decisionSummary.description,
  );

  for (const item of result.decisionSummary.items) {
    assertNonEmptyString(tool, "decision summary item label", item.label);
    assertResultValue(tool, `decision summary item ${item.label}`, item.value);
    assertResultValueFormat(
      tool,
      `decision summary item ${item.label}`,
      item.valueFormat,
    );

    if (item.helperText) {
      assertNonEmptyString(
        tool,
        `decision summary item ${item.label} helperText`,
        item.helperText,
      );
    }
  }

  assertNonEmptyString(
    tool,
    "scenario comparison title",
    result.scenarioComparison.title,
  );

  if (result.scenarioComparison.description) {
    assertNonEmptyString(
      tool,
      "scenario comparison description",
      result.scenarioComparison.description,
    );
  }

  const scenarioValueCount = Math.max(
    0,
    ...result.scenarioComparison.rows.map((row) => row.values.length),
  );

  if (
    result.scenarioComparison.headers.length > 0 &&
    result.scenarioComparison.headers.length !== scenarioValueCount
  ) {
    throw new Error(
      `${tool.slug} scenario comparison headers must match scenario comparison value count.`,
    );
  }

  for (const row of result.scenarioComparison.rows) {
    assertNonEmptyString(tool, "scenario comparison row label", row.label);

    if (row.values.length !== scenarioValueCount) {
      throw new Error(
        `${tool.slug} scenario comparison row ${row.label} has inconsistent value count.`,
      );
    }

    for (const value of row.values) {
      assertResultValue(tool, `scenario comparison row ${row.label}`, value);
    }
  }

  assertChartContract("primary chart", result.chartData);
  assertChartContract("secondary chart", result.secondaryChartData);

  if (result.ratioBreakdown) {
    assertNonEmptyString(tool, "ratio breakdown title", result.ratioBreakdown.title);
    assertRequiredList(tool, "ratio breakdown items", result.ratioBreakdown.items, 1);

    for (const item of result.ratioBreakdown.items) {
      assertNonEmptyString(tool, "ratio breakdown item label", item.label);

      if (!Number.isFinite(item.value)) {
        throw new Error(
          `${tool.slug} has invalid ratio breakdown value for ${item.label}.`,
        );
      }

      assertResultValueFormat(
        tool,
        `ratio breakdown item ${item.label}`,
        item.valueFormat,
      );
    }
  }

  if (result.tableSection) {
    assertNonEmptyString(tool, "table title", result.tableSection.title);

    if (result.tableSection.description) {
      assertNonEmptyString(
        tool,
        "table description",
        result.tableSection.description,
      );
    }

    assertRequiredList(tool, "table columns", result.tableSection.columns, 1);
    assertRequiredList(tool, "table rows", result.tableSection.rows, 1);

    for (const column of result.tableSection.columns) {
      assertNonEmptyString(tool, "table column", column);
    }

    for (const row of result.tableSection.rows) {
      if (row.cells.length !== result.tableSection.columns.length) {
        throw new Error(
          `${tool.slug} table rows must have the same number of cells as table columns.`,
        );
      }

      for (const cell of row.cells) {
        assertResultValue(tool, "table cell", cell);
      }
    }
  }
}

function assertRuntimeToolRegistration(tools: readonly ToolDefinition[]): void {
  const fullToolSlugs = new Set<string>();
  const seenFullDuplicates = new Set<string>();

  for (const tool of tools) {
    if (fullToolSlugs.has(tool.slug)) {
      seenFullDuplicates.add(tool.slug);
    }
    fullToolSlugs.add(tool.slug);
  }

  if (seenFullDuplicates.size > 0) {
    throw new Error(
      `Duplicate tool definitions detected: ${Array.from(seenFullDuplicates).join(", ")}`,
    );
  }

  for (const tool of tools) {
    if (!runtimeToolDefinitionSlugs.has(tool.slug)) {
      throw new Error(
        `${tool.slug} is missing a matching runtime tool definition.`,
      );
    }
  }

  const runtimeSlugs = new Set<string>();
  const seenRuntimeDuplicates = new Set<string>();

  for (const runtimeTool of runtimeToolDefinitions) {
    if (runtimeSlugs.has(runtimeTool.slug)) {
      seenRuntimeDuplicates.add(runtimeTool.slug);
    }
    runtimeSlugs.add(runtimeTool.slug);
  }

  if (seenRuntimeDuplicates.size > 0) {
    throw new Error(
      `Duplicate runtime tool definitions detected: ${Array.from(seenRuntimeDuplicates).join(", ")}`,
    );
  }

  for (const runtimeTool of runtimeToolDefinitions) {
    if (!fullToolSlugs.has(runtimeTool.slug)) {
      throw new Error(
        `${runtimeTool.slug} has a runtime tool definition but no matching full tool definition.`,
      );
    }
  }
}

function assertToolRegistryContract(tools: readonly ToolDefinition[]): void {
  assertUniqueToolSlugs(tools);

  if (tools.length > 1) {
    assertValidToolClusters(tools);
  }

  assertRelatedToolSlugs(tools);
  assertValidInternalToolLinks(tools);
  assertRuntimeToolRegistration(tools);

  for (const tool of tools) {
    assertToolSeoContract(tool);
    assertToolContentContract(tool);
    assertToolFieldsContract(tool);
    assertToolResultContract(tool);
  }
}

assertToolRegistryContract(registeredTools);

export const toolDefinitions: ToolDefinition[] = registeredTools;

export const toolDefinitionsBySlug = new Map(
  toolDefinitions.map((tool) => [tool.slug, tool]),
);

export function getToolDefinitionBySlug(
  slug: string,
): ToolDefinition | undefined {
  return toolDefinitionsBySlug.get(slug);
}
