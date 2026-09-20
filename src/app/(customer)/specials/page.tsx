import type { Metadata } from "next";
import SpecialsPageContent from "@/components/sections/SpecialsPageContent";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Deals & Specials",
  description:
    "Exclusive pizza deals and feast bundles at The Pizza Kitchen Faisalabad. Save big on combo offers.",
};

export default function SpecialsPage() {
  return (
    <>
      <SpecialsPageContent />
      <CTASection />
    </>
  );
}
