import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact The Pizza Kitchen - 48W-101 Susan Road, Faisalabad. Call UAN 041-111-192021 or order via WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <ContactSection />
      <CTASection />
    </>
  );
}
