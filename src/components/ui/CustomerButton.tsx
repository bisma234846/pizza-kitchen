"use client";

import React, { forwardRef, ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export type CustomerButtonVariant =
  | "primary"
  | "whatsapp"
  | "secondary"
  | "outline"
  | "ghost";

export type CustomerButtonSize = "sm" | "md" | "lg";

export interface CustomerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CustomerButtonVariant;
  size?: CustomerButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const CustomerButton = forwardRef<HTMLButtonElement, CustomerButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      href,
      target,
      rel,
      isLoading = false,
      icon,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseClasses =
      "inline-flex items-center justify-center font-extrabold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    // Size variants
    const sizeClasses = {
      sm: "text-[11px] px-4 py-2 gap-1.5",
      md: "text-xs px-6 py-3 gap-2",
      lg: "text-sm px-8 py-4 gap-2.5",
    }[size];

    // Style variants
    const variantClasses = {
      primary:
        "bg-red-600 text-white hover:bg-red-700 shadow-md shadow-red-600/25 active:bg-red-800",
      whatsapp:
        "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-900/20 active:bg-green-800",
      secondary:
        "bg-stone-900 text-stone-100 hover:bg-stone-800 border border-stone-800 shadow-sm",
      outline:
        "bg-transparent text-stone-900 border-2 border-stone-300 hover:border-red-600 hover:text-red-600 hover:bg-red-50/50",
      ghost:
        "bg-transparent text-stone-700 hover:text-red-600 hover:bg-stone-100/70",
    }[variant];

    const effectiveLeftIcon = leftIcon || icon;
    const widthClass = fullWidth ? "w-full" : "w-auto";
    const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`.trim();

    const content = (
      <>
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
        ) : (
          effectiveLeftIcon && <span className="shrink-0">{effectiveLeftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if (href) {
      const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
      return (
        <Link
          href={href}
          target={target || (isExternal && href.startsWith("http") ? "_blank" : undefined)}
          rel={rel || (isExternal && href.startsWith("http") ? "noopener noreferrer" : undefined)}
          className={combinedClasses}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

CustomerButton.displayName = "CustomerButton";

export default CustomerButton;
