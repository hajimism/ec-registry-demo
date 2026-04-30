import type { NextConfig } from "next"

const isProd = process.env.NODE_ENV === "production"

const basePath = isProd ? "/ec-registry-demo" : ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: isProd ? "/ec-registry-demo/" : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_BASE_URL: isProd
      ? "https://hajimism.github.io/ec-registry-demo"
      : "http://localhost:3000",
  },
}

export default nextConfig
