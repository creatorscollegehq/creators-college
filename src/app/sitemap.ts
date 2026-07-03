import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.creatorscollege.in';

  const staticRoutes = [
    '',
    '/about',
    '/blog',
    '/checkout',
    '/contact',
    '/corporate-training',
    '/courses',
    '/disclaimer',
    '/privacy-policy',
    '/refund-policy',
    '/sitemap',
    '/success-stories',
    '/terms-conditions',
    '/lp/capcut-editing',
    '/lp/college-workshops',
    '/lp/content-creation',
    '/lp/corporate',
    '/lp/free-demo',
  ];

  const blogSlugs = [
    '3-second-hook-formula',
    'capcut-editing-hacks',
    'essential-ai-tools-2026',
    'youtube-shorts-algorithm-guide',
    'how-sandeep-scaled-youtube',
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/lp/') ? 0.8 : 0.6,
  }));

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
