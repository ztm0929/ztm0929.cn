import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  images: {
	unoptimized: true,
  },
  trailingSlash: true,

  allowedDevOrigins: [
	'192.168.1.7'
  ],	
};

export default withMDX(config);
