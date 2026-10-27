"use client";

import { useEffect } from "react";

export default function HomeAnalytics() {
  useEffect(() => {
    const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
    fbq?.("track", "ViewContent", {
      content_name: "Complete Telugu Content Creation Course",
      content_category: "Course",
      value: 5000,
      currency: "INR",
    });
  }, []);

  return null;
}
