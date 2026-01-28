"use client";

import { CalculatorResults, formatCurrency } from "@/lib/calculate-net-profit";
import { TrendingDown, AlertTriangle } from "lucide-react";

interface ResultsCardProps {
  results: CalculatorResults;
}

export function ResultsCard({ results }: ResultsCardProps) {
  const isSignificantDrop = results.percentageLost > 30;

  return (
    <div className="rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-900/80 ring-1 ring-zinc-700/50 overflow-hidden">
      {/* Warning Banner for High Loss */}
      {isSignificantDrop && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-200">
            <span className="font-semibold">{results.percentageLost.toFixed(0)}%</span> of your earnings go to expenses
          </p>
        </div>
      )}

      <div className="p-6 sm:p-8">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">
          Your Hourly Rate Comparison
        </h3>

        <div className="grid sm:grid-cols-2 gap-6">
          {/* App Rate (Gross) */}
          <div className="rounded-xl bg-zinc-800/50 p-5 ring-1 ring-zinc-700/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">What Apps Show You</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700/50 text-zinc-400">
                Gross
              </span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-zinc-200 tabular-nums">
              {formatCurrency(results.appHourlyRate)}
              <span className="text-lg text-zinc-500 font-normal">/hr</span>
            </p>
          </div>

          {/* Real Rate (Net) */}
          <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-5 ring-1 ring-amber-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-amber-300/80">What You Actually Keep</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                Net
              </span>
            </div>
            <p className="text-3xl sm:text-4xl font-bold text-amber-500 tabular-nums">
              {formatCurrency(results.realHourlyProfit)}
              <span className="text-lg text-amber-500/60 font-normal">/hr</span>
            </p>
          </div>
        </div>

        {/* Difference Callout */}
        <div className="mt-6 flex items-center justify-center gap-2 text-red-400">
          <TrendingDown className="h-5 w-5" />
          <span className="text-lg font-medium">
            You&apos;re earning <span className="font-bold">{formatCurrency(results.hourlyDifference)}</span> less per hour than you think
          </span>
        </div>
      </div>
    </div>
  );
}
