"use client";
import React, { useState } from "react";

const folders = [
  { name: "Desktop", icon: "🖥️" },
  { name: "Documents", icon: "📄" },
  { name: "Downloads", icon: "⬇️" },
  { name: "Projects", icon: "🗂️" },
  { name: "Pictures", icon: "🖼️" },
  { name: "Music", icon: "🎵" },
  { name: "Videos", icon: "🎬" },
];

const files = [
  { name: "portfolio-v3.fig", icon: "🎨", size: "18.4 MB", modified: "Today" },
  { name: "README.md", icon: "📝", size: "4 KB", modified: "Yesterday" },
  { name: "components/", icon: "📁", size: "—", modified: "Today" },
  { name: "globals.css", icon: "🎨", size: "5 KB", modified: "Today" },
  { name: "package.json", icon: "📦", size: "1 KB", modified: "Jun 10" },
  { name: "next.config.ts", icon: "⚙️", size: "2 KB", modified: "Jun 9" },
  { name: "tsconfig.json", icon: "🔧", size: "1 KB", modified: "Jun 8" },
  { name: "wallpapers/", icon: "📁", size: "—", modified: "Jun 7" },
];

const FileExplorerApp = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [view, setView] = useState<"grid" | "list">("list");

  return (
    <div className="w-full h-full flex bg-[#1c1c1e] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-44 border-r border-white/10 flex-shrink-0 py-3">
        <p className="text-[10px] font-semibold text-white/40 uppercase tracking-widest px-4 mb-1">Favorites</p>
        {folders.map(f => (
          <button key={f.name} onClick={() => setSelected(f.name)}
            className={`w-full flex items-center gap-2 px-4 py-1.5 text-sm hover:bg-white/10 transition-all cursor-pointer text-left ${selected === f.name ? "bg-white/10 text-white" : "text-white/70"}`}>
            <span>{f.icon}</span>
            <span>{f.name}</span>
          </button>
        ))}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="h-10 border-b border-white/10 flex items-center px-4 gap-3 justify-between">
          <div className="flex items-center gap-2 text-white/50">
            <button className="hover:text-white transition-colors cursor-pointer">‹</button>
            <button className="hover:text-white transition-colors cursor-pointer">›</button>
            <span className="text-sm text-white/80 ml-2">degvora-website</span>
          </div>
          <div className="flex gap-1">
            {(["list", "grid"] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className={`px-2 py-1 rounded text-xs cursor-pointer transition-all ${view === v ? "bg-white/20 text-white" : "text-white/40 hover:text-white"}`}>
                {v === "list" ? "☰" : "⊞"}
              </button>
            ))}
          </div>
        </div>

        {/* File list */}
        <div className="flex-1 overflow-y-auto">
          {view === "list" ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-xs border-b border-white/10">
                  <th className="text-left px-4 py-2 font-medium">Name</th>
                  <th className="text-left px-4 py-2 font-medium">Modified</th>
                  <th className="text-right px-4 py-2 font-medium">Size</th>
                </tr>
              </thead>
              <tbody>
                {files.map(f => (
                  <tr key={f.name} onClick={() => setSelected(f.name)}
                    className={`hover:bg-white/5 cursor-pointer transition-all border-b border-white/5 ${selected === f.name ? "bg-blue-600/30" : ""}`}>
                    <td className="px-4 py-2 flex items-center gap-2"><span>{f.icon}</span><span className="text-white/90">{f.name}</span></td>
                    <td className="px-4 py-2 text-white/50">{f.modified}</td>
                    <td className="px-4 py-2 text-white/50 text-right">{f.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="grid grid-cols-4 gap-4 p-4">
              {files.map(f => (
                <button key={f.name} onClick={() => setSelected(f.name)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-white/10 transition-all cursor-pointer ${selected === f.name ? "bg-blue-600/30" : ""}`}>
                  <span className="text-3xl">{f.icon}</span>
                  <span className="text-xs text-white/80 text-center leading-tight">{f.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileExplorerApp;
