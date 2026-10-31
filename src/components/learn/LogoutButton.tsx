"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

export default function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/access/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      router.replace("/learn/login");
      router.refresh();
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={
        compact
          ? "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-60"
          : "inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-white/15 px-4 py-2.5 text-sm font-semibold text-brand-charcoal dark:text-white transition hover:border-brand-orange hover:text-brand-orange disabled:opacity-60"
      }
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
