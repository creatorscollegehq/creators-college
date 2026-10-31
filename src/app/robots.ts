import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/studio/', // Sanity Studio — not for public crawling
          '/admin', // Internal analytics console
          '/lp/ads',  // Paid ad landing page — noindex
          '/learn',  // Enrolled student portal — private
          '/checkout/success',
        ],
      },
    ],
    sitemap: 'https://www.creatorscollege.in/sitemap.xml',
  };
}
