"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminShell from "./AdminShell";
import AdminLoginPage from "@/app/admin/login/page";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const isLoginPage = pathname ? pathname.startsWith("/admin/login") : false;

  useEffect(() => {
    if (isLoading) return;

    if (isAuthenticated && isLoginPage) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  // If loading session for protected admin routes, show smooth dark loader briefly
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full border-4 border-stone-800 border-t-red-600 animate-spin" />
          <span className="absolute text-xl">🍕</span>
        </div>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest animate-pulse">
          Verifying Management Session...
        </p>
      </div>
    );
  }

  // If not authenticated, always display AdminLoginPage directly (prevents blank screen or redirect loops)
  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  // If on login page and authenticated, redirecting to /admin, render within shell
  if (isLoginPage) {
    return <AdminShell>{children}</AdminShell>;
  }

  // Protected route with valid session -> render within AdminShell
  return <AdminShell>{children}</AdminShell>;
}
