const config = {
    async rewrites() {
        return [
            {
                source: '/f/:path*',
                destination: process.env.FLASK_API || ''
            },
            {
                source: '/s/:path*',
                destination: process.env.SPRING_API || ''
            },
        ];
    },
};

export default config;
