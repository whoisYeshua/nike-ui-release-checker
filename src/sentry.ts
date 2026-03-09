import * as Sentry from '@sentry/svelte'

export const initSentry = () => {
	Sentry.init({
		dsn: import.meta.env.VITE_SENTRY_DSN,
		environment: import.meta.env.MODE,
		sendDefaultPii: true,
		// Workaround: Sentry INP instrumentation adds a global capture-phase `input` listener.
		// With Chrome customizable `<select>` + `<selectedcontent>`, this breaks option selection.
		// Keep tracing enabled, but disable INP until upstream fix lands.
		integrations: [Sentry.browserTracingIntegration({ enableInp: false })],
		tracesSampleRate: 1.0
	})
}
