"use client";

import { CalculatorInputs, CalculationMode } from "@/lib/calculate-net-profit";
import {
  DollarSign,
  Clock,
  MapPin,
  Fuel,
  Gauge,
  Percent,
  Wrench,
  Calculator,
  Zap,
} from "lucide-react";

interface CalculatorFormProps {
  inputs: CalculatorInputs;
  onInputChange: (field: keyof CalculatorInputs, value: number | string) => void;
}

export function CalculatorForm({ inputs, onInputChange }: CalculatorFormProps) {
  const handleChange =
    (field: keyof CalculatorInputs) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value) || 0;
      onInputChange(field, value);
    };

  const handleModeChange = (mode: CalculationMode) => {
    onInputChange("calculationMode", mode);
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="rounded-2xl bg-zinc-900/50 ring-1 ring-zinc-800/50 p-4">
        <label className="text-sm font-medium text-zinc-400 mb-3 block">
          Calculation Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <ModeButton
            active={inputs.calculationMode === "irs"}
            onClick={() => handleModeChange("irs")}
            icon={<Calculator className="h-4 w-4" />}
            title="Quick Estimate"
            description="IRS mileage rate"
          />
          <ModeButton
            active={inputs.calculationMode === "actual"}
            onClick={() => handleModeChange("actual")}
            icon={<Zap className="h-4 w-4" />}
            title="My Actual Costs"
            description="Based on your MPG"
          />
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          {inputs.calculationMode === "irs" ? (
            <>
              Uses the IRS standard rate of ${inputs.irsMileageRate}/mile which
              covers gas, depreciation, maintenance, and insurance.
            </>
          ) : (
            <>
              Calculates your real gas cost based on your MPG and local gas
              price, plus vehicle wear and tear.
            </>
          )}
        </p>
      </div>

      {/* Main Form */}
      <div className="rounded-2xl bg-zinc-900/50 ring-1 ring-zinc-800/50 p-6 sm:p-8">
        {/* Primary Inputs - Always visible */}
        <div className="grid gap-5 sm:grid-cols-2">
          <InputField
            id="grossEarnings"
            label="Weekly Earnings"
            value={inputs.grossEarnings || ""}
            onChange={handleChange("grossEarnings")}
            placeholder="800"
            icon={<DollarSign className="h-4 w-4" />}
            prefix="$"
            hint="Total payout from all apps"
          />

          <InputField
            id="hoursOnline"
            label="Hours Online"
            value={inputs.hoursOnline || ""}
            onChange={handleChange("hoursOnline")}
            placeholder="40"
            icon={<Clock className="h-4 w-4" />}
            suffix="hrs"
            hint="Time logged in apps"
          />

          <InputField
            id="milesDriven"
            label="Miles Driven"
            value={inputs.milesDriven || ""}
            onChange={handleChange("milesDriven")}
            placeholder="500"
            icon={<MapPin className="h-4 w-4" />}
            suffix="mi"
            hint="Total business miles"
          />

          {/* Conditional field based on mode */}
          {inputs.calculationMode === "irs" ? (
            <InputField
              id="irsMileageRate"
              label="IRS Mileage Rate"
              value={inputs.irsMileageRate || ""}
              onChange={handleChange("irsMileageRate")}
              placeholder="0.67"
              icon={<Calculator className="h-4 w-4" />}
              prefix="$"
              suffix="/mi"
              hint="2024 rate: $0.67/mile"
            />
          ) : (
            <InputField
              id="mpg"
              label="Your Car's MPG"
              value={inputs.mpg || ""}
              onChange={handleChange("mpg")}
              placeholder="25"
              icon={<Gauge className="h-4 w-4" />}
              suffix="mpg"
              hint="Average fuel economy"
            />
          )}
        </div>

        {/* Additional fields for Actual Cost mode */}
        {inputs.calculationMode === "actual" && (
          <div className="mt-5 pt-5 border-t border-zinc-800/50 grid gap-5 sm:grid-cols-2 animate-in fade-in duration-300">
            <InputField
              id="gasPrice"
              label="Gas Price"
              value={inputs.gasPrice || ""}
              onChange={handleChange("gasPrice")}
              placeholder="3.50"
              icon={<Fuel className="h-4 w-4" />}
              prefix="$"
              suffix="/gal"
              hint="Your local price per gallon"
            />

            <InputField
              id="depreciationRate"
              label="Wear & Tear"
              value={inputs.depreciationRate || ""}
              onChange={handleChange("depreciationRate")}
              placeholder="0.20"
              icon={<Wrench className="h-4 w-4" />}
              prefix="$"
              suffix="/mi"
              hint="Depreciation + maintenance"
            />
          </div>
        )}

        {/* Tax Rate - Always visible */}
        <div className="mt-5 pt-5 border-t border-zinc-800/50">
          <div className="sm:w-1/2 sm:pr-2.5">
            <InputField
              id="taxRate"
              label="Self-Employment Tax Rate"
              value={inputs.taxRate || ""}
              onChange={handleChange("taxRate")}
              placeholder="15.3"
              icon={<Percent className="h-4 w-4" />}
              suffix="%"
              hint="Standard SE tax is 15.3%"
            />
          </div>
        </div>

        {/* Privacy Notice */}
        <p className="mt-6 text-xs text-zinc-500 flex items-center gap-1.5">
          <svg
            className="h-3.5 w-3.5 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          Your data stays on your device. Nothing is stored or sent to any server.
        </p>
      </div>
    </div>
  );
}

interface ModeButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ModeButton({ active, onClick, icon, title, description }: ModeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex flex-col items-center gap-1 rounded-xl p-4 text-center
        transition-all duration-200
        ${
          active
            ? "bg-amber-500/10 ring-2 ring-amber-500/50 text-amber-500"
            : "bg-zinc-800/50 ring-1 ring-zinc-700/50 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
        }
      `}
    >
      <div
        className={`
        flex items-center justify-center h-8 w-8 rounded-lg mb-1
        ${active ? "bg-amber-500/20" : "bg-zinc-700/50"}
      `}
      >
        {icon}
      </div>
      <span className="font-medium text-sm">{title}</span>
      <span className={`text-xs ${active ? "text-amber-500/70" : "text-zinc-500"}`}>
        {description}
      </span>
      {active && (
        <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-amber-500" />
      )}
    </button>
  );
}

interface InputFieldProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  prefix?: string;
  suffix?: string;
  hint?: string;
}

function InputField({
  id,
  label,
  value,
  onChange,
  placeholder,
  icon,
  prefix,
  suffix,
  hint,
}: InputFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="input-label flex items-center gap-2">
        <span className="text-zinc-500">{icon}</span>
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
            {prefix}
          </span>
        )}
        <input
          type="number"
          inputMode="decimal"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${prefix ? "pl-8" : ""} ${suffix ? "pr-14" : ""}`}
          step="any"
          min="0"
          aria-describedby={hint ? `${id}-hint` : undefined}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-zinc-500">
          {hint}
        </p>
      )}
    </div>
  );
}
