import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
  defineCollections,
} from 'fumadocs-mdx/config';
import { remarkNpm } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

// 自定义脚注插件，用于修改脚注标题和锚点
function customFootnotePlugin() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'element') {
        const element = node as Element;
        
        // 查找脚注标题 <h2 id="footnote-label">Footnotes</h2>
        if (element.tagName === 'h2' && 
            element.properties?.id === 'footnote-label') {
          // 修改锚点ID
          element.properties.id = 'footnote';
          
          // 查找并修改标题文本
          visit(element, 'text', (textNode) => {
            if (textNode.type === 'text' && textNode.value === 'Footnotes') {
              textNode.value = '脚注';
            }
          });
        }
        
        // 查找脚注返回链接 <a href="#footnote-label" ...>
        if (element.tagName === 'a' && 
            typeof element.properties?.href === 'string' &&
            element.properties.href === '#footnote-label') {
          // 修改返回链接的href
          element.properties.href = '#footnote';
        }
      }
    });
  };
}

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.vercel.app/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      tags: z.array(z.string()).optional(),
    }),
  },
  dir: './content/notes',
  meta: {
    schema: metaSchema,
  },
});

export const tutorials = defineDocs({
  docs: {
	schema: frontmatterSchema.extend({
      tags: z.array(z.string()).optional(),
    })
  },
  dir: './content/tutorials',
  meta: {
	schema: metaSchema
  }
});

export const blogPosts = defineCollections({
	type: 'doc',
	dir: './content/blog',
	schema: frontmatterSchema.extend({
		author: z.string(),
		date: z.string().date().or(z.date()),
		tags: z.array(z.string()).optional(),
	})
})

export default defineConfig({
  mdxOptions: {
    // 添加自定义脚注插件
    rehypePlugins: [customFootnotePlugin],
	remarkPlugins: [remarkNpm],
  },
  lastModifiedTime: 'git',
});
