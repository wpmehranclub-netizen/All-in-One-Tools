"use client";

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export default function LiveSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Glow animation on typing
    if (query.length > 0) {
      gsap.to(searchRef.current, { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)', duration: 0.2 });
    } else {
      gsap.to(searchRef.current, { boxShadow: '0 0 0px rgba(59, 130, 246, 0)', duration: 0.3 });
    }

    const delayDebounceFn = setTimeout(() => {
      if (query.length > 1) {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/search?q=${query}`)
          .then(res => {
            setResults(res.data.data);
            // Dropdown smooth fade + slide
            gsap.fromTo('.search-result-item', 
              { opacity: 0, y: -5 }, 
              { opacity: 1, y: 0, stagger: 0.05, duration: 0.2, ease: 'power2.out' }
            );
          })
          .catch(err => console.error(err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full max-w-xl mx-auto z-50">
      <div className="relative">
        <input
          ref={searchRef}
          type="text"
          className="w-full px-5 py-4 pl-14 rounded-full bg-[var(--color-elevated)] border border-[var(--color-border)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] transition-all shadow-lg"
          placeholder="Search for a tool... (e.g. Word Counter)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-5 top-4 text-[var(--color-text-secondary)]" size={20} />
      </div>

      {results.length > 0 && (
        <div className="absolute w-full mt-3 bg-[var(--color-surface)] rounded-xl shadow-2xl border border-[var(--color-border)] overflow-hidden glass-panel">
          {results.map((tool: any) => (
            <Link key={tool.slug} href={`/tool/${tool.slug}`}>
              <div className="search-result-item px-5 py-4 hover:bg-[var(--color-elevated)] cursor-pointer border-b border-[var(--color-border)] last:border-b-0 transition-colors flex items-center space-x-3 text-[var(--color-text-primary)] group">
                <Search size={14} className="text-[var(--color-primary)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                <span className="group-hover:text-[var(--color-accent)] transition-colors">{tool.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
