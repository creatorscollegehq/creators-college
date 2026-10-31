"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ban, CalendarPlus, Loader2, RotateCcw, Unlink } from "lucide-react";

type Action = "revoke" | "restore" | "extend" | "unlink";

export default function StudentActions({
  orderId,
  status,
  linked,
}: {
  orderId: string;
  status: string;
  linked: boolean;
}) {
  const router = useRouter();
  const [pending, setPending] = useState<Action | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const run = async (action: Action) => {
    if (
      action === "revoke" &&
      !window.confirm("Revoke access for this student? They will lose access to the course immediately.")
    ) {
      return;
    }
    if (
      action === "unlink" &&
      !window.confirm("Unlink the Google account? The payment stays active and the student can claim again with their order ID.")
    ) {
      return;
    }

    setPending(action);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, action }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) {
        setError(data?.error || "Action failed. Please try again.");
        return;
      }
      setMessage(data?.message || "Updated.");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPending(null);
    }
  };

  const buttonClass =
    "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[11px] font-bold transition disabled:opacity-50";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-2">
        {status === "active" ? (
          <button
            type="button"
            onClick={() => run("revoke")}
            disabled={pending !== null}
            className={`${buttonClass} border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100`}
          >
            {pending === "revoke" ? <Loader2 size={13} className="animate-spin" /> : <Ban size={13} />}
            Revoke access
          </button>
        ) : (
          <button
            type="button"
            onClick={() => run("restore")}
            disabled={pending !== null}
            className={`${buttonClass} border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100`}
          >
            {pending === "restore" ? <Loader2 size={13} className="animate-spin" /> : <RotateCcw size={13} />}
            Restore access
          </button>
        )}

        <button
          type="button"
          onClick={() => run("extend")}
          disabled={pending !== null}
          className={`${buttonClass} border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100`}
        >
          {pending === "extend" ? <Loader2 size={13} className="animate-spin" /> : <CalendarPlus size={13} />}
          Extend 30 days
        </button>

        {linked ? (
          <button
            type="button"
            onClick={() => run("unlink")}
            disabled={pending !== null}
            className={`${buttonClass} border-gray-200 bg-white text-gray-600 hover:border-brand-orange hover:text-brand-orange`}
          >
            {pending === "unlink" ? <Loader2 size={13} className="animate-spin" /> : <Unlink size={13} />}
            Unlink Google
          </button>
        ) : null}
      </div>

      {message ? <p className="text-[11px] font-semibold text-emerald-600">{message}</p> : null}
      {error ? <p className="text-[11px] font-semibold text-red-500">{error}</p> : null}
    </div>
  );
}
