"use client";

import React, { HTMLAttributes } from "react";

export interface CustomerContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "full";
}

export function CustomerContainer({
  children,
  className = "",
  size = "lg",
  ...props
}: CustomerContainerProps) {
  const sizeClasses = {
    sm: "max-w-4xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    full: "max-w-full",
  }[size];

  return (
    <div
      className={`w-full mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default CustomerContainer;
