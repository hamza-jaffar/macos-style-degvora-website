"use client";

import Image from "next/image";
import { TaskBarData } from "@/constant/task-bar-data";
import { TaskBarDataType } from "@/types/task-bar";
import { useResponsiveType } from "@/context/ensure-responsiveness";
import { AppInstance } from "../app-layout";

interface TaskBarProps {
  onAppClick?: (id: string) => void;
  activeApps?: AppInstance[];
}

const TaskBar = ({ onAppClick, activeApps = [] }: TaskBarProps) => {

  const screenType = useResponsiveType();
  const visibleApps = TaskBarData.filter((app: TaskBarDataType) => {
    if (app.display === "desktop") return app.display === screenType;
    if (app.display === "tablet") return app.display === screenType;
    if (app.display === "mobile") return true;
    return true;
  });

  if (visibleApps.length === 0) return null;

  return (
    <nav className="relative pb-3 z-[1000] select-none pointer-events-auto">
      {/* Outer Glow Container: Creates a deep premium color-bleed warmth over the wallpaper */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-linear-to-r from-cyan-500/10 via-purple-500/15 to-pink-500/10 rounded-4xl blur-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Main Glassmorphic Dock Shell */}
        <ul
          className="relative flex items-end gap-3 px-4 pb-2 pt-3
                     bg-white/[0.07] dark:bg-slate-900/25
                     backdrop-blur-3xl 
                     border border-white/15 dark:border-white/8
                     rounded-3xl
                     shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)]
                     transition-all duration-300"
        >
          {visibleApps.map((app: TaskBarDataType) => (
            <li key={app.id} className="relative group/icon list-none flex flex-col items-center">
              
              {/* App Label Tooltip: Replicates the genuine clean macOS window name popups */}
              <span
                className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                           px-3 py-1 text-[11px] font-normal text-white tracking-wide
                           bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-md
                           opacity-0 scale-95 pointer-events-none
                           group-hover/icon:opacity-100 group-hover/icon:scale-100 
                           transition-all duration-150 cubic-bezier(0.25, 1, 0.5, 1) origin-bottom shadow-xl z-50"
              >
                {app.label}
              </span>

              {/* Interactive App Button: Pure baseline shift without visual squares */}
              <button
                onClick={() => onAppClick?.(app.id)}
                className="w-12 h-12 flex items-center justify-center 
                           cursor-pointer outline-none border-none bg-transparent
                           transition-all duration-200 cubic-bezier(0.25, 1, 0.5, 1)
                           hover:scale-120 hover:-translate-y-2.5
                           active:scale-95 active:translate-y-0"
              >
                <Image
                  src={app.icon}
                  alt={app.label}
                  width={45}
                  height={45}
                  className="object-contain drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] filter transition-all"
                  priority
                />
              </button>

              {/* Active Indicator Dot: True Apple open-app marker behavior */}
              <div 
                className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white/80 shadow-[0_0_5px_rgba(255,255,255,0.9)] transition-opacity duration-300
                  ${activeApps.some((a) => a.id === app.id && a.isOpen) ? "opacity-100" : "opacity-0 group-hover/icon:opacity-100"}`} 
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TaskBar;