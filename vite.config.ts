import { sentryVitePlugin } from '@sentry/vite-plugin'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig, loadEnv } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
	// Load all .env / .env.local / .env.[mode] vars into a plain object.
	// '' prefix means: load every variable, not just VITE_-prefixed ones.
	const env = loadEnv(mode, process.cwd(), '')

	const plugins = [
		// sentryVitePlugin must come before svelte() to upload source maps after build
		sentryVitePlugin({
			org: env.SENTRY_ORG,
			project: env.SENTRY_PROJECT,
			authToken: env.SENTRY_AUTH_TOKEN,
			// Only upload when auth token is present; silent no-op otherwise
			silent: !env.SENTRY_AUTH_TOKEN,
			disable: !env.SENTRY_AUTH_TOKEN,
			telemetry: false
		}),
		svelte(),
		tsconfigPaths(),
		...(env.MOBILE_MODE
			? [qrcode(), basicSsl({ name: 'nike-release-checker', certDir: import.meta.dirname })]
			: [])
	]

	return {
		plugins,
		build: {
			sourcemap: true
		},
		server: {
			proxy: {
				// Dev helper used by MSW mock bypass in `src/mocks/handlers.ts`.
				// Triggered only when page URL has `?vite-proxy-nike=true`:
				// handler rewrites `https://api.nike.com/...` -> `/api/nike/...`,
				// then this proxy forwards to real Nike API (CORS-safe in dev).
				'/api/nike': {
					target: 'https://api.nike.com',
					changeOrigin: true,
					rewrite: (path) => {
						console.log('VITE PROXY REWRITE PATH (Original):', path)
						const newPath = path.replace(/^\/api\/nike/, '')
						console.log('VITE PROXY REWRITE PATH (New):', newPath)
						return newPath
					}
				}
			}
		}
	}
})
