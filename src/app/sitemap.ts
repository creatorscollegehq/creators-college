import { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

export const revalidate = 3600; // Revalidate sitemap cache every hour dynamically

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    '/lp/ads',
    '/lp/capcut-editing',
    '/lp/college-workshops',
    '/lp/content-creation',
    '/lp/corporate',
    '/lp/free-demo',
  ];

  // Fetch dynamic blog post URLs from Sanity CMS
  let blogSlugs: { slug: string; date: string }[] = [];
  try {
    const posts = await client.fetch<any[]>(
      `*[_type == "post"] { "slug": slug.current, "date": publishedAt }`
    );
    blogSlugs = posts.map((p) => ({
      slug: p.slug,
      date: p.date || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Failed to fetch sitemap slugs from Sanity:", error);
    // Fallback static slugs in case of API/network block during build
    blogSlugs = [
      { slug: '3-second-hook-formula', date: '2026-06-25' },
      { slug: 'capcut-editing-hacks', date: '2026-06-18' },
      { slug: 'essential-ai-tools-2026', date: '2026-06-10' },
      { slug: 'youtube-shorts-algorithm-guide', date: '2026-06-01' },
      { slug: 'how-sandeep-scaled-youtube', date: '2026-05-15' },
    ];
  }

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route.startsWith('/lp/') ? 0.8 : 0.6,
  }));

  const blogEntries = blogSlugs.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...blogEntries];
}
