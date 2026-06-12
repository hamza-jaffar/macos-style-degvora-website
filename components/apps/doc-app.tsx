"use client";
import React from "react";

const DocApp = () => {
  const [content, setContent] = React.useState(`# Degvora Portfolio OS

## About

Welcome to my interactive macOS-style portfolio. This isn't just a website — it's a fully functional operating system experience built with Next.js and React.

## Features

- **Window Management** — Drag, resize, minimize, maximize every window
- **Dynamic Dock** — Click any app icon to open its window
- **macOS Cursors** — Authentic cursor set for every interaction
- **Responsive** — Adapts from mobile to desktop with distinct UX patterns

## Tech Stack

\`\`\`
Next.js 15 · TypeScript · Tailwind CSS v4
\`\`\`

## Contact

📧 hello@degvora.dev
🌐 degvora.dev
🐙 github.com/hamza-jaffar
`);

  return (
    <div className="w-full h-full flex flex-col bg-[#1c1c1e] text-white overflow-hidden">
      {/* Toolbar */}
      <div className="bg-[#2a2a2c] border-b border-white/10 px-4 py-2 flex items-center gap-4 text-sm text-white/60">
        <button className="hover:text-white transition-colors cursor-pointer font-bold text-base">B</button>
        <button className="hover:text-white transition-colors cursor-pointer italic">I</button>
        <button className="hover:text-white transition-colors cursor-pointer underline">U</button>
        <div className="w-px h-4 bg-white/20" />
        <button className="hover:text-white transition-colors cursor-pointer">H1</button>
        <button className="hover:text-white transition-colors cursor-pointer">H2</button>
        <button className="hover:text-white transition-colors cursor-pointer">¶</button>
      </div>

      {/* Doc body */}
      <div className="flex-1 overflow-y-auto flex justify-center py-8 px-4 bg-[#1c1c1e]">
        <div className="w-full max-w-2xl bg-[#252528] rounded-xl shadow-xl border border-white/10 overflow-hidden">
          <div className="p-2 bg-[#2a2a2c] border-b border-white/10 flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm bg-white/20" />
            <span className="text-xs text-white/50">degvora-portfolio.md</span>
          </div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full h-full min-h-[400px] bg-transparent text-white/80 text-sm leading-7 p-6 outline-none resize-none font-mono"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default DocApp;
