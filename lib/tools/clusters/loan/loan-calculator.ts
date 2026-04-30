import type { ToolDefinition } from "../../tool-types";
import { loanRuntime } from "./loan-runtime";

export const loanCalculator: ToolDefinition = {
  slug: loanRuntime.slug,
  fields: loanRuntime.fields,
  calculate: loanRuntime.calculate,
  name: "Loan Calculator",
  shortName: "Loan",
  description:
    "Estimate your monthly loan payment, total interest, and total repayment based on loan amount, interest rate, and loan term.",
  seo: {
    title: "Loan Calculator | Toolorb",
    description:
      "Use this loan calculator to estimate monthly payments, total interest, and total repayment for a fixed-rate loan before you borrow.",
    canonicalPath: "/tools/loan-calculator",
  },
  meta: {
    category: "Finance",
    cluster: "Loan",
relatedToolSlugs: [
  "car-affordability-calculator",
  "auto-loan-calculator",
  "mortgage-calculator",
  "compound-interest-calculator",
],
    lastUpdated: "2026-04-30",
  },
  contentTokens: {
    toolName: "loan calculator",
    loanType: "loan",
    assetLabel: "purchase",
    assetPluralLabel: "purchases",
    assetPriceLabel: "loan amount",
    borrowedAmountLabel: "loan amount",
    downPaymentLabel: "upfront payment",
    termLabel: "loan term",
    rateLabel: "interest rate",
    paymentType: "monthly loan payment",
    monthlyPaymentLabel: "monthly payment",
    totalCostLabel: "total loan cost",
    payoffTimingLabel: "payoff timing",
    basePaymentLabel: "principal and interest",
    costComponents: "principal and interest",
    baseFormulaInputs:
      "loan amount, monthly interest rate, and total number of monthly payments",
    monthlyAddOns: "required loan costs",
    ownershipAddOns: "loan costs",
    estimatedOwnershipAddOns: "estimated loan costs",
    ownershipCostsLabel: "borrowing costs",
    fullPaymentContext: "monthly loan cost",
    comparisonSubject: "loan amounts, loan terms, and interest rates",
    excludedCosts:
      "origination fees, late fees, prepayment penalties, variable rate changes, taxes, insurance, or lender-specific charges",
    longTermCostDriver: "interest rate",
    primaryAudience: "borrowers",
  },
  content: {
    overview: {
      title: "What this {toolName} shows",
      body:
        "This {toolName} estimates your {paymentType}, total interest, and total amount paid over the life of a fixed-rate {loanType}. Use it to compare {comparisonSubject} before committing to a borrowing decision. It is especially useful when two loans have similar monthly payments but very different long-term costs. By reviewing both the payment and the total interest, you can see whether a lower monthly payment is actually worth the extra time, interest, and risk.",
    },
    formula: {
      title: "{loanType} payment formula",
      body:
        "The standard {loanType} payment formula uses the {baseFormulaInputs} to estimate a fixed monthly {basePaymentLabel} payment. The calculator then multiplies that payment across the full term to estimate total paid and total interest.",
    },
    keyTakeaways: {
      title: "Key takeaways",
      items: [
        "The {paymentType} depends mainly on the {borrowedAmountLabel}, {rateLabel}, and {termLabel}.",
        "A longer {termLabel} can lower the {monthlyPaymentLabel}, but it usually increases total interest.",
        "A lower {rateLabel} can reduce both the {monthlyPaymentLabel} and the {totalCostLabel}.",
      ],
    },
    resultGuidance: {
      title: "How to evaluate this result",
      description:
        "Use this estimate to compare affordability and long-term cost before choosing a loan.",
      goodResults: [
        {
          title: "Monthly payment fits comfortably within your budget",
          description:
            "If the estimated payment leaves room for regular expenses, savings, and emergencies, the loan may be easier to manage.",
        },
        {
          title: "Total interest stays controlled",
          description:
            "If interest is a smaller share of the total amount paid, the loan structure may be more efficient.",
        },
      ],
      cautionResults: [
        {
          title: "Low payment with high total interest",
          description:
            "A longer term can make the payment look affordable while increasing the total amount paid over time.",
        },
        {
          title: "High interest share",
          description:
            "If interest is a large share of the total cost, compare shorter terms, lower rates, or a smaller loan amount.",
        },
      ],
      improvementTips: [
        {
          title: "Compare a shorter term",
          description:
            "A shorter {termLabel} usually raises the {monthlyPaymentLabel}, but it can reduce total interest.",
        },
        {
          title: "Test a lower interest rate",
          description:
            "Even a small change in {rateLabel} can meaningfully affect the total cost of the loan.",
        },
        {
          title: "Borrow less if possible",
          description:
            "Reducing the {borrowedAmountLabel} lowers both the payment and total interest.",
        },
      ],
    },
    examples: {
      title: "Example scenarios",
      items: [
        {
          title: "Shorter loan term",
          description:
            "A shorter {termLabel} usually creates a higher {monthlyPaymentLabel}, but it can reduce the total interest paid.",
        },
        {
          title: "Lower interest rate",
          description:
            "A lower {rateLabel} can reduce the monthly payment and the long-term cost of borrowing.",
        },
        {
          title: "Smaller loan amount",
          description:
            "Borrowing less lowers the {monthlyPaymentLabel} and reduces the amount of interest charged over time.",
        },
      ],
    },
    comparison: {
      title: "What is included in this estimate",
      description:
        "This calculator focuses on the core fixed-rate loan payment and separates the main borrowing cost from extra lender-specific costs.",
      rows: [
        {
          label: "Principal",
          value: "Included",
          helperText:
            "This is the original {borrowedAmountLabel} you plan to borrow.",
        },
        {
          label: "Interest",
          value: "Included",
          helperText:
            "Interest is calculated from the annual {rateLabel} and spread across monthly payments.",
        },
        {
          label: "Loan term",
          value: "Included",
          helperText:
            "The {termLabel} controls how many monthly payments are used in the estimate.",
        },
        {
          label: "Lender fees",
          value: "Not included",
          helperText:
            "Origination fees, late fees, and other lender-specific charges are not included.",
        },
      ],
    },
    commonMistakes: {
      title: "Common loan estimate mistakes",
      description:
        "Borrowing decisions often look better than they really are when people focus only on the monthly payment.",
      items: [
        {
          title: "Only looking at the monthly payment",
          description:
            "A lower {monthlyPaymentLabel} can still cost more over time if the {termLabel} is much longer.",
        },
        {
          title: "Ignoring total interest",
          description:
            "Total interest shows how much the loan costs beyond the amount borrowed.",
        },
        {
          title: "Comparing loans with different terms",
          description:
            "Two loans can have similar payments but very different total costs depending on the term and rate.",
        },
        {
          title: "Forgetting lender-specific fees",
          description:
            "This estimate does not include {excludedCosts}, so the real cost may be higher.",
        },
      ],
    },
    definitions: {
      title: "Loan terms used in this calculator",
      description:
        "These definitions explain the main inputs and outputs used in the {loanType} estimate.",
      items: [
        {
          term: "Principal",
          definition:
            "The original amount borrowed before interest is added.",
        },
        {
          term: "Interest",
          definition:
            "The cost of borrowing money, usually shown as an annual percentage rate.",
        },
        {
          term: "Loan term",
          definition:
            "The amount of time used to repay the loan, usually expressed in years.",
        },
        {
          term: "Total paid",
          definition:
            "The full estimated amount paid across the life of the loan, including principal and interest.",
        },
      ],
    },
    assumptions: {
      title: "Assumptions",
      items: [
        "Loan is assumed to be a fixed-rate {loanType} for the full term.",
        "Interest is calculated monthly based on the provided annual rate.",
        "Payments are assumed to be made monthly and on time.",
        "This calculator does not include {excludedCosts}.",
      ],
    },
    methodology: {
      title: "How this loan is calculated",
      items: [
        "Monthly payment is calculated using the standard amortization formula based on loan amount, interest rate, and loan term.",
        "The annual interest rate is converted into a monthly interest rate.",
        "The loan term is converted into the total number of monthly payments.",
        "Total paid is calculated by multiplying the estimated monthly payment by the number of payments.",
        "Total interest is calculated by subtracting the original loan amount from the total amount paid.",
      ],
    },
    steps: {
      title: "How to use this calculator",
      items: [
        "Enter the {borrowedAmountLabel}.",
        "Enter the annual {rateLabel}.",
        "Enter the {termLabel} in years.",
        "Review the estimated {monthlyPaymentLabel}.",
        "Compare the {totalCostLabel} and total interest.",
      ],
    },
    relatedDecision: {
      eyebrow: "Next step",
      title: "Compare this with a mortgage scenario",
      description:
        "If this loan is connected to a home purchase, compare it against a full mortgage estimate that can include taxes, insurance, HOA fees, and PMI.",
      href: "/tools/mortgage-calculator",
      linkLabel: "Open the mortgage calculator",
    },
    faqs: {
      title: "Frequently asked questions",
      items: [
        {
          question: "What does this loan calculator estimate?",
          answer:
            "It estimates the {monthlyPaymentLabel}, total interest, and total paid for a fixed-rate {loanType}.",
        },
        {
          question: "Does this calculator include lender fees?",
          answer:
            "No. This calculator does not include {excludedCosts}. It focuses on principal and interest.",
        },
        {
          question: "Why does a longer loan term cost more?",
          answer:
            "A longer {termLabel} spreads payments out over more months, which can lower the monthly payment but usually increases total interest.",
        },
      ],
    },
  },
};