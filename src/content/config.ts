import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    h1: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date(),
    announcement: z.string().optional(),
    image: z.string().optional(),
    aiGenerated: z.boolean().default(false),
    permalink: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    h1: z.string().optional(),
    description: z.string().optional(),
    permalink: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({
    base: './src/content-feel-free/',
    pattern: [
      // Exclude specific directories and files
      '!**/_template/*',
      '!**/scripts/*',
      '!**/tools/*',
      '!**/plan-2026/*',

      // Exclude specific markdown files
      '!**/README.{md,mdx}',
      '!**/BRAIN_STORM.{md,mdx}',
      '!**/METADATA_GUIDE.{md,mdx}',

      // Allow all markdown files
      '**/*.{md,mdx}',
    ],
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),

    thumbnail: z.string().optional(),

    publishedDate: z.string().optional(),
    modifiedDate: z.string(),
    draft: z.boolean(),
    featured: z.boolean(),

    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),

    series: z.string().optional(),
    seriesOrder: z.number().optional(),

    seo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
      keywords: z.array(z.string()).optional(),
      canonical: z.string().optional(),
    }),

    author: z.string(),
    lang: z.string().optional(),

    relatedPosts: z.array(z.string()).optional(),
  }),
});

export const collections = { posts, pages, articles };
