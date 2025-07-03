import { docs } from '@/.source';
import { tutorials } from '@/.source';
import { blogPosts } from '@/.source';
import { createMDXSource } from 'fumadocs-mdx';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';

const iconRenderer = (icon: string | undefined) => {
  if (!icon) {
    return;
  }

  if (icon in icons) {
    return createElement(icons[icon as keyof typeof icons]);
  }
};

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/notes',
  source: docs.toFumadocsSource(),
  icon: iconRenderer,
});

export const tutorialsSource = loader({
  baseUrl: '/tutorials',
  source: tutorials.toFumadocsSource(),
  icon: iconRenderer,
});

export const blog = loader({
  baseUrl: '/blog',
  source: createMDXSource(blogPosts),
});
