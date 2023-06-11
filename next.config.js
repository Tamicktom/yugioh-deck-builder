/** @type {import('next').NextConfig} */
const nextConfig = {
  //add image domains here
  images: {
    domains: ['images.ygoprodeck.com'],
  },
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
