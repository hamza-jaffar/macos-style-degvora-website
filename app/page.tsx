"use client"

import DesktopHome from "@/components/desktop/home";
import MobileHome from "@/components/mobile/home";
import TabletHome from "@/components/tablet/home";
import { DesktopView, EnsureResponsiveness, MobileView, TabletView } from "@/context/ensure-responsiveness";

export default function home() {
  return (
    <EnsureResponsiveness>
      <DesktopView>
        <DesktopHome />
      </DesktopView>
      <TabletView>
        <TabletHome />
      </TabletView>
      <MobileView>
        <MobileHome />
      </MobileView>
    </EnsureResponsiveness>
  )
}