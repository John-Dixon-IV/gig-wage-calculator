"use client";

import { useState, useMemo } from "react";
import { CalculatorForm } from "@/components/calculator-form";
import { ResultsCard } from "@/components/results-card";
import { ComparisonChart } from "@/components/comparison-chart";
import { SupportCard } from "@/components/support-card";
import {
  calculateNetProfit,
  CalculatorInputs,
  CalculatorResults,
  formatCurrency,
} from "@/lib/calculate-net-profit";
import { Car, TrendingDown, Fuel, Wrench } from "lucide-react";

const defaultInputs: CalculatorInputs = {
  grossEarnings: 0,
  hoursOnline: 0,
  milesDriven: 0,
  mpg: 25,
  gasPrice: 3.5,
  irsMileageRate: 0.67,
  depreciationRate: 0.2,
  taxRate: 15.3,
  calculationMode: "actual", // Default to "My Actual Costs" mode
};

export default function HomePage() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);

  const results: CalculatorResults | null = useMemo(() => {
    if (
      inputs.grossEarnings > 0 &&
      inputs.hoursOnline > 0 &&
      inputs.milesDriven > 0
    ) {
      return calculateNetProfit(inputs);
    }
    return null;
  }, [inputs]);

  const handleInputChange = (
    field: keyof CalculatorInputs,
    value: number | string
  ) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800/50">
        {/* Background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative mx-auto max-w-2xl px-4 py-12 sm:py-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20">
              <Car className="h-6 w-6 text-amber-500" />
            </div>
          </div>

          <h1 className="text-center font-display text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-4">
            True Hourly Wage Calculator
          </h1>
          <p className="text-center text-lg text-zinc-400 max-w-lg mx-auto leading-relaxed">
            See what you{" "}
            <span className="text-amber-500 font-medium">actually</span> earn
            after gas, car wear, and taxes. Most gig drivers overestimate by
            40%.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="mx-auto max-w-2xl px-4 py-8 sm:py-12">
        <h2 className="sr-only">Weekly Earnings Calculator</h2>

        <CalculatorForm inputs={inputs} onInputChange={handleInputChange} />

        {/* Results Section */}
        {results && (
          <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ResultsCard results={results} />

            <SupportCard />

            <ComparisonChart
              grossHourly={results.appHourlyRate}
              netHourly={results.realHourlyProfit}
            />

            {/* Breakdown Details */}
            <div className="rounded-2xl bg-zinc-900/50 ring-1 ring-zinc-800/50 p-6">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-red-400" />
                Where Your Money Goes
              </h3>

              <div className="space-y-3">
                <BreakdownRow
                  label="Gross Weekly Earnings"
                  value={results.grossEarnings}
                  isPositive
                />

                {results.calculationMode === "actual" ? (
                  <>
                    <BreakdownRow
                      label={`Gas Cost (${results.milesDriven} mi ÷ ${inputs.mpg} mpg × $${inputs.gasPrice})`}
                      value={-results.gasCost}
                      icon={<Fuel className="h-3.5 w-3.5" />}
                    />
                    <BreakdownRow
                      label={`Wear & Tear (${results.milesDriven} mi × $${inputs.depreciationRate}/mi)`}
                      value={-results.depreciationCost}
                      icon={<Wrench className="h-3.5 w-3.5" />}
                    />
                  </>
                ) : (
                  <BreakdownRow
                    label={`Vehicle Costs (${results.milesDriven} mi × $${inputs.irsMileageRate}/mi)`}
                    value={-results.vehicleCosts}
                  />
                )}

                <BreakdownRow
                  label={`Self-Employment Tax (${inputs.taxRate}%)`}
                  value={-results.estimatedTaxes}
                />

                <div className="border-t border-zinc-700/50 pt-3 mt-3">
                  <BreakdownRow
                    label="Your Actual Take-Home"
                    value={results.netProfit}
                    isTotal
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!results && (
          <div className="mt-8 rounded-2xl border-2 border-dashed border-zinc-800 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800/50">
              <Car className="h-6 w-6 text-zinc-500" />
            </div>
            <p className="text-zinc-500">
              Enter your weekly numbers above to see your true hourly wage
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 mt-8">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="text-sm text-zinc-500">
            {inputs.calculationMode === "irs" ? (
              <>
                Calculations use the IRS standard mileage deduction which covers
                gas, depreciation, insurance, and maintenance.
              </>
            ) : (
              <>
                Calculations use your actual MPG and gas price, plus an estimate
                for vehicle depreciation and maintenance.
              </>
            )}{" "}
            This tool does not store any of your data.
          </p>
        </div>
      </footer>
    </main>
  );
}

function BreakdownRow({
  label,
  value,
  isPositive = false,
  isTotal = false,
  icon,
}: {
  label: string;
  value: number;
  isPositive?: boolean;
  isTotal?: boolean;
  icon?: React.ReactNode;
}) {
  const formattedValue = formatCurrency(Math.abs(value));

  return (
    <div
      className={`flex items-center justify-between ${isTotal ? "font-semibold" : ""}`}
    >
      <span
        className={`flex items-center gap-2 ${isTotal ? "text-zinc-200" : "text-zinc-400"}`}
      >
        {icon && <span className="text-zinc-500">{icon}</span>}
        {label}
      </span>
      <span
        className={
          isTotal
            ? "text-amber-500 text-lg"
            : isPositive
              ? "text-emerald-400"
              : "text-red-400"
        }
      >
        {isPositive || isTotal ? "" : "−"}
        {formattedValue}
      </span>
    </div>
  );
}
