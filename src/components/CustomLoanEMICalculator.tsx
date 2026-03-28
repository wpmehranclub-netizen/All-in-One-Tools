"use client";

import { useState, useEffect } from 'react';

export default function CustomLoanEMICalculator({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [principal, setPrincipal] = useState<number>(50000);
  const [interest, setInterest] = useState<number>(5.5);
  const [tenure, setTenure] = useState<number>(60);

  useEffect(() => {
    onSubmit({ principal, interest, tenure });
  }, [principal, interest, tenure]);

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-8 rounded-[2rem] shadow-2xl bg-[var(--color-surface)] relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="relative z-10 space-y-8">
        {/* Principal Amount Slider */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Loan Amount</label>
            <div className="text-3xl font-black text-white px-4 py-1 bg-[var(--color-elevated)] rounded-xl border border-[var(--color-border)] shadow-inner">
              ${principal.toLocaleString()}
            </div>
          </div>
          <input
            type="range"
            min="1000"
            max="1000000"
            step="1000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="w-full accent-[var(--color-primary)] h-3 bg-[var(--color-elevated)] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Interest Rate Slider */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Interest Rate</label>
            <div className="text-3xl font-black text-white px-4 py-1 bg-[var(--color-elevated)] rounded-xl border border-[var(--color-border)] shadow-inner">
              {interest}%
            </div>
          </div>
          <input
            type="range"
            min="0.1"
            max="30"
            step="0.1"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            className="w-full accent-[var(--color-secondary)] h-3 bg-[var(--color-elevated)] rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Loan Tenure Slider */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <label className="text-sm font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Duration (Months)</label>
            <div className="text-3xl font-black text-white px-4 py-1 bg-[var(--color-elevated)] rounded-xl border border-[var(--color-border)] shadow-inner">
              {tenure} <span className="text-sm font-medium text-[var(--color-text-secondary)]">mos</span>
            </div>
          </div>
          <input
            type="range"
            min="6"
            max="360"
            step="6"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
            className="w-full accent-[var(--color-accent)] h-3 bg-[var(--color-elevated)] rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
