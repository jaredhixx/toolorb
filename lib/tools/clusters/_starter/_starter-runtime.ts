import type { RuntimeToolDefinition } from "../../tool-runtime-types";
import {
  createDecisionSummary,
  evaluateNumberDecisionRule,
} from "../../tool-decision-rules";
import { calculateStarter } from "./_starter-formulas";

export const starterRuntime: RuntimeToolDefinition = {
  slug: "starter-tool",
  declaredInternalLinks: [],

  fields: [
    {
      name: "amount",
      label: "Amount",
      type: "number",
      defaultValue: 10000,
      min: 0,
      step: 100,
      suffix: "$",
    },
    {
      name: "rate",
      label: "Rate",
      type: "number",
      defaultValue: 5,
      min: 0,
      step: 0.01,
      suffix: "%",
    },
    {
      name: "termYears",
      label: "Term",
      type: "number",
      defaultValue: 5,
      min: 1,
      step: 1,
      suffix: "years",
    },
  ],

  calculate(values) {
    const result = calculateStarter(values);

    const interestRatio =
      result.totalPaid === 0 ? 0 : result.totalInterest / result.totalPaid;

    const signal = evaluateNumberDecisionRule(interestRatio, [
      { max: 0.25, label: "Interest", value: "Low", tone: "positive" },
      { max: 0.45, label: "Interest", value: "Moderate", tone: "neutral" },
      { label: "Interest", value: "High", tone: "warning" },
    ]);

    return {
      primaryLabel: "Monthly payment",
      primaryValue: result.monthlyPayment,
      primaryValueFormat: "currency",
      primaryHelperText: "Estimated monthly cost.",

      decisionSummary: createDecisionSummary({
        title: "Summary",
        input: interestRatio,
        rules: [],
        additionalItems: [signal],
      }),

      scenarioComparison: {
        title: "Comparison",
        headers: ["Monthly", "Total"],
        rows: [
          {
            label: "Cost",
            values: [
              { value: result.monthlyPayment, valueFormat: "currency" },
              { value: result.totalInterest, valueFormat: "currency" },
            ],
          },
        ],
      },

      resultGuidance: {
        title: "Guidance",
        description: "Use this to evaluate the cost.",
        items: [
          {
            title: "Check affordability",
            description: "Make sure payment fits your budget.",
          },
        ],
      },

      rows: [
        {
          label: "Total paid",
          value: result.totalPaid,
          valueFormat: "currency",
        },
      ],
    };
  },
};