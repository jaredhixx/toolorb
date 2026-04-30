import type { ToolDefinition } from "../../tool-types";
import { carAffordabilityRuntime } from "./car-affordability-runtime";

export const carAffordabilityCalculator: ToolDefinition = {
  slug: carAffordabilityRuntime.slug,

  name: "Car Affordability Calculator",

  shortName: "Car Affordability",

  description:
    "Estimate how much car you can afford based on your income, debt, down payment, and target monthly payment range.",

  fields: carAffordabilityRuntime.fields,
  calculate: carAffordabilityRuntime.calculate,

  seo: {
    title: "Car Affordability Calculator (How Much Car Can I Afford?)",
    description:
      "Use this car affordability calculator to estimate how much car you can afford based on income, debts, down payment, and loan terms.",
    canonicalPath: "/tools/car-affordability-calculator",
  },

  meta: {
    category: "Finance",
    cluster: "Loan",
    relatedToolSlugs: [
      "auto-loan-calculator",
      "loan-calculator",
      "mortgage-calculator",
    ],
    lastUpdated: "2026-04-30",
  },

  content: {
    overview: {
      title: "Car Affordability Calculator",
      body:
        "A car affordability calculator helps you estimate how much vehicle you can realistically afford based on your income, existing debt, and target monthly payment. Instead of guessing based on car prices alone, this approach focuses on your budget and financial flexibility. It helps you avoid taking on a payment that looks manageable at first but becomes difficult over time when combined with insurance, fuel, maintenance, registration, repairs, and other ownership costs. Use the estimate before shopping so you can compare vehicles with a clear price range instead of reacting only to dealer financing offers.",
    },

    keyTakeaways: {
      title: "Key takeaways",
      items: [
        "Your monthly car payment should be a controlled percentage of your income.",
        "Existing debt reduces how much flexibility you have for a new car payment.",
        "The affordable car price depends on both your payment target and your down payment.",
      ],
    },

    formula: {
      title: "How affordability is estimated",
      body:
        "Car affordability is estimated by calculating a target monthly payment based on your income, then converting that payment into a loan amount using an amortization formula. The down payment is then added to estimate the total vehicle price you can afford.",
    },

    steps: {
      title: "How to use this calculator",
      items: [
        "Enter your monthly income before taxes.",
        "Input your existing monthly debt payments.",
        "Choose a target percentage of income for your car payment.",
        "Enter your expected down payment, rate, and term.",
        "Click calculate to see your estimated affordable car price.",
      ],
    },

    commonMistakes: {
      title: "Common car affordability mistakes",
      items: [
        {
          title: "Focusing only on the car price",
          description:
            "A vehicle price can look affordable, but the monthly payment depends on financing terms, interest rate, and loan length.",
        },
        {
          title: "Ignoring other ownership costs",
          description:
            "Insurance, maintenance, fuel, and registration can add significant monthly cost beyond the loan payment.",
        },
        {
          title: "Stretching the payment too far",
          description:
            "Choosing a high percentage of income for a car payment can limit flexibility and increase financial stress.",
        },
      ],
    },

    faqs: {
      title: "Car affordability FAQs",
      items: [
        {
          question: "How much of my income should go to a car payment?",
          answer:
            "Many guidelines suggest keeping your car payment around 10% of your monthly income, though this can vary based on debt and expenses.",
        },
        {
          question: "Is it better to increase my down payment?",
          answer:
            "A larger down payment reduces the loan amount, which can lower your monthly payment and total interest.",
        },
        {
          question: "Does loan term affect affordability?",
          answer:
            "Yes. Longer terms lower monthly payments but increase total interest, which can make the car more expensive overall.",
        },
      ],
    },
  },
};