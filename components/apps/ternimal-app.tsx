"use client";
import React, { useState, useRef, useEffect } from "react";

const TerminalApp = () => {
  const [lines, setLines] = useState([
    "Last login: " +
      new Date().toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " on ttys001",
    "Degvora OS Kernel Terminal v1.0.0-stable",
    "",
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever output changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Focus input on initial load
  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
    return () => clearTimeout(focusTimeout);
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    const cmd = input.trim();
    const newLines = [...lines, `hamza@degvora-mbp ~ % ${input}`];

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (cmd === "help") {
      newLines.push("Available: help, clear, whoami, date, echo <text>");
    } else if (cmd === "whoami") {
      newLines.push("hamza");
    } else if (cmd === "date") {
      newLines.push(new Date().toString());
    } else if (cmd.startsWith("echo ")) {
      newLines.push(input.substring(5)); // Keeps native spacing of string intact
    } else if (cmd === "") {
      // Empty enter stroke execution
    } else {
      newLines.push(`zsh: command not found: ${cmd}`);
    }

    newLines.push(""); // Clean return carriage space
    setLines(newLines);
    setInput("");
  };

  // Click handler blocks propagation so window focus doesn't break
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    inputRef.current?.focus();
  };

  return (
    <div
      className="w-full h-full min-h-75 bg-[#1a1a1a] font-mono text-[13px] text-[#e0e0e0] flex flex-col overflow-hidden cursor-text"
      onClick={handleClick}
    >
      <div className="flex-1 overflow-y-auto p-4 leading-5 select-text">
        {lines.map((l, i) => (
          <div
            key={i}
            className={
              l.startsWith("hamza@")
                ? "text-emerald-400"
                : "text-[#e0e0e0] whitespace-pre-wrap"
            }
          >
            {l || "\u00a0"}
          </div>
        ))}

        <div className="flex items-center flex-wrap w-full">
          <span className="text-emerald-400 shrink-0 select-none">
            hamza@degvora-mbp ~ %&160;
          </span>

          <div className="relative flex-1 flex items-center min-w-15">
            {/* The Invisible Native Input: Sits inside the flow capturing keystrokes directly */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              className="absolute inset-0 w-full h-full bg-transparent text-white border-none outline-none focus:ring-0 caret-transparent"
              style={{ mixBlendMode: "normal" }}
            />

            {/* Custom Visual Layer: Displays typed content and your blinking Mac block-cursor */}
            <span className="text-white whitespace-pre select-text z-10 pointer-events-none">
              {input}
            </span>
            <span className="inline-block w-2 h-3.75 bg-emerald-400 animate-pulse ml-0.5 z-10 pointer-events-none" />
          </div>
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default TerminalApp;
