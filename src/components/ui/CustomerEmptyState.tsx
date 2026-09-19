"use client";

import React from "react";
import CustomerButton from "./CustomerButton";

export interface CustomerEmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  actionHref?: string;
}

export function CustomerEmptyState({
  icon,
  title = "No dishes found",
  description = "We couldn't find any menu items matching your search. Try another keyword or browse our full category list.",
  actionText = "Explore Full Menu",
  onAction,
  actionHref,
}: CustomerEmptyStateProps) {
  return (
    <div className="text-center py-16 px-6 bg-white/60 backdrop-blur-xs rounded-3xl border border-dashed border-stone-200 max-w-lg mx-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto text-2xl shadow-xs">
        {icon || "🍕"}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-extrabold text-stone-900">{title}</h3>
        <p className="text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
          {description}
        </p>
      </div>
      {(actionText && (onAction || actionHref)) && (
        <div className="pt-2">
          {actionHref ? (
            <CustomerButton href={actionHref} size="sm" variant="primary">
              {actionText}
            </CustomerButton>
          ) : (
            <CustomerButton onClick={onAction} size="sm" variant="primary">
              {actionText}
            </CustomerButton>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomerEmptyState;
