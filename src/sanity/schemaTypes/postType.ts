import { defineField, defineType } from 'sanity';
import { GooglePreview } from '../components/GooglePreview';

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Blog Section (Category)',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
      description: 'Select which section this blog post belongs to.',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Creators College Team',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      initialValue: '5 min read',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Post Excerpt / Brief Summary',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(250).required(),
      description: 'Shown on the blog list cards.',
    }),
    defineField({
      name: 'body',
      title: 'Content Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(70),
      description: 'Search Engine optimization page title. Defaults to post title if blank.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
      description: 'Search Engine optimization snippet shown under Google search results.',
    }),
    defineField({
      name: 'seoPreview',
      title: 'Real-Time Google Search Snippet Preview',
      type: 'string',
      components: {
        input: GooglePreview,
      },
      description: 'Simulated visual preview of how this post appears in Google search engine indexing.',
    }),
  ],
});
