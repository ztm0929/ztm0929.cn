import type { MetadataRoute } from 'next';
import { blog, notesSource, tutorialsSource, getAllTags } from '@/lib/source';
import { getTagSlug } from '@/lib/tags';

const siteUrl = 'https://ztm0929.cn';

export const dynamic = 'force-static';
export const revalidate = false;

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function toSitemapEntry(path: string, priority?: number): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    toSitemapEntry('/'),
    toSitemapEntry('/docs/', 1),
    toSitemapEntry('/notes/', 0.8),
    toSitemapEntry('/blog/', 0.7),
    toSitemapEntry('/about/', 0.5),
    toSitemapEntry('/start-page/', 0.5),
  ];

  for (const page of tutorialsSource.getPages()) {
    entries.push({
      url: absoluteUrl(page.url.endsWith('/') ? page.url : `${page.url}/`),
      priority: page.url === '/docs/' ? 1 : 0.8,
    });
  }

  for (const page of notesSource.getPages()) {
    entries.push({
      url: absoluteUrl(page.url.endsWith('/') ? page.url : `${page.url}/`),
      priority: 0.6,
    });
  }

  for (const page of blog.getPages()) {
    entries.push({
      url: absoluteUrl(page.url.endsWith('/') ? page.url : `${page.url}/`),
      priority: 0.6,
    });
  }

  for (const tag of getAllTags()) {
    entries.push(toSitemapEntry(`/tags/${getTagSlug(tag)}/`, 0.4));
  }

  return entries;
}
