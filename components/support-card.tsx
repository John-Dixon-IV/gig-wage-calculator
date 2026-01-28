"use client";

import { Heart, Coffee } from "lucide-react";

export function SupportCard() {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 ring-1 ring-rose-500/20 p-5">
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-rose-500/20 flex-shrink-0">
          <Heart className="h-6 w-6 text-rose-400" fill="currentColor" />
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-zinc-300">
            Found this helpful? Support the developer to keep this tool free forever.
          </p>
        </div>

        <a
          href="https://buymeacoffee.com/gigwagecalc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 
                     text-zinc-900 font-semibold px-5 py-2.5 transition-all duration-200
                     hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/25
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <Coffee className="h-4 w-4" />
          <span>Buy Me a Coffee</span>
        </a>
      </div>
    </div>
  );
}
