'use client';

import { create } from '@orama/orama';
import { createTokenizer } from '@orama/tokenizers/mandarin';
import { useDocsSearch } from 'fumadocs-core/search/client';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { useI18n } from 'fumadocs-ui/contexts/i18n';

function initOrama(locale?: string) {
  if (locale === 'cn') {
    return create({
      schema: { _: 'string' },
      components: {
        tokenizer: createTokenizer(),
      },
    });
  }

  return create({
    schema: { _: 'string' },
    language: 'english',
  });
}

export default function CustomSearchDialog(props: SharedProps) {
  const { locale } = useI18n();
  const { search, setSearch, query } = useDocsSearch({
    type: 'static',
    initOrama,
    locale,
  });

  const items = query.data !== 'empty' ? query.data : null;
  const errorMessage =
    query.error instanceof Error ? query.error.message : query.error ? String(query.error) : null;

  return (
    <SearchDialog search={search} onSearchChange={setSearch} isLoading={query.isLoading} {...props}>
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        {errorMessage ? (
          <div className="px-4 pb-4 text-sm text-fd-muted-foreground">
            搜索暂时不可用，请稍后重试。
            {process.env.NODE_ENV === 'development' ? (
              <div className="mt-2 break-all font-mono text-xs">{errorMessage}</div>
            ) : null}
          </div>
        ) : (
          <SearchDialogList items={items} />
        )}
      </SearchDialogContent>
    </SearchDialog>
  );
}
