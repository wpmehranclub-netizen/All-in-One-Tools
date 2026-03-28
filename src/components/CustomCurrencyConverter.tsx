"use client";

import { useState, useRef, useEffect } from 'react';
import { ArrowRightLeft, DollarSign } from 'lucide-react';
import gsap from 'gsap';

const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'BTC'];

export default function CustomCurrencyConverter({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [amount, setAmount] = useState<string>('100');
  const [from, setFrom] = useState<string>('USD');
  const [to, setTo] = useState<string>('EUR');
  
  const iconRef = useRef(null);

  useEffect(() => {
    onSubmit({ amount: parseFloat(amount), from, to });
  }, [amount, from, to]);

  const handleSwap = () => {
    gsap.fromTo(iconRef.current, { rotation: 0 }, { rotation: 180, duration: 0.4, ease: "power2.inOut" });
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="w-full max-w-lg mx-auto glass-panel p-8 rounded-[2rem] shadow-2xl bg-[var(--color-surface)] relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 w-full mb-8">
        <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">Amount</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <DollarSign className="w-6 h-6 text-[var(--color-text-secondary)] opacity-50" />
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-[var(--color-elevated)] border border-[var(--color-border)] rounded-2xl py-4 pl-14 pr-6 text-3xl font-black text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all shadow-inner"
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        <div className="w-full">
          <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">From</label>
          <div className="relative">
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full appearance-none bg-[var(--color-elevated)] border border-[var(--color-border)] rounded-2xl py-4 pl-6 pr-12 text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
            >
              {commonCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSwap}
          className="mt-6 p-4 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 hover:scale-110 transition-all border border-[var(--color-primary)]/20 shadow-lg flex-shrink-0"
        >
          <div ref={iconRef}>
            <ArrowRightLeft className="w-6 h-6" />
          </div>
        </button>

        <div className="w-full">
          <label className="block text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">To</label>
          <div className="relative">
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full appearance-none bg-[var(--color-elevated)] border border-[var(--color-border)] rounded-2xl py-4 pl-6 pr-12 text-xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all cursor-pointer"
            >
              {commonCurrencies.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
