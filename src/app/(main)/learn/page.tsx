import type { Metadata } from "next";
import { requireEnrollment } from "@/lib/access";
import { courseLessons, courseModules, maskPhone } from "@/lib/courseContent";
import LearnDashboard from "./LearnDashboard";

export const metadata: Metadata = {
  title: "My Course | Creators College",
  description: "Your private Creators College course library.",
  robots: { index: false, follow: false },
};

export default async function LearnPage() {
  const { user, enrollment } = await requireEnrollment();

  return (
    <LearnDashboard
      orderId={enrollment.order_id}
      studentName={enrollment.name || user.name}
      studentEmail={user.email}
      maskedPhone={maskPhone(enrollment.phone)}
      modules={courseModules}
      totalLessons={courseLessons.length}
    />
  );
}
