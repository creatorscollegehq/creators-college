import { redirect } from "next/navigation";

// /lp root has no content – redirect to the main content creation landing page
export default function LpIndexPage() {
  redirect("/lp/content-creation");
}
