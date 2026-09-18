import type { Metadata } from "next";
import AboutSection from "@/components/sections/AboutSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Pizza Kitchen - Faisalabad's favorite pizza restaurant. Fresh ingredients, oven-baked perfection, and 30-min delivery.",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <CTASection />
    </>
  );
}
