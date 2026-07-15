'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import type { ConnectionStatus, MarketTick } from '@/lib/homepage/types';

type MarketSocketMessage =
  | MarketTick
  | {
      ticks: MarketTick[];
    };

type MarketSocketState = {
  ticks: MarketTick[];
  connection: ConnectionStatus;
};

const disconnected: ConnectionStatus = {
  id: 'markets',
  label: 'Market WS',
  state: 'unknown',
  detail: 'set NEXT_PUBLIC_HOMEPAGE_MARKET_WS_URL to connect',
  updatedAt: new Date().toISOString(),
};

function isMarketTick(value: unknown): value is MarketTick {
  if (!value || typeof value !== 'object') return false;

  const tick = value as MarketTick;
  return (
    typeof tick.symbol === 'string' &&
    typeof tick.label === 'string' &&
    typeof tick.price === 'number' &&
    typeof tick.currency === 'string' &&
    typeof tick.changePercent === 'number' &&
    typeof tick.updatedAt === 'string'
  );
}

function mergeTicks(current: MarketTick[], incoming: MarketTick[]) {
  const bySymbol = new Map(current.map((tick) => [tick.symbol, tick]));

  for (const tick of incoming) {
    bySymbol.set(tick.symbol, tick);
  }

  return Array.from(bySymbol.values());
}

export function useMarketSocket(initialTicks: MarketTick[]): MarketSocketState {
  const [ticks, setTicks] = useState(initialTicks);
  const [connection, setConnection] = useState<ConnectionStatus>(disconnected);
  const retryRef = useRef<number | null>(null);

  useEffect(() => {
    setTicks(initialTicks);
  }, [initialTicks]);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_HOMEPAGE_MARKET_WS_URL;
    if (!url) {
      setConnection({
        ...disconnected,
        updatedAt: new Date().toISOString(),
      });
      return;
    }

    let socket: WebSocket | null = null;
    let closedByEffect = false;

    const connect = () => {
      socket = new WebSocket(url);
      setConnection({
        id: 'markets',
        label: 'Market WS',
        state: 'degraded',
        detail: 'connecting',
        updatedAt: new Date().toISOString(),
      });

      socket.addEventListener('open', () => {
        setConnection({
          id: 'markets',
          label: 'Market WS',
          state: 'online',
          detail: 'live stream connected',
          updatedAt: new Date().toISOString(),
        });
      });

      socket.addEventListener('message', (event) => {
        try {
          const message = JSON.parse(String(event.data)) as MarketSocketMessage;
          const incoming = Array.isArray((message as { ticks?: MarketTick[] }).ticks)
            ? (message as { ticks: MarketTick[] }).ticks.filter(isMarketTick)
            : isMarketTick(message)
              ? [message]
              : [];

          if (incoming.length > 0) {
            setTicks((current) => mergeTicks(current, incoming));
          }
        } catch {
          setConnection({
            id: 'markets',
            label: 'Market WS',
            state: 'degraded',
            detail: 'ignored malformed market message',
            updatedAt: new Date().toISOString(),
          });
        }
      });

      socket.addEventListener('close', () => {
        if (closedByEffect) return;

        setConnection({
          id: 'markets',
          label: 'Market WS',
          state: 'degraded',
          detail: 'reconnecting in 5s',
          updatedAt: new Date().toISOString(),
        });
        retryRef.current = window.setTimeout(connect, 5_000);
      });

      socket.addEventListener('error', () => {
        setConnection({
          id: 'markets',
          label: 'Market WS',
          state: 'degraded',
          detail: 'socket error',
          updatedAt: new Date().toISOString(),
        });
      });
    };

    connect();

    return () => {
      closedByEffect = true;
      if (retryRef.current) {
        window.clearTimeout(retryRef.current);
      }
      socket?.close();
    };
  }, []);

  return useMemo(
    () => ({
      ticks,
      connection,
    }),
    [connection, ticks],
  );
}
