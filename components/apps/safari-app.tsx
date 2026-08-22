"use client";
import { RotateCcw } from "lucide-react";
import React, { useState, useRef } from "react";

// Pre-defined bookmarks of your projects
const bookmarks = [
  { 
    name: "Flexi Fields (Shopify)", 
    url: "https://apps.shopify.com/flexi-fields",
    isBlockedFrame: true, // Tagging apps that block iframes
    mockTitle: "Flexi Fields — Shopify App Store",
    mockDescription: "Custom fields application enabling merchants to dynamically extend their product layout structures seamlessly.",
    previewImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80" // Replace with your app screenshot
  },
  { name: "Degvora Corporate", url: "https://degvora.com", isBlockedFrame: false },
];

export const SafariApp = () => {
  const [currentTab, setCurrentTab] = useState(bookmarks[0]);
  const [url, setUrl] = useState(bookmarks[0].url);
  const [inputUrl, setInputUrl] = useState(bookmarks[0].url);
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Helper to check if a typed or clicked URL is known to block iframes
  const checkFrameBlock = (targetUrl: string) => {
    const matchedBookmark = bookmarks.find(b => b.url === targetUrl);
    if (matchedBookmark) return matchedBookmark;

    // Checking common domains that reject frame embedding
    const lowUrl = targetUrl.toLowerCase();
    if (lowUrl.includes("shopify.com") || lowUrl.includes("github.com") || lowUrl.includes("google.com")) {
      return {
        name: "External Showcase",
        url: targetUrl,
        isBlockedFrame: true,
        mockTitle: "Protected Project Sandbox",
        mockDescription: "This live production dashboard is protected under strict security headers. Click below to view the application directly.",
        previewImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
      };
    }
    return { name: "Custom URL", url: targetUrl, isBlockedFrame: false };
  };

  const handleNavigation = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanUrl = inputUrl.trim();
    
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = `https://${cleanUrl}`;
    }
    
    const context = checkFrameBlock(cleanUrl);
    setCurrentTab(context as any);
    setIsLoading(!context.isBlockedFrame);
    setUrl(cleanUrl);
    setInputUrl(cleanUrl);
  };

  const handleRefresh = () => {
    if (!currentTab.isBlockedFrame && iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = url;
    }
  };

  return (
    <div className="w-full h-full bg-[#1c1c1e] rounded-t-xl flex flex-col overflow-hidden font-sans select-none text-white border border-white/10 shadow-2xl">
      {/* SAFARI TOOLBAR */}
      <div className="bg-[#2c2c2e] border-b border-black/40 px-3 py-2 flex items-center gap-2 sm:gap-4 shrink-0">
        
        {/* Top Control Bar (Window Controls & Navigation) */}
        <div className="flex items-center justify-between w-fit gap-4">
          <button 
            onClick={handleRefresh}
            className="text-slate-400 hover:text-white transition-colors active:scale-90 transform p-1"
            disabled={currentTab.isBlockedFrame}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${currentTab.isBlockedFrame ? "opacity-30" : ""}`} />
          </button>
        </div>

        {/* Address Input Bar */}
        <form onSubmit={handleNavigation} className="w-full sm:flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-500">
            {currentTab.isBlockedFrame ? "🔒" : "🌐"}
          </div>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            className="w-full bg-[#1c1c1e] border border-white/5 rounded-lg pl-8 pr-10 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-sky-500 transition-all font-mono tracking-wide"
            placeholder="Enter website link..."
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
          )}
        </form>
      </div>

      {/* BOOKMARKS LIST */}
      <div className="bg-[#242426] border-b border-black/20 px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0 text-xs text-slate-400">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px] mr-1 hidden sm:inline">Bookmarks:</span>
        {bookmarks.map((bookmark) => (
          <button
            key={bookmark.name}
            onClick={() => {
              const context = checkFrameBlock(bookmark.url);
              setCurrentTab(context as any);
              setIsLoading(!context.isBlockedFrame);
              setUrl(bookmark.url);
              setInputUrl(bookmark.url);
            }}
            className={`hover:text-white transition-all whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] ${
              url === bookmark.url ? "bg-white/10 text-white font-medium" : "hover:bg-white/5"
            }`}
          >
            🚀 {bookmark.name}
          </button>
        ))}
      </div>

      {/* SAFARI WINDOW CONTENT CAPSULE */}
      <div className="flex-1 w-full bg-slate-950 relative min-h-[300px]">
        {currentTab.isBlockedFrame ? (
          
          /* Elegant Falling Back / Frame-block Overlay UI Layout Screen */
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center overflow-y-auto bg-[#0f111a]">
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center mix-blend-luminosity" style={{ backgroundImage: `url(${currentTab.previewImg})` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f111a]/80 via-[#0f111a] to-[#0f111a]" />
            
            <div className="relative z-10 max-w-md mx-auto space-y-4">
              <div className="inline-flex p-3 bg-white/5 rounded-2xl border border-white/10 text-2xl shadow-xl">
                ⚙️
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight sm:text-xl">
                {currentTab.mockTitle}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {currentTab.mockDescription}
              </p>
              
              <div className="pt-2">
                <a 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-500 text-slate-950 rounded-xl text-xs font-normal hover:bg-sky-400 active:scale-95 transition-all shadow-lg shadow-sky-500/10 cursor-pointer"
                >
                  <span>Launch Live Marketplace Platform</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

        ) : (
          
          /* Standard Direct Embed Iframe Pipeline Frame Container */
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full h-full border-none bg-white"
            onLoad={() => setIsLoading(false)}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            title="Safari Live Preview Frame"
          />

        )}
        
        {/* Loading Glass overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#070913]/60 backdrop-blur-md flex flex-col items-center justify-center text-slate-200 gap-3 z-30">
            <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin shadow-lg" />
            <span className="text-xs font-mono tracking-wider text-slate-400">Handshaking Server Portal...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SafariApp;