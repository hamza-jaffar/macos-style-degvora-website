import React, { useState } from "react";

export const TrashApp = () => {
  const [items, setItems] = useState([
    { name: "old-portfolio.zip", size: "24 MB", date: "Jun 1" },
    { name: "node_modules (copy)", size: "512 MB", date: "Jun 3" },
    { name: "screenshot-draft.png", size: "3.2 MB", date: "Jun 9" },
    { name: ".DS_Store", size: "12 KB", date: "Jun 10" },
  ]);

  return (
    <div className="w-full h-full flex flex-col bg-[#161a29] text-slate-300 font-sans select-none">
      
      {/* SYSTEM TOOLBAR */}
      <div className="bg-[#1c1f2e] border-b border-black/30 px-4 py-2 flex items-center justify-between text-xs shrink-0">
        <span className="text-slate-400 font-mono">
          {items.length === 0 
            ? "0 items · Ready for new projects" 
            : `${items.length} items · Leaving old ideas behind to make room for innovation`
          }
        </span>
        {items.length > 0 && (
          <button 
            onClick={() => setItems([])}
            className="text-red-400 hover:text-red-300 transition-colors font-medium cursor-pointer"
          >
            Empty Trash
          </button>
        )}
      </div>

      {/* ITEMS LIST */}
      <div className="flex-1 overflow-y-auto">
        {items.length > 0 ? (
          <div>
            {items.map(item => (
              <div 
                key={item.name} 
                className="flex items-center justify-between px-4 py-2.5 border-b border-black/10 hover:bg-white/[0.02] transition-colors group text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-base opacity-70">📁</span>
                  <div className="truncate">
                    <p className="text-slate-200 font-mono truncate">{item.name}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{item.size} · Deleted {item.date}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setItems(prev => prev.filter(i => i.name !== item.name))}
                  className="text-sky-400 hover:text-sky-300 font-medium cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Restore
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* NATURAL EMPTY STATE */
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <p className="text-xs text-slate-500 font-mono max-w-xs leading-relaxed">
              Trash is empty. Storage optimization complete.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashApp;