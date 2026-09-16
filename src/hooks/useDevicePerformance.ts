"use client";

import { useState, useEffect } from "react";
import type { DeviceCapabilities, DeviceTier } from "@/types";

/**
 * Detects device capabilities and returns animation flags.
 * - low: minimal animations (fade only)
 * - medium: light animations
 * - high: full experience (parallax, scale, stagger)
 */
function detectCapabilities(): DeviceCapabilities {
  if (typeof window === "undefined") {
    return {
      tier: "medium",
      prefersReducedMotion: false,
      isMobile: false,
      hasSlowConnection: false,
      deviceMemory: null,
      hardwareCores: null,
      enableHeavyAnimations: true,
      enableParallax: false,
      enableVideo: false,
    };
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isMobile =
    window.matchMedia("(max-width: 768px)").matches ||
    /Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Network Information API (optional)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const effectiveType: string = conn?.effectiveType || "4g";
  const hasSlowConnection =
    effectiveType === "slow-2g" ||
    effectiveType === "2g" ||
    effectiveType === "3g" ||
    conn?.saveData === true;

  // Device Memory API (Chrome)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deviceMemory: number | null = (navigator as any).deviceMemory ?? null;
  const hardwareCores: number | null = navigator.hardwareConcurrency ?? null;

  // Score-based tier detection
  let score = 50;
  if (prefersReducedMotion) score -= 40;
  if (isMobile) score -= 10;
  if (hasSlowConnection) score -= 25;
  if (deviceMemory !== null) {
    if (deviceMemory <= 2) score -= 20;
    else if (deviceMemory <= 4) score -= 5;
    else if (deviceMemory >= 8) score += 15;
  }
  if (hardwareCores !== null) {
    if (hardwareCores <= 2) score -= 15;
    else if (hardwareCores <= 4) score -= 5;
    else if (hardwareCores >= 8) score += 10;
  }

  let tier: DeviceTier = "medium";
  if (score < 30) tier = "low";
  else if (score >= 60) tier = "high";

  const enableHeavyAnimations = !prefersReducedMotion && tier !== "low";
  const enableParallax = !prefersReducedMotion && tier === "high" && !isMobile;
  const enableVideo = !hasSlowConnection && tier === "high";

  return {
    tier,
    prefersReducedMotion,
    isMobile,
    hasSlowConnection,
    deviceMemory,
    hardwareCores,
    enableHeavyAnimations,
    enableParallax,
    enableVideo,
  };
}

export function useDevicePerformance(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>(() => detectCapabilities());

  useEffect(() => {
    setCaps(detectCapabilities());

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setCaps(detectCapabilities());
    mq.addEventListener?.("change", onChange);

    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return caps;
}

/** Animation presets based on device tier */
export function getMotionProps(
  caps: DeviceCapabilities,
  options?: {
    delay?: number;
    y?: number;
    duration?: number;
  }
) {
  const delay = options?.delay ?? 0;
  const y = options?.y ?? 24;
  const duration = options?.duration ?? 0.5;

  if (caps.prefersReducedMotion || caps.tier === "low") {
    return {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
      viewport: { once: true, margin: "-40px" },
      transition: { duration: 0.3, delay },
    };
  }

  if (caps.tier === "medium") {
    return {
      initial: { opacity: 0, y: y / 2 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-60px" },
      transition: { duration: duration * 0.8, delay, ease: "easeOut" as const },
    };
  }

  // high
  return {
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  };
}