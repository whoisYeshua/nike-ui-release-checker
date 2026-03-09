import { isCommonAssetRequest } from 'msw'
import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

export const worker = setupWorker(...handlers)

const isSentryRequest = (request: Request): boolean => {
	const { hostname } = new URL(request.url)
	return hostname.includes('sentry.io')
}

export const startMockWorker = () => {
	return worker.start({
		onUnhandledRequest(request, print) {
			if (isSentryRequest(request)) return
			if (isCommonAssetRequest(request)) return

			print.warning()
		}
	})
}
