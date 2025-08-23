import { execSync } from 'child_process';

export function getLastCommitTimestamp(): number {
  try {
    const timestamp = execSync('git log -1 --format=%ct', { encoding: 'utf8' });
    return parseInt(timestamp.trim()) * 1000;
  } catch (error) {
    console.warn('Failed to get git commit time, using current time:', error);
    return Date.now();
  }
}

export function getDaysAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  
  if (days === 0) return '今天';
  if (days === 1) return '1天前';
  return `${days}天前`;
}