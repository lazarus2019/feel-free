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
    base: './src/content-feel-free/gitlab/docs',
    pattern: [
      '**/*.{md,mdx}',
      '!**/README.{md,mdx}',
      '!**/BRAIN_STORM.{md,mdx}',
    ],
  }),
  // schema: z.object({
  //   title: z.string(),
  //   h1: z.string(),
  //   announcement: z.string(),
  //   permalink: z.string(),
  //   date: z.coerce.date().optional(),
  // }),
});

export const collections = { posts, pages, articles };
