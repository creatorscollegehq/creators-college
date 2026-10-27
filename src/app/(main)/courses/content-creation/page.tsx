import type { Metadata } from "next";
import { CONTENT_CREATION_COURSE } from "@/data/contentCreationCourse";
import ContentCreationCourseClient from "./ContentCreationCourseClient";

export const metadata: Metadata = {
  title: "Complete Telugu Content Creation Course | Creators College",
  description:
    "Learn content creation in Telugu from fundamentals to analytics. 11 modules, 73 lessons, live training, lifetime recordings, WhatsApp support and a completion certificate.",
  keywords: [
    "Content Creation Course",
    "Telugu Content Creation Course",
    "Learn Content Creation in Telugu",
    "Content Creation Course Hyderabad",
    "Instagram Reels Course Telugu",
    "YouTube Content Creation Course",
    "Mobile Video Shooting Course",
    "CapCut Course Telugu",
    "Creators College",
  ],
  alternates: {
    canonical: "https://www.creatorscollege.in/courses/content-creation",
  },
  openGraph: {
    title: "Complete Telugu Content Creation Course | Creators College",
    description:
      "11 modules, 73 lessons and lifetime recordings. Learn content creation, scripting, shooting, editing and analytics in Telugu.",
    url: "https://www.creatorscollege.in/courses/content-creation",
    siteName: "Creators College",
    images: ["https://www.creatorscollege.in/cecil-srungarapati-founder-creators-college.jpeg"],
    locale: "en_IN",
    type: "website",
  },
};

export default function ContentCreationCoursePage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: CONTENT_CREATION_COURSE.name,
    description:
      "Complete Telugu content creation course covering fundamentals, research, scripting, voice over, live talking, mobile shooting, CapCut editing, account creation, uploads and analytics.",
    provider: {
      "@type": "EducationalOrganization",
      name: "Creators College",
      sameAs: "https://www.creatorscollege.in/",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "mixed",
      duration: "P20D",
      courseWorkload: "PT2H",
    },
    offers: {
      "@type": "Offer",
      price: CONTENT_CREATION_COURSE.price.toString(),
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema).replace(/</g, "\\u003c") }}
      />
      <ContentCreationCourseClient />
    </>
  );
}
