import type { Metadata } from 'next';
import Link from 'next/link';
import { siBilibili, siV2ex, siX, siYoutube } from 'simple-icons';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Home | ztm0929',
  description: '个人信息 Dashboard',
  robots: {
    index: false,
    follow: false,
  },
};

export const revalidate = 3600;

const coins = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'USDT',
  },
] as const;

const quickLinks = [
  {
    name: 'V2EX',
    href: 'https://www.v2ex.com',
    icon: siV2ex,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: siX,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com',
    icon: siYoutube,
  },
  {
    name: '哔哩哔哩',
    href: 'https://www.bilibili.com',
    icon: siBilibili,
  },
] as const;

type CoinId = (typeof coins)[number]['id'];
type PriceResponse = Partial<Record<CoinId, { usd: number }>>;

async function getPrices() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd',
      {
        headers: {
          accept: 'application/json',
        },
        next: {
          revalidate: 3600,
        },
        signal: AbortSignal.timeout(8_000),
      },
    );

    if (!response.ok) return null;

    return (await response.json()) as PriceResponse;
  } catch {
    return null;
  }
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value < 2 ? 4 : 2,
    maximumFractionDigits: value < 2 ? 6 : 2,
  }).format(value);
}

function EmptyArea({ label }: { label: string }) {
  return (
    <div className="flex min-h-48 items-center justify-center rounded-md border border-dashed border-fd-border bg-fd-muted/20">
      <p className="text-xs text-fd-muted-foreground">{label}</p>
    </div>
  );
}

export default async function HomePage() {
  const prices = await getPrices();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-fd-border pb-6">
        <p className="mt-2 max-w-2xl text-sm text-fd-muted-foreground">
          汇总服务状态、远程数据与近期信息
        </p>
      </div>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium">价格</h2>
          <p className="text-xs text-fd-muted-foreground">每小时刷新</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {coins.map((coin) => {
            const price = prices?.[coin.id]?.usd;

            return (
              <Card key={coin.id}>
                <CardHeader>
                  <CardDescription>{coin.symbol}</CardDescription>
                  <CardTitle>{coin.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-semibold tracking-tight tabular-nums">
                    {price === undefined ? '—' : formatPrice(price)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-sm font-medium">快速导航</h2>
        <div className="flex flex-wrap gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              title={link.name}
              className="group flex size-16 items-center justify-center rounded-xl border border-fd-border bg-fd-card outline-none transition-colors hover:border-fd-primary/50 hover:bg-fd-accent focus-visible:ring-2 focus-visible:ring-fd-ring sm:size-18"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="size-7 text-fd-foreground transition group-hover:scale-110 group-hover:text-fd-primary sm:size-8"
              >
                <path fill="currentColor" d={link.icon.path} />
              </svg>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-4 grid flex-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>概览</CardTitle>
            <CardDescription>主要数据将在这里展示</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyArea label="等待数据接入" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>动态</CardTitle>
            <CardDescription>来自远程数据源的最新信息</CardDescription>
          </CardHeader>
          <CardContent>
            <EmptyArea label="暂无动态" />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
