import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your Next.js config here
  images: {
    domains: ['localhost', 'https://goodshop-roan.vercel.app/'],
  },
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Add externals to prevent bundling of problematic packages
    config.externals = config.externals || []

    // Mock problematic modules that cause bundling issues
    config.externals.push({
      'tap': '{}',
      'desm': '{}',
      'fastbench': '{}',
      'pino-elasticsearch': '{}',
      'why-is-node-running': '{}',
      'thread-stream/test': '{}',
    })

    return config
  },
}

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig) 