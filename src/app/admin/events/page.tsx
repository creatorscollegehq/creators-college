import Link from "next/link";
import { Activity, RefreshCw, Search } from "lucide-react";
import { TRACKED_EVENTS } from "@/lib/analytics";
import {
  formatDateTime,
  formatNumber,
  formatRelative,
  getEvents,
  type EventsData,
} from "@/lib/adminData";
import { Card, EmptyState, PageHeader, Pagination } from "../ui";

const PAGE_SIZE = 50;
const EVENT_OPTIONS = Array.from(TRACKED_EVENTS).sort();

export default async function AdminEventsPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string; q?: string; page?: string }>;
}) {
  const params = await searchParams;
  const event = params.event && TRACKED_EVENTS.has(params.event) ? params.event : "";
  const search = (params.q || "").trim();
  const page = Math.max(1, Number(params.page) || 1);

  let data: EventsData | null = null;
  let loadError = "";

  try {
    data = await getEvents({
      event,
      search,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
    console.error("Admin events failed:", loadError);
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <PageHeader title="Event feed" description="Raw analytics events from the site." />
        <Card title="Event data is not ready yet">
          <p className="text-xs leading-relaxed text-gray-600">
            Apply the analytics migration in Supabase to start collecting events.
          </p>
          <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 font-mono text-[10px] text-red-500">{loadError}</p>
        </Card>
      </div>
    );
  }

  const rows = data.rows || [];
  const exportQuery = new URLSearchParams({ type: "events", limit: "5000" });
  if (event) exportQuery.set("event", event);
  if (search) exportQuery.set("q", search);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Event feed"
        description={`${formatNumber(data.total)} matching events · live tracking from the website.`}
      >
        <Link
          href={`/api/admin/export?${exportQuery.toString()}`}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition hover:border-brand-orange hover:text-brand-orange"
        >
          Export CSV
        </Link>
        <Link
          href={event || search ? `/admin/events${event ? `?event=${event}` : ""}` : "/admin/events"}
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition hover:border-brand-orange hover:text-brand-orange"
        >
          <RefreshCw size={12} /> Refresh
        </Link>
      </PageHeader>

      <Card>
        <form method="get" action="/admin/events" className="flex flex-wrap items-end gap-2">
          <div className="space-y-1">
            <label htmlFor="event" className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Event
            </label>
            <select
              id="event"
              name="event"
              defaultValue={event}
              className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-semibold text-[#0B1B4B] outline-none focus:border-brand-orange"
            >
              <option value="">All events</option>
              {EVENT_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label htmlFor="q" className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Search
            </label>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="q"
                type="search"
                name="q"
                defaultValue={search}
                placeholder="Email, path or session ID"
                className="w-64 rounded-xl border border-gray-200 bg-white py-2 pl-8 pr-3 text-[11px] text-[#0B1B4B] outline-none focus:border-brand-orange"
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#0B1B4B] px-3 py-2 text-[11px] font-bold text-white transition hover:bg-[#123c9e]"
          >
            Apply filters
          </button>
          {event || search ? (
            <Link href="/admin/events" className="text-[10px] font-semibold text-gray-500 hover:text-brand-orange">
              Clear
            </Link>
          ) : null}
        </form>
      </Card>

      <Card padded={false}>
        <div className="p-4 sm:p-5">
          {rows.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] text-left text-[11px]">
                <thead>
                  <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
                    <th className="pb-2 pr-3 font-bold">Time</th>
                    <th className="pb-2 pr-3 font-bold">Event</th>
                    <th className="pb-2 pr-3 font-bold">Who</th>
                    <th className="pb-2 pr-3 font-bold">Path</th>
                    <th className="pb-2 pr-3 font-bold">Device</th>
                    <th className="pb-2 pr-3 font-bold">Location</th>
                    <th className="pb-2 pr-3 text-right font-bold">Value</th>
                    <th className="pb-2 font-bold">Metadata</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50/60">
                      <td className="whitespace-nowrap py-2 pr-3 text-[10px] text-gray-500" title={formatDateTime(row.created_at)}>
                        {formatRelative(row.created_at)}
                      </td>
                      <td className="py-2 pr-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange/10 px-2 py-0.5 text-[10px] font-bold text-brand-orange">
                          <Activity size={10} />
                          {row.event_name}
                        </span>
                      </td>
                      <td className="max-w-[180px] py-2 pr-3">
                        <p className="truncate font-semibold text-[#0B1B4B]">{row.email || "Anonymous"}</p>
                        <p className="truncate font-mono text-[9px] text-gray-400">
                          {row.session_id ? `${row.session_id.slice(0, 8)}…` : "no session"}
                        </p>
                      </td>
                      <td className="max-w-[180px] py-2 pr-3">
                        <span className="block truncate text-gray-600">{row.path || "—"}</span>
                        {row.referrer_host ? (
                          <span className="block truncate text-[9px] text-gray-400">from {row.referrer_host}</span>
                        ) : null}
                      </td>
                      <td className="max-w-[140px] py-2 pr-3 text-[10px] text-gray-500">
                        <span className="block truncate">
                          {[row.device_type, row.browser, row.os].filter(Boolean).join(" · ") || "—"}
                        </span>
                      </td>
                      <td className="max-w-[140px] py-2 pr-3 text-[10px] text-gray-500">
                        <span className="block truncate">
                          {[row.city, row.country].filter(Boolean).join(", ") || "—"}
                        </span>
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums text-gray-600">
                        {row.value ? Number(row.value).toLocaleString("en-IN") : "—"}
                      </td>
                      <td className="max-w-[200px] py-2">
                        <span
                          className="block truncate font-mono text-[9px] text-gray-400"
                          title={row.metadata ? JSON.stringify(row.metadata) : ""}
                        >
                          {row.metadata && Object.keys(row.metadata).length ? JSON.stringify(row.metadata) : "—"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState text="No events match this filter yet." />
          )}

          <Pagination
            basePath="/admin/events"
            page={page}
            pageSize={PAGE_SIZE}
            total={data.total}
            params={{ ...(event ? { event } : {}), ...(search ? { q: search } : {}) }}
          />
        </div>
      </Card>
    </div>
  );
}
