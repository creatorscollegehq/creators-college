import { client } from "@/sanity/lib/client";
import BlogHubClient from "./BlogHubClient";

// Revalidate cache every 60 seconds (Incremental Static Regeneration)
export const revalidate = 60;

async function getBlogData() {
  const categories = await client.fetch<any[]>(
    `*[_type == "category"] | order(title asc) { title, "slug": slug.current }`
  );
  
  const posts = await client.fetch<any[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      "category": category->title,
      "date": publishedAt,
      author,
      excerpt,
      readTime,
      mainImage
    }`
  );
  
  return { categories, posts };
}

export default async function BlogHubPage() {
  const { categories, posts } = await getBlogData();
  
  // Tag first post as featured if any posts exist
  const postsWithFeatured = posts.map((post, idx) => ({
    ...post,
    featured: idx === 0,
  }));

  const categoryNames = ["All", ...categories.map((c) => c.title)];

  return <BlogHubClient posts={postsWithFeatured} categories={categoryNames} />;
}
