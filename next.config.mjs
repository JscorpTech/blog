import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8085',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'blog.jscorp.uz',
        pathname: '/**',
      },
    ],
  },
};

export default withMDX(nextConfig);
