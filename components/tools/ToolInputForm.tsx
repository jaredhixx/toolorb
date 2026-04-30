import type { RuntimeToolDefinition } from "../../lib/tools/tool-runtime-types";
import type { ToolFormValue, ToolFormValues } from "../../lib/tools/tool-types";
import type { ToolValidationError } from "../../lib/tools/tool-validation";

export function ToolInputForm({
  tool,
  values,
  validationErrors,
  onValueChange,
  onCalculate,
}: {
  tool: RuntimeToolDefinition;
  values: ToolFormValues;
  validationErrors: ToolValidationError[];
  onValueChange: (name: string, value: ToolFormValue) => void;
  onCalculate: () => void;
}) {
  function getValidationError(fieldName: string) {
    return validationErrors.find((error) => error.fieldName === fieldName);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-stone-50">Calculator</h2>

      <div className="mt-6 grid gap-5">
        {tool.fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-stone-200">
              {field.label}
            </label>

            {field.type === "number" && (
              <div className="mt-2 flex items-center rounded-2xl border border-stone-800 bg-stone-900/80 px-4">
                <input
                  className="w-full bg-transparent py-3 text-stone-50 outline-none"
                  type="text"
                  inputMode="decimal"
                  name={field.name}
                  value={String(values[field.name] ?? "")}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  placeholder={field.placeholder}
                  onChange={(event) => {
                    onValueChange(field.name, event.target.value);
                  }}
                />

                {field.suffix && (
                  <span className="ml-3 text-sm text-stone-400">
                    {field.suffix}
                  </span>
                )}
              </div>
            )}

            {field.type === "select" && (
              <select
                className="mt-2 w-full rounded-2xl border border-stone-800 bg-stone-900/80 px-4 py-3 text-stone-50 outline-none"
                name={field.name}
                value={String(values[field.name] ?? field.defaultValue)}
                onChange={(event) => {
                  onValueChange(field.name, event.target.value);
                }}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <label className="mt-3 flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-900/80 px-4 py-3 text-sm text-stone-200">
                <input
                  type="checkbox"
                  name={field.name}
                  checked={Boolean(values[field.name])}
                  onChange={(event) => {
                    onValueChange(field.name, event.target.checked);
                  }}
                />
                <span>{field.helperText ?? field.label}</span>
              </label>
            )}

            {field.type === "date" && (
              <input
                className="mt-2 w-full rounded-2xl border border-stone-800 bg-stone-900/80 px-4 py-3 text-stone-50 outline-none"
                type="date"
                name={field.name}
                value={String(values[field.name] ?? field.defaultValue)}
                min={field.min}
                max={field.max}
                onChange={(event) => {
                  onValueChange(field.name, event.target.value);
                }}
              />
            )}

            {getValidationError(field.name) && (
              <p className="mt-2 text-sm leading-6 text-red-300">
                {getValidationError(field.name)?.message}
              </p>
            )}

            {!getValidationError(field.name) &&
              field.helperText &&
              field.type !== "checkbox" && (
                <p className="mt-2 text-sm leading-6 text-stone-400">
                  {field.helperText}
                </p>
              )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onCalculate}
        className="relative z-20 mt-6 block w-full touch-manipulation rounded-2xl border border-amber-300/30 bg-amber-300 px-5 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-stone-950 shadow-lg shadow-amber-950/20 transition hover:bg-amber-200"
      >
        Calculate results
      </button>
    </div>
  );
}
