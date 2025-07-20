import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center min-h-[80vh]">
      <div className="max-w-md mx-auto px-4">
        {/* 404 标题 */}
        <h1 className="text-8xl font-bold text-fd-muted-foreground mb-4">404</h1>
        
        {/* 错误描述 */}
        <h2 className="text-2xl font-semibold mb-4">页面未找到</h2>
        <p className="text-fd-muted-foreground mb-8">
          抱歉，您访问的页面不存在或已被移动。
        </p>
        
        {/* 操作按钮 */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-fd-primary px-6 py-3 text-sm font-medium text-fd-primary-foreground hover:bg-fd-primary/90 transition-colors"
          >
            回到主页
          </Link>
          
          <Link
            href="/notes"
            className="inline-flex items-center justify-center rounded-md border border-fd-border px-6 py-3 text-sm font-medium hover:bg-fd-accent transition-colors"
          >
            查看笔记
          </Link>
        </div>
      </div>
    </main>
  );
}
