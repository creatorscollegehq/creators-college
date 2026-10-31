import { NextResponse } from "next/server";
import { getAdminUser } from "@/lib/admin";
import { courseLessons } from "@/lib/courseContent";
import { clampDays, getLessons, getOverview, getStudents, type StudentRow } from "@/lib/adminData";
import { getSupabaseAdmin } from "@/lib/supabase";

function csvCell(value: unknown) {
  if (value === null || value === undefined) return '""';
  const text = typeof value === "object" ? JSON.stringify(value) : String(value);
  return `"${text.replace(/"/g, '""')}"`;
}

function toCsv(headers: string[], rows: unknown[][]) {
  return `\ufeff${[headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n")}`;
}

function csvResponse(filename: string, content: string) {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

async function collectStudents(search: string, status: string, limit: number) {
  const rows: StudentRow[] = [];
  let offset = 0;

  while (rows.length < limit) {
    const page = await getStudents({ search, status, limit: 100, offset });
    const pageRows = page.rows || [];
    rows.push(...pageRows);
    if (!pageRows.length || rows.length >= Number(page.total)) break;
    offset += 100;
  }

  return rows.slice(0, limit);
}

export async function GET(request: Request) {
  const admin = await getAdminUser();
  if (!admin) {
    return NextResponse.json({ ok: false, error: "Admin access required." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "students";
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 5000, 1), 20000);
  const search = (searchParams.get("q") || "").trim();
  const status = (searchParams.get("status") || "").trim();
  const event = (searchParams.get("event") || "").trim();
  const date = new Date().toISOString().slice(0, 10);

  if (type === "students") {
    const rows = await collectStudents(search, status, limit);
    const csv = toCsv(
      [
        "Order ID",
        "Name",
        "Email",
        "Phone",
        "Status",
        "Amount",
        "Currency",
        "Provider",
        "Course",
        "Google linked",
        "Claimed at",
        "Created at",
        "Expires at",
        "Completed lessons",
        "Last lesson at",
        "Last active at",
      ],
      rows.map((row) => [
        row.order_id,
        row.name,
        row.email,
        row.phone,
        row.status,
        row.amount,
        row.currency,
        row.provider,
        row.course_slug,
        row.user_id ? "yes" : "no",
        row.claimed_at,
        row.created_at,
        row.expires_at,
        row.completed_lessons,
        row.last_lesson_at,
        row.last_active_at,
      ])
    );
    return csvResponse(`creators-college-students-${date}.csv`, csv);
  }

  if (type === "events") {
    const safeSearch = search.replace(/[(),]/g, " ").trim();
    let query = getSupabaseAdmin()
      .from("analytics_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (event) query = query.eq("event_name", event);
    if (safeSearch) {
      query = query.or(
        `email.ilike.%${safeSearch}%,path.ilike.%${safeSearch}%,session_id.ilike.%${safeSearch}%`
      );
    }

    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    const rows = (data || []) as Record<string, unknown>[];
    const csv = toCsv(
      [
        "Created at",
        "Event",
        "Email",
        "User ID",
        "Session",
        "Path",
        "Referrer",
        "Referrer host",
        "UTM source",
        "UTM medium",
        "UTM campaign",
        "Device",
        "Browser",
        "OS",
        "Country",
        "Region",
        "City",
        "Value",
        "Duration seconds",
        "Metadata",
      ],
      rows.map((row) => [
        row.created_at,
        row.event_name,
        row.email,
        row.user_id,
        row.session_id,
        row.path,
        row.referrer,
        row.referrer_host,
        row.utm_source,
        row.utm_medium,
        row.utm_campaign,
        row.device_type,
        row.browser,
        row.os,
        row.country,
        row.region,
        row.city,
        row.value,
        row.duration_seconds,
        row.metadata,
      ])
    );
    return csvResponse(`creators-college-events-${date}.csv`, csv);
  }

  if (type === "lessons") {
    const data = await getLessons();
    const titleById = new Map(courseLessons.map((lesson) => [lesson.id, lesson.title]));
    const csv = toCsv(
      ["Module", "Lesson", "Lesson ID", "Title", "Viewers", "Completions", "Completion %", "Avg watched (s)", "Last viewed at"],
      (data.lessons || []).map((lesson) => {
        const viewers = Number(lesson.viewers) || 0;
        return [
          lesson.module_number,
          Number(lesson.lesson_index) + 1,
          lesson.lesson_id,
          titleById.get(lesson.lesson_id) || "",
          viewers,
          lesson.completions,
          viewers ? Math.round((Number(lesson.completions) / viewers) * 100) : 0,
          lesson.avg_seconds,
          lesson.last_viewed_at,
        ];
      })
    );
    return csvResponse(`creators-college-lessons-${date}.csv`, csv);
  }

  if (type === "summary") {
    const days = clampDays(searchParams.get("days"));
    const overview = await getOverview(days);
    const csv = toCsv(
      ["Metric", "Value"],
      [
        ["Range days", overview.range_days],
        ["Revenue", overview.revenue],
        ["Orders", overview.orders],
        ["Active enrollments", overview.active_enrollments],
        ["Linked enrollments", overview.linked_enrollments],
        ["Students active 7d", overview.students_active_7d],
        ["Page views", overview.page_views],
        ["Unique visitors", overview.unique_visitors],
        ["Checkout starts", overview.checkout_starts],
        ["Payments verified", overview.payments_verified],
        ["Google sign-ins", overview.logins],
        ["Lessons opened", overview.lesson_views],
        ["Video plays", overview.video_plays],
        ["Lessons completed", overview.lessons_completed],
        ["Sessions", overview.sessions],
      ]
    );
    return csvResponse(`creators-college-summary-${days}d-${date}.csv`, csv);
  }

  return NextResponse.json({ ok: false, error: "Unknown export type." }, { status: 400 });
}
