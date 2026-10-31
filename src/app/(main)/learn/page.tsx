import type { Metadata } from "next";
import { requireAuthUser } from "@/lib/access";
import { getActiveEnrollmentForUser } from "@/lib/supabase";
import { courseLessons, courseModules } from "@/lib/courseContent";
import LearnDashboard from "./LearnDashboard";

export const metadata: Metadata = {
  title: "My Profile | Creators College",
  description: "Your Creators College profile and enrolled courses.",
  robots: { index: false, follow: false },
};

function formatMonthYear(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default async function LearnPage() {
  const user = await requireAuthUser();
  const enrollment = await getActiveEnrollmentForUser(user.id, user.email);

  return (
    <LearnDashboard
      studentName={user.name}
      studentEmail={user.email}
      enrollment={
        enrollment
          ? {
              orderId: enrollment.order_id,
              memberSince: formatMonthYear(enrollment.created_at),
              accessUntil: enrollment.expires_at
                ? `Access until ${formatDate(enrollment.expires_at)}`
                : "Lifetime access",
            }
          : null
      }
      modules={enrollment ? courseModules : []}
      totalLessons={enrollment ? courseLessons.length : 0}
    />
  );
}
