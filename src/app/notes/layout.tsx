import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { GraduationCap, Tags } from 'lucide-react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions} links={[
      { text: '教程', url: '/tutorials', icon: <GraduationCap /> },
      { text: '标签', url: '/tags', icon: <Tags /> }
    ]}>
      {children}
    </DocsLayout>
  );
}
