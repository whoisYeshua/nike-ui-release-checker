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
			// Proxy Nike API requests to bypass CORS when using vite-proxy-nike query param
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
