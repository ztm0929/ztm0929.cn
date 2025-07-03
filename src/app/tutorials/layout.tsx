import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { tutorialsSource } from '@/lib/source';
import { Notebook } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
	<DocsLayout tree={tutorialsSource.pageTree} {...baseOptions} links={[ { text: '笔记', url: '/notes', icon: <Notebook /> } ]}>
	  {children}
	</DocsLayout>
  );
}
