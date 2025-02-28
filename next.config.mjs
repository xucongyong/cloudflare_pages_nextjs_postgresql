import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/en/resource',
        destination: '/en/resources',
        permanent: true,
      },
      {
        source: '/blog/fogg_behavior_model',
        destination: '/en/articles/fogg_behavior_model',
        permanent: true,
      },
      {
        source: '/blog/quant/vnpy_tutorial/vnpy_tutorial_0x02_futu/',
        destination: '/en/articles/vnpy_tutorial_0x02_futu',
        permanent: true,
      },
      {
        source: '/blog/quant/vnpy_tutorial/vnpy_tutorial_0x02_futu',
        destination: '/en/articles/vnpy_tutorial_0x02_futu',
        permanent: true,
      },
    ];
  },
  webpack: (config, { nextRuntime }) => {
    config.externals.push({
      // Prevent compilation failure under Next.js build (`next build`):
      // `Module build failed: UnhandledSchemeError: Reading from "cloudflare:sockets" is not handled by plugins (Unhandled scheme)`
      "cloudflare:sockets": "commonjs cloudflare:sockets",
    });

    if (nextRuntime === "edge") {
      // expose access to Node.js `net` module within Next.js Edge runtime local sandbox
      // same as Next.js does for `node:buffer`, `node:async_hooks` etc
      // - https://github.com/vercel/next.js/blob/6185444e0a944a82e7719ac37dad8becfed86acd/packages/next/src/build/webpack/plugins/middleware-plugin.ts#L833
      config.externals.unshift({
        net: "commonjs node:net",
        "node:net": "commonjs node:net",
      });
    }

    return config;
  },
};
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}
export default withNextIntl(nextConfig);
