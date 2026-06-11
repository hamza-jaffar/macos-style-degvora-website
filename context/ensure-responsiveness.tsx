import DesktopLayout from "@/components/desktop/layout";
import MobileLayout from "@/components/mobile/layout";
import TabletLayout from "@/components/tablet/layout";
import { createContext, useContext, useEffect, useState } from "react";

type ScreenType = "mobile" | "tablet" | "desktop";

const ResponsiveContext = createContext<ScreenType>("desktop");

interface WrapperProps {
  children: React.ReactNode;
}

interface ViewProps {
  children: React.ReactNode;
}

export const EnsureResponsiveness = ({ children }: WrapperProps) => {
  const [screenType, setScreenType] = useState<ScreenType>("desktop");

  useEffect(() => {
    // Client-only boundary check
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenType("mobile");
      } else if (width >= 768 && width < 1024) {
        setScreenType("tablet");
      } else {
        setScreenType("desktop");
      }
    };

    // Run once on mount to establish the correct state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ResponsiveContext.Provider value={screenType}>
      {children}
    </ResponsiveContext.Provider>
  );
};

const useResponsiveType = () => useContext(ResponsiveContext);

export const DesktopView = ({ children }: ViewProps) => {
  const screenType = useResponsiveType();
  return screenType === "desktop" ? <DesktopLayout>{children}</DesktopLayout> : null;
};

export const TabletView = ({ children }: ViewProps) => {
  const screenType = useResponsiveType();
  return screenType === "tablet" ? <TabletLayout>{children}</TabletLayout> : null;
};

export const MobileView = ({ children }: ViewProps) => {
  const screenType = useResponsiveType();
  return screenType === "mobile" ? <MobileLayout>{children}</MobileLayout> : null;
};
