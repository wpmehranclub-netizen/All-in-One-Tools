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
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center animate-fade-in text-[var(--color-text-primary)] font-sans">
      {/* Hero Section */}
      <section className="w-full pt-20 pb-16 px-4 flex flex-col items-center text-center">
        
        <h1 className="text-4xl md:text-[3.2rem] leading-tight font-extrabold text-[var(--color-secondary)] mb-4 tracking-tight">
          Every tool you could want in one place
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl font-medium">
          Your online Swiss Army Knife is here and forever free!
        </p>
        
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl">
           <button className="px-6 py-2 rounded-full bg-[var(--color-secondary)] text-white text-sm font-semibold transition-transform hover:scale-105">All</button>
           {['Text', 'Image', 'Health', 'Math', 'Finance'].map(cat => (
             <button key={cat} className="px-6 py-2 rounded-full bg-white border border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-semibold hover:border-gray-300 hover:shadow-sm transition-all">{cat}</button>
           ))}
        </div>

        <div className="w-full max-w-2xl mx-auto">
           <LiveSearch />
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
