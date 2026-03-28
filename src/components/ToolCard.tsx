"use client";

import Link from 'next/link';
import { Settings, Image, Calculator, FileText, Activity, Clock } from 'lucide-react';

export default function ToolCard({ tool }: { tool: any }) {

  const getIcon = () => {
    switch(tool.category_slug) {
      case 'image': return <Image size={28} className="text-white" strokeWidth={1.5} />;
      case 'math': return <Calculator size={28} className="text-white" strokeWidth={1.5} />;
      case 'text': return <FileText size={28} className="text-white" strokeWidth={1.5} />;
      case 'health': return <Activity size={28} className="text-white" strokeWidth={1.5} />;
      case 'datetime': return <Clock size={28} className="text-white" strokeWidth={1.5} />;
      default: return <Settings size={28} className="text-white" strokeWidth={1.5} />;
    }
  };

  const getBgColor = () => {
    switch(tool.category_slug) {
      case 'image': return 'bg-[#3C82F6]';
      case 'math': return 'bg-[#10B981]';
      case 'text': return 'bg-[#8B5CF6]';
      case 'health': return 'bg-[#F43F5E]';
      case 'datetime': return 'bg-[#F59E0B]';
      default: return 'bg-[#6B7280]';
    }
  };

  return (
    <Link href={`/tool/${tool.slug}`} className="block h-full group relative">
      <div className="bg-white p-7 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-transparent hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] flex flex-col h-full transition-shadow duration-300 relative overflow-hidden">
        <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-5 ${getBgColor()}`}>
          {getIcon()}
        </div>
        
        <h3 className="text-lg font-bold mb-2 text-gray-900 tracking-tight leading-snug">
          {tool.name}
        </h3>
        
        <p className="text-[13px] text-gray-600 leading-relaxed font-medium">
          Fast and free online {tool.name.toLowerCase()} tool to optimize your workflow in bulk while saving space.
        </p>

        {/* Small ribbon for new calculators. Mimicking exact corner "New!" style */}
        {['currency-converter', 'scientific-calculator'].includes(tool.slug) && (
           <div className="absolute top-2 right-2 bg-blue-100 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-wide uppercase">
             New!
           </div>
        )}
      </div>
    </Link>
  );
}
