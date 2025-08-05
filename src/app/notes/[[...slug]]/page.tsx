import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/mdx-components";
import { getTagSlug } from "@/lib/tags";
import Link from "next/link";
import { LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";

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
      tableOfContent={{ style: "clerk" }}
      lastUpdate={
        page.data.lastModified ? new Date(page.data.lastModified) : undefined
      }
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>

      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/ztm0929/ztm0929.cn/blob/main/content/notes/${page.path}`}
        />
      </div>

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();
  const image = ['/og', ...slug, 'image.png'].join('/');
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: image,
    },
    twitter: {
      card: 'summary_large_image',
      images: image,
    },
  };
}

