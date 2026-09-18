import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { AdminOrderProvider } from "@/context/AdminOrderContext";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export const metadata: Metadata = {
  title: {
    default: "Admin Portal | The Pizza Kitchen",
    template: "%s | Admin Hub - The Pizza Kitchen",
  },
  description: "Operations & Marketing Management Hub for The Pizza Kitchen Faisalabad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <AdminOrderProvider>
        <AdminAuthGuard>{children}</AdminAuthGuard>
      </AdminOrderProvider>
    </AuthProvider>
  );
}
