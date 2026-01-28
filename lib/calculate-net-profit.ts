import { z } from "zod";

/**
 * Calculation mode types
 */
export type CalculationMode = "irs" | "actual";

/**
 * Zod schema for validating calculator inputs
 */
export const calculatorInputsSchema = z.object({
  grossEarnings: z.number().min(0, "Earnings must be positive"),
  hoursOnline: z.number().min(0.1, "Hours must be greater than 0"),
  milesDriven: z.number().min(0, "Miles must be positive"),
  mpg: z.number().min(1, "MPG must be at least 1"),
  gasPrice: z.number().min(0, "Gas price must be positive"),
  irsMileageRate: z.number().min(0, "Mileage rate must be positive"),
  depreciationRate: z.number().min(0, "Depreciation rate must be positive"),
  taxRate: z.number().min(0).max(100, "Tax rate must be between 0-100"),
  calculationMode: z.enum(["irs", "actual"]),
});

export type CalculatorInputs = z.infer<typeof calculatorInputsSchema>;

export interface CalculatorResults {
  // Input echo
  grossEarnings: number;
  hoursWorked: number;
  milesDriven: number;
  calculationMode: CalculationMode;

  // Expense calculations
  gasCost: number; // Only used in "actual" mode
  depreciationCost: number; // Only used in "actual" mode
  vehicleCosts: number; // Total vehicle costs (IRS rate OR gas + depreciation)
  estimatedTaxes: number; // Tax on net profit

  // Final results
  netProfit: number; // Gross - vehicle costs - taxes
  appHourlyRate: number; // Gross ÷ hours (what apps show you)
  realHourlyProfit: number; // Net profit ÷ hours (the truth)

  // Insights
  hourlyDifference: number; // How much less you actually make per hour
  percentageLost: number; // What % of gross earnings are lost to expenses
}

/**
 * Calculate the true net profit and hourly wage for a gig worker.
 *
 * Supports two calculation modes:
 *
 * 1. IRS MODE ("irs"):
 *    Uses the IRS Standard Mileage Deduction which covers gas, depreciation,
 *    maintenance, repairs, and insurance in a single rate ($0.67/mile for 2024).
 *
 * 2. ACTUAL COST MODE ("actual"):
 *    Calculates real gas cost based on MPG and local gas prices, plus a
 *    separate depreciation/wear estimate per mile.
 *
 * Tax calculation is performed on NET PROFIT (after expenses),
 * simulating actual self-employment tax liability.
 *
 * @param inputs - The user's weekly earnings data
 * @returns Detailed breakdown of true earnings
 */
export function calculateNetProfit(inputs: CalculatorInputs): CalculatorResults {
  const {
    grossEarnings,
    hoursOnline,
    milesDriven,
    mpg,
    gasPrice,
    irsMileageRate,
    depreciationRate,
    taxRate,
    calculationMode,
  } = inputs;

  let vehicleCosts: number;
  let gasCost = 0;
  let depreciationCost = 0;

  if (calculationMode === "irs") {
    // IRS MODE: Simple flat rate per mile
    // Covers gas + depreciation + maintenance + insurance
    vehicleCosts = milesDriven * irsMileageRate;
  } else {
    // ACTUAL COST MODE: Calculate real gas cost + depreciation separately
    // Gas cost = (miles / mpg) * price per gallon
    gasCost = mpg > 0 ? (milesDriven / mpg) * gasPrice : 0;

    // Depreciation/wear cost = miles * depreciation rate
    // Default ~$0.20/mile covers wear, maintenance, eventual repairs
    depreciationCost = milesDriven * depreciationRate;

    vehicleCosts = gasCost + depreciationCost;
  }

  // Calculate profit before taxes
  const profitBeforeTax = Math.max(0, grossEarnings - vehicleCosts);

  // Calculate self-employment taxes on net profit
  const estimatedTaxes = profitBeforeTax * (taxRate / 100);

  // Calculate final take-home (net profit)
  const netProfit = Math.max(0, profitBeforeTax - estimatedTaxes);

  // Calculate hourly rates
  const appHourlyRate = hoursOnline > 0 ? grossEarnings / hoursOnline : 0;
  const realHourlyProfit = hoursOnline > 0 ? netProfit / hoursOnline : 0;

  // Calculate insights
  const hourlyDifference = appHourlyRate - realHourlyProfit;
  const percentageLost =
    grossEarnings > 0 ? ((grossEarnings - netProfit) / grossEarnings) * 100 : 0;

  return {
    grossEarnings,
    hoursWorked: hoursOnline,
    milesDriven,
    calculationMode,
    gasCost: roundToTwo(gasCost),
    depreciationCost: roundToTwo(depreciationCost),
    vehicleCosts: roundToTwo(vehicleCosts),
    estimatedTaxes: roundToTwo(estimatedTaxes),
    netProfit: roundToTwo(netProfit),
    appHourlyRate: roundToTwo(appHourlyRate),
    realHourlyProfit: roundToTwo(realHourlyProfit),
    hourlyDifference: roundToTwo(hourlyDifference),
    percentageLost: roundToTwo(percentageLost),
  };
}

/**
 * Round a number to two decimal places
 */
function roundToTwo(num: number): number {
  return Math.round(num * 100) / 100;
}

/**
 * Format a number as USD currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number as a percentage
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
