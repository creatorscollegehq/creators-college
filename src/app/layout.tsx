import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import DeferredThirdParty from "@/components/DeferredThirdParty";
import FloatingContact from "@/components/FloatingContact";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creators College | India's Premium Content Creation Academy",
  description: "Learn professional video editing, content scripting, shooting, and social media growth in Telugu. Master the art of content creation from zero to professional.",
  keywords: [
    "content creation course",
    "video editing academy telugu",
    "youtube growth course",
    "instagram reels coaching",
    "creators college hyderabad",
    "learn video editing",
    "telugu content creators",
    "best content creation course in telugu",
    "video editing course in telugu",
    "video editing institute in hyderabad",
    "best video editing training in telangana",
    "youtube growth course in telugu",
    "content creation academy in andhra pradesh",
    "capcut editing course telugu",
    "phone video editing training telugu",
    "creators college telugu"
  ],
  authors: [{ name: "Creators College" }],
  openGraph: {
    title: "Creators College | India's Premium Content Creation Academy",
    description: "Learn professional video editing, content scripting, shooting, and social media growth in Telugu.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: [{ url: "/logo/favicon-32.png", sizes: "32x32", type: "image/png" }],
    shortcut: "/logo/favicon-32.png",
    apple: [{ url: "/logo/favicon-180.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: "may_Kc9UR87qLNcWRNxuX7ddAQ247N4uQR9msbP6lLM",
    other: {
      "p:domain_verify": "d7fcf3df811e5d40d3bfdbbe1c9b986b",
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = "GTM-WDMNVL34";

  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.fbq = window.fbq || function () {
                window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
              };
              window.fbq.push = window.fbq;
              window.fbq.loaded = false;
              window.fbq.version = '2.0';
              window.fbq.queue = [];
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1584046740011776&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* Organization Schema (JSON-LD) — founder references the canonical Cecil Person @id to avoid a duplicate Person entity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "@id": "https://www.creatorscollege.in#organization",
              "name": "Creators College",
              "url": "https://www.creatorscollege.in/",
              "logo": "https://www.creatorscollege.in/logo/2%20Horizontal%20Logo.png",
              "description": "Learn professional video editing, content scripting, shooting, and social media growth in Telugu from experts.",
              "founder": {
                "@id": "https://www.creatorscollege.in/cecil-srungarapati#person"
              },
              "sameAs": [
                "https://www.youtube.com/@creatorscollegeofficial",
                "https://www.instagram.com/creatorscollege_/",
                "https://www.facebook.com/profile.php?id=61591290489327",
                "https://t.me/creatorscollege"
              ]
            }).replace(/</g, "\\u003c")
          }}
        />
        {/* LocalBusiness Schema (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Creators College Hyderabad",
              "image": "https://www.creatorscollege.in/hero_collage_wide.jpg",
              "telephone": "+91-8143937367",
              "email": "enquiry@creatorscollege.com",
              "priceRange": "INR",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Hyderabad Campus",
                "addressLocality": "Hyderabad",
                "addressRegion": "TS",
                "postalCode": "500001",
                "addressCountry": "IN"
              },
              "url": "https://www.creatorscollege.in/"
            }).replace(/</g, "\\u003c")
          }}
        />
      </head>
      <body className="bg-white text-brand-charcoal min-h-screen flex flex-col font-sans antialiased">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <DeferredThirdParty />
        <FloatingContact />
      </body>
    </html>
  );
}
