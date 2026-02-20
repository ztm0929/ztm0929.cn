import { docs } from '@/.source';
import { tutorials } from '@/.source';
import { blogPosts } from '@/.source';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';
import { loader } from 'fumadocs-core/source';
import { icons } from 'lucide-react';
import { createElement } from 'react';
import { getTagNameFromSlug } from './tags';

const iconRenderer = (icon: string | undefined) => {
  if (!icon) {
    return;
  }

  if (icon in icons) {
    return createElement(icons[icon as keyof typeof icons]);
  }
};

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
  // it assigns a URL to your pages
  baseUrl: '/notes',
  source: docs.toFumadocsSource(),
  icon: iconRenderer,
});

export const tutorialsSource = loader({
  baseUrl: '/tutorials',
  source: tutorials.toFumadocsSource(),
  icon: iconRenderer,
});

export const blog = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blogPosts, []),
});

// 获取所有tags的函数
export function getAllTags() {
  const allTags = new Set<string>();
  
  // 从notes中收集tags
  for (const page of source.getPages()) {
    if (page.data.tags) {
      page.data.tags.forEach((tag: string) => allTags.add(tag));
    }
  }
  
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
  
  // 从notes中查找
  for (const page of source.getPages()) {
    if (page.data.tags?.includes(tagName)) {
      pages.push({ ...page, type: 'notes' });
    }
  }
  
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
