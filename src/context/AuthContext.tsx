"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { AdminUser, AuthRole } from "@/types/admin";
import { CURRENT_ADMIN_USER, CURRENT_STAFF_USER } from "@/lib/adminData";

const AUTH_STORAGE_KEY = "tpk_admin_auth_user";

export interface LoginCredentials {
  phone: string;
  password: string;
  role: AuthRole;
}

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Hydrate user session from localStorage
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          if (parsed && parsed.id) {
            setUser(parsed);
          }
        }
      }
    } catch (e) {
      console.error("Failed to load auth session:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async ({ phone, password, role }: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
      const cleanPhone = phone.replace(/[\s-]/g, "");

      // Basic validation
      if (!cleanPhone || cleanPhone.length < 10) {
        return { success: false, error: "Please enter a valid 11-digit mobile number." };
      }

      if (!password || password.length < 4) {
        return { success: false, error: "Password must be at least 4 characters long." };
      }

      if (role === "admin") {
        if (password !== "admin123" && password !== "admin") {
          return {
            success: false,
            error: "Invalid Admin password. Use 'admin123' for demo access.",
          };
        }

        const authenticatedUser: AdminUser = {
          ...CURRENT_ADMIN_USER,
          phone: phone.trim(),
        };

        setUser(authenticatedUser);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
        } catch (e) {
          console.error("Failed to save auth session:", e);
        }
        return { success: true };
      } else {
        // Staff Login
        if (password !== "staff123" && password !== "staff") {
          return {
            success: false,
            error: "Invalid Staff password. Use 'staff123' for demo access.",
          };
        }

        const authenticatedUser: AdminUser = {
          ...CURRENT_STAFF_USER,
          phone: phone.trim(),
        };

        setUser(authenticatedUser);
        try {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
        } catch (e) {
          console.error("Failed to save auth session:", e);
        }
        return { success: true };
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear auth session:", e);
    }
    router.push("/admin/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
