import { getAllTags } from '@/lib/source';
import { getTagSlug } from '@/lib/tags';
import Link from 'next/link';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">标签</h1>
        <p className="text-muted-foreground mt-2">
          浏览所有标签分类的内容
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <div key={tag} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <Link 
              href={`/tags/${getTagSlug(tag)}`}
              className="text-lg font-semibold hover:text-primary transition-colors"
            >
              #{tag}
            </Link>
          </div>
        ))}
      </div>
      
      {tags.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">暂无标签</p>
        </div>
      )}
    </div>
  );
}
