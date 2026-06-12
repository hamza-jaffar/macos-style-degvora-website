"use client";
import React from "react";

const SafariApp = () => {
  const [url, setUrl] = React.useState("https://degvora.dev");
  const [inputUrl, setInputUrl] = React.useState("degvora.dev");

  return (
    <div className="w-full h-full flex flex-col bg-[#1c1c1e] text-white overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-[#2a2a2c] border-b border-white/10 px-4 py-2 flex items-center gap-3">
        <div className="flex gap-2">
          <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 text-sm transition-all cursor-pointer">‹</button>
          <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 text-sm transition-all cursor-pointer">›</button>
        </div>
        <div className="flex-1 flex items-center bg-white/10 rounded-lg px-3 py-1.5 gap-2">
          <span className="text-white/40 text-xs">🔒</span>
          <span className="text-sm text-white/80 flex-1">{inputUrl}</span>
        </div>
        <button className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 text-sm transition-all cursor-pointer">⊕</button>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0f0f1a] to-[#1a0a2e] flex flex-col items-center justify-center text-center px-8 py-12 gap-6">
        <div className="text-6xl mb-2">✦</div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Degvora</h1>
        <p className="text-white/60 text-sm max-w-md leading-relaxed">
          Full-stack developer and digital craftsman. Building premium digital experiences that feel alive.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
          {[
            { label: "Projects", value: "12+" },
            { label: "Years Exp", value: "4+" },
            { label: "Apps Built", value: "30+" },
            { label: "Happy Clients", value: "20+" },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-2">
          <button className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-sm font-medium transition-all cursor-pointer">View Work</button>
          <button className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-medium transition-all cursor-pointer">Contact</button>
        </div>
      </div>
    </div>
  );
};

export default SafariApp;
