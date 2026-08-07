'use client';

import type { ReactNode } from 'react';
import { defineTranslations } from 'fumadocs-core/i18n';
import { i18nProvider, uiTranslations } from 'fumadocs-ui/i18n';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { zhCN } from '@fumadocs/language/zh-cn';

import CustomSearchDialog from '@/components/search-dialog';

const translations = defineTranslations()
  .extend(uiTranslations())
  .preset(zhCN());

export default function SiteProvider({ children }: { children: ReactNode }) {
  return (
    <RootProvider
      search={{
        SearchDialog: CustomSearchDialog,
      }}
      i18n={i18nProvider(translations)}
    >
      {children}
    </RootProvider>
  );
}
