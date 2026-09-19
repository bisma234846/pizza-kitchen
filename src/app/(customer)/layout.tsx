import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CustomerCartDrawer from "@/components/ui/CustomerCartDrawer";
import CustomerProductModal from "@/components/ui/CustomerProductModal";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#1C1917] overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CustomerCartDrawer />
      <CustomerProductModal />
      <ScrollToTop />
    </div>
  );
}
