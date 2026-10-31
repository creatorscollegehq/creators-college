"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Activity,
  BookOpenCheck,
  ExternalLink,
  LayoutDashboard,
  LineChart,
  Loader2,
  LogOut,
  ShieldCheck,
  Users,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/traffic", label: "Traffic", icon: LineChart },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/lessons", label: "Lessons", icon: BookOpenCheck },
  { href: "/admin/events", label: "Event feed", icon: Activity },
];

export default function AdminShell({ email, children }: { email: string; children: ReactNode }) {
  const pathname = usePathname();
  const [signingOut, setSigningOut] = useState(false);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/access/logout", { method: "POST" });
    } catch {
      // ignore and clear anyway
    }
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#F3F6F8] lg:flex">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-white/10 bg-[#0B1B4B] lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-orange">
            <ShieldCheck size={18} />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight text-white">Creators College</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">Admin console</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${
                  active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} className={active ? "text-brand-orange" : ""} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-white/10 px-3 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold text-white/60 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={14} /> View live site
          </Link>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="truncate text-[10px] text-white/50">Signed in as</p>
            <p className="truncate text-[11px] font-semibold text-white">{email}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            disabled={signingOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold text-white/60 transition hover:bg-white/5 hover:text-white disabled:opacity-60"
          >
            {signingOut ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-gray-200/70 bg-[#F3F6F8]/95 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B1B4B] text-brand-orange">
                <ShieldCheck size={16} />
              </span>
              <div>
                <p className="text-xs font-bold leading-tight text-[#0B1B4B]">Admin console</p>
                <p className="truncate text-[10px] text-gray-500">{email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={signOut}
              disabled={signingOut}
              className="rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-gray-600 disabled:opacity-60"
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-3 pb-2.5">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold ${
                    active ? "bg-[#0B1B4B] text-white" : "bg-white text-gray-500"
                  }`}
                >
                  <Icon size={12} className={active ? "text-brand-orange" : ""} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-5 sm:px-6 lg:py-7">{children}</main>
      </div>
    </div>
  );
}
