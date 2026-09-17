import type { Metadata } from "next";
import SpecialsSection from "@/components/sections/SpecialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Specials & Deals",
  description:
    "Exclusive pizza deals and feast bundles at The Pizza Kitchen Faisalabad. Save big on combo offers.",
};

export default function SpecialsPage() {
  return (
    <>
      <SpecialsSection />
      <CTASection />
    </>
  );
}