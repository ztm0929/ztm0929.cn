'use client';

import Link from 'next/link';
import {
  Activity,
  BarChart3,
  CircleDot,
  ExternalLink,
  Gauge,
  Globe2,
  LayoutDashboard,
  Newspaper,
  RefreshCw,
  Server,
  TerminalSquare,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useHomepageData } from '@/hooks/use-homepage-data';
import { useMarketSocket } from '@/hooks/use-market-socket';
import type {
  ConnectionStatus,
  HealthState,
  HomepageCategory,
  MarketTick,
  VpsMetric,
} from '@/lib/homepage/types';
import { cn } from '@/lib/cn';

const categories: Array<{
  id: HomepageCategory;
  label: string;
  description: string;
  icon: typeof LayoutDashboard;
}> = [
  {
    id: 'overview',
    label: 'Overview',
    description: '总览',
    icon: LayoutDashboard,
  },
  {
    id: 'rss',
    label: 'RSS',
    description: '资讯流',
    icon: Newspaper,
  },
  {
    id: 'vps',
    label: 'VPS',
    description: '基础设施',
    icon: Server,
  },
  {
    id: 'markets',
    label: 'Markets',
    description: '行情观察',
    icon: BarChart3,
  },
  {
    id: 'navigation',
    label: 'Navigation',
    description: '快捷导航',
    icon: Globe2,
  },
];

const statusTone: Record<HealthState, string> = {
  online: 'text-emerald-400',
  degraded: 'text-amber-400',
  offline: 'text-red-400',
  unknown: 'text-cyan-400',
};

function formatTime(value: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value));
}

function statusVariant(state: HealthState) {
  if (state === 'online') return 'success';
  if (state === 'degraded') return 'warning';
  if (state === 'offline') return 'danger';
  return 'outline';
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[11px] text-fd-muted-foreground">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-fd-secondary">
        <div
          className={cn(
            'h-full rounded-full',
            value >= 80
              ? 'bg-red-400'
              : value >= 60
                ? 'bg-amber-400'
                : 'bg-emerald-400',
          )}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

function StatusDot({ state }: { state: HealthState }) {
  return (
    <span className="relative flex size-2">
      <span
        className={cn(
          'absolute inline-flex h-full w-full rounded-full opacity-60',
          state === 'online' ? 'animate-ping bg-emerald-400' : 'bg-fd-muted',
        )}
      />
      <span
        className={cn(
          'relative inline-flex size-2 rounded-full',
          state === 'online'
            ? 'bg-emerald-400'
            : state === 'degraded'
              ? 'bg-amber-400'
              : state === 'offline'
                ? 'bg-red-400'
                : 'bg-cyan-400',
        )}
      />
    </span>
  );
}

function ConnectionStrip({ connections }: { connections: ConnectionStatus[] }) {
  return (
    <div className="grid gap-2 sm:grid-cols-3">
      {connections.map((connection) => (
        <div
          key={connection.id}
          className="flex min-w-0 items-center gap-2 rounded-md border border-fd-border bg-black/30 px-3 py-2"
        >
          <StatusDot state={connection.state} />
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-medium">{connection.label}</div>
            <div className="truncate text-[11px] text-fd-muted-foreground">
              {connection.detail}
            </div>
          </div>
          <span className="shrink-0 text-[10px] text-fd-muted-foreground">
            {formatTime(connection.updatedAt)}
          </span>
        </div>
      ))}
    </div>
  );
}

function MarketRows({ markets }: { markets: MarketTick[] }) {
  return (
    <div className="space-y-2">
      {markets.map((market) => (
        <div
          key={market.symbol}
          className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-md border border-fd-border bg-fd-background/70 p-3"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-semibold">{market.symbol}</span>
              <span className="truncate text-xs text-fd-muted-foreground">
                {market.label}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-fd-muted-foreground">
              {formatTime(market.updatedAt)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold tabular-nums">
              {market.price.toLocaleString('en-US', {
                maximumFractionDigits: 2,
              })}{' '}
              {market.currency}
            </div>
            <div
              className={cn(
                'text-xs tabular-nums',
                market.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400',
              )}
            >
              {market.changePercent >= 0 ? '+' : ''}
              {market.changePercent.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function VpsCard({ metric }: { metric: VpsMetric }) {
  return (
    <Card className="bg-black/25">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="truncate">{metric.name}</CardTitle>
            <CardDescription>
              {metric.region} / {metric.latencyMs ?? '-'} ms
            </CardDescription>
          </div>
          <Badge variant={statusVariant(metric.status)}>{metric.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <MetricBar label="CPU" value={metric.cpuPercent} />
        <MetricBar label="Memory" value={metric.memoryPercent} />
        <MetricBar label="Disk" value={metric.diskPercent} />
      </CardContent>
    </Card>
  );
}

export function HomepageDashboard() {
  const [activeCategory, setActiveCategory] =
    useState<HomepageCategory>('overview');
  const { data, loading, error, refresh } = useHomepageData();
  const marketSocket = useMarketSocket(data.markets);

  const connections = useMemo(
    () =>
      data.connections.map((connection) =>
        connection.id === 'markets' ? marketSocket.connection : connection,
      ),
    [data.connections, marketSocket.connection],
  );

  const onlineCount = connections.filter(
    (connection) => connection.state === 'online',
  ).length;
  const activeMarkets = marketSocket.ticks;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#070a0f] text-fd-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-3 py-4 sm:px-4 lg:flex-row lg:py-6">
        <aside className="shrink-0 rounded-lg border border-fd-border bg-[#0b1117] p-3 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:w-64">
          <div className="mb-4 flex items-center gap-2 px-2">
            <TerminalSquare className="size-5 text-emerald-400" />
            <div>
              <div className="text-sm font-semibold">ztm0929.homepage</div>
              <div className="text-[11px] text-fd-muted-foreground">
                public realtime console
              </div>
            </div>
          </div>
          <nav className="grid gap-1">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = category.id === activeCategory;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors',
                    active
                      ? 'bg-emerald-400/10 text-emerald-300 ring-1 ring-emerald-400/30'
                      : 'text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground',
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {category.label}
                    </span>
                    <span className="block truncate text-[11px]">
                      {category.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
          <Separator className="my-4" />
          <div className="space-y-2 px-2 text-xs text-fd-muted-foreground">
            <div className="flex items-center justify-between">
              <span>online feeds</span>
              <span className="font-mono text-emerald-400">
                {onlineCount}/{connections.length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>mode</span>
              <span className="font-mono text-cyan-300">public</span>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 space-y-4">
          <header className="rounded-lg border border-fd-border bg-[#0b1117] p-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="font-mono">
                    /homepage
                  </Badge>
                  <Badge variant={loading ? 'warning' : 'success'}>
                    {loading ? 'syncing' : 'ready'}
                  </Badge>
                  {error && <Badge variant="warning">degraded</Badge>}
                </div>
                <h1 className="text-2xl font-semibold tracking-normal sm:text-3xl">
                  Personal Realtime Dashboard
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-fd-muted-foreground">
                  RSS, VPS health, market ticks, and daily launch links in one
                  public browser homepage. Sensitive details stay out of the UI.
                </p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => void refresh()}
                className="w-full justify-center md:w-auto"
              >
                <RefreshCw className="size-3.5" />
                Refresh
              </Button>
            </div>
            <div className="mt-4">
              <ConnectionStrip connections={connections} />
            </div>
          </header>

          {(activeCategory === 'overview' || activeCategory === 'markets') && (
            <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
              <Card className="bg-[#0b1117]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="size-4 text-cyan-300" />
                    <CardTitle>Markets Watchlist</CardTitle>
                  </div>
                  <CardDescription>
                    WebSocket-ready observation list. No trading advice.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketRows markets={activeMarkets} />
                </CardContent>
              </Card>

              <Card className="bg-[#0b1117]">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Activity className="size-4 text-emerald-300" />
                    <CardTitle>Signal Log</CardTitle>
                  </div>
                  <CardDescription>Latest public connection state.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {connections.map((connection) => (
                    <div key={connection.id} className="flex gap-3">
                      <CircleDot
                        className={cn('mt-0.5 size-4', statusTone[connection.state])}
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium">{connection.label}</div>
                        <div className="text-xs text-fd-muted-foreground">
                          {connection.detail}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          )}

          {(activeCategory === 'overview' || activeCategory === 'vps') && (
            <section className="grid gap-4 md:grid-cols-2">
              {data.vps.map((metric) => (
                <VpsCard key={metric.id} metric={metric} />
              ))}
            </section>
          )}

          {(activeCategory === 'overview' || activeCategory === 'rss') && (
            <Card className="bg-[#0b1117]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Newspaper className="size-4 text-amber-300" />
                  <CardTitle>RSS Briefing</CardTitle>
                </div>
                <CardDescription>
                  Cached summary stream, ready to replace with real RSS gateway.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 lg:grid-cols-3">
                {data.rss.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-md border border-fd-border bg-black/25 p-3 transition-colors hover:border-emerald-400/40"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <Badge variant="secondary">{item.source}</Badge>
                      <ExternalLink className="size-3.5 text-fd-muted-foreground group-hover:text-emerald-300" />
                    </div>
                    <h2 className="line-clamp-2 text-sm font-semibold leading-5">
                      {item.title}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-fd-muted-foreground">
                      {item.summary}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}

          {(activeCategory === 'overview' || activeCategory === 'navigation') && (
            <Card className="bg-[#0b1117]">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gauge className="size-4 text-cyan-300" />
                  <CardTitle>Launchpad</CardTitle>
                </div>
                <CardDescription>Daily links grouped for fast startup.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {data.navigation.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="rounded-md border border-fd-border bg-black/25 p-3 transition-colors hover:border-cyan-400/40 hover:bg-cyan-400/5"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold">
                          {link.label}
                        </div>
                        <div className="mt-1 truncate text-[11px] text-fd-muted-foreground">
                          {link.group}
                        </div>
                      </div>
                      <ExternalLink className="size-3.5 shrink-0 text-fd-muted-foreground" />
                    </div>
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-fd-muted-foreground">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </main>
  );
}
