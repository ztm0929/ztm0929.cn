import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider
			search={{ enabled: false }}
			i18n={{ locale: 'cn', translations: {
				lastUpdate: '最后更新于',
				previousPage: '上一页',
				nextPage: '下一页'
			} }}>
			{children}
		</RootProvider>
      </body>
    </html>
  );
}
