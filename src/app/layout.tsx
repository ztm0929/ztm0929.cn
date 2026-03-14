import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://ztm0929.cn'),
	title: 'ztm0929'
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="ztm0929" />
      </head>
      <body className="flex flex-col min-h-screen">
        <RootProvider
			search={{ options: { type: 'static'}}}
			i18n={{ locale: 'cn', translations: {
				search: '搜索',
				searchNoResult: '没有找到相关结果',
				chooseLanguage: '选择语言',
				chooseTheme: '选择主题',
				editOnGithub: '在 GitHub 上编辑',
				lastUpdate: '最后更新于',
				previousPage: '上一页',
				nextPage: '下一页',
				toc: '目录',
			} }}
		>
			{children}
		</RootProvider>
      </body>
    </html>
  );
}