import type { ToolDefinition } from "../../tool-types";
import { compoundInterestRuntime } from "./compound-interest-runtime";

export const compoundInterestCalculator: ToolDefinition = {
  slug: compoundInterestRuntime.slug,
  fields: compoundInterestRuntime.fields,
  calculate: compoundInterestRuntime.calculate,
  name: "Compound Interest Calculator",
  shortName: "Compound Interest",
  description:
    "Estimate how savings or investments can grow over time with compound interest, regular contributions, and an assumed annual return.",
  seo: {
    title: "Compound Interest Calculator | Toolorb",
    description:
      "Use this compound interest calculator to estimate future balance, total contributions, and growth from savings or investments over time.",
    canonicalPath: "/tools/compound-interest-calculator",
  },
  meta: {
    category: "Finance",
    cluster: "Investment",
    relatedToolSlugs: [
      "auto-loan-calculator",
      "loan-calculator",
      "mortgage-calculator",
    ],
    lastUpdated: "2026-04-30",
  },
  contentTokens: {
    toolName: "compound interest calculator",
    accountType: "savings or investment account",
    growthType: "compound growth",
    contributionLabel: "monthly contribution",
    returnLabel: "annual return",
    timeLabel: "time horizon",
    finalBalanceLabel: "projected future balance",
    totalContributionsLabel: "total contributions",
    growthLabel: "estimated growth",
    comparisonSubject: "starting balances, contribution amounts, return rates, and timelines",
    excludedCosts:
      "taxes, inflation, investment fees, market volatility, account rules, or withdrawal penalties",
  },
  content: {
    overview: {
      title: "What this {toolName} shows",
      body:
        "This {toolName} estimates how your money could grow over time when returns are reinvested and allowed to compound. It uses your starting balance, {contributionLabel}, {returnLabel}, and {timeLabel} to estimate a {finalBalanceLabel}. It also separates your own contributions from projected growth, so you can see whether the final result is mostly driven by savings or by compounding. Use it to compare {comparisonSubject} before setting a savings or investing target.",
    },
    formula: {
      title: "Compound interest formula",
      body:
        "Compound interest estimates growth by repeatedly applying a return rate to the current balance. This calculator compounds monthly, adds the monthly contribution, and repeats the process across the selected time period. That lets the estimate show both the money you add yourself and the growth produced by reinvested returns.",
    },
    keyTakeaways: {
      title: "Key takeaways",
      items: [
        "A longer {timeLabel} gives compound growth more time to affect the final result.",
        "A higher {contributionLabel} increases the amount of money working for you each month.",
        "The {returnLabel} is an assumption, not a guarantee, especially for investments.",
      ],
    },
    resultGuidance: {
      title: "How to evaluate this result",
      description:
        "Use the result to understand the balance between your own contributions and projected growth.",
      goodResults: [
        {
          title: "Growth becomes a meaningful share of the result",
          description:
            "When estimated growth is a large share of the balance, compounding is doing more of the work.",
        },
        {
          title: "Contributions are consistent",
          description:
            "Regular contributions can make the projection more reliable than depending only on return assumptions.",
        },
      ],
      cautionResults: [
        {
          title: "Return assumptions may be too optimistic",
          description:
            "Actual investment returns can vary widely and may not match the assumed annual return.",
        },
        {
          title: "Fees and taxes are not included",
          description:
            "This estimate does not include {excludedCosts}, which can reduce real-world results.",
        },
      ],
      improvementTips: [
        {
          title: "Increase the monthly contribution",
          description:
            "Adding more each month can raise the projected balance and reduce dependence on investment returns.",
        },
        {
          title: "Extend the time horizon",
          description:
            "More time can increase the effect of compounding, especially when contributions continue.",
        },
        {
          title: "Use conservative return assumptions",
          description:
            "Testing lower return rates can help you plan with more realistic expectations.",
        },
      ],
    },
    examples: {
      title: "Example scenarios",
      items: [
        {
          title: "Starting earlier",
          description:
            "A longer {timeLabel} gives compounding more opportunities to build on previous growth.",
        },
        {
          title: "Increasing monthly contributions",
          description:
            "A higher {contributionLabel} raises the amount invested or saved over time.",
        },
        {
          title: "Testing different return rates",
          description:
            "Changing the {returnLabel} shows how sensitive the final result is to growth assumptions.",
        },
      ],
    },
    comparison: {
      title: "What is included in this projection",
      description:
        "This calculator focuses on the core growth projection and does not attempt to model every real-world account cost or tax rule.",
      rows: [
        {
          label: "Initial deposit",
          value: "Included",
          helperText:
            "This is the starting balance used at the beginning of the projection.",
        },
        {
          label: "Monthly contributions",
          value: "Included",
          helperText:
            "This is the recurring amount added each month during the projection.",
        },
        {
          label: "Compounded growth",
          value: "Included",
          helperText:
            "Growth is estimated monthly based on the annual return assumption.",
        },
        {
          label: "Taxes, fees, and inflation",
          value: "Not included",
          helperText:
            "This projection does not include {excludedCosts}.",
        },
      ],
    },
    commonMistakes: {
      title: "Common compound interest mistakes",
      description:
        "Long-term projections can look more precise than they really are when important assumptions are ignored.",
      items: [
        {
          title: "Assuming the return is guaranteed",
          description:
            "The {returnLabel} is only an assumption. Actual results can be higher or lower.",
        },
        {
          title: "Ignoring fees and taxes",
          description:
            "Real account costs can reduce the final balance compared with this estimate.",
        },
        {
          title: "Waiting too long to start",
          description:
            "Delaying contributions can reduce the amount of time available for compounding.",
        },
        {
          title: "Only looking at the final number",
          description:
            "Review both {totalContributionsLabel} and {growthLabel} to understand what is driving the result.",
        },
      ],
    },
    definitions: {
      title: "Compound interest terms used in this calculator",
      description:
        "These definitions explain the main inputs and outputs used in the projection.",
      items: [
        {
          term: "Compound interest",
          definition:
            "Growth calculated on both the original amount and any previous growth that remains invested or saved.",
        },
        {
          term: "Initial deposit",
          definition:
            "The amount of money included at the start of the projection.",
        },
        {
          term: "Monthly contribution",
          definition:
            "The amount added every month during the projection.",
        },
        {
          term: "Annual return",
          definition:
            "The assumed yearly growth rate used for the estimate.",
        },
      ],
    },
    assumptions: {
      title: "Assumptions",
      items: [
        "Returns are assumed to compound monthly.",
        "Monthly contributions are added once per month.",
        "The annual return is assumed to stay constant for the full projection.",
        "This calculator does not include {excludedCosts}.",
      ],
    },
    methodology: {
      title: "How this projection is calculated",
      items: [
        "The annual return rate is converted into a monthly return rate.",
        "The starting balance is grown by the monthly return rate.",
        "The monthly contribution is added after each monthly growth step.",
        "The process repeats for the selected number of months.",
        "Estimated growth is calculated by subtracting total contributions from the projected future balance.",
      ],
    },
    steps: {
      title: "How to use this calculator",
      items: [
        "Enter your initial deposit.",
        "Enter your planned monthly contribution.",
        "Enter the assumed annual return.",
        "Enter the number of years to grow.",
        "Review the projected future balance, total contributions, and estimated growth.",
      ],
    },
    relatedDecision: {
      eyebrow: "Compare borrowing cost",
      title: "Compare this growth projection with loan costs",
      description:
        "If you are deciding between saving, investing, or paying down debt, compare this projection with estimated borrowing costs.",
      href: "/tools/loan-calculator",
      linkLabel: "Open the loan calculator",
    },
    faqs: {
      title: "Frequently asked questions",
      items: [
        {
          question: "What does this compound interest calculator estimate?",
          answer:
            "It estimates a {finalBalanceLabel}, {totalContributionsLabel}, and {growthLabel} based on your starting balance, contributions, return assumption, and time period.",
        },
        {
          question: "Does this guarantee future investment returns?",
          answer:
            "No. The {returnLabel} is only an assumption. Actual savings or investment results may be higher or lower.",
        },
        {
          question: "Does this include taxes or investment fees?",
          answer:
            "No. This estimate does not include {excludedCosts}.",
        },
      ],
    },
  },
};