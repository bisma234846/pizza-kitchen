"use client";

import { useState, useEffect } from "react";

export interface KitchenTimerInfo {
  elapsedMinutes: number;
  elapsedSeconds: number;
  formattedTime: string;
  urgency: "normal" | "warning" | "critical"; // normal: <10m, warning: 10-20m, critical: >20m
}

export function useKitchenTimer(createdAtISO: string): KitchenTimerInfo {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const createdTime = new Date(createdAtISO).getTime();
  const diffMs = Math.max(0, now - createdTime);
  const totalSeconds = Math.floor(diffMs / 1000);
  const elapsedMinutes = Math.floor(totalSeconds / 60);
  const elapsedSeconds = totalSeconds % 60;

  const formattedMinutes = String(elapsedMinutes).padStart(2, "0");
  const formattedSecondsStr = String(elapsedSeconds).padStart(2, "0");
  const formattedTime = `${formattedMinutes}:${formattedSecondsStr}`;

  let urgency: "normal" | "warning" | "critical" = "normal";
  if (elapsedMinutes >= 20) {
    urgency = "critical";
  } else if (elapsedMinutes >= 10) {
    urgency = "warning";
  }

  return {
    elapsedMinutes,
    elapsedSeconds,
    formattedTime,
    urgency,
  };
}
