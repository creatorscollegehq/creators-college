import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";
import { getAuthUser } from "@/lib/auth/session";
import { getAdminEmails } from "@/lib/admin";
import AdminShell from "./AdminShell";
import AdminLogout from "./AdminLogout";

export const metadata: Metadata = {
  title: "Admin Console | Creators College",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser();

  if (!user) {
    redirect("/learn/login?next=/admin");
  }

  const admins = getAdminEmails();
  if (!admins.includes(user.email)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F6F8] px-4">
        <div className="w-full max-w-md rounded-2xl border border-gray-200/70 bg-white p-6 shadow-sm">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <ShieldAlert size={22} />
          </span>
          <h1 className="mt-3 text-lg font-bold text-[#0B1B4B]">Admin access required</h1>
          <p className="mt-1 text-xs leading-relaxed text-gray-500">
            You are signed in as <span className="font-semibold text-[#0B1B4B]">{user.email}</span>, but this account is
            not on the admin allowlist.
          </p>
          {admins.length === 0 ? (
            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-[11px] leading-relaxed text-amber-800">
              No admin is configured yet. Add the owner email to the <code className="font-mono">ADMIN_EMAILS</code>{" "}
              environment variable (comma-separated for multiple admins), then reload this page.
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-orange-dark"
            >
              <Lock size={14} /> Go to My Course
            </Link>
            <AdminLogout label="Use another account" />
          </div>
          <p className="mt-4 text-[10px] text-gray-400">
            Need owner access? Message the Creators College team on WhatsApp and share this email address.
          </p>
        </div>
      </div>
    );
  }

  return <AdminShell email={user.email}>{children}</AdminShell>;
}
