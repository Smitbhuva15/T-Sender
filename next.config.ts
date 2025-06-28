import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Instructs Next.js to output static HTML/CSS/JS files
  output: 'export',

  // Specifies the directory for the static output (Fleek often expects 'out')
  distDir: 'out',

  // Required for static export as Next.js image optimization needs a server
  images: {
    unoptimized: true,
  },

  // Set the base path if deploying to a subdirectory (empty for root)
  basePath: "",

  // Ensures assets are referenced correctly in static exports, especially for IPFS
  assetPrefix: "/",

  // Adds trailing slashes to URLs (e.g., /about/), often expected by static hosts like Fleek
  trailingSlash: true
};

export default nextConfig;