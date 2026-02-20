import { tutorialsSource } from '@/lib/source';
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
  const page = tutorialsSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
	<DocsPage toc={page.data.toc} full={page.data.full} tableOfContent={{ style: 'clerk' }}>
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
			a: createRelativeLink(tutorialsSource, page),
		  })}
		/>
	  </DocsBody>
	</DocsPage>
  );
}

export async function generateStaticParams() {
  return tutorialsSource.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = tutorialsSource.getPage(params.slug);
  if (!page) notFound();

  return {
	title: page.data.title,
	description: page.data.description,
  };
}
