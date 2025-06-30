import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions} links={[{ text: '笔记', url: '/notes', secondary: false, active: 'nested-url' }, { text: '博客', url: '/blog', secondary: false, active: 'nested-url' }]}>{children}</HomeLayout>;
}
