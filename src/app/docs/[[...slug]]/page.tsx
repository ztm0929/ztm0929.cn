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
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = tutorialsSource.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  const contentPath = page.path.startsWith('docs/')
    ? `content/${page.path}`
    : `content/docs/${page.path}`;
  const lastModified = page.data.lastModified;

  let mdxContent = '';
  try {
    const filePath = join(process.cwd(), contentPath);
    mdxContent = readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error('Failed to read MDX file:', error);
  }

  return (
	<DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{ style: 'clerk' }}
      lastUpdate={lastModified}
    >
	  <DocsTitle>{page.data.title}</DocsTitle>
	  <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
	  
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
	  
	  <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        <LLMCopyButton content={mdxContent} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/ztm0929/ztm0929.cn/blob/main/${contentPath}`}
        />
      </div>

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

  // 尝试从 frontmatter 获取 description，若没有则从文件内容生成摘录
  let description = page.data.description;

  if (!description) {
    let mdxContent = '';
    try {
      const contentPath = page.path.startsWith('docs/')
        ? `content/${page.path}`
        : `content/docs/${page.path}`;
      const filePath = join(process.cwd(), contentPath);
      mdxContent = readFileSync(filePath, 'utf-8');
      // 去掉 frontmatter（若存在）
      mdxContent = mdxContent.replace(/^---[\s\S]*?---/, '');
      // 去除 HTML 标签
      let cleaned = mdxContent.replace(/<[^>]+>/g, '');
      // 去除常见 Markdown 符号
      cleaned = cleaned.replace(/[#_*`>~\[\]\(\)!\-]{1,}/g, '');
      cleaned = cleaned.replace(/\s+/g, ' ').trim();
      const max = 160;
      description = cleaned.length > max ? cleaned.slice(0, max - 1).trim() + '…' : cleaned;
    } catch (e) {
      // fallback to empty string
      description = '';
    }
  }

  return {
    title: page.data.title,
    description,
    openGraph: {
      title: page.data.title,
      description,
    },
  };
}
