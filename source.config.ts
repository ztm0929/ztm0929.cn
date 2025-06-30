import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
  defineCollections,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  dir: './content/notes',
  meta: {
    schema: metaSchema,
  },
});

export const blogPosts = defineCollections({
	type: 'doc',
	dir: './content/blog',
	schema: frontmatterSchema.extend({
		author: z.string(),
		date: z.string().date().or(z.date()),
	})
})

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
  lastModifiedTime: 'git',
});
