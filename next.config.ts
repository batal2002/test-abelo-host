import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactCompiler: true,
    allowedDevOrigins: ['192.168.0.116'],
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dummyjson.com',
            },
            {
                protocol: 'https',
                hostname: 'dummyjson.com',
            },
        ],
    },
}

export default nextConfig
