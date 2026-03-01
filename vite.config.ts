import { svelte } from '@sveltejs/vite-plugin-svelte'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { defineConfig } from 'vite'
import { qrcode } from 'vite-plugin-qrcode'
import tsconfigPaths from 'vite-tsconfig-paths'

const plugins = [
	svelte(),
	tsconfigPaths(),
	...(process.env.MOBILE_MODE
		? [qrcode(), basicSsl({ name: 'nike-release-checker', certDir: import.meta.dirname })]
		: [])
]

export default defineConfig({
	plugins,
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
})
