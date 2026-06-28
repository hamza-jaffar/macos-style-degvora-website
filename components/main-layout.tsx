"use client";

import React, { useState } from "react";
import Image from "next/image";
import MenuBar from "./sections/menu-bar";
import TaskBar from "./sections/task-bar";
import OSWindow from "./os-window";
import { TaskBarData } from "@/constant/task-bar-data";
import { AppInstance } from "./app-layout";
import { APP_REGISTRY } from "./apps/registry";

const MainLayout = ({
  wallpaper,
  screenType,
  children,
}: {
  wallpaper: string;
  screenType: string;
  children: React.ReactNode;
}) => {
  // Centralized State Engine tracking all system applications
  const [apps, setApps] = useState<AppInstance[]>([]);

  // Track stacking order
  const [focusOrder, setFocusOrder] = useState<string[]>(["terminal", "safari"]);

  // --- INTERACTION PIPELINES ---
  const bringToFront = (id: string) => {
    setFocusOrder((prev) => [...prev.filter((x) => x !== id), id]);
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isMinimized: false } : app))
    );
  };

  const handleClose = (id: string) => {
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, isOpen: false } : app)));
  };

  const handleMinimize = (id: string) => {
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, isMinimized: true } : app)));
  };

  const handleToggleMaximize = (id: string) => {
    setApps((prev) => prev.map((app) => (app.id === id ? { ...app, isMaximized: !app.isMaximized } : app)));
  };

  // Triggered when clicking a Dock icon
  const handleAppIconClick = (id: string) => {
    const appExists = apps.some((app) => app.id === id);

    if (!appExists) {
      const appData = TaskBarData.find((app) => app.id === id);
      if (appData) {
        // Look up the registered screen component and dimensions
        const registered = APP_REGISTRY[id];
        const newApp: AppInstance = {
          id: appData.id,
          title: appData.label,
          icon: appData.icon,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          defaultX: 150 + (apps.length % 8) * 35,
          defaultY: 110 + (apps.length % 8) * 35,
          defaultWidth: registered?.defaultWidth ?? 640,
          defaultHeight: registered?.defaultHeight ?? 420,
          component: registered?.component ?? (
            <div className="w-full h-full flex flex-col justify-center items-center text-slate-400 gap-3">
              <Image src={appData.icon} alt={appData.label} width={64} height={64} className="opacity-40" />
              <p className="text-white font-medium">{appData.label}</p>
              <p className="text-xs text-center text-slate-500 max-w-xs">Coming soon</p>
            </div>
          ),
        };
        setApps((prev) => [...prev, newApp]);
      }
    } else {
      setApps((prev) =>
        prev.map((app) => {
          if (app.id === id) {
            if (!app.isOpen) return { ...app, isOpen: true, isMinimized: false };
            if (app.isMinimized) return { ...app, isMinimized: false };
            if (focusOrder[focusOrder.length - 1] === id) return { ...app, isMinimized: true };
            return app;
          }
          return app;
        })
      );
    }
    bringToFront(id);
  };

  const hasOpenApp = apps.some((app) => app.isOpen && !app.isMinimized);
  const isMobile = screenType === "mobile";
  const hasMaximizedApp = apps.some((app) => app.isOpen && (!app.isMinimized) && app.isMaximized);

  // Hide MenuBar completely on mobile if an app is open
  const shouldHideMenuBar = isMobile && hasOpenApp;

  // Auto-hide TaskBar if any app is maximized, or if on mobile and any app is open
  const isTaskBarAutoHide = hasMaximizedApp || (isMobile && hasOpenApp);

  return (
    <div
      className="h-screen w-screen relative overflow-hidden bg-cover bg-center select-none"
      style={{ backgroundImage: `url('/${wallpaper}')` }}
    >
      {/* Menu Bar */}
      {!shouldHideMenuBar && <MenuBar onAppClick={handleAppIconClick} />}

      {/* Background content (e.g. Desktop icons or home widget) */}
      <div className="absolute inset-0 pointer-events-auto">
        <div className="h-full w-full">{children}</div>
      </div>

      {/* Windows Layer */}
      <main className="absolute inset-0 pt-7 pb-20 pointer-events-none overflow-hidden">
        {apps
          .filter((app) => app.isOpen)
          .map((app) => {
            const zIndexIndex = focusOrder.indexOf(app.id);
            const dynamicZIndex = 20 + (zIndexIndex !== -1 ? zIndexIndex : 0);

            // In mobile view, force maximized visually by passing a modified app object
            const displayApp = isMobile ? { ...app, isMaximized: true } : app;

            return (
              <OSWindow
                key={app.id}
                app={displayApp}
                zIndex={dynamicZIndex}
                onClose={() => handleClose(app.id)}
                onMinimize={() => handleMinimize(app.id)}
                onMaximize={() => handleToggleMaximize(app.id)}
                onFocus={() => bringToFront(app.id)}
                screenType={screenType}
              />
            );
          })}
      </main>

      {/* Task Bar */}
      <div 
        className={`fixed bottom-0 w-full flex justify-center z-[1000] transition-transform duration-300 ease-out ${
          isTaskBarAutoHide ? "translate-y-[calc(100%-8px)] hover:translate-y-0" : ""
        }`}
      >
        <TaskBar onAppClick={handleAppIconClick} activeApps={apps} />
      </div>
    </div>
  );
};

export default MainLayout;
