import type { KnipConfig } from 'knip'

const config: KnipConfig = {
	entry: ['src/index.ts', 'index.html'],
	project: ['src/**/*.{ts,svelte}'],
	ignore: ['src/vite-env.d.ts', 'src/mocks/**'],
	paths: {
		'$lib/*': ['src/lib/*'],
		'$models/*': ['src/models/*'],
		'$utils/*': ['src/utils/*']
	}
}

export default config
