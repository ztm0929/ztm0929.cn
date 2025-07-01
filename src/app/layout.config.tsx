import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import Image from 'next/image';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className="flex items-center gap-2">
        <Image
          src="https://github.com/ztm0929.png"
          alt="个人头像"
          width={24}
          height={24}
          className="rounded-full"
          priority
        />
        <span>ztm0929</span>
      </div>
    ),
  },
  githubUrl: 'https://github.com/ztm0929',
  // see https://fumadocs.dev/docs/ui/navigation/links
  links: [],
};