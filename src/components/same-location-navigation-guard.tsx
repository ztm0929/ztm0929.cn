'use client';

import { useEffect } from 'react';

import { isSameLocation } from '@/lib/same-location';

export function SameLocationNavigationGuard() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>('a[data-active="true"][href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      if (!isSameLocation(link.href, window.location.href)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
