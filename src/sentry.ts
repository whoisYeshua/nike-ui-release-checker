import * as Sentry from '@sentry/svelte'

export function initSentry() {
	Sentry.init({
		dsn: import.meta.env.VITE_SENTRY_DSN,
		environment: import.meta.env.MODE,
		sendDefaultPii: true
		// browserTracingIntegration doesnt work with custom select (with enabled <selectedcontent> - it breaks until we delete sentry input handler on select element)
		// integrations: [Sentry.browserTracingIntegration()],
		// tracesSampleRate: 1.0
	})
}
