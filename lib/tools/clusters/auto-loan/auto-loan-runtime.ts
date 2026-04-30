import {
  createDecisionSummary,
  evaluateNumberDecisionRule,
} from "../../tool-decision-rules";
import type { RuntimeToolDefinition } from "../../tool-runtime-types";

export const autoLoanRuntime: RuntimeToolDefinition = {
  slug: "auto-loan-calculator",

  fields: [
    {
      name: "vehiclePrice",
      label: "Vehicle Price",
      type: "number",
      required: true,
      defaultValue: 25000,
    },
    {
      name: "downPayment",
      label: "Down Payment",
      type: "number",
      required: true,
      defaultValue: 2500,
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
      name: "salesTax",
      label: "Sales Tax (%)",
      type: "number",
      required: false,
      defaultValue: 7,
    },
    {
      name: "fees",
      label: "Fees",
      type: "number",
      required: false,
      defaultValue: 500,
    },
  ],

  calculate: (values) => {
    const vehiclePrice = Number(values.vehiclePrice || 0);
    const downPayment = Number(values.downPayment || 0);
    const monthlyRate = Number(values.interestRate || 0) / 100 / 12;
    const term = Number(values.loanTerm || 0);
    const salesTaxRate = Number(values.salesTax || 0) / 100;
    const fees = Number(values.fees || 0);

    const salesTaxAmount = vehiclePrice * salesTaxRate;
    const totalVehicleCost = vehiclePrice + salesTaxAmount + fees;
    const loanAmount = Math.max(totalVehicleCost - downPayment, 0);

    const monthlyPayment =
      monthlyRate === 0
        ? loanAmount / term
        : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term));

    const totalPaid = monthlyPayment * term;
    const totalInterest = Math.max(totalPaid - loanAmount, 0);

    const interestRatio = totalPaid === 0 ? 0 : totalInterest / totalPaid;

    const interestSignal = evaluateNumberDecisionRule(interestRatio, [
      {
        max: 0.2,
        label: "Interest cost",
        value: "Controlled",
        helperText:
          "Interest is a smaller share of the total estimated auto loan cost.",
        tone: "positive",
      },
      {
        max: 0.4,
        label: "Interest cost",
        value: "Moderate",
        helperText:
          "Interest is a meaningful part of the total estimated auto loan cost.",
        tone: "neutral",
      },
      {
        label: "Interest cost",
        value: "High",
        helperText:
          "Interest is a large share of this auto loan estimate. Compare a lower rate, larger down payment, or shorter term.",
        tone: "warning",
      },
    ]);

    const paymentInsightScore =
      interestRatio > 0.4 ? 2 : interestRatio > 0.2 ? 1 : 0;

    return {
      primaryLabel: "Estimated monthly payment",
      primaryValue: monthlyPayment,
      primaryValueFormat: "currency",
      primaryHelperText:
        "This estimate includes the vehicle price, sales tax, fees, down payment, interest rate, and loan term you entered.",

      decisionSummary: createDecisionSummary({
        title: "Auto loan insight",
        input: paymentInsightScore,
        rules: [
          {
            max: 0,
            label: "Auto loan insight",
            value: "Controlled interest",
            description:
              "This auto loan has a relatively controlled interest share based on the inputs you entered.",
            tone: "positive",
          },
          {
            max: 1,
            label: "Auto loan insight",
            value: "Moderate interest",
            description:
              "Interest is a meaningful part of the vehicle financing cost. Compare a few shorter-term or lower-rate scenarios.",
            tone: "neutral",
          },
          {
            label: "Auto loan insight",
            value: "High interest cost",
            description:
              "This auto loan has a high interest share. A lower rate, larger down payment, shorter term, or less expensive vehicle could reduce the total cost.",
            tone: "warning",
          },
        ],
        additionalItems: [
          interestSignal,
          {
            label: "Loan amount",
            value: loanAmount,
            valueFormat: "currency",
            helperText:
              "This is the estimated financed amount after sales tax, fees, and down payment.",
            tone: "neutral",
          },
          {
            label: "Total interest",
            value: totalInterest,
            valueFormat: "currency",
            helperText:
              "This is the estimated interest paid across the full auto loan term.",
            tone: "neutral",
          },
        ],
      }),

      resultGuidance: {
        title: "What this estimate means",
        description:
          "Use this estimate to compare vehicle financing options and understand the full cost of the auto loan.",
        items: [
          {
            title: "Check monthly affordability",
            description:
              "Make sure the estimated payment fits your monthly budget after insurance, fuel, maintenance, and other vehicle costs.",
          },
          {
            title: "Compare total interest",
            description:
              "A lower monthly payment can still cost more over time if the loan term is longer or the interest rate is high.",
          },
          {
            title: "Test down payment changes",
            description:
              "Try a larger down payment to see how it changes the financed amount, monthly payment, and total interest.",
          },
        ],
      },

      scenarioComparison: {
        title: "Scenario comparison",
        description:
          "Use these signals to compare the monthly payment against the full cost of financing the vehicle.",
        headers: ["Monthly view", "Total cost view"],
        rows: [
          {
            label: "Main question",
            values: [
              "Can I afford this car payment?",
              "How much will financing add to the vehicle cost?",
            ],
          },
          {
            label: "Estimated amount",
            values: [
              {
                value: monthlyPayment,
                valueFormat: "currency",
              },
              {
                value: totalInterest,
                valueFormat: "currency",
              },
            ],
          },
          {
            label: "Best way to improve it",
            values: [
              "Increase the down payment or choose a less expensive vehicle",
              "Lower the rate, shorten the term, or reduce the financed amount",
            ],
          },
        ],
      },

      ratioBreakdown: {
        title: "Total paid breakdown",
        items: [
          {
            label: "Financed amount share",
            value: totalPaid === 0 ? 0 : 1 - interestRatio,
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
        title: "Auto loan cost breakdown",
        description:
          "See how the estimated total paid is split between the financed amount and interest.",
        valueFormat: "currency",
        centerLabel: "Total paid",
        centerValue: totalPaid,
        centerValueFormat: "currency",
        items: [
          {
            label: "Financed amount",
            value: Math.round(loanAmount),
          },
          {
            label: "Interest",
            value: Math.round(totalInterest),
          },
        ],
      },

      rows: [
        {
          label: "Vehicle price",
          value: vehiclePrice,
          valueFormat: "currency",
        },
        {
          label: "Sales tax",
          value: salesTaxAmount,
          valueFormat: "currency",
        },
        {
          label: "Fees",
          value: fees,
          valueFormat: "currency",
        },
        {
          label: "Down payment",
          value: downPayment,
          valueFormat: "currency",
        },
        {
          label: "Loan amount",
          value: loanAmount,
          valueFormat: "currency",
        },
        {
          label: "Monthly payment",
          value: monthlyPayment,
          valueFormat: "currency",
        },
        {
          label: "Total interest",
          value: totalInterest,
          valueFormat: "currency",
        },
        {
          label: "Total paid",
          value: totalPaid,
          valueFormat: "currency",
        },
        {
          label: "Number of payments",
          value: {
            value: term,
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