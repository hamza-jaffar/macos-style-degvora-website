import React from "react";

const TrashApp = () => {
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

export default TrashApp;