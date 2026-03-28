"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Copy, CheckCircle, Sparkles, AlertTriangle } from 'lucide-react';

export default function UniversalOutput({ config, result }: { config: any, result: any }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const hasAnimatedInitial = useRef(false);

  useEffect(() => {
    if (result && containerRef.current) {
      if (result.Error) {
         gsap.fromTo('.error-banner', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(2)' });
         return;
      }
      
      // Fun creativity animation on success icon
      gsap.fromTo('.sparkle-icon', { rotate: -45, scale: 0.5, opacity: 0 }, { rotate: 0, scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2.5)' });

      if (config.output.type === 'metrics_grid') {
        if (!hasAnimatedInitial.current) {
          gsap.fromTo('.metric-card', 
            { opacity: 0, y: 30, scale: 0.9 }, 
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' }
          );
          hasAnimatedInitial.current = true;
        } else {
          gsap.fromTo('.metric-value',
            { scale: 1.15, textShadow: '0px 0px 15px var(--color-primary)' },
            { scale: 1, textShadow: '0px 0px 0px transparent', duration: 0.3, ease: 'power2.out' }
          );
        }
      } else {
        if (!hasAnimatedInitial.current) {
           gsap.fromTo(containerRef.current, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' });
           hasAnimatedInitial.current = true;
        }
      }
    }
  }, [result, config]);

  if (!result || !config) return null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (result.Error) {
    return (
      <div className="error-banner mt-8 w-full max-w-3xl mx-auto bg-red-500/10 border border-red-500/30 p-4 flex items-center rounded-2xl shadow-lg">
         <AlertTriangle className="text-red-500 w-6 h-6 mr-3 animate-pulse" />
         <span className="text-red-400 font-semibold">{result.Error}</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="mt-8 w-full max-w-3xl mx-auto relative group">
      
      {/* Creative Success Floating Badge */}
      <div className="sparkle-icon absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-tr from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.6)] z-20 hidden md:flex">
         <Sparkles className="text-white w-8 h-8" />
      </div>

      {config.output.type === 'metrics_grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
          {Object.entries(result).map(([key, val]) => (
            <div key={key} className="metric-card bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden group/card hover:border-[var(--color-primary)]/50 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-0 group-hover/card:opacity-10 transition-opacity duration-300"></div>
              <span className="text-[var(--color-text-secondary)] text-sm uppercase tracking-wider font-semibold mb-2 flex items-center gap-2">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="metric-value text-3xl xl:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 inline-block transition-transform">
                {String(val)}
              </span>
            </div>
          ))}
        </div>
      ) : config.output.type === 'code' || config.output.type === 'json' ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[var(--color-elevated)] px-4 py-3 flex justify-between items-center border-b border-[var(--color-border)]">
            <span className="text-xs text-[var(--color-text-secondary)] font-mono uppercase">Output</span>
            <button onClick={() => handleCopy(result.formatted || JSON.stringify(result, null, 2))} className="text-[var(--color-text-secondary)] hover:text-white transition-colors flex items-center space-x-1 text-xs">
              {copied ? <CheckCircle size={14} className="text-[var(--color-success)]" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <pre className="p-6 overflow-x-auto text-sm text-[var(--color-accent)] font-mono">
            <code>{result.formatted || JSON.stringify(result, null, 2)}</code>
          </pre>
        </div>
      ) : config.output.type === 'image' ? (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-2xl flex flex-col items-center">
          <img src={result.imageBase64} alt="Tool Result" className="max-w-full h-auto rounded-lg shadow-2xl border border-[var(--color-elevated)]" />
          <a 
            href={result.imageBase64} 
            download="result-image.png"
            className="mt-6 w-full text-center bg-[var(--color-elevated)] hover:bg-[var(--color-primary)] text-white font-medium py-3 rounded-xl transition-colors shadow-md"
          >
            Download Image
          </a>
        </div>
      ) : (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-8 rounded-2xl shadow-xl relative group">
           <button onClick={() => handleCopy(result.result || result.text)} className="absolute top-4 right-4 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors">
              {copied ? <CheckCircle size={18} className="text-[var(--color-success)]" /> : <Copy size={18} />}
           </button>
           <div className="text-lg text-[var(--color-text-primary)] font-medium leading-relaxed whitespace-pre-wrap">
             {result.result || result.text || JSON.stringify(result)}
           </div>
        </div>
      )}
    </div>
  );
}
