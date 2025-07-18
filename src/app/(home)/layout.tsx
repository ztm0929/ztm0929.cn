import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/app/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeLayout {...baseOptions} links={[{ text: '笔记', url: '/notes', active: 'nested-url' }, { text: '教程', url: '/tutorials', active: 'nested-url' }, { text: '博客', url: '/blog', active: 'nested-url' }, { text: 'Memos', url: 'https://memos.ztm0929.cn' }, { text: 'Wiki', url: 'https://wiki.ztm0929.cn' }, { text: 'NaaS', url: 'https://ztm0929.net' }, { text: '关于我', url: '/about', active: 'nested-url' }]}>{children}</HomeLayout>;
}
