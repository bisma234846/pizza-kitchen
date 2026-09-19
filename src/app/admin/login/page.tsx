"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ChefHat,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Store,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { AuthRole } from "@/types/admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  const [role, setRole] = useState<AuthRole>("admin");
  const [phone, setPhone] = useState("0300-1234567");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleRoleChange = (newRole: AuthRole) => {
    setRole(newRole);
    setErrorMessage(null);
    if (newRole === "admin") {
      setPhone("0300-1234567");
      setPassword("admin123");
    } else {
      setPhone("0321-1234567");
      setPassword("staff123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSubmitting(true);

    try {
      const result = await login({ phone, password, role });
      if (result.success) {
        router.push("/admin");
      } else {
        setErrorMessage(result.error || "Login failed. Please verify credentials.");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred during login.");
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = (demoRole: AuthRole) => {
    handleRoleChange(demoRole);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.2),rgba(255,255,255,0))] flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-red-600 selection:text-white">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f230d_1px,transparent_1px),linear-gradient(to_bottom,#1f1f230d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Main Card Container */}
        <div className="bg-[#17171a]/90 backdrop-blur-xl border border-stone-800/90 rounded-3xl shadow-2xl shadow-black/80 overflow-hidden">
          {/* TOP RED GRADIENT HEADER */}
          <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-amber-800 p-7 text-center overflow-hidden border-b border-red-500/20">
            {/* Subtle glow and pattern overlays */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-red-950/40 rounded-full blur-xl" />

            {/* Pizza Icon Emblem */}
            <div className="relative mx-auto w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg shadow-black/20 mb-3.5 group">
              <span className="text-3xl filter drop-shadow-md select-none transform transition-transform group-hover:scale-110">
                🍕
              </span>
            </div>

            {/* Brand Title: Second word in red / gold highlight */}
            <h1 className="text-2xl font-black text-white tracking-tight drop-shadow-xs">
              The <span className="text-amber-200">Pizza</span> Kitchen
            </h1>

            {/* Subtitle: Management Login */}
            <p className="text-xs font-extrabold uppercase tracking-widest text-red-100/90 mt-1">
              Management Login
            </p>
          </div>

          {/* CARD BODY */}
          <div className="p-6 sm:p-7 space-y-5">
            {/* TABS: Switch between Admin and Staff */}
            <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-stone-900 border border-stone-800/80">
              <button
                type="button"
                onClick={() => handleRoleChange("admin")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  role === "admin"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/30"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-850"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Login</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("staff")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  role === "staff"
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/30"
                    : "text-stone-400 hover:text-stone-200 hover:bg-stone-850"
                }`}
              >
                <ChefHat className="w-4 h-4" />
                <span>Staff Login</span>
              </button>
            </div>

            {/* Error Message Alert */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-3.5 rounded-2xl bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-medium flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Phone Number Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center justify-between">
                  <span>Registered Mobile Number</span>
                  <span className="text-[10px] text-stone-500 font-normal">e.g. 0300-1234567</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300-1234567"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-stone-900/90 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center justify-between">
                  <span>Password</span>
                  <span className="text-[10px] text-stone-500 font-mono">Demo: {role === "admin" ? "admin123" : "staff123"}</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter management password"
                    className="w-full pl-10 pr-11 py-3 rounded-2xl bg-stone-900/90 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick Preset Selector for Testing */}
              <div className="pt-1 flex items-center justify-between text-[11px] text-stone-400">
                <span className="flex items-center gap-1 text-stone-400 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Demo Quick Fill:
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => fillDemo("admin")}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                      role === "admin"
                        ? "bg-red-500/20 border-red-500/40 text-red-300"
                        : "bg-stone-900 border-stone-800 text-stone-400 hover:text-white"
                    }`}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => fillDemo("staff")}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all ${
                      role === "staff"
                        ? "bg-red-500/20 border-red-500/40 text-red-300"
                        : "bg-stone-900 border-stone-800 text-stone-400 hover:text-white"
                    }`}
                  >
                    Staff
                  </button>
                </div>
              </div>

              {/* Submit Button: Full width red button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:scale-[0.99] text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign in to Dashboard</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="pt-2 text-center">
              <a
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
              >
                <Store className="w-3.5 h-3.5 text-red-500" />
                <span>Return to Customer Storefront</span>
              </a>
            </div>
          </div>
        </div>

        {/* Security badge note */}
        <p className="text-center text-[11px] text-stone-400 mt-4">
          The Pizza Kitchen Internal Management Portal &bull; Faisalabad HQ
        </p>
      </motion.div>
    </div>
  );
}
