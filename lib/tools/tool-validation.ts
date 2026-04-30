import type { RuntimeToolDefinition } from "./tool-runtime-types";
import type { ToolFormValues } from "./tool-types";

export type ToolValidationError = {
  fieldName: string;
  message: string;
};

function isEmptyValue(value: unknown): boolean {
  return value === "" || value === null || value === undefined;
}

function isValidDateInput(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    return false;
  }

  return parsedDate.toISOString().slice(0, 10) === value;
}

export function validateToolValues(
  tool: RuntimeToolDefinition,
  values: ToolFormValues,
): ToolValidationError[] {
  const errors: ToolValidationError[] = [];

  tool.fields.forEach((field) => {
    const value = values[field.name];

    if (field.required && isEmptyValue(value)) {
      errors.push({
        fieldName: field.name,
        message: `${field.label} is required.`,
      });

      return;
    }

    if (field.type === "number") {
      const numberValue = Number(value);

      if (!Number.isFinite(numberValue)) {
        errors.push({
          fieldName: field.name,
          message: `${field.label} must be a valid number.`,
        });

        return;
      }

      if (field.min !== undefined && numberValue < field.min) {
        errors.push({
          fieldName: field.name,
          message: `${field.label} must be at least ${field.min}.`,
        });
      }

      if (field.max !== undefined && numberValue > field.max) {
        errors.push({
          fieldName: field.name,
          message: `${field.label} must be no more than ${field.max}.`,
        });
      }
    }

    if (field.type === "select") {
      const selectedValue = String(value);
      const allowedValues = field.options.map((option) => option.value);

      if (!allowedValues.includes(selectedValue)) {
        errors.push({
          fieldName: field.name,
          message: `${field.label} must use one of the available options.`,
        });
      }
    }

    if (field.type === "date") {
      const dateValue = String(value);

      if (isEmptyValue(dateValue)) {
        return;
      }

      if (!isValidDateInput(dateValue)) {
        errors.push({
          fieldName: field.name,
          message: `${field.label} must be a valid date.`,
        });

        return;
      }

      if (field.min !== undefined && dateValue < field.min) {
        errors.push({
          fieldName: field.name,
          message: `${field.label} must be on or after ${field.min}.`,
        });
      }

      if (field.max !== undefined && dateValue > field.max) {
        errors.push({
          fieldName: field.name,
          message: `${field.label} must be on or before ${field.max}.`,
        });
      }
    }
  });

  return errors;
}