"use client";

import Link from 'next/link';
import { Wrench } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';

export default function ToolCard({ tool }: { tool: any }) {
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { 
      y: -8, 
      scale: 1.02, 
      duration: 0.3, 
      ease: 'power2.out', 
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(59, 130, 246, 0.4)' 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { 
      y: 0, 
      scale: 1, 
      duration: 0.3, 
      ease: 'power2.out', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)' 
    });
  };

  return (
    <Link href={`/tool/${tool.slug}`}>
      <div 
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-[var(--color-surface)] p-6 rounded-2xl shadow-md border border-[var(--color-border)] h-full flex flex-col justify-between transition-colors group cursor-pointer relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity"></div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-elevated)] to-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-primary)] rounded-xl flex items-center justify-center mb-5 group-hover:text-[var(--color-accent)] group-hover:border-[var(--color-primary)] transition-all">
            <Wrench size={20} />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)] tracking-wide">{tool.name}</h3>
          
          {tool.category_name && (
            <span className="inline-block mt-3 text-[10px] font-bold bg-[var(--color-elevated)] text-[var(--color-secondary)] px-3 py-1.5 rounded-md uppercase tracking-widest border border-[var(--color-border)] opacity-80 group-hover:opacity-100 transition-opacity">
              {tool.category_name}
            </span>
          )}
        </div>
        
        <div className="absolute bottom-6 right-6 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[var(--color-accent)] font-medium text-sm">
          Execute &rarr;
        </div>
      </div>
    </Link>
  );
}
