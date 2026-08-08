import { House, Notebook, StickyNote } from 'lucide-react';

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
    icon: <House className="size-full text-fd-foreground" />,
  },
  {
    title: 'Handbook',
    description: '个人工具手册',
    url: '/handbook',
    icon: <Notebook className="size-full text-fd-foreground" />,
  },
  {
    title: 'Notes',
    description: '随便记点',
    url: '/notes',
    icon: <StickyNote className="size-full text-fd-foreground" />,
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
