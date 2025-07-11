// 这个文件确保在构建时能够获取到所有标签
// 用于静态导出时的参数生成

import { getAllTags } from '@/lib/source';
import { getTagSlug } from '@/lib/tags';

export function generateAllTagParams() {
  try {
    const tags = getAllTags();
    const params = new Set<string>();
    
    // 为每个tag生成对应的slug参数
    for (const tag of tags) {
      const slug = getTagSlug(tag);
      params.add(slug);
    }
    
    return Array.from(params).map(tag => ({ tag }));
  } catch (error) {
    console.warn('Error generating tag params:', error);
    // 返回一些基础参数作为回退，确保至少有这些路由可用
    return [
      { tag: 'frontend' },
      { tag: 'backend' },
      { tag: 'javascript' },
      { tag: 'react' },
      { tag: 'tutorial' },
      { tag: 'beginner' },
      { tag: 'example' },
      { tag: 'blog' },
      { tag: 'notes' }
    ];
  }
}
