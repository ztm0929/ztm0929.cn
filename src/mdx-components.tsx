import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import type { MDXComponents } from 'mdx/types';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: ({ src, ...props }) => {
      if (typeof src !== 'string' && typeof src !== 'undefined') return null;

      return <ImageZoom {...props} src={src} />;
    },
    ...TabsComponents,
    ...components,
  };
}
