const withPWA = require("@ducanh2912/next-pwa").default({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    reloadOnOnline: true,
    aggressiveFrontEndNavCaching: true
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents: true,
        removeConsole: process.env.NODE_ENV !== 'development'
    },
    experimental: {
        forceSwcTransforms: true,
      },
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/**'
            }
        ]
    },
}

module.exports = withPWA(nextConfig);
