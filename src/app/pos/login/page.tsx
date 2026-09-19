"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calculator,
  Lock,
  Phone,
  User,
  Shield,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { AuthRole } from "@/types/admin";

export default function POSLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [role, setRole] = useState<AuthRole>("staff");
  const [phone, setPhone] = useState("0321-1234567");
  const [password, setPassword] = useState("staff123");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/pos");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleRoleChange = (newRole: AuthRole) => {
    setRole(newRole);
    setErrorMessage(null);
    if (newRole === "staff") {
      setPhone("0321-1234567");
      setPassword("staff123");
    } else {
      setPhone("0300-1234567");
      setPassword("admin123");
    }
  };

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const result = await login({ phone, password, role });
      if (result.success) {
        router.push("/pos");
      } else {
        setErrorMessage(result.error || "Invalid PIN / Password");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.25),rgba(0,0,0,0))] flex flex-col justify-center items-center p-4 sm:p-6 select-none">
      <div className="w-full max-w-md">
        {/* Terminal Header Branding */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 border border-red-500/30 flex items-center justify-center mx-auto shadow-2xl shadow-red-900/40 mb-3">
            <span className="text-3xl">🍕</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
            The Pizza Kitchen
          </h1>
          <p className="text-xs font-bold text-stone-400 mt-0.5">
            Susan Road Branch • POS Operator Sign-In
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#121215] border border-stone-800/90 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/80 space-y-5">
          {/* Fast Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-stone-950 border border-stone-800">
            <button
              type="button"
              onClick={() => handleRoleChange("staff")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                role === "staff"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Cashier / Staff</span>
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange("admin")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black transition-all ${
                role === "admin"
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Manager / Admin</span>
            </button>
          </div>

          {/* Quick Demo Login Preset Button */}
          <div className="p-3.5 rounded-2xl bg-stone-950/80 border border-stone-800 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-extrabold text-white block">
                {role === "staff" ? "Bilal Ahmed (Kitchen Head / Cashier)" : "Muhammad Hamza (Super Admin)"}
              </span>
              <span className="text-[10px] text-stone-400">
                Preset: {phone} • PIN: {password}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleLogin()}
              disabled={submitting}
              className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-sm"
            >
              1-Tap Login
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-2xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Standard Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Operator Phone Number
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-0000000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-red-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                Operator Password / PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-red-500 font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-98 text-white font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 mt-2"
            >
              {submitting ? (
                <span>Authenticating Terminal...</span>
              ) : (
                <>
                  <Calculator className="w-4 h-4" />
                  <span>Open POS Terminal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Links back */}
          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
            <Link href="/" className="hover:text-white transition-colors">
              ← Customer Website
            </Link>
            <Link href="/admin/login" className="hover:text-white transition-colors">
              Admin Hub Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
