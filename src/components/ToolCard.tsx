"use client";

import Link from 'next/link';
import { Settings, Image, Calculator, FileText, Activity, Clock } from 'lucide-react';
import { useRef } from 'react';
import gsap from 'gsap';

export default function ToolCard({ tool }: { tool: any }) {
  const cardRef = useRef(null);

  // Map icons based on category
  const getIcon = () => {
    switch(tool.category_slug) {
      case 'image': return <Image size={24} className="text-blue-500" />;
      case 'math': return <Calculator size={24} className="text-green-500" />;
      case 'text': return <FileText size={24} className="text-purple-500" />;
      case 'health': return <Activity size={24} className="text-red-500" />;
      case 'datetime': return <Clock size={24} className="text-orange-500" />;
      default: return <Settings size={24} className="text-gray-500" />;
    }
  };

  const getBgColor = () => {
    switch(tool.category_slug) {
      case 'image': return 'bg-blue-50';
      case 'math': return 'bg-green-50';
      case 'text': return 'bg-purple-50';
      case 'health': return 'bg-red-50';
      case 'datetime': return 'bg-orange-50';
      default: return 'bg-gray-100';
    }
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { 
      y: -5, 
      ease: 'power2.out', 
      duration: 0.2,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)' 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { 
      y: 0, 
      ease: 'power2.out', 
      duration: 0.2,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)' 
    });
  };

  return (
    <Link href={`/tool/${tool.slug}`} className="block h-full">
      <div 
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-white p-6 rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col h-full transition-all relative"
      >
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${getBgColor()}`}>
          {getIcon()}
        </div>
        
        <h3 className="text-[17px] font-bold mb-2 text-gray-900 tracking-tight leading-tight">
          {tool.name}
        </h3>
        
        <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
          Fast and free online {tool.name.toLowerCase()} tool to optimize your workflow in bulk.
        </p>

        {['currency-converter', 'scientific-calculator'].includes(tool.slug) && (
           <span className="absolute top-4 right-4 bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-sm tracking-wide uppercase">New!</span>
        )}
      </div>
    </Link>
  );
}
