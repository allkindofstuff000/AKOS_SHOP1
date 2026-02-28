import { ReactNode } from "react";
import FooterSection from "@/components/sections/footer-section";
import Navbar from "@/components/layout/navbar";
import BackgroundBlobs from "@/components/ui/background-blobs";

interface SiteFrameProps {
  children: ReactNode;
  showFooter?: boolean;
}

export default function SiteFrame({ children, showFooter = true }: SiteFrameProps) {
  return (
    <div className="relative min-h-screen">
      <BackgroundBlobs />
      <Navbar />
      <main className="relative z-10 pb-20">{children}</main>
      {showFooter ? <FooterSection /> : null}
    </div>
  );
}
