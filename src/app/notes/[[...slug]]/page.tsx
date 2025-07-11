import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { getTagSlug } from '@/lib/tags';
import Link from 'next/link';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <DocsPage 
      toc={page.data.toc} 
      full={page.data.full} 
      tableOfContent={{ 
        // 使用 normal 样式，通常比 clerk 更稳定
        style: 'clerk',
        enabled: true,
        single: false
      }} 
      lastUpdate={page.data.lastModified ? new Date(page.data.lastModified) : undefined}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      
      {/* 显示tags */}
      {page.data.tags && page.data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {page.data.tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/tags/${getTagSlug(tag)}`}
              className="text-xs px-2 py-1 bg-secondary hover:bg-secondary/80 rounded text-secondary-foreground transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
      
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
