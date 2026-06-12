// Central registry mapping app IDs to their screen components
// Import this in main-layout.tsx to resolve app screens on launch

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import to avoid SSR issues with interactive components
const TerminalApp = dynamic(() => import("./ternimal-app"), { ssr: false });
const CalendarApp = dynamic(() => import("./calender-app"), { ssr: false });
const MessageApp = dynamic(() => import("./message-app"), { ssr: false });
const CalculatorApp = dynamic(() => import("./calculator-app"), { ssr: false });
const FileExplorerApp = dynamic(() => import("./file-explorer-app"), {
  ssr: false,
});
const MailApp = dynamic(() => import("./mail-app"), { ssr: false });
const NotepadApp = dynamic(() => import("./notepad-app"), { ssr: false });
const SafariApp = dynamic(() => import("./safari-app"), { ssr: false });
const DocApp = dynamic(() => import("./doc-app"), { ssr: false });
const { MapApp, TrashApp } = {
  MapApp: dynamic(
    () => import("./mics-app").then((m) => ({ default: m.MapApp })),
    { ssr: false },
  ),
  TrashApp: dynamic(
    () => import("./mics-app").then((m) => ({ default: m.TrashApp })),
    { ssr: false },
  ),
};

export interface AppConfig {
  defaultWidth: number;
  defaultHeight: number;
  component: React.ReactNode;
}

export const APP_REGISTRY: Record<string, AppConfig> = {
  terminal: {
    defaultWidth: 580,
    defaultHeight: 400,
    component: <TerminalApp />,
  },
  safari: {
    defaultWidth: 760,
    defaultHeight: 520,
    component: <SafariApp />,
  },
  calculator: {
    defaultWidth: 320,
    defaultHeight: 520,
    component: <CalculatorApp />,
  },
  calendar: {
    defaultWidth: 380,
    defaultHeight: 460,
    component: <CalendarApp />,
  },
  message: {
    defaultWidth: 680,
    defaultHeight: 480,
    component: <MessageApp />,
  },
  mail: {
    defaultWidth: 780,
    defaultHeight: 520,
    component: <MailApp />,
  },
  "file-explorer": {
    defaultWidth: 680,
    defaultHeight: 460,
    component: <FileExplorerApp />,
  },
  notebook: {
    defaultWidth: 640,
    defaultHeight: 480,
    component: <NotepadApp />,
  },
  doc: {
    defaultWidth: 700,
    defaultHeight: 520,
    component: <DocApp />,
  },
  map: {
    defaultWidth: 680,
    defaultHeight: 480,
    component: <MapApp />,
  },
  trash: {
    defaultWidth: 500,
    defaultHeight: 400,
    component: <TrashApp />,
  },
};
