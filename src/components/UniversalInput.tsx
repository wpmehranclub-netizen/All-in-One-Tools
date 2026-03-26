"use client";

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function UniversalInput({ config, onSubmit, isLoading }: { config: any, onSubmit: any, isLoading: boolean }) {
  const [formData, setFormData] = useState<any>({});
  const formRef = useRef(null);
  
  // Real-time debounce compilation
  useEffect(() => {
    if (!config?.realtime) return;
    
    const delayDebounceFn = setTimeout(() => {
      if (Object.keys(formData).length > 0) {
        let hasAllRequiredPaths = true;
        config.inputs.forEach((input: any) => {
          if (input.required && !formData[input.name]) hasAllRequiredPaths = false;
        });

        if (hasAllRequiredPaths) {
          onSubmit(formData);
        }
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, config]);

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    // Animate glow effect natively on the parent layer
    gsap.to(e.target, { boxShadow: '0 0 15px rgba(6, 182, 212, 0.3)', duration: 0.2, yoyo: true, repeat: 1 });

    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    gsap.to('.submit-button', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
  };

  if (!config) return null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 w-full max-w-3xl mx-auto glass-panel p-8 rounded-2xl shadow-xl transition-all">
      {config.inputs.map((input: any) => (
        <div key={input.name} className="flex flex-col space-y-3">
          <label className="text-sm font-semibold text-[var(--color-text-secondary)] tracking-wide uppercase">
            {input.label} {input.required && <span className="text-[var(--color-error)]">*</span>}
          </label>
          
          {input.type === 'textarea' ? (
            <textarea
              name={input.name}
              required={input.required}
              onChange={handleInputChange}
              className="w-full px-5 py-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:outline-none min-h-[160px] transition-all text-[var(--color-text-primary)] shadow-inner"
              placeholder={`Enter ${input.label.toLowerCase()}...`}
            />
          ) : input.type === 'select' ? (
            <select
              name={input.name}
              required={input.required}
              onChange={handleInputChange}
              className="w-full px-5 py-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all text-[var(--color-text-primary)] appearance-none shadow-inner"
            >
              <option value="">Select an option</option>
              {input.options.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : input.type === 'file' ? (
            <input
              type="file"
              name={input.name}
              required={input.required}
              accept={input.accept}
              onChange={handleInputChange}
              className="w-full px-5 py-4 bg-[var(--color-bg)] border border-[var(--color-border)] border-dashed rounded-xl cursor-pointer hover:bg-[var(--color-elevated)] transition-all text-[var(--color-text-secondary)] shadow-inner"
            />
          ) : (
            <input
              type={input.type}
              name={input.name}
              required={input.required}
              onChange={handleInputChange}
              className="w-full px-5 py-4 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none transition-all text-[var(--color-text-primary)] shadow-inner"
            />
          )}
        </div>
      ))}
      
      {!config.realtime && (
         <button 
           type="submit" 
           disabled={isLoading}
           className="submit-button w-full relative group overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {isLoading ? 'Processing...' : 'Execute Tool'}
           <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
         </button>
      )}
    </form>
  );
}
