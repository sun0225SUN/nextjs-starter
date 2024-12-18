import createNextIntlPlugin from 'next-intl/plugin'
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import './src/env.js'

const withNextIntl = createNextIntlPlugin()

/** @type {import("next").NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/app/api-reference/next-config-js/eslint
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig)
