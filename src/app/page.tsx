import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import MenuSection from "@/components/sections/MenuSection";
import SpecialsSection from "@/components/sections/SpecialsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] selection:bg-red-600 selection:text-white">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <SpecialsSection />
        <TestimonialsSection />
        <ContactSection />
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Floating Button */}
      <ScrollToTop />
    </div>
  );
}