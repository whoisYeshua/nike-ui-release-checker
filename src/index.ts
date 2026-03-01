import { mount } from 'svelte'

import './styles/index.css'

import App from './App.svelte'
import { initSentry } from './sentry'

initSentry()

if (import.meta.env.DEV) {
	const { startMockWorker } = await import('./mocks/browser')
	await startMockWorker()
}

const app = mount(App, { target: document.getElementById('app')! })

export default app
