import type { RuntimeToolDefinition } from "../../tool-runtime-types";
import {
  createDecisionSummary,
  evaluateNumberDecisionRule,
} from "../../tool-decision-rules";
import { calculateLoanPayment } from "./loan-formulas";

export const loanRuntime: RuntimeToolDefinition = {
  slug: "loan-calculator",
  declaredInternalLinks: [],

  fields: [
    {
      name: "loanAmount",
      label: "Loan amount",
      type: "number",
      defaultValue: 25000,
      min: 0,
      max: 100000000,
      step: 1000,
      suffix: "$",
    },
    {
      name: "interestRate",
      label: "Interest rate",
      type: "number",
      defaultValue: 8,
      min: 0,
      max: 100,
      step: 0.01,
      suffix: "%",
    },
    {
      name: "loanTermYears",
      label: "Loan term",
      type: "number",
      defaultValue: 5,
      min: 1,
      max: 100,
      step: 1,
      suffix: "years",
    },
  ],

  calculate(values) {
    const result = calculateLoanPayment(values);

    const interestRatio =
      result.totalPaid === 0 ? 0 : result.totalInterest / result.totalPaid;

    const interestSignal = evaluateNumberDecisionRule(interestRatio, [
      {
        max: 0.25,
        label: "Interest cost",
        value: "Controlled",
        helperText:
          "Interest is a smaller share of the total amount paid for this loan.",
        tone: "positive",
      },
      {
        max: 0.45,
        label: "Interest cost",
        value: "Moderate",
        helperText:
          "Interest is a meaningful part of the total amount paid.",
        tone: "neutral",
      },
      {
        label: "Interest cost",
        value: "High",
        helperText:
          "Interest is a large share of the total loan cost. Compare shorter terms, lower rates, or a smaller loan amount.",
        tone: "warning",
      },
    ]);

    const paymentInsightScore =
      interestRatio > 0.45 ? 2 : interestRatio > 0.25 ? 1 : 0;

    return {
      primaryLabel: "Estimated monthly payment",
      primaryValue: result.monthlyPayment,
      primaryValueFormat: "currency",
      primaryHelperText:
        "This is the estimated monthly payment based on the loan amount, interest rate, and loan term you entered.",

      decisionSummary: createDecisionSummary({
        title: "Loan insight",
        input: paymentInsightScore,
        rules: [
          {
            max: 0,
            label: "Loan insight",
            value: "Controlled interest",
            description:
              "This loan has a relatively controlled interest share based on the inputs you entered.",
            tone: "positive",
          },
          {
            max: 1,
            label: "Loan insight",
            value: "Moderate interest",
            description:
              "Interest is a meaningful part of the total cost. Compare a few shorter-term or lower-rate scenarios.",
            tone: "neutral",
          },
          {
            label: "Loan insight",
            value: "High interest cost",
            description:
              "This loan has a high interest share. A lower rate, shorter term, or smaller loan amount could reduce the total cost.",
            tone: "warning",
          },
        ],
        additionalItems: [
          interestSignal,
          {
            label: "Monthly payment",
            value: result.monthlyPayment,
            valueFormat: "currency",
            helperText:
              "This is the estimated required monthly payment for the loan.",
            tone: "neutral",
          },
          {
            label: "Total interest",
            value: result.totalInterest,
            valueFormat: "currency",
            helperText:
              "This is the estimated interest paid across the full loan term.",
            tone: "neutral",
          },
        ],
      }),

      resultGuidance: {
        title: "What this estimate means",
        description:
          "Use this estimate to compare loan options and understand how much the loan could cost over time.",
        items: [
          {
            title: "Check monthly affordability",
            description:
              "Make sure the estimated monthly payment fits comfortably within your regular monthly budget.",
          },
          {
            title: "Compare total interest",
            description:
              "A lower monthly payment can still cost more over time if the loan term is longer or the interest rate is high.",
          },
          {
            title: "Test different terms",
            description:
              "Try a shorter term, lower rate, or smaller loan amount to see how total interest changes.",
          },
        ],
      },

      scenarioComparison: {
        title: "Scenario comparison",
        description:
          "Use these signals to compare the monthly payment against the long-term cost of the loan.",
        headers: ["Monthly view", "Total cost view"],
        rows: [
          {
            label: "Main question",
            values: [
              "Can I afford this monthly payment?",
              "How much interest will I pay over time?",
            ],
          },
          {
            label: "Estimated amount",
            values: [
              {
                value: result.monthlyPayment,
                valueFormat: "currency",
              },
              {
                value: result.totalInterest,
                valueFormat: "currency",
              },
            ],
          },
          {
            label: "Best way to improve it",
            values: [
              "Reduce the loan amount or extend the term",
              "Lower the rate or shorten the term",
            ],
          },
        ],
      },

      ratioBreakdown: {
        title: "Total paid breakdown",
        items: [
          {
            label: "Principal share",
            value: result.totalPaid === 0 ? 0 : 1 - interestRatio,
            valueFormat: "percent",
          },
          {
            label: "Interest share",
            value: interestRatio,
            valueFormat: "percent",
          },
        ],
      },

      chartData: {
        type: "pie",
        title: "Total paid breakdown",
        description:
          "See how the total estimated amount paid is split between principal and interest.",
        valueFormat: "currency",
        centerLabel: "Total paid",
        centerValue: result.totalPaid,
        centerValueFormat: "currency",
        items: [
          {
            label: "Loan amount",
            value: Math.round(result.loanAmount),
          },
          {
            label: "Interest",
            value: Math.round(result.totalInterest),
          },
        ],
      },

      rows: [
        {
          label: "Loan amount",
          value: result.loanAmount,
          valueFormat: "currency",
        },
        {
          label: "Monthly payment",
          value: result.monthlyPayment,
          valueFormat: "currency",
        },
        {
          label: "Total interest",
          value: result.totalInterest,
          valueFormat: "currency",
        },
        {
          label: "Total paid",
          value: result.totalPaid,
          valueFormat: "currency",
        },
        {
          label: "Number of payments",
          value: {
            value: result.numberOfPayments,
            valueFormat: "number",
            suffix: " months",
          },
        },
        {
          label: "Interest share",
          value: {
            value: interestRatio,
            valueFormat: "percent",
            suffix: " of total paid",
          },
        },
      ],
    };
  },
};