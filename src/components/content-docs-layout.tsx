import type { ReactNode } from 'react';
import type * as PageTree from 'fumadocs-core/page-tree';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { baseOptions } from '@/app/layout.config';
import { InteractiveTaskList } from '@/components/interactive-task-list';
import { SameLocationNavigationGuard } from '@/components/same-location-navigation-guard';

const contentTabs = [
  {
    title: '小白教程库',
    description: '解决小白的各种问题',
    url: '/docs',
  },
  {
    title: 'Handbook',
    description: '个人工具手册',
    url: '/handbook',
  },
  {
    title: 'Notes',
    description: '随便记点',
    url: '/notes',
  },
];

export function ContentDocsLayout({
  tree,
  children,
}: {
  tree: PageTree.Root;
  children: ReactNode;
}) {
  return (
    <DocsLayout {...baseOptions} tree={tree} tabs={contentTabs}>
      <InteractiveTaskList />
      <SameLocationNavigationGuard />
      {children}
    </DocsLayout>
  );
}
