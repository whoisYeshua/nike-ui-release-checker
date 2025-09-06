import { svelte } from '@sveltejs/vite-plugin-svelte';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';
import tsconfigPaths from 'vite-tsconfig-paths';

const plugins = [svelte(), tsconfigPaths()];

if (process.env.MOBILE_MODE) {
	plugins.push(
		qrcode(),
		basicSsl({
			name: 'nike-release-checker',
			certDir: import.meta.dirname
		})
	);
}

export default defineConfig({ plugins });
