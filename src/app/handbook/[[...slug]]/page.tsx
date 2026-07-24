import { handbookSource } from '@/lib/source';
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
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = handbookSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const contentPath = `content/handbook/${page.path}`;

  let mdxContent = '';
  try {
    mdxContent = readFileSync(join(process.cwd(), contentPath), 'utf-8');
  } catch (error) {
    console.error('Failed to read MDX file:', error);
  }

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: 'clerk' }}
      lastUpdate={page.data.lastModified}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>

      {page.data.tags && page.data.tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {page.data.tags.map((tag: string) => (
            <Link
              key={tag}
              href={`/tags/${getTagSlug(tag)}`}
              className="rounded bg-secondary px-2 py-1 text-xs text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-row items-center gap-2 border-b pb-6 pt-2">
        <LLMCopyButton content={mdxContent} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/ztm0929/ztm0929.cn/blob/main/${contentPath}`}
        />
      </div>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            a: createRelativeLink(handbookSource, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return handbookSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = handbookSource.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
