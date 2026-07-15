export type HomepageCategory = 'overview' | 'rss' | 'vps' | 'markets' | 'navigation';

export type HealthState = 'online' | 'degraded' | 'offline' | 'unknown';

export type ConnectionStatus = {
  id: string;
  label: string;
  state: HealthState;
  detail: string;
  updatedAt: string;
};

export type RssItem = {
  id: string;
  source: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
};

export type VpsMetric = {
  id: string;
  name: string;
  region: string;
  status: HealthState;
  latencyMs: number | null;
  cpuPercent: number;
  memoryPercent: number;
  diskPercent: number;
  updatedAt: string;
};

export type MarketTick = {
  symbol: string;
  label: string;
  price: number;
  currency: string;
  changePercent: number;
  updatedAt: string;
};

export type NavigationLink = {
  id: string;
  label: string;
  href: string;
  group: string;
  description: string;
};

export type HomepageData = {
  rss: RssItem[];
  vps: VpsMetric[];
  markets: MarketTick[];
  navigation: NavigationLink[];
  connections: ConnectionStatus[];
};

export type HomepageConfig = {
  rssSources: Array<{
    id: string;
    label: string;
    url: string;
  }>;
  vpsTargets: Array<{
    id: string;
    label: string;
    region: string;
  }>;
  marketSymbols: Array<{
    symbol: string;
    label: string;
  }>;
  navigationLinks: NavigationLink[];
};
