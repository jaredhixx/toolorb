import type { RuntimeToolDefinition } from "../../tool-runtime-types";
import {
  createDecisionSummary,
  evaluateNumberDecisionRule,
} from "../../tool-decision-rules";
import { calculateCompoundInterest } from "./compound-interest-formulas";

export const compoundInterestRuntime: RuntimeToolDefinition = {
  slug: "compound-interest-calculator",
  declaredInternalLinks: [],

  fields: [
    {
      name: "initialDeposit",
      label: "Initial deposit",
      type: "number",
      defaultValue: 10000,
      min: 0,
      max: 100000000,
      step: 1000,
      suffix: "$",
    },
    {
      name: "monthlyContribution",
      label: "Monthly contribution",
      type: "number",
      defaultValue: 250,
      min: 0,
      max: 100000000,
      step: 50,
      suffix: "$",
    },
    {
      name: "annualReturnRate",
      label: "Annual return",
      type: "number",
      defaultValue: 7,
      min: 0,
      max: 100,
      step: 0.1,
      suffix: "%",
    },
    {
      name: "years",
      label: "Years to grow",
      type: "number",
      defaultValue: 20,
      min: 1,
      max: 100,
      step: 1,
      suffix: "years",
    },
  ],

  calculate(values) {
    const result = calculateCompoundInterest(values);

    const growthRatio =
      result.finalBalance === 0
        ? 0
        : result.interestEarned / result.finalBalance;

    const growthSignal = evaluateNumberDecisionRule(growthRatio, [
      {
        max: 0.25,
        label: "Growth share",
        value: "Contribution-heavy",
        helperText:
          "Most of the projected balance comes from your own contributions.",
        tone: "neutral",
      },
      {
        max: 0.5,
        label: "Growth share",
        value: "Balanced growth",
        helperText:
          "Investment growth makes up a meaningful share of the projected balance.",
        tone: "positive",
      },
      {
        label: "Growth share",
        value: "Growth-driven",
        helperText:
          "A large share of the projected balance comes from compounding growth.",
        tone: "positive",
      },
    ]);

    return {
      primaryLabel: "Projected future balance",
      primaryValue: result.finalBalance,
      primaryValueFormat: "currency",
      primaryHelperText:
        "This is the estimated future value based on your starting amount, monthly contributions, return rate, and time horizon.",

      decisionSummary: createDecisionSummary({
        title: "Growth insight",
        input: growthRatio,
        rules: [
          {
            max: 0.25,
            label: "Growth insight",
            value: "Mostly contributions",
            description:
              "Your projected result is mostly driven by the money you put in. More time or a higher return rate can increase the compounding effect.",
            tone: "neutral",
          },
          {
            max: 0.5,
            label: "Growth insight",
            value: "Compounding is helping",
            description:
              "Investment growth is becoming a meaningful part of the projected balance.",
            tone: "positive",
          },
          {
            label: "Growth insight",
            value: "Strong compounding effect",
            description:
              "Compounding growth is a major part of the projected balance over this time period.",
            tone: "positive",
          },
        ],
        additionalItems: [
          growthSignal,
          {
            label: "Interest earned",
            value: result.interestEarned,
            valueFormat: "currency",
            helperText:
              "This is the estimated growth above your total contributions.",
            tone: "positive",
          },
          {
            label: "Total contributions",
            value: result.totalContributions,
            valueFormat: "currency",
            helperText:
              "This includes your initial deposit plus monthly contributions.",
            tone: "neutral",
          },
        ],
      }),

      resultGuidance: {
        title: "What this projection means",
        description:
          "Use this estimate to compare how time, contributions, and return assumptions change long-term growth.",
        items: [
          {
            title: "Time is a major input",
            description:
              "Longer time periods give compounding more room to affect the final balance.",
          },
          {
            title: "Contributions build the base",
            description:
              "Regular monthly contributions can meaningfully increase the projected balance.",
          },
          {
            title: "Return assumptions are not guaranteed",
            description:
              "Actual investment returns can be higher or lower than the rate used in this estimate.",
          },
        ],
      },

      scenarioComparison: {
        title: "Scenario comparison",
        description:
          "Use these signals to compare your contribution base against projected investment growth.",
        headers: ["Contributions", "Growth"],
        rows: [
          {
            label: "Main question",
            values: [
              "How much am I putting in?",
              "How much growth is projected?",
            ],
          },
          {
            label: "Estimated amount",
            values: [
              {
                value: result.totalContributions,
                valueFormat: "currency",
              },
              {
                value: result.interestEarned,
                valueFormat: "currency",
              },
            ],
          },
          {
            label: "Best way to improve it",
            values: [
              "Increase monthly contributions",
              "Increase time horizon or expected return",
            ],
          },
        ],
      },

      ratioBreakdown: {
        title: "Projected balance breakdown",
        items: [
          {
            label: "Contributions",
            value:
              result.finalBalance === 0
                ? 0
                : result.totalContributions / result.finalBalance,
            valueFormat: "percent",
          },
          {
            label: "Growth",
            value: growthRatio,
            valueFormat: "percent",
          },
        ],
      },

      chartData: {
        type: "pie",
        title: "Projected balance breakdown",
        description:
          "See how the projected balance is split between money contributed and estimated growth.",
        valueFormat: "currency",
        centerLabel: "Future balance",
        centerValue: result.finalBalance,
        centerValueFormat: "currency",
        items: [
          {
            label: "Contributions",
            value: Math.round(result.totalContributions),
          },
          {
            label: "Growth",
            value: Math.round(result.interestEarned),
          },
        ],
      },

      rows: [
        {
          label: "Initial deposit",
          value: result.initialDeposit,
          valueFormat: "currency",
        },
        {
          label: "Monthly contribution",
          value: result.monthlyContribution,
          valueFormat: "currency",
        },
        {
          label: "Projected future balance",
          value: result.finalBalance,
          valueFormat: "currency",
        },
        {
          label: "Total contributions",
          value: result.totalContributions,
          valueFormat: "currency",
        },
        {
          label: "Estimated growth",
          value: result.interestEarned,
          valueFormat: "currency",
        },
        {
          label: "Growth share",
          value: {
            value: growthRatio,
            valueFormat: "percent",
            suffix: " of projected balance",
          },
        },
      ],
    };
  },
};