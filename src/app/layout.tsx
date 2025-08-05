import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
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
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="0ac7bec1-f40f-40f0-9102-48e55206bd62"
          strategy="afterInteractive"
        />
        <RootProvider
			search={{ options: { type: 'static'}}}
			// i18n={{ locale: 'cn', translations: {
			// 	lastUpdate: '最后更新于',
			// 	previousPage: '上一页',
			// 	nextPage: '下一页',
			// 	toc: '目录',
			// } }}
		>
			{children}
		</RootProvider>
      </body>
    </html>
  );
}