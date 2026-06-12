"use client";
import React, { useState } from "react";

const notes = [
  { id: 1, title: "macOS Window System", body: "Implemented full drag, resize, minimize, maximize, and close using React state. Each window tracks its own position and size via useState. Focus order managed by a sorted array.", updated: "Today" },
  { id: 2, title: "Glassmorphism Design Notes", body: "backdrop-blur-3xl, bg-slate-900/80, border-white/14 — these are the three pillars of the premium glass effect. Shadow: 0_25px_60px_rgba(0,0,0,0.45).", updated: "Today" },
  { id: 3, title: "Portfolio Ideas", body: "- Interactive OS desktop as portfolio\n- Animated code editor window\n- Live terminal with custom commands\n- Music visualizer widget", updated: "Yesterday" },
  { id: 4, title: "Tech Stack", body: "Next.js 15 · TypeScript · Tailwind CSS · React · Framer Motion\n\nDeployment: Vercel\nDomain: degvora.dev", updated: "Jun 10" },
];

const NotepadApp = () => {
  const [selected, setSelected] = useState(notes[0]);
  const [editedBody, setEditedBody] = useState(notes[0].body);

  const select = (n: typeof notes[0]) => { setSelected(n); setEditedBody(n.body); };

  return (
    <div className="w-full h-full flex bg-[#faf9f0] overflow-hidden">
      {/* Sidebar */}
      <div className="w-52 bg-[#f0ede0] border-r border-black/10 flex flex-col flex-shrink-0">
        <div className="p-3 border-b border-black/10">
          <p className="font-semibold text-[#3a3027] text-sm">Notes</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notes.map(n => (
            <button key={n.id} onClick={() => select(n)}
              className={`w-full text-left px-3 py-2.5 border-b border-black/5 hover:bg-black/5 transition-all cursor-pointer ${selected.id === n.id ? "bg-[#fad165]/60" : ""}`}>
              <p className="text-sm font-medium text-[#3a3027] truncate">{n.title}</p>
              <div className="flex gap-2 text-[10px] text-[#8a7a60] mt-0.5">
                <span>{n.updated}</span>
                <span className="truncate">{n.body.slice(0, 30)}…</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col bg-[#faf9f0]">
        <div className="border-b border-black/10 px-6 py-3">
          <h2 className="font-bold text-[#3a3027] text-base">{selected.title}</h2>
          <p className="text-xs text-[#8a7a60] mt-0.5">{selected.updated}</p>
        </div>
        <textarea
          value={editedBody}
          onChange={e => setEditedBody(e.target.value)}
          className="flex-1 px-6 py-4 bg-transparent outline-none text-[#3a3027] text-sm leading-6 resize-none font-['Georgia',serif]"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        />
      </div>
    </div>
  );
};

export default NotepadApp;
