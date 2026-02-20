import Link from "next/link";
import type { SimpleIcon } from 'simple-icons';
import { siGithub, siBilibili, siYoutube, siV0, siV2ex, siX, siTailwindcss, siNextdotjs } from 'simple-icons';

type LinkItem = { name: string; href: string; icon?: SimpleIcon };

const LINKS: LinkItem[] = [
  { name: "GitHub", href: "https://github.com", icon: siGithub },
  { name: "v0", href: "https://v0.dev", icon: siV0 },
  { name: "V2EX", href: "https://www.v2ex.com", icon: siV2ex },
  { name: "Bilibili", href: "https://www.bilibili.com", icon: siBilibili },
  { name: "YouTube", href: "https://www.youtube.com", icon: siYoutube },
  { name: "Twitter", href: "https://twitter.com", icon: siX },
  { name: "tailwindcss", href: "https://tailwindcss.com", icon: siTailwindcss },
  { name: "Next.js", href: "https://nextjs.org", icon: siNextdotjs },
];
	
export default function Page() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="mx-auto max-w-4xl w-full">
		<h1 className="mb-6 text-2xl font-bold text-center">常用链接</h1>
        <section className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {LINKS.map(({ name, href, icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}（新窗口打开）`}
                className="group relative flex items-center gap-3 overflow-hidden rounded-xl border bg-card p-3 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-secondary ring-1 ring-border transition-all group-hover:bg-accent">
                  {icon ? (
                    <svg
                      className="h-4 w-4 text-muted-foreground group-hover:text-foreground"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      role="img"
                    >
                      <path d={icon.path} fill="currentColor" />
                    </svg>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-foreground transition-colors" />
                  )}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {name}
                </span>
                <span className="ml-auto text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}