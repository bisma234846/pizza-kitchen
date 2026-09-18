import type { Metadata } from "next";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read 938+ Google reviews for The Pizza Kitchen Faisalabad. 4.1★ rated pizza restaurant.",
};

export default function ReviewsPage() {
  return (
    <>
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
