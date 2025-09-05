import { mount } from 'svelte';

import './styles/index.css';

import App from './App.svelte';

if (import.meta.env.DEV) {
	const { worker } = await import('./mocks/browser');
	await worker.start();
}

const app = mount(App, {
	target: document.getElementById('app')!
});

export default app;
