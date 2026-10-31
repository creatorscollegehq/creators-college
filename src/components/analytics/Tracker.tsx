"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track } from "@/lib/track";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => track("page_view", { title: document.title }), 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
