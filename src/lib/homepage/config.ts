import type { HomepageConfig } from './types';

export const homepageConfig = {
  rssSources: [
    {
      id: 'edgeone',
      label: 'EdgeOne Updates',
      url: 'https://edgeone.ai/document/release-notes',
    },
    {
      id: 'nextjs',
      label: 'Next.js',
      url: 'https://nextjs.org/blog',
    },
    {
      id: 'github',
      label: 'GitHub Blog',
      url: 'https://github.blog',
    },
  ],
  vpsTargets: [
    {
      id: 'core-vps',
      label: 'Core VPS',
      region: 'AP-SG',
    },
    {
      id: 'edge-proxy',
      label: 'Edge Proxy',
      region: 'AP-HK',
    },
  ],
  marketSymbols: [
    { symbol: 'BTC-USD', label: 'Bitcoin' },
    { symbol: 'ETH-USD', label: 'Ethereum' },
    { symbol: 'USD-CNY', label: 'USD/CNY' },
    { symbol: 'AAPL', label: 'Apple' },
  ],
  navigationLinks: [
    {
      id: 'docs',
      label: '小白教程库',
      href: '/docs',
      group: 'Site',
      description: '电脑软件配置教程入口',
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com',
      group: 'Dev',
      description: '代码、Issue 与项目协作',
    },
    {
      id: 'v0',
      label: 'v0',
      href: 'https://v0.dev',
      group: 'AI',
      description: '快速生成界面草稿',
    },
    {
      id: 'edgeone',
      label: 'EdgeOne',
      href: 'https://console.tencentcloud.com/edgeone',
      group: 'Ops',
      description: '站点部署与边缘配置',
    },
    {
      id: 'bilibili',
      label: 'Bilibili',
      href: 'https://www.bilibili.com',
      group: 'Media',
      description: '视频与订阅内容',
    },
  ],
} satisfies HomepageConfig;
