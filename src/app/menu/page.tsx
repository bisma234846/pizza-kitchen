import type { Metadata } from "next";
import MenuSection from "@/components/sections/MenuSection";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore The Pizza Kitchen full menu - pizzas, wings, pastas, platters, sandwiches, beverages & desserts. Order via WhatsApp.",
};

export default function MenuPage() {
  return (
    <>
      <MenuSection />
      <CTASection />
    </>
  );
}