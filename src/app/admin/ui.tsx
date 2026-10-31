import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatNumber, isExpired, percent } from "@/lib/adminData";

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#0B1B4B] sm:text-2xl">{title}</h1>
        {description ? <p className="mt-1 text-xs text-gray-500 sm:text-sm">{description}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
    </div>
  );
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className = "",
  padded = true,
}: {
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border border-gray-200/70 bg-white shadow-sm ${padded ? "p-4 sm:p-5" : ""} ${className}`}
    >
      {title ? (
        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h2 className="text-sm font-bold text-[#0B1B4B]">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-[11px] text-gray-500">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  trend,
  accent = "orange",
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  trend?: number;
  accent?: "orange" | "blue" | "green" | "violet" | "slate";
}) {
  const accents: Record<string, string> = {
    orange: "bg-brand-orange/10 text-brand-orange",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-2xl border border-gray-200/70 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-gray-400">{label}</p>
        {icon ? <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${accents[accent]}`}>{icon}</span> : null}
      </div>
      <p className="mt-2 text-2xl font-bold tracking-tight text-[#0B1B4B]">{value}</p>
      <div className="mt-1 flex items-center gap-2">
        {typeof trend === "number" ? (
          <span
            className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
              trend >= 0 ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </span>
        ) : null}
        {hint ? <span className="text-[11px] text-gray-500">{hint}</span> : null}
      </div>
    </div>
  );
}

export function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "green" | "red" | "amber" | "slate" | "blue" | "violet";
}) {
  const tones: Record<string, string> = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    red: "bg-red-50 text-red-600 ring-red-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    slate: "bg-slate-100 text-slate-600 ring-slate-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function RangeTabs({ basePath, days }: { basePath: string; days: number }) {
  const options = [
    { value: 7, label: "7 days" },
    { value: 30, label: "30 days" },
    { value: 90, label: "90 days" },
    { value: 180, label: "180 days" },
  ];
  return (
    <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`${basePath}?days=${option.value}`}
          className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
            days === option.value ? "bg-[#0B1B4B] text-white" : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}

export function BarList({
  items,
  empty = "No data yet",
  suffix,
  showPercent = true,
}: {
  items: { label: string; value: number; secondary?: string }[];
  empty?: string;
  suffix?: string;
  showPercent?: boolean;
}) {
  if (!items.length) return <EmptyState text={empty} />;
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const max = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div key={`${item.label}-${item.secondary ?? ""}`}>
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="truncate font-semibold text-[#0B1B4B]">{item.label}</span>
            <span className="shrink-0 tabular-nums text-gray-500">
              {formatNumber(item.value)}
              {suffix ? ` ${suffix}` : ""}
              {showPercent && total ? ` · ${percent(item.value, total)}%` : ""}
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-orange to-amber-400"
              style={{ width: `${Math.max(2, Math.round((item.value / max) * 100))}%` }}
            />
          </div>
          {item.secondary ? <p className="mt-0.5 text-[10px] text-gray-400">{item.secondary}</p> : null}
        </div>
      ))}
    </div>
  );
}

export function AreaChart({
  points,
  id,
  color = "#f97316",
  height = 120,
}: {
  points: { label: string; value: number }[];
  id: string;
  color?: string;
  height?: number;
}) {
  if (!points.length) return <EmptyState text="No traffic recorded yet" />;

  const width = 600;
  const max = Math.max(...points.map((point) => point.value), 1);
  const pad = 6;
  const coords = points.map((point, index) => {
    const x = points.length === 1 ? width / 2 : (index / (points.length - 1)) * width;
    const y = height - pad - (point.value / max) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M${coords.join(" L")}`;
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-28 w-full" role="img" aria-label="Trend chart">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${id})`} />
        <path
          d={line}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
        <span>{points[0]?.label}</span>
        <span>peak {formatNumber(max)}</span>
        <span>{points[points.length - 1]?.label}</span>
      </div>
    </div>
  );
}

export function BarChart({
  points,
  color = "#1e40af",
  height = 120,
}: {
  points: { label: string; value: number }[];
  color?: string;
  height?: number;
}) {
  if (!points.length) return <EmptyState text="No data yet" />;
  const max = Math.max(...points.map((point) => point.value), 1);

  return (
    <div>
      <div className="flex items-end gap-[3px]" style={{ height }}>
        {points.map((point) => (
          <div key={point.label} className="group relative flex h-full flex-1 items-end">
            <div
              className="w-full rounded-t-sm transition group-hover:opacity-80"
              style={{
                height: `${Math.max(2, (point.value / max) * 100)}%`,
                backgroundColor: color,
                opacity: point.value ? 1 : 0.15,
              }}
            />
            <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[#0B1B4B] px-1.5 py-0.5 text-[10px] font-semibold text-white group-hover:block">
              {point.label}: {formatNumber(point.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Funnel({ steps }: { steps: { step: string; count: number }[] }) {
  if (!steps.length) return <EmptyState text="No funnel data yet" />;
  const top = Math.max(steps[0]?.count || 0, 1);

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const previous = index === 0 ? step.count : steps[index - 1].count;
        const drop = index === 0 ? null : percent(step.count, previous);
        return (
          <div key={step.step}>
            <div className="flex items-baseline justify-between gap-2 text-[11px]">
              <span className="font-semibold text-[#0B1B4B]">
                {index + 1}. {step.step}
              </span>
              <span className="tabular-nums text-gray-500">
                {formatNumber(step.count)}
                {drop !== null ? <span className="ml-1 text-[10px] text-gray-400">({drop}% of prev)</span> : null}
              </span>
            </div>
            <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1e40af] to-[#60a5fa]"
                style={{ width: `${Math.max(2, Math.round((step.count / top) * 100))}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50/60 px-4 py-6 text-center text-[11px] text-gray-500">
      {text}
    </div>
  );
}

export function Pagination({
  basePath,
  page,
  pageSize,
  total,
  params = {},
}: {
  basePath: string;
  page: number;
  pageSize: number;
  total: number;
  params?: Record<string, string>;
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const buildHref = (target: number) => {
    const query = new URLSearchParams(params);
    if (target > 1) query.set("page", String(target));
    else query.delete("page");
    const serialized = query.toString();
    return serialized ? `${basePath}?${serialized}` : basePath;
  };

  if (pages <= 1) return null;

  return (
    <div className="mt-3 flex items-center justify-between gap-2 text-[11px]">
      <span className="text-gray-500">
        Page {page} of {pages} · {formatNumber(total)} records
      </span>
      <div className="flex items-center gap-1.5">
        {page > 1 ? (
          <Link href={buildHref(page - 1)} className="rounded-lg border border-gray-200 px-2.5 py-1.5 font-semibold text-gray-600 hover:border-brand-orange hover:text-brand-orange">
            Previous
          </Link>
        ) : null}
        {page < pages ? (
          <Link href={buildHref(page + 1)} className="rounded-lg border border-gray-200 px-2.5 py-1.5 font-semibold text-gray-600 hover:border-brand-orange hover:text-brand-orange">
            Next
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function StatusBadge({ status, expiresAt }: { status: string; expiresAt?: string | null }) {
  if (status === "active" && isExpired(expiresAt)) {
    return <Badge tone="amber">Expired</Badge>;
  }
  if (status === "active") return <Badge tone="green">Active</Badge>;
  if (status === "revoked") return <Badge tone="red">Revoked</Badge>;
  if (status === "refunded") return <Badge tone="violet">Refunded</Badge>;
  return <Badge>{status}</Badge>;
}
