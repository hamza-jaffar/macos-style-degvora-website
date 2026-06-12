import React from "react";
import TaskBar from "./sections/task-bar";
import MenuBar from "./sections/menu-bar";

const MainLayout = ({
  wallpaper,
  screenType,
  children,
}: {
  wallpaper: string;
  screenType: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/wallpapers/ipad.png')" }}
    >
      <MenuBar />
      {children}
      <TaskBar />
    </div>
  );
};

export default MainLayout;
