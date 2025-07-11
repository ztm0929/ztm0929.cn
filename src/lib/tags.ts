// Tag配置：定义中文标签到英文slug的映射
export const tagConfig = {
  // 技术相关
  'JavaScript': { slug: 'javascript', name: 'JavaScript' },
  'React': { slug: 'react', name: 'React' },
  'Next.js': { slug: 'nextjs', name: 'Next.js' },
  'TypeScript': { slug: 'typescript', name: 'TypeScript' },
  
  // 中文标签
  '前端': { slug: 'frontend', name: '前端' },
  '后端': { slug: 'backend', name: '后端' },
  '全栈': { slug: 'fullstack', name: '全栈' },
  '博客': { slug: 'blog', name: '博客' },
  '教程': { slug: 'tutorial', name: '教程' },
  '笔记': { slug: 'notes', name: '笔记' },
  '入门': { slug: 'beginner', name: '入门' },
  '基础': { slug: 'basics', name: '基础' },
  '示例': { slug: 'example', name: '示例' },
  '文档': { slug: 'docs', name: '文档' },
  '编程': { slug: 'programming', name: '编程' },
  '开发环境': { slug: 'dev-environment', name: '开发环境' },
  '工具链': { slug: 'toolchain', name: '工具链' },
  '最佳实践': { slug: 'best-practices', name: '最佳实践' },
  
  // 学校相关（示例）
  '深圳大学': { slug: 'szu', name: '深圳大学' },
} as const;

// 根据tag名称获取slug
export function getTagSlug(tagName: string): string {
  const config = tagConfig[tagName as keyof typeof tagConfig];
  if (config) {
    return config.slug;
  }
  
  // 如果没有配置，直接使用URL编码
  return encodeURIComponent(tagName);
}

// 简化版slug生成器（已移除）
// 不再需要复杂的智能转换

// 根据slug获取tag名称
export function getTagNameFromSlug(slug: string): string | null {
  // 首先查找直接映射
  const entry = Object.entries(tagConfig).find(([, config]) => config.slug === slug);
  if (entry) {
    return entry[0];
  }
  
  // 如果没有找到映射，尝试URL解码
  try {
    return decodeURIComponent(slug);
  } catch {
    return null;
  }
}

// 获取所有tag配置
export function getAllTagConfigs() {
  return Object.entries(tagConfig).map(([name, config]) => ({
    name,
    slug: config.slug,
  }));
}
