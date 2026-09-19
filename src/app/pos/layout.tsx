import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { AdminOrderProvider } from "@/context/AdminOrderContext";
import { POSProvider } from "@/context/POSContext";
import POSAuthGuard from "@/components/pos/POSAuthGuard";

export const metadata: Metadata = {
  title: {
    default: "POS Terminal | The Pizza Kitchen",
    template: "%s | POS - The Pizza Kitchen",
  },
  description: "Touch-Optimized Fast Point of Sale Terminal & Kitchen Display System",
  robots: {
    index: false,
    follow: false,
  },
};

export default function POSLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AdminOrderProvider>
        <POSProvider>
          <POSAuthGuard>{children}</POSAuthGuard>
        </POSProvider>
      </AdminOrderProvider>
    </AuthProvider>
  );
}
