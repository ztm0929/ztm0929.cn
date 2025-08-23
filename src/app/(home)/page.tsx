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
		<LastUpdated className="text-fd-muted-foreground mt-2"/>
      </div>
      <footer className="mb-8 text-xs text-fd-muted-foreground flex flex-col items-center gap-2">
        <p className="text-fd-muted-foreground text-sm">
          本站使用{' '}
          <Link href="https://fumadocs.dev" className="text-fd-foreground font-semibold underline" target='_blank' rel="noopener noreferrer">
          Fumadocs
          </Link>{' '}
          构建 ❤
        </p>
        <Link href="https://beian.miit.gov.cn/" target='_blank' rel="noopener noreferrer">粤ICP备2024199605号-2</Link>
        <Link href="https://beian.mps.gov.cn/#/query/webSearch" target='_blank' rel="noopener noreferrer">
          粤公网安备44030002005195号
        </Link>
      </footer>
    </main>
  );
}