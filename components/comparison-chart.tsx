"use client";

import { formatCurrency } from "@/lib/calculate-net-profit";
import { useMemo } from "react";

interface ComparisonChartProps {
  grossHourly: number;
  netHourly: number;
}

export function ComparisonChart({ grossHourly, netHourly }: ComparisonChartProps) {
  // Calculate bar heights as percentages
  const { grossHeight, netHeight } = useMemo(() => {
    const maxValue = Math.max(grossHourly, netHourly);
    if (maxValue === 0) return { grossHeight: 0, netHeight: 0 };
    
    return {
      grossHeight: (grossHourly / maxValue) * 100,
      netHeight: (netHourly / maxValue) * 100,
    };
  }, [grossHourly, netHourly]);

  const lostPercentage = grossHourly > 0 
    ? Math.round(((grossHourly - netHourly) / grossHourly) * 100) 
    : 0;

  return (
    <div className="rounded-2xl bg-zinc-900/50 ring-1 ring-zinc-800/50 p-6">
      <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-6">
        Visual Comparison
      </h3>

      <div className="flex items-end justify-center gap-8 sm:gap-16 h-48">
        {/* Gross Bar */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-zinc-400 tabular-nums">
            {formatCurrency(grossHourly)}
          </span>
          <div 
            className="w-16 sm:w-20 rounded-t-lg bg-gradient-to-t from-zinc-600 to-zinc-500 transition-all duration-700 ease-out"
            style={{ height: `${grossHeight}%`, minHeight: grossHeight > 0 ? '20px' : '0' }}
            role="img"
            aria-label={`Gross hourly rate: ${formatCurrency(grossHourly)}`}
          />
          <span className="text-xs text-zinc-500 uppercase tracking-wide">
            Gross
          </span>
        </div>

        {/* Net Bar */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-sm font-medium text-amber-500 tabular-nums">
            {formatCurrency(netHourly)}
          </span>
          <div 
            className="w-16 sm:w-20 rounded-t-lg bg-gradient-to-t from-amber-600 to-amber-500 transition-all duration-700 ease-out"
            style={{ height: `${netHeight}%`, minHeight: netHeight > 0 ? '20px' : '0' }}
            role="img"
            aria-label={`Net hourly rate: ${formatCurrency(netHourly)}`}
          />
          <span className="text-xs text-zinc-500 uppercase tracking-wide">
            Net
          </span>
        </div>
      </div>

      {/* Loss indicator */}
      {lostPercentage > 0 && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-4 py-2 ring-1 ring-red-500/20">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm text-red-400">
              <span className="font-bold">{lostPercentage}%</span> lost to expenses
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
