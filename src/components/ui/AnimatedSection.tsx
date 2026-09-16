"use client";

import { motion } from "framer-motion";
import { useDevicePerformance, getMotionProps } from "@/hooks/useDevicePerformance";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article";
  id?: string;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  y = 24,
  as = "div",
  id,
}: AnimatedSectionProps) {
  const caps = useDevicePerformance();
  const motionProps = getMotionProps(caps, { delay, y });

  const Component = motion[as];

  return (
    <Component id={id} className={className} {...motionProps}>
      {children}
    </Component>
  );
}