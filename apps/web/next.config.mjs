// @ts-ignore
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  /** Enables hot reloading for local packages without a build step */
  transpilePackages: ['@repo/db'],

  /** We already do linting and typechecking as separate tasks in CI */
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }

    return config
  },
}

export default nextConfig
