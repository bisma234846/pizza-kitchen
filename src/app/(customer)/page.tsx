import HeroSection from "@/components/sections/HeroSection";
import SpecialsSection from "@/components/sections/SpecialsSection";
import FeaturedPizzasSection from "@/components/sections/FeaturedPizzasSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero + Confidence Strip */}
      <HeroSection />

      {/* 2. Featured Deals */}
      <SpecialsSection />

      {/* 3. Popular Pizzas */}
      <FeaturedPizzasSection />

      {/* 4. Our Story & Features */}
      <AboutSection />

      {/* 5. Customer Testimonials */}
      <TestimonialsSection />

      {/* 6. Location & Contact */}
      <ContactSection />

      {/* 7. Final Order CTA */}
      <CTASection />
    </>
  );
}
