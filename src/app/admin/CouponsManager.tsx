"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Database, ExternalLink, Loader2, Plus, Save, Trash2, X } from "lucide-react";
import { clampPercentOff, type Coupon } from "@/lib/coupons";
import { COUPON_SETUP_SQL } from "@/lib/couponSetupSql";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-gray-500">{label}</span>
      {children}
      <span className="mt-1.5 block text-[10px] font-medium leading-relaxed text-gray-400">{hint}</span>
    </label>
  );
}

function emptyDraft() {
  return {
    title: "",
    code: "",
    percentOff: 100,
    maxUses: 0,
    startsAt: "",
    expiresAt: "",
    active: true,
  };
}

function toLocalInput(value: string | null) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toISOString().slice(0, 16);
}

export default function CouponsManager({
  initialCoupons,
  error,
  setupMissing = false,
  sqlEditorUrl,
}: {
  initialCoupons: Coupon[];
  error?: string | null;
  setupMissing?: boolean;
  sqlEditorUrl?: string | null;
}) {
  const router = useRouter();
  const [draft, setDraft] = useState(emptyDraft());
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const handleField = (key: keyof typeof draft, value: string | boolean) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setFormError("");

    try {
      const response = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        setFormError(data?.error || "Failed to save coupon.");
        return;
      }
      setDraft(emptyDraft());
      setEditingCode(null);
      setMessage(editingCode ? "Coupon updated." : "Coupon saved.");
      router.refresh();
    } catch (caught) {
      console.error("Coupon save failed:", caught);
      setFormError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (coupon: Coupon) => {
    setMessage("");
    setFormError("");
    setEditingCode(coupon.code);
    setDraft({
      title: coupon.title || "",
      code: coupon.code,
      percentOff: coupon.percentOff,
      maxUses: coupon.maxUses,
      startsAt: toLocalInput(coupon.startsAt),
      expiresAt: toLocalInput(coupon.expiresAt),
      active: coupon.active,
    });
  };

  const handleCancel = () => {
    setDraft(emptyDraft());
    setEditingCode(null);
    setFormError("");
  };

  const handleDelete = async (coupon: Coupon) => {
    if (!window.confirm(`Delete coupon ${coupon.code}?`)) return;
    setBusy(true);
    setFormError("");
    try {
      const response = await fetch("/api/admin/coupons", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon.code }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.ok) {
        setFormError(data?.error || "Failed to delete coupon.");
        return;
      }
      if (editingCode === coupon.code) handleCancel();
      setMessage("Coupon deleted.");
      router.refresh();
    } catch (caught) {
      console.error("Coupon delete failed:", caught);
      setFormError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-brand-blue outline-none transition focus:border-brand-orange";

  return (
    <div className="space-y-4">
      {setupMissing ? <SetupCard sqlEditorUrl={sqlEditorUrl ?? null} /> : null}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B1B4B]">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange/10 text-brand-orange">
                <Plus size={15} />
              </span>
              Coupon codes
            </h2>
            <p className="mt-1 text-[11px] text-gray-500">
              Create 100% off coupons like CECILSSPECIAL, or smaller holidays/share offers.
            </p>
          </div>
          {message ? (
            <p className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-600">
              {message}
            </p>
          ) : null}
        </div>

        {error ? (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-500">{error}</p>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          <Field
            label="Coupon code"
            hint="Students type this code at checkout. Use capital letters without spaces, e.g. CECILSSPECIAL."
          >
            <input
              type="text"
              required
              value={draft.code}
              onChange={(event) => handleField("code", event.target.value.toUpperCase())}
              placeholder="CECILSSPECIAL"
              className={inputClass}
            />
          </Field>
          <Field label="Friendly name (optional)" hint="Only for you in this admin panel, so you remember what the coupon is for.">
            <input
              type="text"
              value={draft.title}
              onChange={(event) => handleField("title", event.target.value)}
              placeholder="e.g. Cecil special free access"
              className={inputClass}
            />
          </Field>
          <Field label="Discount percent" hint="100 = full course free, 50 = half price. Any value between 1 and 100.">
            <input
              type="number"
              min={0}
              max={100}
              required
              value={draft.percentOff}
              onChange={(event) => handleField("percentOff", String(clampPercentOff(event.target.value)))}
              placeholder="100"
              className={inputClass}
            />
          </Field>
          <Field label="How many times it can be used" hint="Keep 0 for unlimited uses. Set 20 to stop the coupon after 20 students redeem it.">
            <input
              type="number"
              min={0}
              required
              value={draft.maxUses}
              onChange={(event) =>
                handleField("maxUses", String(Math.max(0, Math.ceil(Number(event.target.value) || 0))))
              }
              placeholder="0 = unlimited"
              className={inputClass}
            />
          </Field>
          <Field label="Starts at (optional)" hint="Leave empty to start working immediately. Time is in your local timezone.">
            <input
              type="datetime-local"
              value={draft.startsAt}
              onChange={(event) => handleField("startsAt", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Expires at (optional)" hint="Leave empty for no expiry. After this time the code stops working by itself.">
            <input
              type="datetime-local"
              value={draft.expiresAt}
              onChange={(event) => handleField("expiresAt", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Show this coupon on checkout" hint="Un-tick to switch the coupon off without deleting it. It can be re-enabled any time.">
            <span className="flex h-12 items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={draft.active}
                onChange={(event) => handleField("active", event.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-brand-orange"
              />
              {draft.active ? "Active" : "Hidden"}
            </span>
          </Field>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={busy}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 text-xs font-bold text-white shadow-md transition hover:bg-brand-orange-dark disabled:opacity-60"
            >
              {busy ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              {editingCode ? "Save changes" : "Add coupon"}
            </button>
            {editingCode ? (
              <button
                type="button"
                onClick={handleCancel}
                className="flex h-12 items-center gap-1.5 rounded-xl border border-gray-100 px-4 text-xs font-bold text-gray-500 transition hover:bg-gray-50"
              >
                <X size={14} /> Cancel
              </button>
            ) : null}
          </div>
        </form>
        {formError ? <p className="mt-3 text-xs font-semibold text-red-500">{formError}</p> : null}
      </div>

      {initialCoupons.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center text-sm text-gray-500">
          No coupons yet. CECILSSPECIAL is ready as soon as you save one.
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {initialCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className={editingCode === coupon.code ? "ring-2 ring-brand-orange" : ""}
            >
              <CouponRow coupon={coupon} onEdit={handleEdit} onDelete={handleDelete} disabled={busy} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SetupCard({ sqlEditorUrl }: { sqlEditorUrl: string | null }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_SETUP_SQL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-5">
      <h2 className="flex items-center gap-2 text-sm font-bold text-[#0B1B4B]">
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600">
          <Database size={15} />
        </span>
        One-time setup: create the coupon tables
      </h2>
      <p className="mt-1.5 text-xs leading-relaxed text-amber-900/80">
        Coupons cannot be saved or redeemed until this SQL runs once in Supabase. Copy it, paste it in the
        Supabase SQL Editor and press Run. It is safe to run again later — it never deletes existing coupons.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void copy()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B1B4B] px-4 py-2.5 text-[11px] font-bold text-white transition hover:bg-[#123c9e]"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied — now paste it in Supabase" : "Copy setup SQL"}
        </button>
        {sqlEditorUrl ? (
          <a
            href={sqlEditorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-4 py-2.5 text-[11px] font-bold text-[#0B1B4B] transition hover:border-amber-400"
          >
            <ExternalLink size={13} /> Open Supabase SQL Editor
          </a>
        ) : null}
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-[11px] font-bold text-amber-900/70">
          View the SQL before running it
        </summary>
        <pre className="mt-2 max-h-64 overflow-auto rounded-xl bg-[#0B1B4B] p-3 text-[10px] leading-relaxed text-white/90">
          {COUPON_SETUP_SQL}
        </pre>
      </details>
    </div>
  );
}

function CouponRow({
  coupon,
  onEdit,
  onDelete,
  disabled,
}: {
  coupon: Coupon;
  onEdit: (coupon: Coupon) => void;
  onDelete: (coupon: Coupon) => void;
  disabled: boolean;
}) {
  const percentOff = clampPercentOff(coupon.percentOff);
  const price = Math.max(0, Math.ceil(5000 * (1 - percentOff / 100)));
  const usage = coupon.maxUses > 0 ? `${coupon.usedCount}/${coupon.maxUses} uses` : `${coupon.usedCount} uses`;

  return (
    <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-brand-orange/50">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm font-bold text-[#0B1B4B]">{coupon.code}</p>
          {coupon.title ? <p className="text-[11px] text-gray-500">{coupon.title}</p> : null}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onEdit(coupon)}
            disabled={disabled}
            className="rounded-lg border border-gray-100 bg-gray-50 px-2.5 py-1 text-[10px] font-bold text-gray-600 transition hover:bg-gray-100 disabled:opacity-60"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(coupon)}
            disabled={disabled}
            className="rounded-lg border border-red-100 bg-red-50 p-1.5 text-red-500 transition hover:bg-red-100 disabled:opacity-60"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-[10px] font-bold">
        <span className="rounded-md bg-[#0B1B4B] px-2 py-1 text-white">{percentOff}% off</span>
        <span
          className={
            coupon.active
              ? "rounded-md bg-emerald-50 px-2 py-1 text-emerald-600"
              : "rounded-md bg-gray-100 px-2 py-1 text-gray-500"
          }
        >
          {coupon.active ? "Active" : "Hidden"}
        </span>
        <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-600">{usage}</span>
      </div>
      <div className="rounded-xl bg-gray-50 px-3 py-2 text-[11px] leading-relaxed text-gray-600">
        {price <= 0 ? (
          <p className="font-bold text-emerald-600">Entire course is free on this coupon.</p>
        ) : (
          <p>
            Final checkout price: <span className="font-bold text-[#0B1B4B]">₹{price.toLocaleString("en-IN")}</span>
          </p>
        )}
        <p className="mt-1">
          {coupon.startsAt ? `Starts ${new Date(coupon.startsAt).toLocaleString("en-IN")}` : "Starts now"}
          {" · "}
          {coupon.expiresAt ? `Ends ${new Date(coupon.expiresAt).toLocaleString("en-IN")}` : "No expiry"}
        </p>
      </div>
    </div>
  );
}
