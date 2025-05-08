import type { NextConfig } from 'next'

const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/',
        destination: '/sign-in-page',
        permanent: true,
      }
    ];
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // Add the domains you want to allow
  },
  env: {
    MY_ENV_KEY: process.env.DATABASE_URL, // Add your environment key-value pair here
  },
} satisfies NextConfig;
 
export default nextConfig

