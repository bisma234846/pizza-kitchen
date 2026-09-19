import PizzaDashboard from "@/components/admin/pizza-dashboard";

const pageNames: Record<string, string> = {
  pos: "POS",
  "active-orders": "Active Orders",
  kitchen: "Kitchen",
  riders: "Riders",
  "cancel-requests": "Cancel Requests",
  "all-orders": "All Orders",
  "menu-management": "Menu Management",
  "categories-management": "Categories Management",
  dashboard: "Dashboard",
  login: "Login",
};

export default async function AdminSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/").toLowerCase();
  return <PizzaDashboard page={pageNames[key] ?? "Dashboard"} />;
}
