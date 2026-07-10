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
          '/lp/ads',  // Paid ad landing page — noindex
        ],
      },
    ],
    sitemap: 'https://www.creatorscollege.in/sitemap.xml',
  };
}
