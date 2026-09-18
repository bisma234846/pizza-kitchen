import type { AdminUser, AdminNavSection, BranchStatus } from "@/types/admin";

export const CURRENT_ADMIN_USER: AdminUser = {
  id: "admin-01",
  name: "Muhammad Hamza",
  email: "m.hamza@thepizzakitchen.pk",
  phone: "0300-1234567",
  role: "Super Admin",
  authRole: "admin",
  branch: "Susan Road Branch, Faisalabad",
  shiftStatus: "Online",
};

export const CURRENT_STAFF_USER: AdminUser = {
  id: "staff-01",
  name: "Bilal Ahmed",
  email: "b.ahmed@thepizzakitchen.pk",
  phone: "0321-1234567",
  role: "Kitchen Head",
  authRole: "staff",
  branch: "Susan Road Branch, Faisalabad",
  shiftStatus: "Online",
};

export const BRANCH_STATUS: BranchStatus = {
  name: "Susan Road HQ",
  location: "48W-101 Susan Road, Faisalabad",
  isOpen: true,
  statusText: "Open & Accepting Orders",
  averagePrepTime: "18 mins",
  activeRidersCount: 6,
};

export const ADMIN_NAV_SECTIONS: AdminNavSection[] = [
  {
    id: "overview",
    title: "Overview",
    items: [
      {
        id: "dashboard",
        title: "Dashboard",
        href: "/admin",
        icon: "LayoutDashboard",
        description: "Live stats, revenues & quick actions",
      },
    ],
  },
  {
    id: "operations",
    title: "Operations",
    items: [
      {
        id: "pos",
        title: "POS System",
        href: "/admin/pos",
        icon: "Calculator",
        description: "Counter & walk-in order terminal",
      },
      {
        id: "active-orders",
        title: "Active Orders",
        href: "/admin/orders/active",
        icon: "Flame",
        badge: { text: "8 Live", variant: "red", pulse: true },
        description: "Live orders in prep and dispatch",
      },
      {
        id: "cancel-requests",
        title: "Cancel Requests",
        href: "/admin/orders/cancel-requests",
        icon: "AlertOctagon",
        badge: { text: "2", variant: "amber" },
        description: "Order cancellation and refund approvals",
      },
      {
        id: "all-orders",
        title: "All Orders",
        href: "/admin/orders",
        icon: "ShoppingBag",
        description: "Order history, invoices & logs",
      },
      {
        id: "kitchen",
        title: "Kitchen",
        href: "/admin/kitchen",
        icon: "ChefHat",
        badge: { text: "KDS", variant: "stone" },
        description: "Kitchen display system & station queues",
      },
      {
        id: "riders",
        title: "Riders",
        href: "/admin/riders",
        icon: "Bike",
        badge: { text: "6 Active", variant: "green" },
        description: "Delivery fleet dispatch and tracking",
      },
      {
        id: "abandoned-carts",
        title: "Abandoned Carts",
        href: "/admin/abandoned-carts",
        icon: "ShoppingCart",
        badge: { text: "14", variant: "stone" },
        description: "Incomplete carts ready for recovery",
      },
      {
        id: "menu-items",
        title: "Menu Items",
        href: "/admin/menu",
        icon: "Utensils",
        description: "Add, edit, delete & stock management",
      },
      {
        id: "categories",
        title: "Categories",
        href: "/admin/categories",
        icon: "Layers",
        description: "Category list & tab ordering",
      },
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    items: [
      {
        id: "reviews",
        title: "Reviews",
        href: "/admin/reviews",
        icon: "Star",
        badge: { text: "4.1★", variant: "amber" },
        description: "Google & direct customer ratings",
      },
      {
        id: "follow-up-wa",
        title: "Follow-up WA",
        href: "/admin/follow-up-wa",
        icon: "MessageSquare",
        description: "WhatsApp post-meal feedback & re-order messages",
      },
      {
        id: "birthdays",
        title: "Birthdays",
        href: "/admin/birthdays",
        icon: "Cake",
        badge: { text: "5 Today", variant: "red" },
        description: "Automated birthday greetings & discount perks",
      },
      {
        id: "loyalty-program",
        title: "Loyalty Program",
        href: "/admin/loyalty",
        icon: "Award",
        description: "Customer points, cashback & tiers",
      },
      {
        id: "deals",
        title: "Deals",
        href: "/admin/deals",
        icon: "Tag",
        badge: { text: "4 Active", variant: "green" },
        description: "Discounts, Eid & Ramzan bundles manager",
      },
    ],
  },
];
