import { getPagesByTagSlug } from '@/lib/source';
import { getTagSlug, getTagNameFromSlug } from '@/lib/tags';
import { generateAllTagParams } from '@/lib/build-params';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TagPage(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const slug = params.tag;
  const pages = getPagesByTagSlug(slug);

  if (pages.length === 0) {
    notFound();
  }

  // 获取显示名称：优先使用映射的名称，否则尝试从第一个页面的tags中找到匹配的tag
  let displayName = getTagNameFromSlug(slug) || slug;
  
  // 如果没有找到映射，尝试从页面数据中找到原始tag名称
  if (!getTagNameFromSlug(slug) && pages.length > 0) {
    for (const page of pages) {
      if (page.data.tags) {
        for (const tag of page.data.tags) {
          if (getTagSlug(tag) === slug) {
            displayName = tag;
            break;
          }
        }
        if (displayName !== slug) break;
      }
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">#{displayName}</h1>
        <p className="text-muted-foreground mt-2">
          共找到 {pages.length} 篇相关内容
        </p>
      </div>
      
      <div className="space-y-4">
        {pages.map((page) => (
          <div key={page.url} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground">
                {page.type === 'notes' ? '笔记' : page.type === 'tutorials' ? '教程' : '博客'}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">
              <Link 
                href={page.url}
                className="hover:text-primary transition-colors"
              >
                {page.data.title}
              </Link>
            </h2>
            
            {page.data.description && (
              <p className="text-muted-foreground mb-3">
                {page.data.description}
              </p>
            )}
            
            {page.data.tags && (
              <div className="flex flex-wrap gap-2">
                {page.data.tags.map((pageTag: string) => (
                  <Link
                    key={pageTag}
                    href={`/tags/${getTagSlug(pageTag)}`}
                    className={`text-xs px-2 py-1 rounded border hover:bg-secondary transition-colors ${
                      pageTag === displayName ? 'bg-primary text-primary-foreground' : 'bg-background'
                    }`}
                  >
                    #{pageTag}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="pt-8">
        <Link 
          href="/tags" 
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← 返回所有标签
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // 使用专门的构建时参数生成函数
  return generateAllTagParams();
}

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  const slug = params.tag;
  const displayName = getTagNameFromSlug(slug) || slug;
  
  return {
    title: `标签: ${displayName}`,
    description: `查看所有标记为 "${displayName}" 的内容`,
  };
}
