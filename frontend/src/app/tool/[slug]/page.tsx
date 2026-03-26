"use client";

import { useEffect, useState, use } from 'react';
import axios from 'axios';
import UniversalInput from '@/components/UniversalInput';
import UniversalOutput from '@/components/UniversalOutput';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { clientHandlers } from '@/engine/clientHandlers';

export default function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const unwrappedParams = use(params);
  const { slug } = unwrappedParams;
  
  const [tool, setTool] = useState<any>(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [loadingExecute, setLoadingExecute] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Start animation without hardcoding opacity-0 in CSS class so React hydration doesn't fail
    gsap.from('.page-container', { opacity: 0, duration: 0.3, ease: 'power2.out' });

    axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/tool/${slug}`)
      .then(res => {
        setTool(res.data.data);
        setLoadingConfig(false);
        setTimeout(() => {
           gsap.from('.anim-slide-down', { opacity: 0, y: -20, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
        }, 50);
      })
      .catch(err => {
        console.error(err);
        setError('Tool execution nodes disconnected or backend offline.');
        setLoadingConfig(false);
      });
  }, [slug]);

  const handleExecute = async (payload: any) => {
    setError(null);
    
    // Smart Routing Proxy: Execute entirely in the browser if real-time
    if (tool.config.realtime && clientHandlers[slug as string]) {
      try {
        const localResult = clientHandlers[slug as string](payload);
        setResult(localResult);
      } catch (err: any) {
        setError("Local DOM execution failed: " + err.message);
      }
      return; // Skip backend server entirely to reduce API load
    }

    // Standard Backend Execution
    setLoadingExecute(true);
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/execute-tool`, { slug, payload });
      setResult(res.data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoadingExecute(false);
    }
  };

  if (loadingConfig) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[var(--color-elevated)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-black text-[var(--color-error)] mb-4">Error 404</h1>
        <p className="text-lg text-[var(--color-text-secondary)] mb-8">{error}</p>
        <Link href="/" className="px-8 py-4 bg-[var(--color-surface)] border border-[var(--color-border)] text-white rounded-xl hover:bg-[var(--color-elevated)] transition">
          Abort to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] page-container pb-32">
       {/* Ambient glow */}
       <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-[var(--color-surface)] via-[var(--color-bg)] to-[var(--color-bg)] pointer-events-none"></div>

      {/* Header section */}
      <div className="pt-16 pb-12 px-4 relative z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="anim-slide-down inline-flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-8 transition-colors text-sm font-semibold tracking-wide uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Terminal Base
          </Link>
          <div className="anim-slide-down flex flex-col items-start space-y-4">
            <span className="px-3 py-1 bg-[var(--color-elevated)] border border-[var(--color-border)] text-[var(--color-secondary)] text-xs font-black rounded-lg uppercase tracking-widest shadow-inner">
              {tool.category_slug}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-[var(--color-text-primary)] tracking-tight">{tool.name}</h1>
          </div>
        </div>
      </div>

      {/* Engine Injection */}
      <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col items-center relative z-10">
        <UniversalInput config={tool.config} onSubmit={handleExecute} isLoading={loadingExecute} />
        
        {tool.config.realtime && result && (
           <div className="w-full max-w-3xl mt-6 px-4 py-2 border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-lg text-xs font-mono flex items-center">
             <div className="w-2 h-2 bg-[var(--color-accent)] rounded-full mr-3 animate-pulse"></div>
             Real-time Node Connected
           </div>
        )}

        <UniversalOutput config={tool.config} result={result} />
      </div>
    </div>
  );
}
