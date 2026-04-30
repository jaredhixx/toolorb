import {
  createDecisionSummary,
  evaluateNumberDecisionRule,
} from "../../tool-decision-rules";
import type { RuntimeToolDefinition } from "../../tool-runtime-types";

export const carAffordabilityRuntime: RuntimeToolDefinition = {
  slug: "car-affordability-calculator",

  fields: [
    {
      name: "monthlyIncome",
      label: "Monthly Income",
      type: "number",
      required: true,
      defaultValue: 5000,
    },
    {
      name: "monthlyDebts",
      label: "Monthly Debt Payments",
      type: "number",
      required: true,
      defaultValue: 750,
    },
    {
      name: "downPayment",
      label: "Down Payment",
      type: "number",
      required: true,
      defaultValue: 3000,
    },
    {
      name: "interestRate",
      label: "Interest Rate (%)",
      type: "number",
      required: true,
      defaultValue: 6.5,
    },
    {
      name: "loanTerm",
      label: "Loan Term (months)",
      type: "number",
      required: true,
      defaultValue: 60,
    },
    {
      name: "targetPaymentPercent",
      label: "Target Payment (% of Income)",
      type: "number",
      required: true,
      defaultValue: 10,
    },
  ],

  calculate: (values) => {
    const monthlyIncome = Number(values.monthlyIncome || 0);
    const monthlyDebts = Number(values.monthlyDebts || 0);
    const downPayment = Number(values.downPayment || 0);
    const monthlyRate = Number(values.interestRate || 0) / 100 / 12;
    const term = Number(values.loanTerm || 0);
    const targetPaymentPercent =
      Number(values.targetPaymentPercent || 0) / 100;

    const targetMonthlyPayment = monthlyIncome * targetPaymentPercent;
    const availableAfterDebt = Math.max(
      monthlyIncome - monthlyDebts - targetMonthlyPayment,
      0,
    );

    const affordableLoanAmount =
      monthlyRate === 0
        ? targetMonthlyPayment * term
        : targetMonthlyPayment *
          ((1 - Math.pow(1 + monthlyRate, -term)) / monthlyRate);

    const estimatedCarPrice = affordableLoanAmount + downPayment;
    const totalPaid = targetMonthlyPayment * term;
    const totalInterest = Math.max(totalPaid - affordableLoanAmount, 0);
    const paymentShare =
      monthlyIncome === 0 ? 0 : targetMonthlyPayment / monthlyIncome;
    const debtShare = monthlyIncome === 0 ? 0 : monthlyDebts / monthlyIncome;

    const affordabilitySignal = evaluateNumberDecisionRule(paymentShare, [
      {
        max: 0.1,
        label: "Payment share",
        value: "Conservative",
        helperText:
          "The estimated car payment is within a conservative share of monthly income.",
        tone: "positive",
      },
      {
        max: 0.15,
        label: "Payment share",
        value: "Moderate",
        helperText:
          "The estimated car payment uses a moderate share of monthly income.",
        tone: "neutral",
      },
      {
        label: "Payment share",
        value: "Stretched",
        helperText:
          "The estimated car payment uses a high share of monthly income. Consider a lower price, larger down payment, or longer shopping window.",
        tone: "warning",
      },
    ]);

    const affordabilityScore =
      paymentShare > 0.15 || debtShare > 0.4
        ? 2
        : paymentShare > 0.1 || debtShare > 0.3
          ? 1
          : 0;

    return {
      primaryLabel: "Estimated affordable car price",
      primaryValue: estimatedCarPrice,
      primaryValueFormat: "currency",
      primaryHelperText:
        "This estimate is based on your income, existing debt payments, down payment, target payment share, interest rate, and loan term.",

      decisionSummary: createDecisionSummary({
        title: "Car affordability insight",
        input: affordabilityScore,
        rules: [
          {
            max: 0,
            label: "Affordability",
            value: "Conservative range",
            description:
              "The estimated payment target appears conservative based on the income and debt inputs you entered.",
            tone: "positive",
          },
          {
            max: 1,
            label: "Affordability",
            value: "Moderate range",
            description:
              "The estimated payment target is usable, but compare insurance, fuel, maintenance, and registration costs before deciding.",
            tone: "neutral",
          },
          {
            label: "Affordability",
            value: "Stretched range",
            description:
              "The inputs suggest this car budget may be stretched. Lowering the payment target or increasing the down payment could make the purchase safer.",
            tone: "warning",
          },
        ],
        additionalItems: [
          affordabilitySignal,
          {
            label: "Target monthly payment",
            value: targetMonthlyPayment,
            valueFormat: "currency",
            helperText:
              "This is the monthly car payment target based on the percentage of income you entered.",
            tone: "neutral",
          },
          {
            label: "Existing debt share",
            value: debtShare,
            valueFormat: "percent",
            helperText:
              "Existing monthly debt payments reduce flexibility for a new vehicle payment.",
            tone: debtShare > 0.4 ? "warning" : "neutral",
          },
        ],
      }),

      resultGuidance: {
        title: "How to use this estimate",
        description:
          "Use this result as a planning range before shopping for a vehicle or comparing financing offers.",
        items: [
          {
            title: "Leave room for ownership costs",
            description:
              "Insurance, fuel, maintenance, registration, and repairs can make the real monthly cost higher than the loan payment.",
          },
          {
            title: "Compare payment and price",
            description:
              "A car can seem affordable by monthly payment alone while still being expensive because of a long term or high interest rate.",
          },
          {
            title: "Use Auto Loan next",
            description:
              "After choosing a target price, use the auto loan calculator to test taxes, fees, down payment, and financing details.",
          },
        ],
      },

      scenarioComparison: {
        title: "Affordability comparison",
        description:
          "Compare the car price estimate against monthly payment pressure and existing debt.",
        headers: ["Car price view", "Monthly budget view"],
        rows: [
          {
            label: "Main question",
            values: [
              "What car price could fit this payment target?",
              "How much monthly pressure does this add?",
            ],
          },
          {
            label: "Estimated amount",
            values: [
              {
                value: estimatedCarPrice,
                valueFormat: "currency",
              },
              {
                value: targetMonthlyPayment,
                valueFormat: "currency",
              },
            ],
          },
          {
            label: "Best way to improve it",
            values: [
              "Increase the down payment or lower the interest rate",
              "Lower the payment percentage or reduce existing debt first",
            ],
          },
        ],
      },

      ratioBreakdown: {
        title: "Monthly income breakdown",
        items: [
          {
            label: "Existing debt share",
            value: debtShare,
            valueFormat: "percent",
          },
          {
            label: "Target car payment share",
            value: paymentShare,
            valueFormat: "percent",
          },
        ],
      },

      chartData: {
        type: "pie",
        title: "Monthly income pressure",
        description:
          "See how existing debt and the target car payment compare against monthly income.",
        valueFormat: "currency",
        centerLabel: "Monthly income",
        centerValue: monthlyIncome,
        centerValueFormat: "currency",
        items: [
          {
            label: "Existing debts",
            value: Math.round(monthlyDebts),
          },
          {
            label: "Target car payment",
            value: Math.round(targetMonthlyPayment),
          },
          {
            label: "Remaining income",
            value: Math.round(
              Math.max(monthlyIncome - monthlyDebts - targetMonthlyPayment, 0),
            ),
          },
        ],
      },

      rows: [
        {
          label: "Monthly income",
          value: monthlyIncome,
          valueFormat: "currency",
        },
        {
          label: "Monthly debts",
          value: monthlyDebts,
          valueFormat: "currency",
        },
        {
          label: "Target monthly payment",
          value: targetMonthlyPayment,
          valueFormat: "currency",
        },
        {
          label: "Remaining after debts and target payment",
          value: availableAfterDebt,
          valueFormat: "currency",
        },
        {
          label: "Estimated affordable loan amount",
          value: affordableLoanAmount,
          valueFormat: "currency",
        },
        {
          label: "Down payment",
          value: downPayment,
          valueFormat: "currency",
        },
        {
          label: "Estimated affordable car price",
          value: estimatedCarPrice,
          valueFormat: "currency",
        },
        {
          label: "Estimated total interest",
          value: totalInterest,
          valueFormat: "currency",
        },
        {
          label: "Payment share of income",
          value: {
            value: paymentShare,
            valueFormat: "percent",
            suffix: " of monthly income",
          },
        },
      ],
    };
  },
};