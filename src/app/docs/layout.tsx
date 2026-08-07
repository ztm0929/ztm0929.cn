import type { ReactNode } from 'react';

import { ContentDocsLayout } from '@/components/content-docs-layout';
import { tutorialsSource } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ContentDocsLayout tree={tutorialsSource.pageTree}>
      {children}
    </ContentDocsLayout>
  );
}
