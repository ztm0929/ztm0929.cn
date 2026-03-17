import './global.css';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { Metadata } from 'next';
import SiteProvider from '@/components/site-provider';
import { AISearch, AISearchPanel, AISearchTrigger } from '@/components/ai/search';
import { MessageCircleIcon } from 'lucide-react';
import { cn } from '../../lib/cn';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';

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
        <AISearch>
          <AISearchPanel />
          <AISearchTrigger
            position="float"
            className={cn(
              buttonVariants({
                variant: 'secondary',
                className: 'text-fd-muted-foreground rounded-2xl',
              }),
            )}
          >
            <MessageCircleIcon className="size-4.5" />
            Ask AI
          </AISearchTrigger>
          <SiteProvider>{children}</SiteProvider>
        </AISearch>
      </body>
    </html>
  );
}