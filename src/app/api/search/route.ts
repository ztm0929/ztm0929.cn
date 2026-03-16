import { blog, source, tutorialsSource } from '@/lib/source';
import { createI18nSearchAPI } from 'fumadocs-core/search/server';
import { createTokenizer } from '@orama/tokenizers/mandarin';

export const revalidate = false;

const pages = [
	...source.getPages(),
	...tutorialsSource.getPages(),
	...blog.getPages(),
];

const searchAPI = createI18nSearchAPI('advanced', {
	i18n: {
		languages: ['cn'],
		defaultLanguage: 'cn',
	},
	indexes: pages.map((page) => ({
		locale: 'cn',
		id: page.url,
		title: page.data.title,
		description: page.data.description,
		url: page.url,
		structuredData: page.data.structuredData,
	})),
	localeMap: {
		cn: {
			components: {
				tokenizer: createTokenizer(),
			},
			search: {
				threshold: 0,
				tolerance: 0,
			},
		},
	},
});

export const { staticGET: GET } = searchAPI;
