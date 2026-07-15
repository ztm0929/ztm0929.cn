import type { HealthState, VpsMetric } from './types';

type BeszelAuthResponse = {
  token?: string;
};

type BeszelSystemRecord = {
  id: string;
  name: string;
  host?: string;
  status?: string;
  updated?: string;
  info?: {
    cpu?: number;
    mp?: number;
    dp?: number;
  };
};

type BeszelListResponse = {
  items?: BeszelSystemRecord[];
};

function trimUrl(url: string) {
  return url.replace(/\/+$/, '');
}

function normalizePercent(value: unknown) {
  if (typeof value !== 'number' || Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function mapStatus(status: string | undefined): HealthState {
  if (status === 'up') return 'online';
  if (status === 'down') return 'offline';
  if (status === 'paused' || status === 'pending') return 'degraded';
  return 'unknown';
}

async function beszelFetch<T>(
  baseUrl: string,
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${trimUrl(baseUrl)}${path}`, {
    ...init,
    next: { revalidate: 30 },
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Beszel API returned ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchBeszelVpsMetrics(): Promise<VpsMetric[] | null> {
  const baseUrl = process.env.HOMEPAGE_BESZEL_URL;
  const identity = process.env.HOMEPAGE_BESZEL_EMAIL;
  const password = process.env.HOMEPAGE_BESZEL_PASSWORD;

  if (!baseUrl || !identity || !password) return null;

  const auth = await beszelFetch<BeszelAuthResponse>(
    baseUrl,
    '/api/collections/users/auth-with-password',
    {
      method: 'POST',
      body: JSON.stringify({
        identity,
        password,
      }),
    },
  );

  if (!auth.token) {
    throw new Error('Beszel auth response did not include a token');
  }

  const systems = await beszelFetch<BeszelListResponse>(
    baseUrl,
    '/api/collections/systems/records?perPage=100&sort=name',
    {
      headers: {
        authorization: `Bearer ${auth.token}`,
      },
    },
  );

  return (systems.items ?? []).map((system) => ({
    id: system.id,
    name: system.name,
    region: system.host ? 'Beszel' : 'Unknown',
    status: mapStatus(system.status),
    latencyMs: null,
    cpuPercent: normalizePercent(system.info?.cpu),
    memoryPercent: normalizePercent(system.info?.mp),
    diskPercent: normalizePercent(system.info?.dp),
    updatedAt: system.updated
      ? new Date(system.updated).toISOString()
      : new Date().toISOString(),
  }));
}
