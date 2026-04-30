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

export function calculateCompoundInterest(values: ToolFormValues) {
  const initialDeposit = getNumberValue(values, "initialDeposit");
  const monthlyContribution = getNumberValue(values, "monthlyContribution");
  const annualReturnRate = getNumberValue(values, "annualReturnRate");
  const years = getNumberValue(values, "years");

  const monthlyReturnRate = annualReturnRate / 100 / 12;
  const numberOfMonths = Math.max(Math.round(years * 12), 0);

  let balance = initialDeposit;
  let totalContributions = initialDeposit;

  for (let month = 1; month <= numberOfMonths; month++) {
    balance *= 1 + monthlyReturnRate;
    balance += monthlyContribution;
    totalContributions += monthlyContribution;
  }

  const interestEarned = Math.max(balance - totalContributions, 0);

  return {
    initialDeposit,
    monthlyContribution,
    annualReturnRate,
    years,
    numberOfMonths,
    finalBalance: balance,
    totalContributions,
    interestEarned,
  };
}