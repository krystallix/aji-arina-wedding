import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

function resolveSiteUrl(mode: string): string {
  const env = loadEnv(mode, process.cwd(), '')
  const raw =
    env.VITE_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    process.env.URL ||
    process.env.CF_PAGES_URL ||
    ''

  return raw.replace(/\/+$/, '')
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl(mode)

  return {
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [
      tailwindcss(),
      react(),
      {
        name: 'inject-og-site-url',
        transformIndexHtml(html) {
          return html.replaceAll('__SITE_URL__', siteUrl)
        },
      },
    ],
  }
})
