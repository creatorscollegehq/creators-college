import Link from "next/link";
import { Globe2, MousePointerClick, Navigation, Share2 } from "lucide-react";
import {
  clampDays,
  formatNumber,
  getOverview,
  getTraffic,
  type OverviewData,
  type TrafficData,
} from "@/lib/adminData";
import { AreaChart, BarChart, BarList, Card, EmptyState, PageHeader, RangeTabs, StatCard } from "../ui";

function shortDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
}

export default async function AdminTrafficPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  const { days: daysParam } = await searchParams;
  const days = clampDays(daysParam);

  let traffic: TrafficData | null = null;
  let overview: OverviewData | null = null;
  let loadError = "";

  try {
    [traffic, overview] = await Promise.all([getTraffic(days), getOverview(days)]);
  } catch (error) {
    loadError = error instanceof Error ? error.message : "Unknown error";
    console.error("Admin traffic failed:", loadError);
  }

  if (!traffic || !overview) {
    return (
      <div className="space-y-4">
        <PageHeader title="Traffic" description="Audience analytics.">
          <RangeTabs basePath="/admin/traffic" days={days} />
        </PageHeader>
        <Card title="Traffic analytics is not ready yet">
          <p className="text-xs leading-relaxed text-gray-600">
            Apply the analytics migration in Supabase to enable traffic breakdowns.
          </p>
          <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 font-mono text-[10px] text-red-500">{loadError}</p>
        </Card>
      </div>
    );
  }

  const daily = Array.isArray(overview.daily) ? overview.daily : [];
  const hourlyMap = new Map((traffic.hourly || []).map((row) => [Number(row.hour), Number(row.events)]));
  const hourly = Array.from({ length: 24 }, (_, hour) => ({
    label: `${hour}:00`,
    value: hourlyMap.get(hour) || 0,
  }));

  const totalPathViews = (traffic.paths || []).reduce((sum, row) => sum + Number(row.views || 0), 0);

  return (
      <div className="space-y-4">
        <PageHeader
          title="Traffic"
          description={`Audience sources, geography, devices and behaviour for the last ${days} days.`}
        >
          <Link
            href="/api/admin/export?type=events&limit=5000"
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-[11px] font-bold text-gray-600 shadow-sm transition hover:border-brand-orange hover:text-brand-orange"
          >
            Export events CSV
          </Link>
          <RangeTabs basePath="/admin/traffic" days={days} />
        </PageHeader>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatCard
            label="Page views"
            value={formatNumber(overview.page_views)}
            hint={`${formatNumber(overview.unique_visitors)} unique sessions`}
            icon={<MousePointerClick size={16} />}
          />
          <StatCard
            label="Top page"
            value={traffic.paths?.[0]?.path || "—"}
            hint={traffic.paths?.[0] ? `${formatNumber(traffic.paths[0].views)} views` : "No views yet"}
            icon={<Navigation size={16} />}
            accent="blue"
          />
          <StatCard
            label="Top source"
            value={traffic.referrers?.[0]?.source || "—"}
            hint={traffic.referrers?.[0] ? `${formatNumber(traffic.referrers[0].visits)} visits` : "No referrers yet"}
            icon={<Share2 size={16} />}
            accent="violet"
          />
          <StatCard
            label="Top country"
            value={traffic.countries?.[0]?.country || "—"}
            hint={traffic.cities?.[0]?.city ? `Top city: ${traffic.cities[0].city}` : "Geo data needs Vercel edge headers"}
            icon={<Globe2 size={16} />}
            accent="green"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_1fr]">
          <Card title="Traffic trend" subtitle="Page views per day">
            <AreaChart
              id="admin-traffic-trend"
              points={daily.map((day) => ({ label: shortDate(day.date), value: Number(day.page_views) || 0 }))}
              color="#1e40af"
            />
          </Card>
          <Card title="Busiest hours" subtitle="All tracked events by hour (last 7 days, server time)">
            <BarChart points={hourly} color="#7c3aed" />
            <div className="mt-1 flex items-center justify-between text-[10px] text-gray-400">
              <span>00:00</span>
              <span>12:00</span>
              <span>23:00</span>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Referrer sources" subtitle="Where visitors arrive from">
            <BarList
              items={(traffic.referrers || []).map((row) => ({ label: row.source, value: Number(row.visits) || 0 }))}
              empty="No referrer data yet"
              suffix="visits"
            />
          </Card>
          <Card title="Devices" subtitle="Mobile vs desktop vs tablet">
            <BarList
              items={(traffic.devices || []).map((row) => ({ label: row.device, value: Number(row.visits) || 0 }))}
              empty="No device data yet"
              suffix="views"
            />
          </Card>
          <Card title="Browsers" subtitle="In-app browsers matter for ad traffic">
            <BarList
              items={(traffic.browsers || []).map((row) => ({ label: row.browser, value: Number(row.visits) || 0 }))}
              empty="No browser data yet"
              suffix="views"
            />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Countries" subtitle="Page views by country">
            <BarList
              items={(traffic.countries || []).map((row) => ({ label: row.country, value: Number(row.visits) || 0 }))}
              empty="No geo data yet"
              suffix="views"
            />
          </Card>
          <Card title="Cities" subtitle="Page views by city">
            <BarList
              items={(traffic.cities || []).map((row) => ({ label: row.city, value: Number(row.visits) || 0 }))}
              empty="No city data yet"
              suffix="views"
            />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Card title="Top pages" subtitle={`${formatNumber(totalPathViews)} page views across listed pages`}>
            {traffic.paths?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="border-b border-gray-100 text-[10px] uppercase tracking-wider text-gray-400">
                      <th className="pb-2 font-bold">Page</th>
                      <th className="pb-2 text-right font-bold">Views</th>
                      <th className="pb-2 text-right font-bold">Sessions</th>
                      <th className="pb-2 text-right font-bold">Views / session</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {traffic.paths.map((row) => (
                      <tr key={row.path} className="hover:bg-gray-50/60">
                        <td className="max-w-[280px] truncate py-2 font-semibold text-[#0B1B4B]">{row.path}</td>
                        <td className="py-2 text-right tabular-nums text-gray-600">{formatNumber(row.views)}</td>
                        <td className="py-2 text-right tabular-nums text-gray-600">{formatNumber(row.sessions)}</td>
                        <td className="py-2 text-right tabular-nums text-gray-500">
                          {row.sessions ? (Number(row.views) / Number(row.sessions)).toFixed(1) : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState text="No page views recorded yet" />
            )}
          </Card>

          <Card title="UTM campaigns" subtitle="Traffic attributed to campaign links">
            {traffic.utm?.length ? (
              <div className="space-y-2">
                {traffic.utm.map((row) => (
                  <div key={`${row.source}-${row.medium}`} className="rounded-xl border border-gray-100 px-3 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[11px] font-semibold text-[#0B1B4B]">{row.source}</p>
                      <span className="shrink-0 text-[10px] font-bold tabular-nums text-gray-500">
                        {formatNumber(row.visits)} visits
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400">medium: {row.medium}</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="No UTM parameters found yet. Tag campaign links with ?utm_source=instagram&utm_medium=story." />
            )}
          </Card>
        </div>
      </div>
    );
}
