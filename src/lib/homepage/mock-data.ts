import { homepageConfig } from './config';
import type { HomepageData } from './types';

const now = new Date('2026-07-15T13:00:00+08:00').toISOString();

export const mockHomepageData: HomepageData = {
  rss: [
    {
      id: 'rss-1',
      source: 'Next.js',
      title: 'Next.js 16 dashboard route ready for dynamic rendering',
      url: 'https://nextjs.org/blog',
      publishedAt: now,
      summary: 'Static content stays cache friendly while the homepage can hydrate live widgets.',
    },
    {
      id: 'rss-2',
      source: 'EdgeOne',
      title: 'Pages Functions and Node runtime fit public data gateways',
      url: 'https://edgeone.ai/document/187317862488723456',
      publishedAt: now,
      summary: 'Serverless functions can aggregate public RSS, health, and market feeds.',
    },
    {
      id: 'rss-3',
      source: 'GitHub',
      title: 'Repository activity stream placeholder',
      url: 'https://github.blog',
      publishedAt: now,
      summary: 'This mock item keeps the dashboard useful before real RSS is configured.',
    },
  ],
  vps: [
    {
      id: 'core-vps',
      name: 'Core VPS',
      region: 'AP-SG',
      status: 'online',
      latencyMs: 43,
      cpuPercent: 18,
      memoryPercent: 46,
      diskPercent: 61,
      updatedAt: now,
    },
    {
      id: 'edge-proxy',
      name: 'Edge Proxy',
      region: 'AP-HK',
      status: 'degraded',
      latencyMs: 92,
      cpuPercent: 57,
      memoryPercent: 68,
      diskPercent: 74,
      updatedAt: now,
    },
  ],
  markets: [
    {
      symbol: 'BTC-USD',
      label: 'Bitcoin',
      price: 64320.42,
      currency: 'USD',
      changePercent: 1.84,
      updatedAt: now,
    },
    {
      symbol: 'ETH-USD',
      label: 'Ethereum',
      price: 3428.18,
      currency: 'USD',
      changePercent: -0.62,
      updatedAt: now,
    },
    {
      symbol: 'USD-CNY',
      label: 'USD/CNY',
      price: 7.18,
      currency: 'CNY',
      changePercent: 0.12,
      updatedAt: now,
    },
    {
      symbol: 'AAPL',
      label: 'Apple',
      price: 214.08,
      currency: 'USD',
      changePercent: 0.41,
      updatedAt: now,
    },
  ],
  navigation: homepageConfig.navigationLinks,
  connections: [
    {
      id: 'rss',
      label: 'RSS Gateway',
      state: 'online',
      detail: 'mock data active',
      updatedAt: now,
    },
    {
      id: 'vps',
      label: 'VPS Monitor',
      state: 'degraded',
      detail: 'waiting for HOMEPAGE_VPS_ENDPOINT',
      updatedAt: now,
    },
    {
      id: 'markets',
      label: 'Market WS',
      state: 'unknown',
      detail: 'set NEXT_PUBLIC_HOMEPAGE_MARKET_WS_URL to connect',
      updatedAt: now,
    },
  ],
};
