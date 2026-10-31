import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireAuthUser } from "@/lib/access";
import { getActiveEnrollmentForUser } from "@/lib/supabase";
import LearnClaimClient from "./LearnClaimClient";

export const metadata: Metadata = {
  title: "Claim My Course | Creators College",
  description: "Link your paid enrollment to your Google account.",
  robots: { index: false, follow: false },
};

export default async function LearnClaimPage() {
  const user = await requireAuthUser();
  const enrollment = await getActiveEnrollmentForUser(user.id, user.email);
  if (enrollment) redirect("/learn");

  return <LearnClaimClient email={user.email} name={user.name} />;
}
