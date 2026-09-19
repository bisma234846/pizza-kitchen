"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminShell from "./AdminShell";

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

    if (!isAuthenticated && !isLoginPage) {
      router.replace("/admin/login");
    } else if (isAuthenticated && isLoginPage) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  // If on login page, render children directly without AdminShell
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If loading session for protected admin routes, show smooth dark loader
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-stone-800 border-t-red-600 animate-spin" />
          <span className="absolute text-2xl">🍕</span>
        </div>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest animate-pulse">
          Verifying Management Session...
        </p>
      </div>
    );
  }

  // If not authenticated and waiting for redirect
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0F0F11] flex flex-col items-center justify-center text-white">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
          Redirecting to login...
        </p>
      </div>
    );
  }

  // Protected route with valid session -> render within AdminShell
  return <AdminShell>{children}</AdminShell>;
}
