'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { mockHomepageData } from '@/lib/homepage/mock-data';
import type { HomepageData, HealthState } from '@/lib/homepage/types';

type HomepageDataState = {
  data: HomepageData;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

function withClientTimestamp(state: HealthState, detail: string) {
  return {
    state,
    detail,
    updatedAt: new Date().toISOString(),
  };
}

export function useHomepageData(): HomepageDataState {
  const [data, setData] = useState<HomepageData>(mockHomepageData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch('/api/homepage/', {
        cache: 'no-store',
        headers: {
          accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`homepage api returned ${response.status}`);
      }

      const nextData = (await response.json()) as HomepageData;
      setData(nextData);
      setError(null);
    } catch (currentError) {
      setError(
        currentError instanceof Error
          ? currentError.message
          : 'homepage refresh failed',
      );
      setData((current) => ({
        ...current,
        connections: current.connections.map((connection) => {
          if (connection.id !== 'rss' && connection.id !== 'vps') {
            return connection;
          }

          return {
            ...connection,
            ...withClientTimestamp('degraded', 'using last known data'),
          };
        }),
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => {
      void refresh();
    }, 60_000);

    return () => window.clearInterval(timer);
  }, [refresh]);

  return useMemo(
    () => ({
      data,
      loading,
      error,
      refresh,
    }),
    [data, error, loading, refresh],
  );
}
