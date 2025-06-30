import { docs } from '@/.source';
import { blogPosts } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/notes',
  source: docs.toFumadocsSource(),
});

export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
});
