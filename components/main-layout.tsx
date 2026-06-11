import React from "react";

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
      {children}
    </div>
  );
};

export default MainLayout;
