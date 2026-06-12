"use client";
import React from "react";

// Placeholder apps for Map and Trash
export const MapApp = () => (
  <div className="w-full h-full bg-[#1a2635] flex flex-col overflow-hidden relative">
    {/* Fake map grid */}
    <div className="absolute inset-0 opacity-20"
      style={{ backgroundImage: "linear-gradient(#4a9eff 1px, transparent 1px), linear-gradient(90deg, #4a9eff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
    {/* Map roads */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="w-[280px] h-3 bg-[#2c3e50] rounded-full absolute -left-36 top-0" />
        <div className="w-3 h-[280px] bg-[#2c3e50] rounded-full absolute left-0 -top-36" />
        <div className="w-8 h-8 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)] flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white" />
        </div>
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-black text-xs font-medium px-3 py-1 rounded-full shadow-lg">
          Degvora HQ 📍
        </div>
      </div>
    </div>
    {/* Search bar */}
    <div className="absolute top-4 left-4 right-4">
      <div className="bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-xl">
        <span className="text-gray-400">🔍</span>
        <span className="text-gray-500 text-sm">Search Maps</span>
      </div>
    </div>
    {/* Zoom controls */}
    <div className="absolute right-4 bottom-16 flex flex-col gap-1">
      <button className="w-9 h-9 rounded-lg bg-white shadow-lg flex items-center justify-center text-gray-700 text-xl font-bold hover:bg-gray-100 transition-all cursor-pointer">+</button>
      <button className="w-9 h-9 rounded-lg bg-white shadow-lg flex items-center justify-center text-gray-700 text-xl font-bold hover:bg-gray-100 transition-all cursor-pointer">−</button>
    </div>
  </div>
);

export const TrashApp = () => {
  const [items] = React.useState([
    { name: "old-portfolio.zip", size: "24 MB", deleted: "Jun 1" },
    { name: "node_modules (copy)", size: "512 MB", deleted: "Jun 3" },
    { name: "screenshot-draft.png", size: "3.2 MB", deleted: "Jun 9" },
    { name: ".DS_Store", size: "12 KB", deleted: "Jun 10" },
  ]);
  return (
    <div className="w-full h-full flex flex-col bg-[#1c1c1e] text-white overflow-hidden">
      <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <span className="text-white/60 text-sm">{items.length} items</span>
        <button className="text-sm text-red-400 hover:text-red-300 transition-colors cursor-pointer">Empty Trash</button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {items.map(item => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-all">
            <span className="text-2xl">🗑️</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80 truncate">{item.name}</p>
              <p className="text-xs text-white/40">{item.size} · Deleted {item.deleted}</p>
            </div>
            <button className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer transition-colors">Restore</button>
          </div>
        ))}
      </div>
    </div>
  );
};
