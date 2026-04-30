import type { ToolDefinition } from "../../tool-types";
import { mortgageRuntime } from "./mortgage-runtime";

export const mortgageCalculator: ToolDefinition = {
  slug: mortgageRuntime.slug,
  fields: mortgageRuntime.fields,
  calculate: mortgageRuntime.calculate,
  name: "Mortgage Calculator",
  shortName: "Mortgage",
  description:
    "Estimate your monthly mortgage payment, total interest, and total repayment based on home price, down payment, interest rate, and loan term.",
  seo: {
    title: "Mortgage Calculator | Toolorb",
    description:
      "Use this mortgage calculator to estimate your monthly payment, including principal, interest, property taxes, home insurance, HOA fees, and PMI.",
    canonicalPath: "/tools/mortgage-calculator",
  },
  meta: {
    category: "Finance",
    cluster: "Mortgage",
    relatedToolSlugs: [
      "auto-loan-calculator",
      "loan-calculator",
      "compound-interest-calculator",
      "car-affordability-calculator",
    ],
    lastUpdated: "2026-04-29",
  },
  contentTokens: {
    toolName: "mortgage calculator",
    loanType: "mortgage",
    assetLabel: "home",
    assetPluralLabel: "homes",
    assetPriceLabel: "home price",
    borrowedAmountLabel: "loan amount",
    downPaymentLabel: "down payment",
    termLabel: "loan term",
    rateLabel: "interest rate",
    paymentType: "monthly mortgage payment",
    monthlyPaymentLabel: "monthly payment",
    totalCostLabel: "total loan cost",
    payoffTimingLabel: "payoff timing",
    basePaymentLabel: "principal and interest",
    costComponents:
      "principal, interest, property taxes, homeowners insurance, HOA fees, and PMI",
    baseFormulaInputs:
      "loan amount, monthly interest rate, and total number of monthly payments",
    monthlyAddOns:
      "property taxes, homeowners insurance, HOA fees, and PMI",
    ownershipAddOns:
      "property taxes, homeowners insurance, HOA fees, and PMI",
    estimatedOwnershipAddOns:
      "estimated property taxes, homeowners insurance, HOA dues, and PMI",
    ownershipCostsLabel: "ownership costs",
    fullPaymentContext: "full monthly housing cost",
    comparisonSubject:
      "home prices, down payments, loan terms, and interest rates",
    excludedCosts:
      "closing costs, refinancing, rate changes, or prepayment penalties",
    longTermCostDriver: "interest rate",
    primaryAudience: "home buyers",
  },
  content: {
overview: {
  title: "What this {toolName} shows",
  body:
    "This {toolName} estimates your {paymentType} and breaks down how much goes toward {costComponents}. Instead of showing only the base {basePaymentLabel} payment, it gives you a fuller monthly housing estimate so you can compare {comparisonSubject} more clearly. Use the result to pressure-test affordability before committing, especially if taxes, insurance, HOA fees, or PMI could change the true monthly cost.",
},
    formula: {
      title: "{loanType} payment formula",
      body: "The standard {loanType} payment formula uses the {baseFormulaInputs} to estimate the fixed monthly {basePaymentLabel} payment. This {toolName} then adds estimated monthly {monthlyAddOns} so the final payment is closer to the {fullPaymentContext}.",
    },
    keyTakeaways: {
      title: "Key takeaways",
      items: [
        "The {paymentType} shown includes {costComponents}.",
        "A larger {downPaymentLabel} lowers the {borrowedAmountLabel} and can reduce both monthly cost and total interest.",
        "A higher {longTermCostDriver} can dramatically increase the total cost over a 30-year loan.",
      ],
    },
    resultGuidance: {
      title: "How to evaluate this result",
      description:
        "Use this estimate to understand what you can afford and how different loan choices affect your monthly cost and long-term interest.",
      goodResults: [
        {
          title: "Monthly payment fits comfortably within your budget",
          description:
            "If your estimated payment leaves room for savings, emergencies, and other expenses, the loan structure is likely sustainable long term.",
        },
        {
          title: "Lower total interest with shorter terms",
          description:
            "If switching to a shorter {termLabel} significantly reduces total interest without making payments unaffordable, it may be a strong long-term decision.",
        },
      ],
      cautionResults: [
        {
          title: "Payment is high relative to your income",
          description:
            "If the estimated monthly cost feels tight or limits your ability to save, you may need to adjust {assetPriceLabel}, {downPaymentLabel}, or {termLabel}.",
        },
        {
          title: "High interest cost over the life of the loan",
          description:
            "Longer terms and higher rates can result in paying significantly more in interest. Review the total cost, not just the {monthlyPaymentLabel}.",
        },
      ],
      improvementTips: [
        {
          title: "Increase your down payment",
          description:
            "A larger {downPaymentLabel} reduces your {borrowedAmountLabel}, {monthlyPaymentLabel}, and may eliminate private mortgage insurance.",
        },
        {
          title: "Compare loan terms and rates",
          description:
            "Even small changes in {rateLabel} or term length can significantly affect both monthly payments and total cost.",
        },
        {
          title: "Adjust price range early",
          description:
            "If the payment is too high, lowering the target {assetPriceLabel} is often the most effective way to bring costs into a comfortable range.",
        },
      ],
    },
    examples: {
      title: "Example scenarios",
      items: [
        {
          title: "Lower down payment",
          description:
            "A smaller {downPaymentLabel} may make the {assetLabel} easier to buy upfront, but it usually increases the {monthlyPaymentLabel}, total interest, and possible PMI cost.",
        },
        {
          title: "Higher interest rate",
          description:
            "Even a small rate increase can raise the {monthlyPaymentLabel} and add thousands of dollars in interest over the life of the loan.",
        },
        {
          title: "HOA or PMI added",
          description:
            "Monthly HOA fees and PMI do not reduce the loan balance, but they still affect affordability and should be included when comparing {assetPluralLabel}.",
        },
      ],
    },
    comparison: {
      title: "What is included in this estimate",
      description:
        "This calculator separates the major parts of a monthly housing payment so you can see what belongs to the {loanType} itself and what comes from {ownershipCostsLabel}.",
      rows: [
        {
          label: "Principal and interest",
          value: "Included",
          helperText:
            "This is the core {loanType} payment based on the {borrowedAmountLabel}, rate, and term.",
        },
        {
          label: "Property taxes",
          value: "Included",
          helperText:
            "Entered as a yearly amount and converted into an estimated monthly cost.",
        },
        {
          label: "Home insurance",
          value: "Included",
          helperText:
            "Entered as a yearly amount and converted into an estimated monthly cost.",
        },
        {
          label: "HOA fees",
          value: "Included",
          helperText: "Entered directly as a monthly cost.",
        },
        {
          label: "PMI",
          value: "Included",
          helperText:
            "Entered directly as a monthly cost for loans that require private mortgage insurance.",
        },
      ],
    },
    commonMistakes: {
      title: "Common mortgage estimate mistakes",
      description:
        "Mortgage affordability problems often come from leaving out costs that do not appear in the base {basePaymentLabel} payment.",
      items: [
        {
          title: "Only looking at principal and interest",
          description:
            "Taxes, insurance, HOA fees, and PMI can add hundreds of dollars to the {monthlyPaymentLabel}.",
        },
        {
          title: "Ignoring repair and maintenance costs",
          description:
            "A {loanType} payment can look affordable while the full cost of owning the {assetLabel} is still tight.",
        },
        {
          title: "Using an unrealistic property tax estimate",
          description:
            "Property taxes can change after purchase, especially if the home was recently reassessed or sold at a much higher price.",
        },
        {
          title: "Assuming the lowest payment is always best",
          description:
            "A lower {monthlyPaymentLabel} can sometimes mean a longer {termLabel} and much higher total interest.",
        },
      ],
    },
    definitions: {
      title: "Mortgage terms used in this calculator",
      description:
        "These definitions explain the main inputs and outputs used in the {loanType} estimate.",
      items: [
        {
          term: "Principal",
          definition:
            "The amount of money borrowed after subtracting the {downPaymentLabel} from the {assetPriceLabel}.",
        },
        {
          term: "Interest",
          definition:
            "The cost of borrowing money from the lender, usually shown as an annual percentage rate.",
        },
        {
          term: "PMI",
          definition:
            "Private mortgage insurance, which may be required when the down payment is below a certain level.",
        },
        {
          term: "Escrow",
          definition:
            "A payment arrangement where property taxes and homeowners insurance are collected monthly with the {loanType} payment.",
        },
      ],
    },
    assumptions: {
      title: "Assumptions",
      items: [
        "Loan is assumed to be a fixed-rate {loanType} for the full term.",
        "Interest is calculated monthly based on the provided annual rate.",
        "Property taxes, insurance, and HOA fees are treated as stable monthly estimates, but may change over time.",
        "Private mortgage insurance (PMI) may apply depending on down payment size and lender requirements.",
        "This calculator does not include {excludedCosts}.",
      ],
    },
methodology: {
  title: "How this mortgage is calculated",
  items: [
    "Monthly payment is calculated using the standard amortization formula based on loan amount, interest rate, and loan term.",
    "Principal and interest are determined by spreading the loan balance across all payments while applying interest to the remaining balance each month.",
    "Interest is front-loaded, meaning early payments go more toward interest and later payments go more toward principal.",
    "Property taxes, insurance, HOA fees, and PMI (if applicable) are added on top of the base loan payment to estimate the full monthly cost.",
    "Total interest is calculated by subtracting the original loan amount from the total of all payments over the loan term.",
    "Extra monthly payments are applied directly to principal, which reduces total interest and shortens the loan payoff timeline.",
  ],
},
    steps: {
      title: "How to use this calculator",
      items: [
        "Enter the {assetPriceLabel}.",
        "Enter the {downPaymentLabel}.",
        "Enter the annual interest rate.",
        "Enter the {termLabel} in years.",
        "Choose the loan start date.",
        "Review the estimated {monthlyPaymentLabel} and {totalCostLabel}.",
      ],
    },
    relatedDecision: {
      eyebrow: "Next step",
      title: "Compare a lower-cost mortgage scenario",
      description:
        "Before relying on one estimate, test at least one lower-price, higher-down-payment, or shorter-term scenario. Comparing multiple versions helps you see whether the payment is truly comfortable or only works under ideal assumptions.",
      href: "/tools/mortgage-calculator",
      linkLabel: "Run another mortgage scenario",
    },
    faqs: {
      title: "Frequently asked questions",
      items: [
        {
          question:
            "Does this mortgage calculator include taxes and insurance?",
          answer:
            "Yes. This calculator can include {estimatedOwnershipAddOns} when those fields are filled in.",
        },
        {
          question: "Why does the loan start date matter?",
          answer:
            "The loan start date will matter for future amortization schedules, {payoffTimingLabel}, and month-by-month payment breakdowns.",
        },
        {
          question: "Is this mortgage payment exact?",
          answer:
            "No. This calculator provides an estimate based on the inputs you enter. Your real payment can vary based on lender fees, escrow, taxes, insurance, PMI, and loan terms.",
        },
      ],
    },
  },
};