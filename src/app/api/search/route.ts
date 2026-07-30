import { blog, tutorialsSource } from '@/lib/source';
import { createI18nSearchAPI } from 'fumadocs-core/search/server';

export const revalidate = false;

const pages = [
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
			language: 'multilingual',
			search: {
				threshold: 0,
				tolerance: 0,
			},
		},
	},
});

export const { staticGET: GET } = searchAPI;
