import { Metadata } from "next";
import AdsLandingClient from "./AdsLandingClient";

export const metadata: Metadata = {
  title: "Content Creation Course in Telugu | ₹1L+/Month Career | Creators College",
  description: "Learn content creation, video editing & social media growth in Telugu. 8-week hands-on course. Book your FREE demo class now!",
  keywords: [
    "content creation course Telugu",
    "YouTube course Telugu",
    "video editing course Hyderabad",
    "social media course Telugu",
    "Instagram growth course",
    "earn from YouTube Telugu",
    "Creators College Hyderabad",
    "digital creator course India",
  ],
  openGraph: {
    title: "Content Creation Course in Telugu | Creators College",
    description: "Turn your phone into a ₹1L/month income machine. Learn from Creators College.",
    url: "https://www.creatorscollege.in/lp/ads",
    siteName: "Creators College",
    type: "website",
  },
  robots: {
    index: false, // Don't index this paid ad landing page
    follow: false,
  },
};

export default function AdsLandingPage() {
  return <AdsLandingClient />;
}
