'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import {
  getChecklistStorageKey,
  parseChecklistState,
  serializeChecklistState,
} from '@/lib/task-checklist';

export function InteractiveTaskList() {
  const pathname = usePathname();

  useEffect(() => {
    const storageKey = getChecklistStorageKey(pathname);
    let state = parseChecklistState(window.localStorage.getItem(storageKey));
    const items = Array.from(document.querySelectorAll<HTMLLIElement>('li.task-list-item'));

    const save = () => {
      try {
        window.localStorage.setItem(storageKey, serializeChecklistState(state));
      } catch {
        // Keep the current session interactive when persistent storage is unavailable.
      }
    };

    const cleanups = items.map((item, index) => {
      const input = item.querySelector<HTMLInputElement>('input[type="checkbox"]');
      if (!input) return () => {};

      const taskId = `${index}:${item.textContent?.trim() ?? ''}`;
      const update = (checked: boolean) => {
        input.checked = checked;
        item.dataset.completed = String(checked);
      };

      input.disabled = false;
      input.setAttribute('aria-label', `完成：${item.textContent?.trim() ?? '任务'}`);
      update(state[taskId] === true);

      const onChange = () => {
        if (input.checked) state = { ...state, [taskId]: true };
        else {
          const { [taskId]: _, ...remaining } = state;
          state = remaining;
        }
        update(input.checked);
        save();
      };

      input.addEventListener('change', onChange);
      return () => input.removeEventListener('change', onChange);
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [pathname]);

  return null;
}
