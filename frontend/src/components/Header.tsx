"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Sparkles } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const headerRef = useRef(null);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    // Subtle float animation for the sparkles
    gsap.to('.sparkle-icon', { y: -3, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Quick interactive flash on toggle
    gsap.fromTo(headerRef.current, 
      { backgroundColor: 'var(--color-elevated)' }, 
      { backgroundColor: 'var(--color-bg)', duration: 0.5 }
    );
  };

  return (
    <header ref={headerRef} className="w-full border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand Logo with Animation */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] w-8 h-8 rounded-lg shadow-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.6)] transition-all">
            <Sparkles className="sparkle-icon text-white w-4 h-4" />
          </div>
          <span className="font-bold text-xl tracking-tight text-[var(--color-text-primary)]">
            All-in-One <span className="text-[var(--color-text-secondary)] font-light">Tools</span>
          </span>
        </Link>

        {/* Theme Toggler */}
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-[var(--color-elevated)] transition-colors border border-transparent hover:border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] relative overflow-hidden group"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? <Sun size={20} className="transform group-hover:rotate-45 transition-transform duration-300" /> : <Moon size={20} className="transform group-hover:-rotate-12 transition-transform duration-300" />}
          </button>
        )}
      </div>
    </header>
  );
}
