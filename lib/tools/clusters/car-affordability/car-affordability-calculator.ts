import type { ToolDefinition } from "../../tool-types";
import { carAffordabilityRuntime } from "./car-affordability-runtime";

export const carAffordabilityCalculator: ToolDefinition = {
  slug: carAffordabilityRuntime.slug,

  name: "Car Affordability Calculator",

  shortName: "Car Affordability",

  description:
    "Estimate how much car you can afford based on your income, existing debts, down payment, interest rate, loan term, and target monthly payment comfort zone.",

  fields: carAffordabilityRuntime.fields,
  calculate: carAffordabilityRuntime.calculate,

  seo: {
    title: "Car Affordability Calculator — Safe Budget Estimate",
    description:
      "Estimate how much car you can safely afford based on income, debt, down payment, interest rate, and monthly payment comfort before shopping for a vehicle.",
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
    lastUpdated: "2026-05-08",
  },

  content: {
    overview: {
      title: "Car Affordability Calculator",
      body:
        "This car affordability calculator helps you estimate a realistic vehicle budget before you shop, negotiate, or apply for financing. Instead of starting with the car price a dealer shows you, it starts with your monthly income, existing debt, down payment, interest rate, loan term, and target payment percentage. That matters because the real question is not only whether a lender may approve the loan. The safer question is whether the payment still leaves room for insurance, fuel, maintenance, registration, repairs, savings, rent, groceries, emergencies, and normal life. Use the result as a practical price range, then compare it with real quotes before committing to a vehicle.",
    },

    keyTakeaways: {
      title: "Key takeaways",
      items: [
        "A safer car budget starts with the monthly payment you can comfortably handle, not the biggest loan you can qualify for.",
        "Existing monthly debt lowers your flexibility because the new car payment has to fit beside your other required payments.",
        "A larger down payment can increase your affordable vehicle price without forcing the monthly payment higher.",
        "Longer loan terms can make a car look affordable monthly while increasing total interest and long-term risk.",
      ],
    },

    resultGuidance: {
      title: "How to read your car affordability result",
      description:
        "The result is a planning estimate, not a guarantee from a lender or dealer. Treat it as the upper edge of your shopping range, then sanity-check the payment against your full transportation cost and your emergency savings before you buy.",
      goodResults: [
        {
          title: "The payment leaves breathing room",
          description:
            "A stronger result means the estimated payment fits inside your target percentage and still leaves money for insurance, fuel, maintenance, savings, and unexpected expenses.",
        },
        {
          title: "The down payment reduces pressure",
          description:
            "A meaningful down payment lowers the amount financed, which can reduce the monthly payment, total interest, and chance of owing more than the car is worth.",
        },
        {
          title: "The term is not doing all the work",
          description:
            "A result is healthier when affordability comes from a reasonable price and down payment, not only from stretching the loan across many years.",
        },
      ],
      cautionResults: [
        {
          title: "The payment uses too much income",
          description:
            "If the estimated payment feels tight before insurance and maintenance, the actual ownership cost may become stressful after the purchase.",
        },
        {
          title: "The estimate depends on a long term",
          description:
            "A longer term can lower the payment, but it often increases total interest and can keep you in debt longer than the vehicle feels new.",
        },
        {
          title: "Your other debt is already high",
          description:
            "Credit cards, personal loans, student loans, and existing vehicle payments reduce the room available for a new car, even when income looks strong on paper.",
        },
      ],
      improvementTips: [
        {
          title: "Lower the target vehicle price",
          description:
            "Shopping below the top estimate gives you room for taxes, fees, insurance changes, repairs, and normal budget surprises.",
        },
        {
          title: "Increase the down payment",
          description:
            "Adding cash down can make the same vehicle easier to afford without relying on a longer loan term.",
        },
        {
          title: "Compare the payment in the auto loan calculator",
          description:
            "After you find a real vehicle price, use the auto loan calculator to estimate the exact payment with taxes, fees, rate, and term.",
        },
      ],
    },

    formula: {
      title: "How car affordability is estimated",
      body:
        "The calculator first estimates a target monthly payment from your income and chosen payment percentage, then compares that payment with your existing monthly debts. It converts the payment target into an estimated loan amount using a standard amortization approach based on the interest rate and loan term. Finally, it adds your down payment to estimate the vehicle price range. The estimate is most useful when you treat it as a conservative planning range instead of a permission slip to spend the maximum amount shown.",
    },

    examples: {
      title: "Car affordability examples by income",
      items: [
        {
          title: "$3,500 monthly income",
          description:
            "At a 10% target, the payment comfort zone starts around $350 per month before insurance, fuel, and maintenance. If existing debt is already high, the safer vehicle budget may be lower than the calculator's top-line estimate.",
        },
        {
          title: "$5,000 monthly income",
          description:
            "At a 10% target, a $500 monthly payment may look reasonable, but taxes, insurance, and repairs can push the real transportation cost higher. A stronger budget leaves room below the maximum estimate.",
        },
        {
          title: "$7,500 monthly income",
          description:
            "Higher income can support a larger payment, but the same rule still applies: the best car budget protects savings, housing costs, childcare, debt payoff, and emergency expenses first.",
        },
      ],
    },

    comparison: {
      title: "Safe vs stretched car budget",
      description:
        "Two buyers can have the same income and still need very different car budgets. The safer choice depends on debt, savings, insurance cost, job stability, family expenses, and how long you plan to keep the vehicle.",
      rows: [
        {
          label: "Conservative budget",
          value: "Lower payment target",
          helperText:
            "Best when you want more room for savings, repairs, insurance increases, childcare, housing costs, or uncertain income.",
        },
        {
          label: "Balanced budget",
          value: "Moderate payment target",
          helperText:
            "Works when your debt is controlled, your emergency savings are healthy, and the vehicle is important for work or family needs.",
        },
        {
          label: "Stretched budget",
          value: "Higher payment target",
          helperText:
            "Riskier because the payment may still qualify on paper while leaving too little room for real ownership costs and surprise expenses.",
        },
      ],
    },

    assumptions: {
      title: "What this calculator does and does not include",
      items: [
        "The estimate focuses on the vehicle price and loan payment, not the full lifetime cost of owning the car.",
        "Insurance, fuel, maintenance, repairs, registration, parking, and inspection costs should be budgeted separately.",
        "Actual lender approval can depend on credit score, income verification, debt-to-income ratio, vehicle age, loan-to-value ratio, and lender rules.",
        "Dealer fees, taxes, trade-in value, rebates, and warranties can change the final amount financed.",
      ],
    },

    methodology: {
      title: "A practical way to choose your car budget",
      items: [
        "Start with the payment you can afford during a normal month, not an unusually good month.",
        "Subtract existing debt pressure before assuming the full target payment is available for a car.",
        "Test several down payment and term combinations before deciding that a vehicle is affordable.",
        "Use the final estimate as a shopping ceiling, then look for vehicles below that ceiling to leave room for real-world costs.",
      ],
    },

    steps: {
      title: "How to use this calculator",
      items: [
        "Enter your monthly income before taxes so the calculator can estimate a payment range from your income.",
        "Enter your current monthly debt payments, including credit cards, personal loans, student loans, and other required debt payments.",
        "Choose the percentage of income you are comfortable putting toward a car payment.",
        "Enter your expected down payment, interest rate, and loan term.",
        "Review the estimated affordable car price, then compare the result against insurance, fuel, and maintenance costs before shopping.",
      ],
    },

    commonMistakes: {
      title: "Common car affordability mistakes",
      description:
        "Most car affordability mistakes happen because the monthly payment is judged in isolation. A payment can look manageable at the dealership and still become a problem once the full cost of ownership hits the budget.",
      items: [
        {
          title: "Focusing only on the vehicle price",
          description:
            "A vehicle price can look affordable, but the monthly payment depends on the interest rate, loan term, taxes, fees, down payment, and add-ons included in the financing.",
        },
        {
          title: "Ignoring insurance before buying",
          description:
            "Insurance can change dramatically by vehicle, driver, deductible, coverage level, and location. Get an insurance quote before assuming the monthly payment is affordable.",
        },
        {
          title: "Using a long loan term to justify the car",
          description:
            "A longer term may lower the payment, but it can increase total interest and make it easier to buy more car than your budget can comfortably support.",
        },
        {
          title: "Forgetting maintenance and repairs",
          description:
            "Tires, brakes, oil changes, registration, inspections, and unexpected repairs can turn a borderline payment into a stressful monthly obligation.",
        },
        {
          title: "Assuming approval means affordability",
          description:
            "A lender may approve a loan that is still uncomfortable for your actual household budget. Approval is not the same as long-term financial fit.",
        },
        {
          title: "Shopping at the maximum estimate",
          description:
            "The top estimate should usually be treated as a ceiling. Shopping below it gives you more room for taxes, fees, insurance, and unexpected expenses.",
        },
      ],
    },

    definitions: {
      title: "Car affordability terms to know",
      description:
        "These terms affect how much vehicle you can afford and how risky the payment may feel after the purchase.",
      items: [
        {
          term: "Target payment percentage",
          definition:
            "The share of monthly income you are willing to put toward the car payment. A lower percentage is usually safer because it leaves more room for the rest of your budget.",
        },
        {
          term: "Down payment",
          definition:
            "Cash paid upfront toward the vehicle. A larger down payment reduces the loan amount and can make the monthly payment easier to manage.",
        },
        {
          term: "Loan term",
          definition:
            "The number of months used to repay the loan. Longer terms usually lower the monthly payment but can increase total interest and long-term risk.",
        },
        {
          term: "Debt pressure",
          definition:
            "The amount of your monthly income already committed to other debts. Higher debt pressure usually means less safe room for a new car payment.",
        },
      ],
    },

    relatedDecision: {
      eyebrow: "Next step",
      title: "Already have a vehicle price in mind?",
      description:
        "Once you know the price of a specific car, use the auto loan calculator to estimate the monthly payment with taxes, fees, down payment, interest rate, and loan term.",
      href: "/tools/auto-loan-calculator",
      linkLabel: "Estimate the auto loan payment",
    },

    faqs: {
      title: "Car affordability FAQs",
      items: [
        {
          question: "How much car can I afford based on income?",
          answer:
            "A common starting point is to keep the car payment near a controlled percentage of monthly income, often around 10% for a conservative target. The safer number depends on your debt, savings, insurance cost, housing cost, family expenses, and how stable your income is.",
        },
        {
          question: "Should I use gross income or take-home pay?",
          answer:
            "This calculator uses monthly income as a planning input, but take-home pay is usually better for a personal budget check. If taxes, benefits, and payroll deductions take a large share of your paycheck, use a more conservative target payment percentage.",
        },
        {
          question: "Does this calculator include insurance and fuel?",
          answer:
            "No. The estimate focuses on the car price and loan payment. You should separately estimate insurance, fuel, maintenance, repairs, registration, parking, and other ownership costs before deciding a car is affordable.",
        },
        {
          question: "Is it better to increase my down payment?",
          answer:
            "A larger down payment usually improves affordability because it lowers the amount financed. That can reduce the monthly payment, reduce total interest, and lower the chance of owing more than the car is worth.",
        },
        {
          question: "Does loan term affect affordability?",
          answer:
            "Yes. A longer loan term can make the monthly payment smaller, but it usually increases total interest. A car that only works with a very long term may be more stretched than it looks.",
        },
        {
          question: "Why is my affordable car price lower than I expected?",
          answer:
            "The estimate may be lower because of existing debt, a conservative payment target, a smaller down payment, a higher interest rate, or a shorter loan term. That is useful because it shows the budget pressure before you are committed to a loan.",
        },
      ],
    },
  },
};