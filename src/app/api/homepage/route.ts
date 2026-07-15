import { NextResponse } from 'next/server';

import { fetchBeszelVpsMetrics } from '@/lib/homepage/beszel';
import { mockHomepageData } from '@/lib/homepage/mock-data';
import type { HomepageData, RssItem, VpsMetric } from '@/lib/homepage/types';

export const revalidate = 30;

async function fetchJson<T>(url: string | undefined): Promise<T | null> {
  if (!url) return null;

  try {
    const response = await fetch(url, {
      next: { revalidate: 30 },
      headers: {
        accept: 'application/json',
      },
    });

    if (!response.ok) return null;

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function GET() {
  const [rss, configuredVps, beszelVps] = await Promise.all([
    fetchJson<RssItem[]>(process.env.HOMEPAGE_RSS_ENDPOINT),
    fetchJson<VpsMetric[]>(process.env.HOMEPAGE_VPS_ENDPOINT),
    fetchBeszelVpsMetrics().catch(() => null),
  ]);
  const vps = beszelVps && beszelVps.length > 0 ? beszelVps : configuredVps;

  const data: HomepageData = {
    ...mockHomepageData,
    rss: rss && rss.length > 0 ? rss : mockHomepageData.rss,
    vps: vps && vps.length > 0 ? vps : mockHomepageData.vps,
    connections: mockHomepageData.connections.map((connection) => {
      if (connection.id === 'rss' && rss) {
        return {
          ...connection,
          state: 'online',
          detail: `${rss.length} remote items`,
          updatedAt: new Date().toISOString(),
        };
      }

      if (connection.id === 'vps' && vps) {
        return {
          ...connection,
          state: 'online',
          detail: `${vps.length} remote targets`,
          updatedAt: new Date().toISOString(),
        };
      }

      return connection;
    }),
  };

  return NextResponse.json(data);
}
