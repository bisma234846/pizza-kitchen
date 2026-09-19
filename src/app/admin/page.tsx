import PizzaDashboard from "@/components/admin/pizza-dashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Pizza Kitchen | Admin Dashboard",
  description: "Operations dashboard for The Pizza Kitchen restaurant.",
};

export default function AdminPage() {
  return <PizzaDashboard page="Dashboard" />;
}
