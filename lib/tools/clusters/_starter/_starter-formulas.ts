import type { ToolFormValues } from "../../tool-types";

function getNumberValue(values: ToolFormValues, key: string): number {
  const value = values[key];

  if (typeof value !== "number") return 0;
  if (!Number.isFinite(value)) return 0;

  return Math.max(value, 0);
}

export function calculateStarter(values: ToolFormValues) {
  const amount = getNumberValue(values, "amount");
  const rate = getNumberValue(values, "rate");
  const termYears = getNumberValue(values, "termYears");

  const monthlyRate = rate / 100 / 12;
  const payments = termYears * 12;

  if (amount <= 0 || payments <= 0) {
    return {
      amount,
      monthlyPayment: 0,
      totalPaid: 0,
      totalInterest: 0,
      numberOfPayments: 0,
    };
  }

  let monthlyPayment = 0;

  if (monthlyRate === 0) {
    monthlyPayment = amount / payments;
  } else {
    const compound = Math.pow(1 + monthlyRate, payments);
    monthlyPayment =
      amount * ((monthlyRate * compound) / (compound - 1));
  }

  const totalPaid = monthlyPayment * payments;
  const totalInterest = Math.max(totalPaid - amount, 0);

  return {
    amount,
    monthlyPayment,
    totalPaid,
    totalInterest,
    numberOfPayments: payments,
  };
}