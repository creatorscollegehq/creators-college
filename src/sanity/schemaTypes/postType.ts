import { defineField, defineType } from 'sanity';
import { GooglePreview } from '../components/GooglePreview';

export const postType = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  
  // Clean UI tabs to organize inputs and improve UX/UI workflow
  groups: [
    { name: 'content', title: '📝 1. Blog Content', default: true },
    { name: 'author', title: '👤 2. Written By / Metadata' },
    { name: 'seo', title: '🔍 3. Google SEO Preview' },
  ],

  fields: [
    // --- CONTENT GROUP ---
    defineField({
      name: 'title',
      title: 'Post Title',
      type: 'string',
      description: 'Enter the main heading of your blog post.',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Click "Generate" to automatically create a clean, search-friendly web address.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'category',
      title: 'Blog Section (Category)',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Choose which section (e.g. CapCut, Premiere Pro) this post belongs to.',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Cover Image',
      type: 'image',
      description: 'Upload the main cover image shown at the top of the article page.',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Brief Excerpt / Summary Card Text',
      type: 'text',
      rows: 3,
      description: 'A 2-3 line summary of the post. Appears on blog listing cards and serves as the default Google description.',
      validation: (Rule) => Rule.max(250).required(),
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Article Content Body',
      type: 'array',
      description: 'Write the main body here. You can insert multiple headings, bullet lists, blockquote callouts, highlights, and inline photos.',
      group: 'content',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal Paragraph', value: 'normal' },
            { title: 'Heading 1', value: 'h1' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote / Highlight Box', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet List', value: 'bullet' },
            { title: 'Numbered List', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strikethrough', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External Link',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image Caption',
              description: 'Optional caption text displayed directly underneath the picture.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text (For Google Search & Accessibility)',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    // --- AUTHOR GROUP ---
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      initialValue: 'Creators College Team',
      description: 'Enter who wrote the article.',
      validation: (Rule) => Rule.required(),
      group: 'author',
    }),
    defineField({
      name: 'authorRole',
      title: 'Author Role / Written By Title',
      type: 'string',
      initialValue: 'Founder',
      description: 'e.g. Founder, Chief Mentor, Senior Editor. Appears next to the author name.',
      validation: (Rule) => Rule.required(),
      group: 'author',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
      description: 'Select the publication date.',
      validation: (Rule) => Rule.required(),
      group: 'author',
    }),
    defineField({
      name: 'readTime',
      title: 'Estimated Read Time',
      type: 'string',
      initialValue: '5 min read',
      description: 'e.g. 5 min read, 8 min read.',
      validation: (Rule) => Rule.required(),
      group: 'author',
    }),

    // --- SEO GROUP ---
    defineField({
      name: 'metaTitle',
      title: 'SEO Meta Title',
      type: 'string',
      description: 'Manual title for Google Search. If left blank, it automatically falls back to your Post Title.',
      validation: (Rule) => Rule.max(70),
      group: 'seo',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      description: 'Manual snippet text for Google Search. If left blank, it automatically falls back to your Excerpt.',
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoPreview',
      title: 'Google Search Result Preview',
      type: 'string',
      components: {
        input: GooglePreview,
      },
      description: 'A visual preview of how your article will appear in real Google Search Results.',
      group: 'seo',
    }),
  ],
});
