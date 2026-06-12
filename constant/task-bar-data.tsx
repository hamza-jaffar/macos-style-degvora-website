import { type TaskBarDataType } from "@/types/task-bar";

export const TaskBarData: TaskBarDataType[] = [
  // 📱 THESE 4 SHOW ON EVERY SCREEN (Mobile, Tablet, Desktop)
  { id: 3, icon: "/icons/folder.png", label: "File Explorer", display: "mobile" },
  { id: 2, icon: "/icons/doc.png", label: "Doc", display: "mobile" },
  { id: 8, icon: "/icons/safari.png", label: "Safari Browser", display: "mobile" },
  { id: 4, icon: "/icons/mail.png", label: "Mail", display: "mobile" },

  // 📋 THESE EXTRA ICONS WILL START APPEARING ON TABLETS AND DESKTOPS (Total: 7)
  { id: 1, icon: "/icons/calender.png", label: "Calendar", display: "tablet" },
  { id: 5, icon: "/icons/message.png", label: "Message", display: "tablet" },
  { id: 7, icon: "/icons/notebook.png", label: "Note Pad", display: "tablet" },

  // 💻 THESE EXTRA ICONS WILL ONLY APPEAR ON DESKTOP MONITORS (Total: 11)
  { id: 6, icon: "/icons/map.png", label: "Map", display: "desktop" },
  { id: 9, icon: "/icons/video.png", label: "Video", display: "desktop" },
  { id: 10, icon: "/icons/wallpaper.png", label: "Wallpaper", display: "desktop" },
  { id: 11, icon: "/icons/trashfull.png", label: "Trash", display: "desktop" },
];