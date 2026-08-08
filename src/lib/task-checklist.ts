export type ChecklistState = Record<string, true>;

export function getChecklistStorageKey(pathname: string): string {
  return `docs-checklist:${pathname}`;
}

export function parseChecklistState(value: string | null): ChecklistState {
  if (!value) return {};

  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).filter((entry): entry is [string, true] => entry[1] === true),
    );
  } catch {
    return {};
  }
}

export function serializeChecklistState(state: Record<string, boolean>): string {
  return JSON.stringify(
    Object.fromEntries(Object.entries(state).filter((entry): entry is [string, true] => entry[1] === true)),
  );
}
