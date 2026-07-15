import type { Metadata } from 'next';

import { HomepageDashboard } from '@/components/homepage/homepage-dashboard';

export const metadata: Metadata = {
  title: 'Homepage | ztm0929',
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <HomepageDashboard />;
}
