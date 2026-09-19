import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { AdminOrderProvider } from "@/context/AdminOrderContext";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | The Pizza Kitchen",
    template: "%s | The Pizza Kitchen Dashboard",
  },
  description: "Operations dashboard for The Pizza Kitchen restaurant.",
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
      <AdminOrderProvider>{children}</AdminOrderProvider>
    </AuthProvider>
  );
}
