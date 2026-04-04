import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import * as AccordionComponents from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import type { StaticImageData } from 'next/image';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

function DraftNotice({
  title = '草稿提示',
  children = '本文未完工',
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <Callout type="warn" title={title}>
      {children}
    </Callout>
  );
}

function isStaticImageData(value: unknown): value is StaticImageData {
  return (
    typeof value === 'object' &&
    value !== null &&
    'src' in value &&
    typeof (value as { src: unknown }).src === 'string'
  );
}

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    DraftNotice,
    pre: ({ ref: _ref, ...props }) => <CodeBlock {...props}><Pre>{props.children}</Pre></CodeBlock>,
    img: ({ src, ...props }) => {
      const isSupportedSrc =
        typeof src === 'string' ||
        typeof src === 'undefined' ||
        isStaticImageData(src);

      if (!isSupportedSrc) return null;

      return <ImageZoom {...props} src={src} />;
    },
    ...AccordionComponents,
    ...TabsComponents,
    ...components,
  };
}
