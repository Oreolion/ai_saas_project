import { hostname } from 'os';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lovely-flamingo-139.convex.cloud',
            },
            {
                protocol: 'https',
                hostname: 'perfect-gazelle-309.convex.cloud',
            },
        ]
    }
};

export default nextConfig;
