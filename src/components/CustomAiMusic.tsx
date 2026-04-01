"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Sparkles, Music, Terminal, Play, Lock, Copy, Wand2 } from "lucide-react";

type CustomAiMusicProps = {
  onSubmit?: (data: any) => void;
  isLoading?: boolean;
};

export default function CustomAiMusic({ onSubmit, isLoading }: CustomAiMusicProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);

  const [apiKey, setApiKey] = useState("bug0vlPAUj...dCgl");
  const [model, setModel] = useState("Suno");
  const [taskType, setTaskType] = useState("Music Generation");
  const [lyrics, setLyrics] = useState("[Verse 1]\nWalking down the street...");
  const [styleTags, setStyleTags] = useState("pop, upbeat, electronic");
  const [title, setTitle] = useState("My Song");
  const [modelVersion, setModelVersion] = useState("Suno v5 (chirp-crow)");

  useEffect(() => {
    // Initial entrance animations
    if (containerRef.current) {
      gsap.fromTo(
        ".stagger-anim",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
      
      // Floating blobs animation for the "old suno" vibe
      gsap.to(".blob-1", {
        x: "random(-50, 50)",
        y: "random(-50, 50)",
        rotation: "random(0, 360)",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      gsap.to(".blob-2", {
        x: "random(-80, 80)",
        y: "random(-80, 80)",
        rotation: "random(-360, 0)",
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);

  // Audio equalizer bars effect
  useEffect(() => {
    if (visualizerRef.current) {
      const bars = visualizerRef.current.querySelectorAll('.bar');
      gsap.to(bars, {
        height: "random(20%, 100%)",
        duration: 0.2,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.05,
          from: "random"
        },
        ease: "sine.inOut"
      });
    }
  }, []);

  const handleGenerate = () => {
    if (onSubmit) {
      onSubmit({ apiKey, model, taskType, lyrics, styleTags, title, modelVersion });
    }
  };

  return (
    <div ref={containerRef} className="w-full text-left relative z-0 mt-4 rounded-3xl overflow-hidden shadow-2xl bg-[#0f0f11] text-gray-200 font-sans border border-[#ffffff10]">
      {/* Dynamic Background Visuals */}
      <div className="absolute inset-0 z-[-1] overflow-hidden opacity-40 mix-blend-screen pointer-events-none">
        <div className="blob-1 absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-radial-gradient from-purple-600/30 via-purple-900/10 to-transparent blur-[80px]"></div>
        <div className="blob-2 absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-radial-gradient from-red-600/20 via-orange-900/10 to-transparent blur-[100px]"></div>
      </div>
      
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 stagger-anim">
          <div>
            <h2 className="text-3xl font-extrabold text-white flex items-center mb-2 tracking-tight">
              <Music className="text-purple-500 mr-3 w-8 h-8" /> 
              API Playground
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl">
              Test the AI Music API directly in your browser. Configure your prompt, choose a model, and synthesize stunning audio in real-time.
            </p>
          </div>
          <div ref={visualizerRef} className="hidden md:flex items-end h-12 w-24 space-x-1 mt-4 md:mt-0 opacity-70">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`bar w-2 bg-gradient-to-t from-purple-600 to-red-400 rounded-sm h-[${Math.random() * 100}%]`}></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Configuration Form */}
          <div className="lg:col-span-2 space-y-6 stagger-anim">
            <div className="bg-[#1a1a1f] border border-[#ffffff15] rounded-2xl p-6 shadow-inner relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px] rounded-full"></div>
              
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Wand2 className="w-5 h-5 mr-3 text-purple-400" /> Configuration
              </h3>
              
              <div className="space-y-5 relative z-10">
                {/* API Key */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">API Key</label>
                  <div className="flex">
                    <div className="relative flex-grow">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input 
                        type="text" 
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        className="w-full bg-[#0a0a0c] border border-gray-800 text-gray-300 text-sm rounded-l-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all font-mono"
                      />
                    </div>
                    <button className="bg-[#24242e] hover:bg-[#2f2f3b] text-gray-300 text-sm font-medium px-6 py-3 rounded-r-lg border border-l-0 border-gray-800 transition-colors">
                      Clear
                    </button>
                  </div>
                </div>

                {/* Model & Task Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Model</label>
                    <select 
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                      className="w-full bg-[#0a0a0c] border border-gray-800 text-gray-300 text-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                    >
                      <option value="Suno">Suno Audio</option>
                      <option value="Bark">Bark Gen</option>
                      <option value="MusicGen">MusicGen</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Task Type</label>
                    <select 
                      value={taskType}
                      onChange={(e) => setTaskType(e.target.value)}
                      className="w-full bg-[#0a0a0c] border border-gray-800 text-gray-300 text-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none appearance-none cursor-pointer"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                    >
                      <option value="Music Generation">Music Generation</option>
                      <option value="Voice Synthesis">Voice Synthesis</option>
                      <option value="Audio Master">Audio Mastering</option>
                    </select>
                  </div>
                </div>

                {/* Inspiration switch */}
                <div className="pt-2">
                  <div className="inline-flex bg-[#0a0a0c] border border-gray-800 rounded-full p-1">
                    <button className="px-4 py-1.5 text-xs font-semibold rounded-full bg-transparent text-gray-400 hover:text-white transition">Auto</button>
                    <button className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#24242e] text-white shadow-sm transition">Custom</button>
                  </div>
                </div>

                {/* Lyrics */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Lyrics</label>
                  <textarea 
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                    rows={4}
                    className="w-full bg-[#0a0a0c] border border-gray-800 text-gray-300 text-sm rounded-lg p-4 focus:ring-2 focus:ring-purple-500/50 outline-none resize-none font-medium leading-relaxed"
                    placeholder="Enter your lyrics here..."
                  ></textarea>
                </div>
                
                {/* Style & Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Style Tags</label>
                    <input 
                      type="text" 
                      value={styleTags}
                      onChange={(e) => setStyleTags(e.target.value)}
                      className="w-full bg-[#0a0a0c] border border-gray-800 text-gray-300 text-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title</label>
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-[#0a0a0c] border border-gray-800 text-gray-300 text-sm rounded-lg px-4 py-3 focus:ring-2 focus:ring-purple-500/50 outline-none"
                    />
                  </div>
                </div>
                
                {/* Model Version */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Model Version</label>
                  <input 
                    type="text" 
                    value={modelVersion}
                    disabled
                    className="w-full bg-[#0a0a0c] border border-gray-800 text-gray-500 text-sm rounded-lg px-4 py-3 opacity-70 cursor-not-allowed"
                  />
                </div>

              </div>
            </div>

            {/* Generate Button */}
            <div className="stagger-anim">
              <button 
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full group bg-gradient-to-r from-[#e73c59] to-[#bf244b] hover:from-[#f54160] hover:to-[#d42c57] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-[0_0_20px_rgba(231,60,89,0.3)] hover:shadow-[0_0_30px_rgba(231,60,89,0.5)] transition-all flex items-center justify-center transform hover:-translate-y-1 active:translate-y-0"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                ) : (
                  <Play className="w-5 h-5 mr-3 fill-current group-hover:scale-110 transition-transform" />
                )}
                {isLoading ? 'Synthesizing...' : 'Generate Audio'}
              </button>
            </div>
          </div>

          {/* Right Sidebar - Reference & cURL */}
          <div className="space-y-6 stagger-anim">
            {/* Quick Reference */}
            <div className="bg-[#1a1a1f] border border-[#ffffff15] rounded-2xl p-6 shadow-inner backdrop-blur-xl">
              <h4 className="text-sm font-bold text-white mb-5 border-b border-gray-800 pb-3">Quick Reference</h4>
              
              <div className="space-y-4">
                <div>
                  <span className="block text-xs text-gray-500 font-semibold mb-1 uppercase">Credit Costs</span>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex justify-between"><span>Music Generation:</span> <span className="text-white font-medium">10 credits</span></li>
                    <li className="flex justify-between"><span>Lyrics Generation:</span> <span className="text-white font-medium">5 credits</span></li>
                    <li className="flex justify-between"><span>Audio Upload:</span> <span className="text-white font-medium">1 credit</span></li>
                  </ul>
                </div>
                
                <div className="pt-2 border-t border-gray-800">
                  <span className="block text-xs text-gray-500 font-semibold mb-2 uppercase">API Endpoint</span>
                  <div className="bg-[#0a0a0c] text-green-400 font-mono text-xs p-2 rounded border border-gray-800 flex items-center">
                    <span className="text-gray-500 mr-2">POST</span> /api/v1/task
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-800">
                  <span className="block text-xs text-gray-500 font-semibold mb-2 uppercase">Authentication</span>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Pass your API key via the <code className="bg-[#0a0a0c] text-purple-400 px-1 py-0.5 rounded text-xs border border-gray-800 font-mono">x-api-key</code> header.
                  </p>
                </div>
              </div>
            </div>

            {/* cURL Example */}
            <div className="bg-[#1a1a1f] border border-[#ffffff15] rounded-2xl p-6 shadow-inner backdrop-blur-xl flex flex-col min-h-[300px]">
              <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center">
                  <Terminal className="w-4 h-4 mr-2 text-gray-400" /> cURL Example
                </h4>
                <button className="text-gray-500 hover:text-white transition group">
                  <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
              
              <div className="bg-[#0a0a0c] border border-gray-800 rounded-lg p-4 flex-grow overflow-x-auto relative group">
                <pre className="text-xs font-mono text-gray-300 leading-loose">
<span className="text-purple-400">curl</span> -X POST \
  <span className="text-green-400">https://sunor.cc/api/v1/task</span> \
  -H <span className="text-yellow-300">"Content-Type: application/json"</span> \
  -H <span className="text-yellow-300">"x-api-key: YOUR_KEY"</span> \
  -d '{'{'}
    <span className="text-blue-300">"model"</span>: <span className="text-yellow-300">"suno"</span>,
    <span className="text-blue-300">"task_type"</span>: <span className="text-yellow-300">"music"</span>,
    <span className="text-blue-300">"input"</span>: {'{'}
      <span className="text-blue-300">"gpt_description_prompt"</span>: <span className="text-yellow-300">"make_instrumental": true</span>
    {'}'}
  {'}'}'
                </pre>
                
                {/* Horizontal scroll indicators */}
                <div className="absolute bottom-2 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                  <div className="w-16 h-1 rounded-full bg-gray-700/50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .bg-radial-gradient {
          background-image: radial-gradient(circle, var(--tw-gradient-from) 0%, var(--tw-gradient-via) 40%, var(--tw-gradient-to) 70%);
        }
      `}} />
    </div>
  );
}
