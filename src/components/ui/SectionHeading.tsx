"use client";

import AnimatedSection from "./AnimatedSection";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleColor = light ? "text-white" : "text-stone-900";
  const subColor = light ? "text-white/80" : "text-stone-600";

  return (
    <AnimatedSection className={`flex flex-col gap-3 mb-10 md:mb-14 ${alignCls}`}>
      {badge && (
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-600 text-xs font-bold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-base sm:text-lg ${subColor}`}>{subtitle}</p>
      )}
      <div
        className={`h-1 w-16 rounded-full bg-gradient-to-r from-red-600 to-amber-500 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </AnimatedSection>
  );
}