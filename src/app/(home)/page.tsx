import Link from 'next/link';

export default function HomePage() {
  return (
      <main className="flex flex-1 flex-col justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold">Hello World</h1>
        <p className="text-fd-muted-foreground">
          You can open{' '}
          <Link
            href="/docs"
            className="text-fd-foreground font-semibold underline"
          >
            /docs
          </Link>{' '}
          and see the documentation.
        </p>
		<footer className="mt-8 text-xs text-fd-muted-foreground flex flex-col items-center">
			<a href="https://beian.miit.gov.cn/">粤ICP备2024199605号-2</a>
			<a href="https://beian.mps.gov.cn/#/query/webSearch">
				粤公网安备44030002005195号
			</a>
		</footer>
      </main>
  );
}
