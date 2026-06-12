import { type TaskBarDataType } from "@/types/task-bar";

export const TaskBarData: TaskBarDataType[] = [
  // 📱 THESE 4 SHOW ON EVERY SCREEN (Mobile, Tablet, Desktop)
  { id: "file-explorer", icon: "/icons/folder.png", label: "File Explorer", display: "mobile" },
  { id: "doc", icon: "/icons/doc.png", label: "Doc", display: "mobile" },
  { id: "safari", icon: "/icons/safari.png", label: "Safari Browser", display: "mobile" },
  { id: "mail", icon: "/icons/mail.png", label: "Mail", display: "mobile" },

  // 📋 THESE EXTRA ICONS WILL START APPEARING ON TABLETS AND DESKTOPS (Total: 7)
  { id: "calendar", icon: "/icons/calender.png", label: "Calendar", display: "tablet" },
  { id: "message", icon: "/icons/message.png", label: "Message", display: "tablet" },
  { id: "notebook", icon: "/icons/notebook.png", label: "Note Pad", display: "tablet" },

  // 💻 THESE EXTRA ICONS WILL ONLY APPEAR ON DESKTOP MONITORS (Total: 11)
  { id: "map", icon: "/icons/map.png", label: "Map", display: "desktop" },
  // { id: "video", icon: "/icons/video.png", label: "Video", display: "desktop" },
  // { id: "wallpaper", icon: "/icons/wallpaper.png", label: "Wallpaper", display: "desktop" },
  { id: "trash", icon: "/icons/trashfull.png", label: "Trash", display: "desktop" },
  { id: "terminal", icon: "/icons/terminal.png", label: "Terminal", display: "mobile" },
  { id: "calculator", icon: "/icons/calculator.png", label: "Calculator", display: "mobile" },

];