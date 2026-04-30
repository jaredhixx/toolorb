import type { RuntimeToolDefinition } from "../../tool-runtime-types";
import { calculateMonthlyMortgagePayment } from "./mortgage-formulas";
import {
  createDecisionSummary,
  evaluateNumberDecisionRule,
} from "../../tool-decision-rules";

export const mortgageRuntime: RuntimeToolDefinition = {
  slug: "mortgage-calculator",
  declaredInternalLinks: ["/tools/mortgage-calculator"],
  fields: [
    {
      name: "homePrice",
      label: "Home price",
      type: "number",
      defaultValue: 350000,
      min: 0,
      max: 100000000,
      step: 1000,
      suffix: "$",
    },
    {
      name: "downPayment",
      label: "Down payment",
      type: "number",
      defaultValue: 70000,
      min: 0,
      max: 100000000,
      step: 1000,
      suffix: "$",
    },
    {
      name: "interestRate",
      label: "Interest rate",
      type: "number",
      defaultValue: 6.5,
      min: 0,
      max: 100,
      step: 0.01,
      suffix: "%",
    },
    {
      name: "loanTermYears",
      label: "Loan term",
      type: "number",
      defaultValue: 30,
      min: 1,
      max: 100,
      step: 1,
      suffix: "years",
    },
    {
      name: "startDate",
      label: "Loan start date",
      type: "date",
      defaultValue: "2026-01-01",
      min: "1900-01-01",
      max: "2100-12-31",
      helperText:
        "Used to estimate the calendar month and year when the loan could be paid off.",
    },
    {
      name: "propertyTaxYearly",
      label: "Property taxes (yearly)",
      type: "number",
      defaultValue: 4200,
      min: 0,
      step: 100,
      suffix: "$",
    },
    {
      name: "insuranceYearly",
      label: "Home insurance (yearly)",
      type: "number",
      defaultValue: 1200,
      min: 0,
      step: 50,
      suffix: "$",
    },
    {
      name: "hoaMonthly",
      label: "HOA fees (monthly)",
      type: "number",
      defaultValue: 0,
      min: 0,
      step: 25,
      suffix: "$",
    },
    {
      name: "pmiMonthly",
      label: "PMI (monthly)",
      type: "number",
      defaultValue: 0,
      min: 0,
      step: 25,
      suffix: "$",
    },
    {
      name: "extraPaymentMonthly",
      label: "Extra payment (monthly)",
      type: "number",
      defaultValue: 0,
      min: 0,
      step: 25,
      suffix: "$",
      helperText:
        "Optional. Add extra money toward principal each month to estimate payoff impact.",
    },
  ],
  calculate(values) {
    const result = calculateMonthlyMortgagePayment(values);

    const addedCostRatio =
      (result.monthlyPayment - result.principalAndInterestMonthly) /
      Math.max(result.principalAndInterestMonthly, 1);

    const affordabilitySignal = evaluateNumberDecisionRule(addedCostRatio, [
      {
        max: 0.2,
        label: "Payment signal",
        value: "Comfortable",
        helperText:
          "The required monthly add-ons are not heavily increasing the base loan payment.",
        tone: "positive",
      },
      {
        max: 0.4,
        label: "Payment signal",
        value: "Watch closely",
        helperText:
          "Required monthly add-ons are meaningfully increasing the estimated payment.",
        tone: "warning",
      },
      {
        label: "Payment signal",
        value: "Expensive",
        helperText:
          "Monthly add-ons are pushing the full payment up heavily. Review the loan size, rate, and required costs before relying on this estimate.",
        tone: "warning",
      },
    ]);

    const interestCostSignal = evaluateNumberDecisionRule(result.interestRatio, [
      {
        max: 0.35,
        label: "Interest cost",
        value: "Controlled",
        helperText:
          "Interest makes up a lower share of the total estimated amount paid.",
        tone: "positive",
      },
      {
        max: 0.45,
        label: "Interest cost",
        value: "Moderate",
        helperText:
          "Interest is a meaningful part of the total estimated amount paid.",
        tone: "neutral",
      },
      {
        label: "Interest cost",
        value: "High",
        helperText:
          "Interest makes up a high share of the total estimated amount paid. A shorter term, lower rate, or extra principal payments may reduce long-term cost.",
        tone: "warning",
      },
    ]);

    const paymentInsightScore =
      affordabilitySignal.value === "Expensive"
        ? 4
        : result.interestRatio > 0.45
          ? 3
          : affordabilitySignal.value === "Watch closely"
            ? 2
            : result.payoffYears <= 20
              ? 1
              : 0;

    const startDateValue = values.startDate;
    const startDate =
      typeof startDateValue === "string" ? new Date(startDateValue) : null;
    const payoffDate =
      startDate && !Number.isNaN(startDate.getTime())
        ? new Date(startDate)
        : null;

    if (payoffDate) {
      payoffDate.setMonth(payoffDate.getMonth() + result.numberOfPayments);
    }

    const payoffDateLabel = payoffDate
      ? payoffDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })
      : null;

    return {
      primaryLabel: "Estimated monthly payment",
      primaryValue: result.monthlyPayment,
      primaryValueFormat: "currency",
      primaryHelperText:
        "Includes principal, interest, property taxes, home insurance, HOA fees, and PMI based on the inputs you entered.",
      decisionSummary: createDecisionSummary({
        title: "Payment insight",
        input: paymentInsightScore,
        rules: [
          {
            max: 0,
            label: "Payment insight",
            value: "Manageable",
            description:
              "This loan is manageable, but reducing interest or adding extra payments could improve your long-term cost.",
            tone: "neutral",
          },
          {
            max: 1,
            label: "Payment insight",
            value: "Efficient timeline",
            description:
              "This loan is relatively efficient with a shorter payoff timeline and controlled interest cost.",
            tone: "positive",
          },
          {
            max: 2,
            label: "Payment insight",
            value: "Watch added costs",
            description:
              "Your required monthly add-ons are meaningfully increasing the estimated payment. Compare a few lower-cost scenarios before relying on this number.",
            tone: "warning",
          },
{
  max: 3,
  label: "Payment insight",
  value: "High interest cost",
  description:
    "This loan has a high long-term interest cost. Consider reducing the loan term or increasing your monthly payment to lower total interest.",
  tone: "warning",
  href: "/tools/mortgage-calculator",
  linkLabel: "Run another mortgage scenario",
},
          {
            label: "Payment insight",
            value: "Expensive add-ons",
            description:
              "Your required monthly add-ons are pushing the estimated payment up heavily. Review the loan size, rate, and required costs before relying on this estimate.",
            tone: "warning",
          },
        ],
        additionalItems: [
          affordabilitySignal,
          interestCostSignal,
          {
            label: "Monthly payment",
            value: result.monthlyPayment,
            valueFormat: "currency",
            helperText:
              "This is the estimated monthly principal and interest payment based on your current inputs.",
            tone: "neutral",
          },
{
  label: "Total interest",
  value: result.totalInterest,
  valueFormat: "currency",
  helperText:
    "This is the total estimated interest paid over the full loan term.",
  tone: "neutral",
},
          {
            label: "Loan payoff time",
            value: `${result.numberOfPayments} months`,
            helperText: payoffDateLabel
              ? `Estimated payoff date: ${payoffDateLabel}`
              : undefined,
            tone: "neutral",
          },
          {
            label: "Extra payment impact",
            value:
              result.extraPaymentMonthly > 0
                ? "Accelerated payoff"
                : "No extra payment applied",
            helperText:
              result.extraPaymentMonthly > 0
                ? "Adding extra principal reduces the total interest paid and shortens the loan term."
                : "No additional principal is being applied beyond the base monthly payment.",
            tone: result.extraPaymentMonthly > 0 ? "positive" : "neutral",
          },
        ],
      }),

      resultGuidance: {
        title: "What this estimate means",
        description:
          "Use these quick checks to understand how safe and realistic this payment is before comparing homes or loan options.",
        items: [
          {
            title: "Look at the full monthly cost",
            description:
              "This estimate includes principal, interest, taxes, insurance, HOA fees, and PMI. Always budget using the full monthly number, not just the base loan payment.",
          },
          {
            title: "Understand your interest impact",
            description:
              result.interestRatio > 0.45
                ? "A large portion of your total cost is interest. Consider testing a shorter loan term, lower rate, or higher down payment to reduce long-term cost."
                : "Interest is not dominating the total cost, but comparing loan terms and rates can still meaningfully reduce what you pay over time.",
          },
          {
            title: "Check non-loan costs",
            description:
              addedCostRatio > 0.4
                ? "Taxes, insurance, HOA fees, or PMI are adding heavily to your payment. Try comparing a scenario with lower add-on costs before relying on this estimate."
                : "Your additional monthly costs are relatively controlled, but it is still worth comparing multiple scenarios to confirm affordability.",
          },
        ],
      },

      scenarioComparison: {
        title: "Scenario comparison",
        description:
          "Compare the current payoff estimate against the original scheduled loan term.",
        headers: ["Base estimate", "Current inputs"],
        rows: [
          {
            label: "Recommendation",
            values: [
              result.monthlyPayment <= result.principalAndInterestMonthly * 1.2
                ? "Lower added costs"
                : "Higher added costs",
              result.monthlyPayment <= result.principalAndInterestMonthly * 1.2
                ? "Better balance between base loan and monthly add-ons"
                : "Monthly add-ons are increasing total cost significantly",
            ],
          },
          {
            label: "Monthly principal and interest",
            values: [
              {
                value: result.principalAndInterestMonthly,
                valueFormat: "currency",
              },
              {
                value:
                  result.principalAndInterestMonthly +
                  result.extraPaymentMonthly,
                valueFormat: "currency",
              },
            ],
          },
          {
            label: "Payoff time",
            values: [
              {
                value: result.originalNumberOfPayments,
                valueFormat: "number",
                suffix: " months",
              },
              {
                value: result.numberOfPayments,
                valueFormat: "number",
                suffix: " months",
              },
            ],
          },
          {
            label: "Estimated interest",
            values: [
              {
                value: result.originalTotalInterest,
                valueFormat: "currency",
              },
              {
                value: result.totalInterest,
                valueFormat: "currency",
              },
            ],
          },
        ],
      },
      ratioBreakdown: {
        title: "Total paid breakdown",
        items: [
          {
            label: "Principal share",
            value: result.principalRatio,
            valueFormat: "percent",
          },
          {
            label: "Interest share",
            value: result.interestRatio,
            valueFormat: "percent",
          },
        ],
      },
      chartData: {
        type: "pie",
        title: "Monthly payment breakdown",
        description:
          "See how your estimated monthly payment is divided across loan costs, taxes, insurance, HOA dues, and PMI.",
        valueFormat: "currency",
        centerLabel: "Estimated payment",
        centerValue: result.monthlyPayment,
        centerValueFormat: "currency",
        centerHelperText: "per month",
        items: [
          {
            label: "Principal & interest",
            value: Math.round(result.principalAndInterestMonthly),
          },
          {
            label: "Property taxes",
            value: Math.round(result.propertyTaxMonthly),
          },
          {
            label: "Insurance",
            value: Math.round(result.insuranceMonthly),
          },
          {
            label: "HOA",
            value: Math.round(result.hoaMonthly),
          },
          {
            label: "PMI",
            value: Math.round(result.pmiMonthly),
          },
        ],
      },
      secondaryChartData: {
        type: "line",
        title: "Loan balance over time",
        description:
          "See how your remaining loan balance changes across the amortization preview.",
        valueFormat: "currency",
        series: [
          {
            label: "Remaining balance",
            points: result.amortizationRows.map((row) => ({
              label: String(row.paymentNumber),
              value: row.remainingBalance,
            })),
          },
        ],
      },
      tableSection: {
        title: "Amortization preview",
        description:
          "This preview shows the first 12 monthly payments and how each payment is split between principal, interest, and remaining loan balance.",
        columns: ["Payment", "Principal", "Interest", "Remaining balance"],
        rows: result.amortizationRows.map((row) => ({
          cells: [
            String(row.paymentNumber),
            { value: row.principalPaid, valueFormat: "currency" },
            { value: row.interestPaid, valueFormat: "currency" },
            { value: row.remainingBalance, valueFormat: "currency" },
          ],
        })),
      },
      rows: [
        {
          label: "Principal and interest",
          value: result.principalAndInterestMonthly,
          valueFormat: "currency",
        },
        {
          label: "Property taxes",
          value: result.propertyTaxMonthly,
          valueFormat: "currency",
        },
        {
          label: "Home insurance",
          value: result.insuranceMonthly,
          valueFormat: "currency",
        },
        {
          label: "HOA fees",
          value: result.hoaMonthly,
          valueFormat: "currency",
        },
        {
          label: "PMI",
          value: result.pmiMonthly,
          valueFormat: "currency",
        },
        {
          label: "Loan amount",
          value: result.principal,
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
          label: "Estimated payoff time",
          value: {
            value: result.numberOfPayments,
            valueFormat: "number",
            suffix: " months",
          },
          helperText: payoffDateLabel
            ? `${result.payoffYears.toFixed(1)} years based on the current inputs. Estimated payoff date: ${payoffDateLabel}.`
            : `${result.payoffYears.toFixed(1)} years based on the current inputs.`,
        },
        {
          label: "Principal share",
          value: {
            value: result.principalRatio,
            valueFormat: "percent",
            suffix: " of total paid",
          },
        },
        {
          label: "Interest share",
          value: {
            value: result.interestRatio,
            valueFormat: "percent",
            suffix: " of total paid",
          },
        },
      ],
    };
  },
};
