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
    }
}

export default nextConfig
