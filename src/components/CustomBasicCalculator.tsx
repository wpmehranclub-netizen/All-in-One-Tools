"use client";

import { useState } from 'react';
import gsap from 'gsap';

export default function CustomBasicCalculator({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [display, setDisplay] = useState('0');
  const [num1, setNum1] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNum = (num: string) => {
    gsap.fromTo(`#btn-${num}`, { scale: 0.9, backgroundColor: 'var(--color-elevated)' }, { scale: 1, backgroundColor: 'transparent', duration: 0.2 });
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOp = (op: string) => {
    gsap.fromTo(`#btn-op`, { scale: 0.9 }, { scale: 1, duration: 0.2 });
    if (num1 === null) {
      setNum1(parseFloat(display));
    } else if (operator && !waitingForNewValue) {
      // Auto compute intermediate
      onSubmit({ num1, operator, num2: parseFloat(display) });
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const handleEquals = () => {
    gsap.fromTo('#btn-equals', { scale: 0.9 }, { scale: 1, duration: 0.2 });
    if (num1 !== null && operator) {
      onSubmit({ num1, operator, num2: parseFloat(display) });
      setNum1(null);
      setOperator(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    gsap.fromTo('#btn-clear', { scale: 0.9 }, { scale: 1, duration: 0.2 });
    setDisplay('0');
    setNum1(null);
    setOperator(null);
    setWaitingForNewValue(false);
    onSubmit({ num1: 0, operator: '+', num2: 0 }); // clear output
  };

  return (
    <div className="w-full max-w-sm mx-auto glass-panel p-6 rounded-3xl shadow-2xl bg-[var(--color-surface)]">
      <div className="w-full bg-black/40 rounded-2xl p-6 mb-6 text-right cursor-text font-mono text-5xl text-white tracking-wider overflow-hidden">
        {display}
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <button id="btn-clear" onClick={clear} className="col-span-3 py-4 rounded-xl bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors">AC</button>
        <button id="btn-op" onClick={() => handleOp('/')} className="py-4 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-xl hover:bg-[var(--color-primary)]/30 transition-colors">÷</button>
        
        {['7', '8', '9'].map(n => (
          <button key={n} id={`btn-${n}`} onClick={() => handleNum(n)} className="py-4 rounded-xl bg-white/5 border border-white/10 font-medium text-xl hover:bg-white/10 transition-colors">{n}</button>
        ))}
        <button id="btn-op" onClick={() => handleOp('*')} className="py-4 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-xl hover:bg-[var(--color-primary)]/30 transition-colors">×</button>
        
        {['4', '5', '6'].map(n => (
          <button key={n} id={`btn-${n}`} onClick={() => handleNum(n)} className="py-4 rounded-xl bg-white/5 border border-white/10 font-medium text-xl hover:bg-white/10 transition-colors">{n}</button>
        ))}
        <button id="btn-op" onClick={() => handleOp('-')} className="py-4 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-xl hover:bg-[var(--color-primary)]/30 transition-colors">-</button>
        
        {['1', '2', '3'].map(n => (
          <button key={n} id={`btn-${n}`} onClick={() => handleNum(n)} className="py-4 rounded-xl bg-white/5 border border-white/10 font-medium text-xl hover:bg-white/10 transition-colors">{n}</button>
        ))}
        <button id="btn-op" onClick={() => handleOp('+')} className="py-4 rounded-xl bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold text-xl hover:bg-[var(--color-primary)]/30 transition-colors">+</button>
        
        <button id="btn-0" onClick={() => handleNum('0')} className="col-span-2 py-4 rounded-xl bg-white/5 border border-white/10 font-medium text-xl hover:bg-white/10 transition-colors">0</button>
        <button id="btn-." onClick={() => handleNum('.')} className="py-4 rounded-xl bg-white/5 border border-white/10 font-medium text-xl hover:bg-white/10 transition-colors">.</button>
        <button id="btn-equals" onClick={handleEquals} className="py-4 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold text-2xl shadow-[0_0_15px_rgba(6,182,212,0.5)] hover:opacity-90 transition-opacity">=</button>
      </div>
    </div>
  );
}
