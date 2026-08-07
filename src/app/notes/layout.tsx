import type { ReactNode } from 'react';

import { ContentDocsLayout } from '@/components/content-docs-layout';
import { notesSource } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ContentDocsLayout tree={notesSource.pageTree}>
      {children}
    </ContentDocsLayout>
  );
}
