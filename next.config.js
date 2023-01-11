/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
   domains: ['https://dummyjson.com/products', 'i.dummyjson.com'],
   unoptimized: true
  }
}

module.exports = nextConfig
