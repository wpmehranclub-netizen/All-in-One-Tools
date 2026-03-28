"use client";

import { useState, useEffect } from 'react';
import { ArrowDownUp } from 'lucide-react';
import gsap from 'gsap';

const lengthUnits = ['Meters', 'Kilometers', 'Miles', 'Feet'];
const massUnits = ['Kilograms', 'Pounds'];

export default function CustomUnitConverter({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [value, setValue] = useState<string>('1');
  const [category, setCategory] = useState<'Length' | 'Mass'>('Length');
  const [fromUnit, setFromUnit] = useState<string>('Kilometers');
  const [toUnit, setToUnit] = useState<string>('Miles');

  useEffect(() => {
    onSubmit({ value: parseFloat(value), fromUnit, toUnit });
  }, [value, fromUnit, toUnit]);

  const handleCategoryChange = (cat: 'Length' | 'Mass') => {
    setCategory(cat);
    if (cat === 'Length') {
      setFromUnit('Kilometers');
      setToUnit('Miles');
    } else {
      setFromUnit('Kilograms');
      setToUnit('Pounds');
    }
  };

  const handleSwap = () => {
    gsap.fromTo('.swap-icon-container', { rotation: 0 }, { rotation: 180, duration: 0.3, ease: "power2.inOut" });
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const units = category === 'Length' ? lengthUnits : massUnits;

  return (
    <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-[2rem] shadow-2xl bg-[var(--color-surface)] relative">
      <div className="flex justify-center space-x-2 mb-8 bg-[var(--color-elevated)] p-1 rounded-xl">
         <button 
           onClick={() => handleCategoryChange('Length')}
           className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${category === 'Length' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-[var(--color-text-secondary)] hover:text-white'}`}
         >
           Length
         </button>
         <button 
           onClick={() => handleCategoryChange('Mass')}
           className={`flex-1 py-2 rounded-lg font-bold transition-all text-sm ${category === 'Mass' ? 'bg-[var(--color-secondary)] text-white shadow-md' : 'text-[var(--color-text-secondary)] hover:text-white'}`}
         >
           Mass
         </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-widest pl-2">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-[var(--color-elevated)]/50 border border-[var(--color-border)] rounded-2xl py-4 px-6 text-2xl font-black text-center text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            placeholder="0"
          />
        </div>

        <div className="flex flex-col items-center gap-2 relative">
          <div className="w-full">
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full appearance-none bg-[var(--color-elevated)] border border-[var(--color-border)] rounded-2xl py-4 pl-6 pr-10 text-lg font-semibold text-center text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer transition-all"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          
          <button onClick={handleSwap} className="swap-icon-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--color-surface)] border-4 border-[var(--color-bg)] rounded-full flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-elevated)] hover:text-white transition-colors z-10 shadow-lg">
             <ArrowDownUp className="w-4 h-4" />
          </button>

          <div className="w-full">
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full appearance-none bg-[var(--color-elevated)] border border-[var(--color-border)] rounded-2xl py-4 pl-6 pr-10 text-lg font-semibold text-center text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] cursor-pointer transition-all"
            >
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
