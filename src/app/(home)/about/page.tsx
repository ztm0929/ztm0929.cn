import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: '关于我',
  description: '👋 Hi，我叫『 天明 』',
  openGraph: {
    title: '关于我',
    description: '👋 Hi，我叫『 天明 』',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '关于我',
    description: '👋 Hi，我叫『 天明 』',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}