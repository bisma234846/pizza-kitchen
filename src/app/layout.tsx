import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Pizza Kitchen | Best Pizza in Faisalabad",
  description:
    "The Pizza Kitchen - Delicious oven-baked pizzas, wings, pastas & more. Dine-in, Takeaway & Delivery. 48W-101 Susan Road, Faisalabad. Call 041-111-192021",
  keywords: [
    "pizza",
    "faisalabad",
    "the pizza kitchen",
    "delivery",
    "wings",
    "pasta",
    "fast food",
  ],
  authors: [{ name: "The Pizza Kitchen" }],
  openGraph: {
    title: "The Pizza Kitchen | Best Pizza in Faisalabad",
    description: "Delicious pizzas, wings, pastas. Dine-in, Takeaway & Delivery.",
    type: "website",
    locale: "en_PK",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#DC2626",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}