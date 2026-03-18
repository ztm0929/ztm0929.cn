import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
  defineCollections,
} from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { remarkNpm, type RehypeCodeOptions } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

const rehypeCodeOptions: Partial<RehypeCodeOptions> = {
  icon: {
    shortcuts: {
      powershell: 'shellscript',
      pwsh: 'shellscript',
      ps1: 'shellscript',
    },
  },
};

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

export const tutorials = defineDocs({
  docs: {
	schema: frontmatterSchema.extend({
      tags: z.array(z.string()).optional(),
      draft: z.boolean().default(false),
    })
  },
  dir: './content/docs',
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
    draft: z.boolean().default(false),
	})
})

export default defineConfig({
  plugins: [lastModified()],
  mdxOptions: {
    rehypeCodeOptions: rehypeCodeOptions as RehypeCodeOptions,
    // 添加自定义脚注插件
    rehypePlugins: [customFootnotePlugin],
	remarkPlugins: [remarkNpm],
  },
});
