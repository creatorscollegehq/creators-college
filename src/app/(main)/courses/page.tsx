import type { Metadata } from "next";
import CoursesPageClient from "./CoursesPageClient";

export const metadata: Metadata = {
  title: "Complete Telugu Content Creation & Video Editing Courses | Creators College",
  description: "Join the Complete Telugu Content Creation and CapCut Video Editing Courses at Creators College. Master Content Research, Scripting, Voice Over, Mobile Shooting, AI Video Editing, Freelancing, and Page Growth. Live Online & Offline Telugu classes.",
  keywords: [
    "Content Creation Course",
    "Telugu Content Creation Course",
    "Learn Content Creation in Telugu",
    "Content Creator Course",
    "Social Media Course",
    "Instagram Reels Course",
    "YouTube Content Creation Course",
    "Video Editing Course",
    "CapCut Video Editing Course",
    "Telugu CapCut Course",
    "Learn CapCut Video Editing in Telugu",
    "Video Editing Course Telugu",
    "Mobile Video Editing Course",
    "PC Video Editing Course",
    "Instagram Reels Editing Course",
    "YouTube Video Editing Course",
    "Professional Video Editing Course",
    "AI Video Editing Course",
    "VPN Setup for CapCut",
    "Online Content Creation Course",
    "Offline Content Creation Classes",
    "Creators College"
  ]
};

export default function Page() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "name": "Complete Telugu Content Creation Course",
        "description": "Master content research, scripting, voiceover, shooting, CapCut and Premiere Pro editing, and page growth in Telugu.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Creators College",
          "sameAs": "https://www.creatorscollege.in/"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "mixed",
          "duration": "P30D",
          "courseWorkload": "PT2H"
        },
        "offers": {
          "@type": "Offer",
          "price": "5999.00",
          "priceCurrency": "INR"
        }
      },
      {
        "@type": "Course",
        "name": "CapCut Video Editing Course",
        "description": "Master professional CapCut keyframes, speed ramping, transitions, and audio synching in Telugu.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Creators College",
          "sameAs": "https://www.creatorscollege.in/"
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": "mixed",
          "duration": "P20D",
          "courseWorkload": "PT1.5H"
        },
        "offers": {
          "@type": "Offer",
          "price": "1999.00",
          "priceCurrency": "INR"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <CoursesPageClient />
    </>
  );
}
