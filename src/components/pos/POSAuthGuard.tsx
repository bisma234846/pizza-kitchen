"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import POSHeader from "./POSHeader";

export default function POSAuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const isLoginPage = pathname === "/pos/login";

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated && !isLoginPage) {
      router.replace("/pos/login");
    } else if (isAuthenticated && isLoginPage) {
      router.replace("/pos");
    }
  }, [isAuthenticated, isLoading, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0c0c0e] flex flex-col items-center justify-center text-white">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-14 h-14 rounded-full border-4 border-stone-800 border-t-red-600 animate-spin" />
          <span className="absolute text-xl">🍕</span>
        </div>
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest animate-pulse">
          Initializing POS Terminal...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0c0c0e] flex flex-col items-center justify-center text-white">
        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
          Redirecting to POS Login...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-stone-100 flex flex-col selection:bg-red-600 selection:text-white">
      <POSHeader />
      <main className="flex-1 p-3 sm:p-5 flex flex-col min-h-0 overflow-y-auto lg:overflow-hidden">
        {children}
      </main>
    </div>
  );
}
