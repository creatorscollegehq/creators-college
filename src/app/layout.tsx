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
    "telugu content creators"
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
