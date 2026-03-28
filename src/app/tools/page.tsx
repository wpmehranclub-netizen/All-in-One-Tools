export const dynamic = 'force-dynamic';

import Link from 'next/link';
import ToolCard from '@/components/ToolCard';
import { Layers, ArrowLeft } from 'lucide-react';

import { tools as toolsData, categories as categoriesData } from '@/config/toolsDB';

async function getTools() {
  try {
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

export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center animate-fade-in">
      {/* Header section */}
      <div className="w-full bg-[var(--color-surface)] border-b border-[var(--color-border)] pt-8 pb-12 px-4 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[var(--color-primary)] opacity-[0.05] rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          <Link href="/" className="inline-flex items-center text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] mb-6 transition-colors w-fit text-sm font-semibold uppercase tracking-wider">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Core Directory
          </Link>
          <div className="flex items-center space-x-5">
            <div className="bg-[var(--color-elevated)] p-4 rounded-xl border border-[var(--color-border)] text-[var(--color-primary)] shadow-inner">
              <Layers size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text-primary)] tracking-tight">System Modules</h1>
              <p className="text-[var(--color-text-secondary)] mt-2 text-lg font-light">Browse the entire collection of active execution nodes.</p>
            </div>
          </div>
       </div>
      </div>

      <main className="w-full max-w-7xl mx-auto px-4 py-20 z-10">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tools.map((tool: any) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 glass-panel rounded-3xl w-full">
            <p className="text-[var(--color-text-secondary)]">Zero active nodes detected. Ensure backend uplinks are active.</p>
          </div>
        )}
      </main>

      {/* Native Tailwind Keyframes injection */}
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
