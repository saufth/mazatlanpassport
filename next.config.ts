import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: process.env.NODE_ENV !== 'production'
        ? ['localhost:3000']
        : undefined
    }
  }
}

export default nextConfig
