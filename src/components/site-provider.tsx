'use client';

import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider/next';
import CustomSearchDialog from '@/components/search-dialog';

export default function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog: CustomSearchDialog,
      }}
      i18n={{
        locale: 'cn',
        translations: {
          search: '搜索',
          searchNoResult: '没有找到相关结果',
          chooseLanguage: '选择语言',
          chooseTheme: '选择主题',
          editOnGithub: '在 GitHub 上编辑',
          lastUpdate: '最后更新于',
          previousPage: '上一页',
          nextPage: '下一页',
          toc: '目录',
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
