import Link from 'next/link';
import { blog } from '@/lib/source';
import { getTagSlug } from '@/lib/tags';

export default function Home() {
  const posts = blog.getPages();

  return (
    <main className="grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.url}
            className="bg-fd-secondary rounded-lg shadow-md overflow-hidden p-6"
          >
            <Link href={post.url}>
              <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">{post.data.title}</h2>
            </Link>
            <p className="mb-4">{post.data.description}</p>
            
            {/* 显示tags */}
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {post.data.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/tags/${getTagSlug(tag)}`}
                    className="text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 rounded text-primary transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            )}
            
            <div className="text-sm text-fd-muted-foreground">
              <p>By {post.data.author} • {new Date(post.data.date).toDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}