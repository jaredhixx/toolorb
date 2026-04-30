import type { ToolFormValues } from "../../tool-types";

function getNumberValue(values: ToolFormValues, key: string): number {
  const value = values[key];

  if (typeof value !== "number") {
    return 0;
  }

  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(value, 0);
}

export function calculateLoanPayment(values: ToolFormValues) {
  const loanAmount = getNumberValue(values, "loanAmount");
  const interestRate = getNumberValue(values, "interestRate");
  const loanTermYears = getNumberValue(values, "loanTermYears");

  const monthlyInterestRate = Math.max(interestRate, 0) / 100 / 12;
  const numberOfPayments = Math.max(Math.round(loanTermYears * 12), 0);

  if (loanAmount <= 0 || numberOfPayments <= 0) {
    return {
      loanAmount,
      monthlyPayment: 0,
      totalPaid: 0,
      totalInterest: 0,
      numberOfPayments: 0,
    };
  }

  let monthlyPayment = 0;

  if (monthlyInterestRate === 0) {
    monthlyPayment = loanAmount / numberOfPayments;
  } else {
    const compoundRate = Math.pow(1 + monthlyInterestRate, numberOfPayments);

    monthlyPayment =
      loanAmount *
      ((monthlyInterestRate * compoundRate) /
        (compoundRate - 1));
  }

  const totalPaid = monthlyPayment * numberOfPayments;
  const totalInterest = Math.max(totalPaid - loanAmount, 0);

  return {
    loanAmount,
    monthlyPayment,
    totalPaid,
    totalInterest,
    numberOfPayments,
  };
}