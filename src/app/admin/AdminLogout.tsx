"use client";

import { useState } from "react";
import { Loader2, LogOut } from "lucide-react";

export default function AdminLogout({ label = "Sign out" }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    try {
      await fetch("/api/access/logout", { method: "POST" });
    } catch {
      // clear anyway
    }
    window.location.href = "/";
  };

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-600 transition hover:border-brand-orange hover:text-brand-orange disabled:opacity-60"
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
      {loading ? "Signing out..." : label}
    </button>
  );
}
