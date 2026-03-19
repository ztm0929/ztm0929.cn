import { tutorials } from '@/.source';
import { blogPosts } from '@/.source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { loader, type LoaderPlugin } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import type { SimpleIcon } from 'simple-icons';
import { siPython } from 'simple-icons';
import { getTagNameFromSlug } from './tags';

const simpleIcons: Record<string, SimpleIcon> = {
  python: siPython,
};

const simpleIconPrefix = 'si:';

const renderSimpleIcon = (icon: SimpleIcon) =>
  createElement(
    'svg',
    {
      viewBox: '0 0 24 24',
      fill: 'none',
      'aria-hidden': true,
    },
    createElement('path', { d: icon.path, fill: 'currentColor' }),
  );

const iconRenderer = (icon: string | undefined) => {
  if (!icon) {
    return;
  }

  if (icon in icons) {
    return createElement(icons[icon as keyof typeof icons]);
  }

  if (icon.startsWith(simpleIconPrefix)) {
    const simpleIconName = icon.slice(simpleIconPrefix.length).trim().toLowerCase();
    const simpleIcon = simpleIcons[simpleIconName];

    if (simpleIcon) {
      return renderSimpleIcon(simpleIcon);
    }
  }
};

function excludeDraftInProductionPlugin(): LoaderPlugin {
  return {
    name: 'exclude-draft-in-production',
    transformStorage({ storage }) {
      if (process.env.NODE_ENV !== 'production') {
        return;
      }

      for (const path of storage.getFiles()) {
        const file = storage.read(path);
        if (!file || file.format !== 'page') {
          continue;
        }

        if ('draft' in file.data && file.data.draft === true) {
          storage.delete(path);
        }
      }
    },
  };
}

export const tutorialsSource = loader({
  baseUrl: '/docs',
  source: tutorials.toFumadocsSource(),
  plugins: [excludeDraftInProductionPlugin()],
  icon: iconRenderer,
});

export const blog = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blogPosts, []),
  plugins: [excludeDraftInProductionPlugin()],
});

// 获取所有tags的函数
export function getAllTags() {
  const allTags = new Set<string>();
  
  // 从tutorials中收集tags
  for (const page of tutorialsSource.getPages()) {
    if (page.data.tags) {
      page.data.tags.forEach((tag: string) => allTags.add(tag));
    }
  }
  
  // 从blog中收集tags
  for (const page of blog.getPages()) {
    if (page.data.tags) {
      page.data.tags.forEach((tag: string) => allTags.add(tag));
    }
  }
  
  return Array.from(allTags).sort();
}

// 根据tag获取相关页面（通过tag名称）
export function getPagesByTag(tagName: string) {
  const pages = [];
  
  // 从tutorials中查找
  for (const page of tutorialsSource.getPages()) {
    if (page.data.tags?.includes(tagName)) {
      pages.push({ ...page, type: 'tutorials' });
    }
  }
  
  // 从blog中查找
  for (const page of blog.getPages()) {
    if (page.data.tags?.includes(tagName)) {
      pages.push({ ...page, type: 'blog' });
    }
  }
  
  return pages;
}

// 根据slug获取相关页面
export function getPagesByTagSlug(slug: string) {
  // 先尝试通过slug映射查找
  const tagName = getTagNameFromSlug(slug);
  if (tagName) {
    return getPagesByTag(tagName);
  }
  
  // 如果映射查找失败，返回空数组
  return [];
}
