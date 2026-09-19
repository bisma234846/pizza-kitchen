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
  const subColor = light ? "text-stone-300" : "text-stone-600";
  const badgeBg = light ? "bg-red-600/20 text-red-400 border border-red-500/30" : "bg-red-50 text-red-700 border border-red-200/60";
  const badgeDot = light ? "bg-red-400" : "bg-red-600";

  return (
    <AnimatedSection className={`flex flex-col gap-2.5 sm:gap-3 mb-10 sm:mb-12 md:mb-14 ${alignCls}`}>
      {badge && (
        <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-black tracking-wider uppercase ${badgeBg}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${badgeDot}`} />
          {badge}
        </span>
      )}
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed ${subColor}`}>{subtitle}</p>
      )}
      <div
        className={`h-1 w-12 sm:w-16 rounded-full bg-gradient-to-r from-red-600 to-amber-500 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </AnimatedSection>
  );
}