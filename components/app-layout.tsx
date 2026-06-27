"use client";

import React, { useState } from "react";
import Image from "next/image";
import MenuBar from "./sections/menu-bar";
import TaskBar from "./sections/task-bar";
import OSWindow from "./os-window";
import { TaskBarData } from "@/constant/task-bar-data";

// Layout Data Type Interfaces
export interface AppInstance {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  defaultX: number;
  defaultY: number;
  defaultWidth: number;
  defaultHeight: number;
  component: React.ReactNode;
}

const AppLayout = () => {
  // 1. Centralized State Engine tracking all system applications
  const [apps, setApps] = useState<AppInstance[]>([
    {
      id: "terminal",
      title: "Terminal — bash",
      icon: "/icons/Doc.png",
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      defaultX: 120,
      defaultY: 100,
      defaultWidth: 550,
      defaultHeight: 360,
      component: (
        <div className="font-mono text-emerald-400 space-y-1">
          <p>Degvora OS Kernel Terminal v1.0.0-stable</p>
          <p>
            hamza@degvora-mbp ~ %{" "}
            <span className="text-white animate-pulse">▒</span>
          </p>
        </div>
      ),
    },
  ]);

  // Track stacking order. The last item in this array gets the highest z-index.
  const [focusOrder, setFocusOrder] = useState<string[]>([
    "terminal",
  ]);

  // --- INTERACTION PIPELINES ---
  const bringToFront = (id: string) => {
    setFocusOrder((prev) => [...prev.filter((x) => x !== id), id]);
    // If user clicks an item that was minimized in the background, un-minimize it instantly
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isMinimized: false } : app)),
    );
  };

  const handleClose = (id: string) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isOpen: false } : app)),
    );
  };

  const handleMinimize = (id: string) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isMinimized: true } : app)),
    );
  };

  const handleToggleMaximize = (id: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, isMaximized: !app.isMaximized } : app,
      ),
    );
  };

  // Triggered when clicking a Dock icon inside your TaskBar component mapping
  const handleDockIconClick = (id: string) => {
    // Check if app already exists in the state
    const appExists = apps.some((app) => app.id === id);

    if (!appExists) {
      // Find app data in TaskBarData
      const appData = TaskBarData.find((app) => app.id === id);
      if (appData) {
        const newApp: AppInstance = {
          id: appData.id,
          title: appData.label,
          icon: appData.icon,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          defaultX: 150 + (apps.length % 10) * 30,
          defaultY: 120 + (apps.length % 10) * 30,
          defaultWidth: 640,
          defaultHeight: 400,
          component: (
            <div className="w-full h-full flex flex-col justify-center items-center text-slate-400 bg-slate-900/50 rounded-lg">
              <Image
                src={appData.icon}
                alt={appData.label}
                width={64}
                height={64}
                className="mb-4 opacity-50 drop-shadow-md"
              />
              <p className="text-lg font-medium text-white mb-1">
                {appData.label}
              </p>
              <p className="text-sm text-center max-w-sm">
                Application interface is currently pending construction.
              </p>
            </div>
          ),
        };
        setApps((prev) => [...prev, newApp]);
      }
    } else {
      setApps((prev) =>
        prev.map((app) => {
          if (app.id === id) {
            if (!app.isOpen)
              return { ...app, isOpen: true, isMinimized: false };
            if (app.isMinimized) return { ...app, isMinimized: false };
            if (focusOrder[focusOrder.length - 1] === id)
              return { ...app, isMinimized: true };
            return app;
          }
          return app;
        }),
      );
    }
    bringToFront(id);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-cover bg-center select-none">
      <MenuBar />

      <main className="w-full h-full relative pt-7 pb-20 overflow-hidden">
        {apps
          .filter((app) => app.isOpen)
          .map((app) => {
            const zIndexIndex = focusOrder.indexOf(app.id);
            const dynamicZIndex = 20 + (zIndexIndex !== -1 ? zIndexIndex : 0);

            return (
              <OSWindow
                key={app.id}
                app={app}
                zIndex={dynamicZIndex}
                onClose={() => handleClose(app.id)}
                onMinimize={() => handleMinimize(app.id)}
                onMaximize={() => handleToggleMaximize(app.id)}
                onFocus={() => bringToFront(app.id)}
              />
            );
          })}
      </main>

      <TaskBar onAppClick={handleDockIconClick} activeApps={apps} />
    </div>
  );
};

export default AppLayout;
