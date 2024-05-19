/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '8vt3uadzr0eirvxd.public.blob.vercel-storage.com',
                port: '',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false

        return config
    },
}

export default nextConfig
