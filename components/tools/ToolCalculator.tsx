"use client";

import { useMemo, useState } from "react";
import { ToolInputForm } from "./ToolInputForm";
import { ToolResultPanel } from "./ToolResultPanel";
import { getRuntimeToolDefinitionBySlug } from "../../lib/tools/tool-runtime-registry";
import {
  validateToolValues,
  type ToolValidationError,
} from "../../lib/tools/tool-validation";
import { normalizeToolCalculationResult } from "../../lib/tools/tool-result-normalization";
import {
  createInitialToolValues,
  normalizeToolInputValues,
} from "../../lib/tools/tool-input-normalization";
import type { ToolFormValue, ToolFormValues } from "../../lib/tools/tool-types";

export function ToolCalculator({ toolSlug }: { toolSlug: string }) {
  const activeTool = getRuntimeToolDefinitionBySlug(toolSlug);

  const initialValues = useMemo(() => {
    if (!activeTool) {
      return {};
    }

    return createInitialToolValues(activeTool);
  }, [activeTool]);

  const [values, setValues] = useState<ToolFormValues>(initialValues);
  const [calculatedValues, setCalculatedValues] =
    useState<ToolFormValues>(initialValues);
  const [validationErrors, setValidationErrors] = useState<
    ToolValidationError[]
  >([]);

  const result = useMemo(() => {
    if (!activeTool) {
      return null;
    }

    return normalizeToolCalculationResult(activeTool.calculate(calculatedValues));
  }, [activeTool, calculatedValues]);

  function updateValue(name: string, value: ToolFormValue) {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setValidationErrors((currentErrors) =>
      currentErrors.filter((error) => error.fieldName !== name),
    );
  }

  function handleCalculate() {
    if (!activeTool) {
      return;
    }

    const nextValidationErrors = validateToolValues(activeTool, values);

    if (nextValidationErrors.length > 0) {
      setValidationErrors(nextValidationErrors);
      return;
    }

    const normalizedValues = normalizeToolInputValues(activeTool, values);

    setValidationErrors([]);
    setValues(normalizedValues);
    setCalculatedValues(normalizedValues);
  }

  if (!activeTool || !result) {
    return null;
  }

  return (
    <div className="grid gap-6 rounded-[2rem] border border-stone-800 bg-stone-950/70 p-6 shadow-2xl shadow-black/30 lg:grid-cols-[1fr_0.9fr] lg:items-start">
      <ToolInputForm
        tool={activeTool}
        values={values}
        validationErrors={validationErrors}
        onValueChange={updateValue}
        onCalculate={handleCalculate}
      />

      <ToolResultPanel result={result} />
    </div>
  );
}
