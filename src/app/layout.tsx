import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import FloatingContact from "@/components/FloatingContact";
import "./globals.css";

import Script from "next/script";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    icon: "/logo/5%20Favicon.png",
    shortcut: "/logo/5%20Favicon.png",
    apple: "/logo/5%20Favicon.png",
  },
  verification: {
    google: "may_Kc9UR87qLNcWRNxuX7ddAQ247N4uQR9msbP6lLM",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = "GTM-WDMNVL34";

  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} scroll-smooth`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D418QEH1D5"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-D418QEH1D5');
            `,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1584046740011776');
              fbq('track', 'PageView');
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
        {/* Organization Schema (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Creators College",
              "url": "https://www.creatorscollege.in/",
              "logo": "https://www.creatorscollege.in/logo/logo.png",
              "description": "Learn professional video editing, content scripting, shooting, and social media growth in Telugu from experts.",
              "founder": {
                "@type": "Person",
                "name": "Cecil Srungarapati"
              },
              "sameAs": [
                "https://www.youtube.com/@creatorscollege",
                "https://www.instagram.com/creatorscollege"
              ]
            })
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
            })
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
        <FloatingContact />
      </body>
    </html>
  );
}
