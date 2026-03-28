"use client";

import Link from "next/link";
import { Sparkles, Grid } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group shrink-0">
          <div className="flex items-center justify-center bg-blue-500 w-8 h-8 rounded-sm transition-all">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <span className="font-extrabold text-[1.35rem] tracking-tight text-gray-900">
            iLove<span className="font-semibold text-blue-500">TOOLS</span>
          </span>
        </Link>

        {/* Center Nav - Desktop */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-bold text-gray-800 tracking-wider">
          <Link href="/category/text" className="hover:text-blue-500 transition-colors uppercase">Text Tools</Link>
          <Link href="/category/image" className="hover:text-blue-500 transition-colors uppercase">Image Tools</Link>
          <Link href="/category/math" className="hover:text-blue-500 transition-colors uppercase">Calculators</Link>
          <Link href="/category/converters" className="hover:text-blue-500 transition-colors uppercase">Converters</Link>
          <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition-colors">
            <span className="uppercase">More Tools</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <button className="hidden sm:block text-[13px] font-bold text-gray-900 hover:text-blue-500 transition-colors px-2">Login</button>
          <button className="text-[13px] font-bold text-white bg-blue-500 hover:bg-blue-600 px-6 py-[10px] rounded-md transition-colors shadow-sm">Sign up</button>
          <button className="lg:hidden text-gray-600 hover:text-gray-900 ml-2">
             <Grid className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
