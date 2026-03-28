export const dynamic = 'force-dynamic';

import Link from 'next/link';
import LiveSearch from '@/components/LiveSearch';
import ToolCard from '@/components/ToolCard';
import { Layers } from 'lucide-react';

import { tools as toolsData, categories as categoriesData } from '@/config/toolsDB';

async function getTools() {
  try {
    // Return statically configured tools mapped with category details
    return toolsData.map(t => {
      const category = categoriesData.find(c => c.slug === t.category_slug);
      return {
        id: t.slug,
        name: t.name,
        slug: t.slug,
        config: t.config,
        category_name: category ? category.name : t.category_slug,
        category_slug: t.category_slug
      };
    });
  } catch (e) {
    console.error('Static Config Error:', e);
    return [];
  }
}

export default async function Home() {
  const tools = await getTools();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center animate-fade-in text-[var(--color-text-primary)]">
      {/* Hero Section */}
      <section className="w-full py-40 px-4 relative flex flex-col items-center text-center overflow-hidden">
        
        {/* Dynamic Abstract Background Lines & Glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[var(--color-secondary)] opacity-[0.15] rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.1] rounded-full blur-[150px]"></div>
          
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent"></div>
        </div>

        <div className="z-10 w-full max-w-5xl flex flex-col items-center relative">
          <div className="glass-panel px-6 py-2.5 rounded-full inline-flex items-center space-x-3 mb-10 mx-auto shadow-2xl border border-[var(--color-border)] opacity-0 animate-[fade-in-up_1s_forwards]">
            <Layers className="text-[var(--color-primary)] w-5 h-5" />
            <span className="text-[var(--color-text-secondary)] font-medium tracking-widest uppercase text-xs">All-in-One Tools Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-[var(--color-text-primary)] mb-8 tracking-tighter opacity-0 animate-[fade-in-up_1s_0.2s_forwards]">
            Execute With <span className="text-gradient">Precision</span>
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-16 max-w-3xl font-light opacity-0 animate-[fade-in-up_1s_0.4s_forwards]">
            Over a thousand meticulously crafted developer, text, image, and utility tools running natively in a blazing-fast edge environment.
          </p>
          
          <div className="w-full opacity-0 animate-[fade-in-up_1s_0.6s_forwards]">
             <LiveSearch />
          </div>
        </div>
      </section>

      {/* Tools Grid Area */}
      <main className="w-full max-w-7xl mx-auto px-4 py-24 z-10 relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight">Featured Array</h2>
            <p className="text-[var(--color-text-secondary)] mt-3">Curated high-performance handlers.</p>
          </div>
          <Link href="/tools" className="text-[var(--color-accent)] font-semibold hover:text-white transition-colors mt-4 md:mt-0 flex items-center space-x-2 group">
            <span>View all tools</span>
            <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tools.map((tool: any) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-panel rounded-3xl">
            <p className="text-[var(--color-text-secondary)]">Database engines are booting. Secure lines disconnected.</p>
          </div>
        )}
      </main>

       {/* Native Tailwind Keyframes injection for immediate page load animations without client hooks */}
       <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in-up 0.4s ease-out forwards; }
       `}} />
    </div>
  );
}
