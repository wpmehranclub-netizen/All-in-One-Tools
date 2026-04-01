
import Link from 'next/link';
import LiveSearch from '@/components/LiveSearch';
import ToolCard from '@/components/ToolCard';
import { ArrowRight, Crown } from 'lucide-react';

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

export default async function Home() {
  const tools = await getTools();

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center animate-fade-in font-sans">
      
      {/* Hero Section */}
      <section className="w-full pt-20 pb-12 px-4 flex flex-col items-center text-center max-w-7xl mx-auto">
        
        <h1 className="text-4xl md:text-[3.2rem] leading-tight font-extrabold text-[#222222] mb-3 tracking-tight">
          Every tool you could want to calculate and convert
        </h1>
        <p className="text-lg md:text-[1.35rem] text-[#666666] mb-8 font-medium">
          Your online swiss army knife is here and forever free!
        </p>
        
        {/* Category Pills - Mimicking iLoveIMG filter chip design */}
        <div className="flex flex-wrap justify-center gap-[1px] mb-12 bg-white border border-gray-200 rounded-lg p-1 shadow-sm overflow-hidden text-[13px] font-bold text-gray-700">
           <button className="px-5 py-2 rounded-md bg-[#222] text-white transition-colors">All</button>
           {['Text', 'Image', 'Health', 'Math', 'Finance', 'Converters'].map(cat => (
             <button key={cat} className="px-5 py-2 rounded-md hover:bg-gray-100 transition-colors uppercase">{cat}</button>
           ))}
        </div>

      </section>

      {/* Tools Grid Area */}
      <main className="w-full max-w-[1400px] mx-auto px-6 pb-20 z-10 relative">

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tools.map((tool: any) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white shadow-sm border border-gray-100 rounded-sm">
            <p className="text-gray-500 font-medium">No tools found. Check database connection.</p>
          </div>
        )}
      </main>

      {/* "Work your way" block */}
      <section className="w-full bg-white py-24 px-6 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto">
           <h2 className="text-3xl font-extrabold text-center text-[#222222] mb-16 tracking-tight">Work your way</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { title: 'Switch to offline mode', subtitle: 'Use iLoveTOOLS Desktop to calculate and convert without needing internet.' },
               { title: 'Scan and edit on the go', subtitle: 'Calculate and convert anywhere with the iLoveTOOLS Mobile App.' },
               { title: 'Scale with our APIs', subtitle: 'Automate tool tasks at scale by integrating powerful calculation tools into your product.' }
             ].map((feature, i) => (
               <div key={i} className="bg-[#F8F9FA] rounded-[2rem] p-10 flex flex-col pt-16 hover:-translate-y-2 transition-transform duration-300">
                 <div className="w-full h-40 bg-white shadow-md rounded-xl border border-gray-100 mb-8 flex items-center justify-center text-blue-100 overflow-hidden relative">
                    <div className="w-3/4 h-6 bg-gray-100 absolute top-4 left-4 rounded"></div>
                    <div className="w-1/2 h-6 bg-gray-100 absolute top-14 left-4 rounded"></div>
                    <div className="w-full h-1 bg-green-400 absolute bottom-1/3 shadow-[0_0_10px_rgba(74,222,128,1)]"></div>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                 <p className="text-[#6B7280] font-medium leading-relaxed mb-6 flex-grow">{feature.subtitle}</p>
                 <ArrowRight className="w-5 h-5 text-gray-900 self-end" />
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* "Get more with Premium" block */}
      <section className="w-full max-w-[1200px] mx-auto px-6 py-20 pb-32">
        <div className="bg-[#FFF8E7] rounded-[2rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm">
          <div className="z-10 max-w-md">
            <h2 className="text-4xl font-extrabold text-[#222222] mb-6 tracking-tight">Get more with Premium</h2>
            <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
              Work faster and smarter with advanced calculation algorithms, batch processing, and powerful AI features —built for high-demand workflows.
            </p>
            <button className="bg-[#FFB703] hover:bg-[#FFA700] text-gray-900 font-extrabold px-8 py-4 rounded-md transition-colors flex items-center shadow-sm">
               <Crown className="w-5 h-5 mr-3" />
               Get Premium
            </button>
          </div>
          
          <div className="hidden md:flex flex-col space-y-4 z-10 mt-8 md:mt-0 relative w-[400px]">
            {/* Mockup visual representing premium features */}
            <div className="w-full bg-white shadow-lg rounded-xl border border-gray-100 p-6 z-20 absolute -right-10 -top-20 -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <div className="h-4 w-1/3 bg-gray-200 mb-4 rounded"></div>
              <div className="h-3 w-full bg-gray-100 mb-2 rounded"></div>
              <div className="h-3 w-5/6 bg-gray-100 mb-2 rounded"></div>
              <div className="h-3 w-4/6 bg-gray-100 mb-6 rounded"></div>
              <div className="h-10 w-full bg-[#FFEED4] rounded-md flex items-center justify-center text-[#FFB703] font-bold">Priority Processing</div>
            </div>
            <div className="w-64 bg-white shadow-md rounded-xl border border-gray-100 p-4 z-10 absolute -left-10 top-20 rotate-6 translate-y-20">
              <div className="w-8 h-8 rounded-full bg-[#FFB703] text-white flex items-center justify-center shadow-sm"><Crown className="w-4 h-4" /></div>
            </div>
          </div>

          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-400/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4"></div>
        </div>
      </section>

      {/* SEO text */}
      <section className="w-full text-center pb-20 px-4">
        <h2 className="text-3xl font-extrabold text-[#222222] mb-4">Your trusted online toolkit, loved by users worldwide</h2>
        <p className="text-[#6B7280] font-medium max-w-2xl mx-auto">
          iLoveTOOLS is your simple solution for calculating and converting online. Access all the tools you need to enhance your workflow effortlessly, straight from the web, with 100% security.
        </p>
        <div className="flex justify-center items-center space-x-12 mt-12 opacity-60">
          <div className="flex items-center space-x-2 font-bold text-gray-800">
            <span className="text-2xl font-black">150</span>
            <span className="text-xs uppercase">ISO<br/>Certified</span>
          </div>
          <div className="flex items-center space-x-2 font-bold text-gray-800">
            <span className="text-2xl font-black">256</span>
            <span className="text-xs uppercase">Secure<br/>Encrypted</span>
          </div>
        </div>
      </section>

       {/* Native Tailwind Keyframes injection */}
       <style dangerouslySetInnerHTML={{__html: `
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in-up 0.5s ease-out forwards; }
       `}} />
    </div>
  );
}
