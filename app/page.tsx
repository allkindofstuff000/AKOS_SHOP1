import SiteFrame from "@/components/layout/site-frame";
import HeroSection from "@/components/sections/hero-section";
import ServicesSection from "@/components/sections/services-section";
import GallerySection from "@/app/components/GallerySection";
import PaymentsSection from "@/app/components/PaymentsSection";

export default function Home() {
  return (
    <SiteFrame>
      <HeroSection />
      <ServicesSection />
      <GallerySection />
      <PaymentsSection />
    </SiteFrame>
  );
}
