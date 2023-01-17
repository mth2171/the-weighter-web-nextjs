/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   webpack5: true,
   webpack: (config) => {
      config.resolve.fallback = { fs: false, module: false };

      return config;
   },
//   async rewrites() {
//     return [
//        {
//           source: "/:path*",
//           destination: "http://localhost:3080/:path*",
//        },
//     ];
//  },
};

module.exports = nextConfig;
