'use client';

import { useEffect, useRef } from 'react';

type TerminalPlayerProps = {
  src: string;
  poster?: string;
  theme?: string;
  loop?: boolean;
  autoPlay?: boolean;
  preload?: boolean;
  startAt?: number;
  className?: string;
};

export function TerminalPlayer({
  src,
  poster,
  theme = 'dracula',
  loop = true,
  autoPlay = false,
  preload = true,
  startAt,
  className,
}: TerminalPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let disposed = false;

    async function loadPlayer() {
      const container = containerRef.current;

      if (!container) return;

      container.innerHTML = '';

      const module = await import('asciinema-player');
      const AsciinemaPlayer = module.default ?? module;

      if (disposed) return;

      const player = AsciinemaPlayer.create(src, container, {
        poster,
        theme,
        loop,
        autoPlay,
        preload,
        startAt,
      });

      return () => {
        player.dispose();
        container.innerHTML = '';
      };
    }

    let cleanup: void | (() => void);

    loadPlayer().then((fn) => {
      cleanup = fn;
    });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [src, poster, theme, loop, autoPlay, preload, startAt]);

  return <div ref={containerRef} className={className} />;
}