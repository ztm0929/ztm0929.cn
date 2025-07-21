import { notFound } from 'next/navigation';
import Link from 'next/link';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog } from '@/lib/source';
import { getTagSlug } from '@/lib/tags';
import { BlogComments } from '@/components/Comments';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      <div className="container rounded-xl border py-12 md:px-8">
        <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
        <p className="mb-4 text-fd-muted-foreground">{page.data.description}</p>
        
        {/* 显示tags */}
        {page.data.tags && page.data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
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
        
        <Link href="/blog">Back</Link>
      </div>
      <article className="container flex flex-col px-4 py-8">
        <div className="prose min-w-0 max-w-none">
          <InlineTOC items={page.data.toc} />
          <Mdx components={defaultMdxComponents} />
        </div>
        <div className="flex flex-col gap-4 text-sm mt-8">
          <div>
            <p className="mb-1 text-fd-muted-foreground">Written by</p>
            <p className="font-medium">{page.data.author}</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-fd-muted-foreground">At</p>
            <p className="font-medium">
              {new Date(page.data.date).toDateString()}
            </p>
          </div>
          {page.data.tags && page.data.tags.length > 0 && (
            <div>
              <p className="mb-2 text-sm text-fd-muted-foreground">Tags</p>
              <div className="flex flex-wrap gap-2">
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
            </div>
          )}
        </div>
      </article>
      
      {/* 评论区 - 独立容器 */}
      <div className="container px-4 pb-8">
        <BlogComments pageId={`blog-${params.slug}`} />
      </div>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  };
}