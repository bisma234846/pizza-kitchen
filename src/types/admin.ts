// ============================================
// The Pizza Kitchen - Admin Panel Types
// ============================================

export type AdminRole = "Super Admin" | "Branch Manager" | "Kitchen Head" | "Cashier" | "Marketing Lead" | "Staff";
export type AuthRole = "admin" | "staff";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: AdminRole;
  authRole: AuthRole;
  branch: string;
  shiftStatus: "Online" | "Away" | "Busy" | "Offline";
}

export interface NavBadge {
  text: string;
  variant?: "red" | "amber" | "green" | "stone";
  pulse?: boolean;
}

export interface AdminNavItem {
  id: string;
  title: string;
  href: string;
  icon: string;
  badge?: NavBadge;
  description?: string;
}

export interface AdminNavSection {
  id: string;
  title: string;
  items: AdminNavItem[];
}

export interface BranchStatus {
  name: string;
  location: string;
  isOpen: boolean;
  statusText: string;
  averagePrepTime: string;
  activeRidersCount: number;
}
