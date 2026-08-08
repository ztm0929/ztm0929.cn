export function isSameLocation(target: string, current: string): boolean {
  const targetUrl = new URL(target, current);
  const currentUrl = new URL(current);

  return (
    targetUrl.origin === currentUrl.origin &&
    targetUrl.pathname === currentUrl.pathname &&
    targetUrl.search === currentUrl.search &&
    targetUrl.hash === currentUrl.hash
  );
}
