import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'kz2qvwcp-3000.usw3.devtunnels.ms']
    }
  }
}

export default nextConfig
