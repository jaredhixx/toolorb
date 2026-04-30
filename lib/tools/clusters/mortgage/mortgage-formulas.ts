import type { ToolFormValues } from "../../tool-types";

type MortgageAmortizationRow = {
  paymentNumber: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
};

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

function calculateBaseMonthlyPayment(
  principal: number,
  monthlyInterestRate: number,
  numberOfPayments: number,
): number {
  if (principal <= 0 || numberOfPayments <= 0) {
    return 0;
  }

  if (monthlyInterestRate <= 0) {
    return principal / numberOfPayments;
  }

  const compoundRate = Math.pow(1 + monthlyInterestRate, numberOfPayments);

  if (!Number.isFinite(compoundRate) || compoundRate <= 1) {
    return principal / numberOfPayments;
  }

  const payment =
    principal *
    ((monthlyInterestRate * compoundRate) / (compoundRate - 1));

  return Number.isFinite(payment) ? payment : 0;
}

export function calculateMonthlyMortgagePayment(values: ToolFormValues) {
  const homePrice = getNumberValue(values, "homePrice");
  const downPayment = getNumberValue(values, "downPayment");
  const interestRate = getNumberValue(values, "interestRate");
  const loanTermYears = getNumberValue(values, "loanTermYears");

  const propertyTaxYearly = getNumberValue(values, "propertyTaxYearly");
  const insuranceYearly = getNumberValue(values, "insuranceYearly");
  const hoaMonthly = getNumberValue(values, "hoaMonthly");
  const pmiMonthly = getNumberValue(values, "pmiMonthly");
  const extraPaymentMonthly = getNumberValue(values, "extraPaymentMonthly");

  const principal = Math.max(homePrice - downPayment, 0);
  const monthlyInterestRate = Math.max(interestRate, 0) / 100 / 12;
  const originalNumberOfPayments = Math.max(Math.round(loanTermYears * 12), 0);

  const baseMonthly = calculateBaseMonthlyPayment(
    principal,
    monthlyInterestRate,
    originalNumberOfPayments,
  );

  const propertyTaxMonthly = propertyTaxYearly / 12;
  const insuranceMonthly = insuranceYearly / 12;

  const monthlyPayment =
    baseMonthly +
    propertyTaxMonthly +
    insuranceMonthly +
    hoaMonthly +
    pmiMonthly;

  let balance = principal;
  let month = 0;
  let totalInterestPaid = 0;

  const amortizationRows: MortgageAmortizationRow[] = [];
  const maxSimulationMonths = Math.max(originalNumberOfPayments, 0);

  while (balance > 0 && month < maxSimulationMonths) {
    const interest = balance * monthlyInterestRate;
    const scheduledPrincipalPayment = baseMonthly - interest;
    const totalPrincipalPayment = Math.min(
      Math.max(scheduledPrincipalPayment + extraPaymentMonthly, 0),
      balance,
    );

    if (totalPrincipalPayment <= 0) {
      break;
    }

    balance = Math.max(balance - totalPrincipalPayment, 0);
    totalInterestPaid += interest;

    if (month < 12) {
      amortizationRows.push({
        paymentNumber: month + 1,
        principalPaid: totalPrincipalPayment,
        interestPaid: interest,
        remainingBalance: balance,
      });
    }

    month++;
  }

  const payoffMonths = principal <= 0 ? 0 : month;
  const payoffYears = payoffMonths / 12;

  const totalMonthlyOwnershipCosts =
    propertyTaxMonthly + insuranceMonthly + hoaMonthly + pmiMonthly;

  const totalPaid =
    payoffMonths * (baseMonthly + extraPaymentMonthly) +
    payoffMonths * totalMonthlyOwnershipCosts;

  const originalTotalPrincipalAndInterestPaid =
    baseMonthly * originalNumberOfPayments;

  const originalTotalInterest = Math.max(
    originalTotalPrincipalAndInterestPaid - principal,
    0,
  );

  const interestRatio = totalPaid === 0 ? 0 : totalInterestPaid / totalPaid;
  const principalRatio = totalPaid === 0 ? 0 : principal / totalPaid;

  return {
    principal,
    monthlyPayment,
    principalAndInterestMonthly: baseMonthly,
    propertyTaxMonthly,
    insuranceMonthly,
    hoaMonthly,
    pmiMonthly,
    extraPaymentMonthly,
    totalPaid,
    totalInterest: totalInterestPaid,
    originalNumberOfPayments,
    originalTotalInterest,
    numberOfPayments: payoffMonths,
    payoffYears,
    principalRatio,
    interestRatio,
    amortizationRows,
  };
}
