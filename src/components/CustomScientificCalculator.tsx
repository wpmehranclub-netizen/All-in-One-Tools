"use client";

import { useState } from 'react';
import gsap from 'gsap';

export default function CustomScientificCalculator({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [expression, setExpression] = useState('');

  const append = (str: string) => {
    gsap.fromTo(`#btn-sci-${str.replace(/\W/g, '')}`, { scale: 0.9 }, { scale: 1, duration: 0.1 });
    // Realtime evaluate if possible, but it's handled by engine. We will trigger onSubmit below.
    const newExpr = expression + str;
    setExpression(newExpr);
    onSubmit({ expression: newExpr }); // send to engine real-time
  };

  const backspace = () => {
    gsap.fromTo('#btn-bk', { scale: 0.9 }, { scale: 1, duration: 0.1 });
    const newExpr = expression.slice(0, -1);
    setExpression(newExpr);
    onSubmit({ expression: newExpr });
  };

  const clear = () => {
    gsap.fromTo('#btn-clr', { scale: 0.9 }, { scale: 1, duration: 0.1 });
    setExpression('');
    onSubmit({ expression: '' });
  };

  const executeManual = () => {
    gsap.fromTo('#btn-ex', { scale: 0.9, backgroundColor: 'var(--color-elevated)' }, { scale: 1, backgroundColor: 'transparent', duration: 0.2 });
    onSubmit({ expression });
  };

  // Groups of buttons
  const scientifics = ['sin(', 'cos(', 'tan(', 'log(', 'sqrt(', '^', '(', ')', 'pi', 'e'];
  const numbers = ['7','8','9','/','4','5','6','*','1','2','3','-','.','0','=','+'];

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-8 rounded-3xl shadow-2xl bg-[var(--color-surface)] border border-[var(--color-border)]">
      
      {/* Input Display Area */}
      <div className="w-full bg-black/60 rounded-2xl p-6 mb-8 border border-[var(--color-accent)]/20 shadow-inner flex flex-col justify-end min-h-[120px]">
         <input 
           type="text" 
           value={expression} 
           onChange={(e) => { setExpression(e.target.value); onSubmit({ expression: e.target.value }); }}
           className="bg-transparent w-full text-right text-4xl text-white font-mono tracking-wider focus:outline-none"
           placeholder="0"
         />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Advanced Math */}
        <div className="grid grid-cols-2 flex-1 gap-3">
          {scientifics.map(op => (
            <button 
              key={op} 
              id={`btn-sci-${op.replace(/\W/g, '')}`} 
              onClick={() => append(op)} 
              className="py-3 rounded-lg bg-[var(--color-elevated)] border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-primary)]/20 transition-colors text-[var(--color-text-secondary)]"
            >
              {op.replace('(', '')}
            </button>
          ))}
          <button id="btn-clr" onClick={clear} className="col-span-2 py-3 rounded-lg bg-red-500/20 text-red-400 font-bold hover:bg-red-500/30 transition-colors tracking-wide">CLEAR</button>
        </div>

        {/* Right Side: Primary Numpad */}
        <div className="grid grid-cols-4 flex-[1.5] gap-3">
          {numbers.map(n => {
            if (n === '=') {
              return (
                <button key={n} id="btn-ex" onClick={executeManual} className="py-3 rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-black text-xl hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                 =
                </button>
              )
            }
            const isOp = isNaN(Number(n)) && n !== '.';
            return (
              <button 
                key={n} 
                id={`btn-sci-${n.replace(/\W/g, '')}`} 
                onClick={() => append(n)} 
                className={`py-3 rounded-lg border font-medium text-xl transition-colors ${isOp ? 'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
              >
                {n}
              </button>
            )
          })}
        </div>
      </div>
      
    </div>
  );
}
