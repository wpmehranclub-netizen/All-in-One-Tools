"use client";

import Link from "next/link";
import { Globe, Mail, MessageCircle, Code } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1A1A1A] text-white pt-20 pb-12 px-6 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          <div className="col-span-1">
            <h4 className="text-[11px] font-extrabold tracking-widest uppercase mb-6 text-gray-400">Product</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/features" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/tools" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Tools</Link></li>
              <li><Link href="/faq" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[11px] font-extrabold tracking-widest uppercase mb-6 text-gray-400">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/api" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Developer API</Link></li>
              <li><Link href="/guides" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Guides</Link></li>
              <li><Link href="/help" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/integrations" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[11px] font-extrabold tracking-widest uppercase mb-6 text-gray-400">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="/privacy" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookies" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Cookies Policy</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-[11px] font-extrabold tracking-widest uppercase mb-6 text-gray-400">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/press" className="text-[13px] font-medium text-gray-300 hover:text-white transition-colors">Press</Link></li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1 flex flex-col space-y-4">
             {/* Mock App Store Buttons */}
             <button className="bg-transparent border border-gray-700 hover:bg-gray-800 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 transition-colors max-w-[200px]">
                <div className="flex flex-col items-start bg-transparent">
                  <span className="text-[10px] text-gray-400">GET IT ON</span>
                  <span className="text-[14px] font-bold">Google Play</span>
                </div>
             </button>
             <button className="bg-transparent border border-gray-700 hover:bg-gray-800 rounded-lg px-4 py-3 flex items-center justify-center space-x-3 transition-colors max-w-[200px]">
                <div className="flex flex-col items-start bg-transparent">
                  <span className="text-[10px] text-gray-400">Download on the</span>
                  <span className="text-[14px] font-bold">App Store</span>
                </div>
             </button>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2 border border-gray-700 rounded select-none py-1.5 px-3 cursor-pointer hover:bg-gray-800 transition-colors">
            <span className="text-xs font-semibold text-gray-300 uppercase">English</span>
            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
          
          <div className="flex items-center space-x-6 hidden sm:flex">
             <Code className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
             <Globe className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
             <MessageCircle className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
             <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>

          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center md:text-right">
            © iLoveTOOLS 2026 ® - Your Tools Platform
          </div>
        </div>
      </div>
    </footer>
  );
}
