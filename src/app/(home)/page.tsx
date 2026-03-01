import Link from 'next/link';
import LastUpdated from '@/components/last-updated';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-between text-center">
      <div className="flex flex-col justify-center flex-1">
        <h1 className="mb-4 text-2xl font-bold">欢迎！</h1>
        <p className="text-fd-muted-foreground">
          访问{' '}
          <Link
            href="/notes"
            className="text-fd-foreground font-semibold underline"
          >
            /notes
          </Link>{' '}
          并查看笔记库
        </p>
      </div>
      <footer className="mb-8 text-xs text-fd-muted-foreground flex flex-col items-center gap-2">
        <Link href="https://beian.miit.gov.cn/" target='_blank' rel="noopener noreferrer">粤 ICP 备 2024199605 号 | ztm0929 © 2026</Link>
      </footer>
    </main>
  );
}