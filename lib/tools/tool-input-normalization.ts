import type { RuntimeToolDefinition } from "./tool-runtime-types";
import type { ToolFormValues } from "./tool-types";

export function createInitialToolValues(
  tool: RuntimeToolDefinition,
): ToolFormValues {
  return tool.fields.reduce<ToolFormValues>((values, field) => {
    values[field.name] = field.defaultValue;
    return values;
  }, {});
}

export function normalizeToolInputValues(
  tool: RuntimeToolDefinition,
  values: ToolFormValues,
): ToolFormValues {
  return tool.fields.reduce<ToolFormValues>((normalizedValues, field) => {
    const value = values[field.name];

    if (field.type === "number") {
      const parsedValue =
        value === null || value === "" || value === undefined
          ? field.defaultValue
          : Number(value);

      normalizedValues[field.name] = Number.isFinite(parsedValue)
        ? parsedValue
        : field.defaultValue;
    }

    if (field.type === "select") {
      const allowedValues = field.options.map((option) => option.value);

      normalizedValues[field.name] =
        typeof value === "string" && allowedValues.includes(value)
          ? value
          : field.defaultValue;
    }

    if (field.type === "checkbox") {
      normalizedValues[field.name] =
        typeof value === "boolean" ? value : field.defaultValue;
    }

    if (field.type === "date") {
      normalizedValues[field.name] =
        typeof value === "string" ? value : field.defaultValue;
    }

    return normalizedValues;
  }, {});
}
