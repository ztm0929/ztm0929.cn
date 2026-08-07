import type { ReactNode } from 'react';

import { ContentDocsLayout } from '@/components/content-docs-layout';
import { handbookSource } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ContentDocsLayout tree={handbookSource.pageTree}>
      {children}
    </ContentDocsLayout>
  );
}
