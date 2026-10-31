import Link from "next/link";
import { Search, Users } from "lucide-react";
import {
  formatDateTime,
  formatINR,
  formatNumber,
  formatRelative,
  getStudents,
  type StudentRow,
  type StudentsData,
} from "@/lib/adminData";
import { Card, EmptyState, PageHeader, Pagination, StatCard, StatusBadge } from "../ui";

const PAGE_SIZE = 25;

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: "active", label: "Active" },
  { value: "revoked", label: "Revoked" },
  { value: "refunded", label: "Refunded" },
];

function hrefFor(params: { q?: string; status?: string; page?: number }) {
  const query = new URLSearchParams();
  if (params.q) query.set("q", params.q);
  if (params.status) query.set("status", params.status);
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const serialized = query.toString();
  return serialized ? `/admin/students?${serialized}` : "/admin/students";
}

function ProgressCell({ student }: { student: StudentRow }) {
  const completed = Number(student.completed_lessons) || 0;
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-emerald-500"
          style={{ width: `${Math.min(100, Math.round((completed / 73) * 100))}%` }}
        />
      </div>
      <span className="text-[10px] font-semibold tabular-nums text-gray-500">{completed}/73</span>
    </div>
  );
}

export default async function AdminStudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = (params.q || "").trim();
  const status = STATUS_TABS.some((tab) => tab.value === params.status) ? params.status || "" : "";
  const page = Math.max(1, Number(params.page) || 1);

  let data: StudentsData | null = null;
  let loadError = "";

  try {
    data = await getStudents({
      search,
      status,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
    console.error("Admin students failed:", loadError);
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <PageHeader title="Students" description="Every enrollment, payment and learner." />
        <Card title="Student data is not ready yet">
          <p className="text-xs leading-relaxed text-gray-600">
            Apply the analytics migration in Supabase to enable the student directory.
          </p>
          <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 font-mono text-[10px] text-red-500">{loadError}</p>
        </Card>
      </div>
    );
  }

  const rows = data.rows || [];
  const activeOnPage = rows.filter((row) => row.status === "active").length;
  const linkedOnPage = rows.filter((row) => row.user_id).length;
  const revenueOnPage = rows.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);

  return (
    <div className="space-y-4">
      <PageHeader title="Students" description="Every enrollment, payment and learner in one place.">
        <Link
          href={`/api/admin/export?type=students${search ? `&q=${encodeURIComponent(search)}` : ""}${
            status ? `&status=${encodeURIComponent(status)}` : ""
          }`}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition hover:border-brand-orange hover:text-brand-orange"
        >
          Export students CSV
        </Link>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Students"
          value={formatNumber(data.total)}
          hint={search || status ? "Matching current filter" : "All enrollments"}
          icon={<Users size={16} />}
        />
        <StatCard
          label="Active · this page"
          value={formatNumber(activeOnPage)}
          hint={`${formatNumber(rows.length)} on this page`}
          accent="green"
        />
        <StatCard
          label="Linked Google · this page"
          value={formatNumber(linkedOnPage)}
          hint={`${formatNumber(rows.length - linkedOnPage)} not linked`}
          accent="blue"
        />
        <StatCard
          label="Revenue · this page"
          value={formatINR(revenueOnPage)}
          hint="Sum of listed enrollments"
          accent="orange"
        />
      </div>

      <Card padded={false}>
        <div className="space-y-3 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
              {STATUS_TABS.map((tab) => (
                <Link
                  key={tab.value}
                  href={hrefFor({ q: search, status: tab.value })}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition ${
                    status === tab.value ? "bg-[#0B1B4B] text-white" : "text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            <form method="get" action="/admin/students" className="flex items-center gap-1.5">
              {status ? <input type="hidden" name="status" value={status} /> : null}
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  name="q"
                  defaultValue={search}
                  placeholder="Name, email, phone or order ID"
                  className="w-56 rounded-xl border border-gray-200 bg-white py-2 pl-8 pr-3 text-[11px] text-[#0B1B4B] outline-none transition focus:border-brand-orange"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#0B1B4B] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#123c9e]"
              >
                Search
              </button>
              {search || status ? (
                <Link href="/admin/students" className="text-[10px] font-semibold text-gray-500 hover:text-brand-orange">
                  Clear
                </Link>
              ) : null}
            </form>
          </div>

          {rows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-[11px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
                    <th className="pb-2 pr-3 font-bold">Student</th>
                    <th className="pb-2 pr-3 font-bold">Phone</th>
                    <th className="pb-2 pr-3 font-bold">Order</th>
                    <th className="pb-2 pr-3 font-bold">Amount</th>
                    <th className="pb-2 pr-3 font-bold">Status</th>
                    <th className="pb-2 pr-3 font-bold">Progress</th>
                    <th className="pb-2 pr-3 font-bold">Last active</th>
                    <th className="pb-2 font-bold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row) => (
                    <tr key={row.order_id} className="group hover:bg-gray-50/60">
                      <td className="py-2.5 pr-3">
                        <Link href={`/admin/students/${encodeURIComponent(row.order_id)}`} className="block max-w-[220px]">
                          <p className="truncate font-semibold text-[#0B1B4B] group-hover:text-brand-orange">
                            {row.name || "Student"}
                          </p>
                          <p className="truncate text-[10px] text-gray-400">{row.email || "No email"}</p>
                        </Link>
                      </td>
                      <td className="py-2.5 pr-3 tabular-nums text-gray-600">{row.phone}</td>
                      <td className="max-w-[160px] py-2.5 pr-3">
                        <span className="block truncate font-mono text-[10px] text-gray-500">{row.order_id}</span>
                      </td>
                      <td className="py-2.5 pr-3 font-semibold tabular-nums text-[#0B1B4B]">
                        {formatINR(row.amount)}
                      </td>
                      <td className="py-2.5 pr-3">
                        <StatusBadge status={row.status} expiresAt={row.expires_at} />
                      </td>
                      <td className="py-2.5 pr-3">
                        <ProgressCell student={row} />
                      </td>
                      <td className="py-2.5 pr-3 text-[10px] text-gray-500">
                        {row.last_active_at ? formatRelative(row.last_active_at) : row.user_id ? "No activity" : "Not signed in"}
                      </td>
                      <td className="py-2.5 text-[10px] text-gray-500">
                        <span title={formatDateTime(row.created_at)}>{formatDateTime(row.created_at)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState text={search || status ? "No students match this filter." : "No students yet. New enrollments will appear here."} />
          )}

          <Pagination
            basePath="/admin/students"
            page={page}
            pageSize={PAGE_SIZE}
            total={data.total}
            params={{ ...(search ? { q: search } : {}), ...(status ? { status } : {}) }}
          />
        </div>
      </Card>

      <p className="text-[10px] text-gray-400">
        Progress is counted from the analytics migration’s lesson progress table; 73 lessons make 100%.
      </p>
    </div>
  );
}
