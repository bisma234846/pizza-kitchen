import HeroSection from "@/components/sections/HeroSection";
import FeaturedPizzasSection from "@/components/sections/FeaturedPizzasSection";
import CategoryBrowseSection from "@/components/sections/CategoryBrowseSection";
import SpecialsSection from "@/components/sections/SpecialsSection";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      {/* 1. Strong Hero */}
      <HeroSection />

      {/* 2. Popular / Signature Pizzas */}
      <FeaturedPizzasSection />

      {/* 3. Menu Categories Discovery */}
      <CategoryBrowseSection />

      {/* 4. Current Specials & Deals */}
      <SpecialsSection />

      {/* 5. Restaurant Strengths / Story */}
      <AboutSection />

      {/* 6. Customer Reviews & 4.1★ Ratings */}
      <TestimonialsSection />

      {/* 7. Store Location & Contact Form */}
      <ContactSection />

      {/* 8. Final Order CTA */}
      <CTASection />
    </>
  );
}
