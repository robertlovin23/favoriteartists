/** @type {import('next').NextConfig} */

const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/auth/:path*',
            destination: 'http://localhost:5000/auth/:path*' // Proxy to Backend
          },
          {
            source: '/api/:path*',
            destination: 'http://localhost:5000/api/:path*' // Proxy to Backend
          }
        ]
    }
}

module.exports = nextConfig
