import './global.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Metadata } from 'next';
import SiteProvider from '@/components/site-provider';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL('https://ztm0929.cn'),
	title: 'ztm0929'
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
		<html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="ztm0929" />
      </head>
      <body className="flex flex-col min-h-screen">
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}