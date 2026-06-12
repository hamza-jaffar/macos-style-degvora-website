"use client";

import React, { useState, useRef, useEffect } from "react";
import { AppInstance } from "./app-layout";

interface OSWindowProps {
  app: AppInstance;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  screenType?: string;
}

const OSWindow = ({
  app,
  zIndex,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  screenType,
}: OSWindowProps) => {
  const [position, setPosition] = useState({
    x: app.defaultX,
    y: app.defaultY,
  });
  const [size, setSize] = useState({
    width: app.defaultWidth,
    height: app.defaultHeight,
  });
  const [isClosing, setIsClosing] = useState(false);

  const windowRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0, posX: 0, posY: 0 });
  const resizeStart = useRef({ x: 0, y: 0, startW: 0, startH: 0 });

  // --- DRAG CONTROLS ---
  const handleDragStart = (e: React.MouseEvent) => {
    if (app.isMaximized) return; // Prevent dragging full-screen apps
    onFocus();

    if ((e.target as HTMLElement).closest(".win-control")) return;

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", handleDragEnd);
    document.body.classList.add("mac-grabbing");
  };

  const handleDragging = (e: MouseEvent) => {
    let targetY = dragStart.current.posY + (e.clientY - dragStart.current.y);
    let targetX = dragStart.current.posX + (e.clientX - dragStart.current.x);

    // Boundary locks matching your MenuBar configurations (28px height guardrail)
    if (targetY < 28) targetY = 28;
    if (window.innerHeight && targetY > window.innerHeight - 80) {
      targetY = window.innerHeight - 80;
    }

    setPosition({ x: targetX, y: targetY });
  };

  const handleDragEnd = () => {
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", handleDragEnd);
    document.body.classList.remove("mac-grabbing");
  };

  // --- RESIZE CONTROLS ---
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFocus();

    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      startW: size.width,
      startH: size.height,
    };

    document.addEventListener("mousemove", handleResizing);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizing = (e: MouseEvent) => {
    const newW = Math.max(
      320,
      resizeStart.current.startW + (e.clientX - resizeStart.current.x),
    );
    const newH = Math.max(
      220,
      resizeStart.current.startH + (e.clientY - resizeStart.current.y),
    );
    setSize({ width: newW, height: newH });
  };

  const handleResizeEnd = () => {
    document.removeEventListener("mousemove", handleResizing);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  // --- ANIMATED INTERACTION OVERRIDES ---
  const triggerCloseAnimation = () => {
    setIsClosing(true);
    // Let the 200ms scale-down CSS frame complete before unmounting from parent state tree
    setTimeout(() => {
      onClose();
    }, 180);
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={onFocus}
      className={`absolute flex flex-col overflow-hidden rounded-xl border
                 bg-slate-900/80 dark:bg-slate-900/85 backdrop-blur-3xl
                 border-white/[0.14] dark:border-white/8
                 shadow-[0_25px_60px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)]
                 transition-all pointer-events-auto select-none
                 ${
                   app.isMaximized
                     ? screenType === "mobile"
                       ? "top-0! left-0! w-screen! h-screen! rounded-none! transition-all duration-300 ease-out"
                       : "top-7! left-0! w-screen! h-[calc(100vh-28px)]! rounded-none! transition-all duration-300 ease-out"
                     : "transition-shadow duration-300"
                 }
                 ${
                   app.isMinimized
                     ? "opacity-0 scale-50 translate-y-32 pointer-events-none duration-300 cubic-bezier(0.25,1,0.5,1)"
                     : "opacity-100 scale-100 translate-y-0"
                 }
                 ${isClosing ? "animate-mac-close" : "animate-mac-open"}`}
      style={{
        zIndex: zIndex,
        left: app.isMaximized ? "0px" : `${position.x}px`,
        top: app.isMaximized
          ? screenType === "mobile"
            ? "0px"
            : "28px"
          : `${position.y}px`,
        width: app.isMaximized ? "100vw" : `${size.width}px`,
        height: app.isMaximized ? "100vh" : `${size.height}px`,
      }}
    >
      {/* Window Top Navigation Heading Bar */}
      <div
        onMouseDown={handleDragStart}
        onDoubleClick={onMaximize}
        className="h-10 bg-slate-800/30 border-b border-white/5 flex items-center px-4 justify-between mac-grab"
      >
        {/* Apple Style Control Lights Menu */}
        <div className="flex items-center gap-2 w-20 win-control group/traffic">
          {/* RED — Close */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation(); // Stops parent handleDragStart immediately
              triggerCloseAnimation();
            }}
            title="Close"
            className="relative w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center cursor-pointer hover:brightness-90 active:scale-90 transition-all"
          >
            <span className="opacity-0 group-hover/traffic:opacity-100 text-[9px] text-black/70 font-bold leading-none select-none pointer-events-none">
              ×
            </span>
          </button>

          {/* YELLOW — Minimize */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation(); // Stops parent handleDragStart immediately
              onMinimize();
            }}
            title="Minimize"
            className="relative w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] flex items-center justify-center cursor-pointer hover:brightness-90 active:scale-90 transition-all"
          >
            <span className="opacity-0 group-hover/traffic:opacity-100 text-[9px] text-black/70 font-bold leading-none select-none pointer-events-none">
              −
            </span>
          </button>

          {/* GREEN — Maximize */}
          <button
            type="button"
            onMouseDown={(e) => {
              e.stopPropagation(); // Stops parent handleDragStart immediately
              onMaximize();
            }}
            title="Maximize"
            className="relative w-3.5 h-3.5 rounded-full bg-[#27c93f] border border-[#1aab29] flex items-center justify-center cursor-pointer hover:brightness-90 active:scale-90 transition-all"
          >
            <span className="opacity-0 group-hover/traffic:opacity-100 text-[8px] text-black/70 font-bold leading-none select-none pointer-events-none">
              +
            </span>
          </button>
        </div>

        {/* Dynamic App Title */}
        <span className="text-xs font-normal text-white/60 tracking-wide select-none">
          {app.title}
        </span>

        {/* Balance Spacer */}
        <div className="w-20" />
      </div>

      {/* Internal Application Active Viewport View */}
      <div className="flex-1 overflow-auto text-white text-sm select-text">
        {app.component}
      </div>

      {/* Resize Target Handle */}
      {!app.isMaximized && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute bottom-0 right-0 w-3.5 h-3.5 mac-resize-nw-se cursor-se-resize z-50 bg-transparent"
        />
      )}
    </div>
  );
};

export default OSWindow;
