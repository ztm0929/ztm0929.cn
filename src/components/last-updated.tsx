import { getLastCommitTimestamp, getDaysAgo } from '@/lib/git-info';

interface LastUpdatedProps {
  className?: string;
}

export default function LastUpdated({ className }: LastUpdatedProps) {
  const timestamp = getLastCommitTimestamp();
  const relativeTime = getDaysAgo(timestamp);

  return (
    <span className={className || "text-xs text-fd-muted-foreground"}>
      最后更新于{relativeTime}
    </span>
  );
}