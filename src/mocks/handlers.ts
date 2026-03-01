import {
	availableCountries,
	formatProductFeedResponse,
	getProductFeed
} from '@nike-release-checker/sdk'
import { handlers as snkrsSdkHandlers } from '@nike-release-checker/sdk/mocks/handlers'
import { bypass, delay, http, HttpResponse } from 'msw'

const USE_NEXT_HANDLER = undefined

export const handlers = [
	http.get('/api/upcoming-releases/:countryCode', async ({ params }) => {
		try {
			await delay()
			const countryCode = params.countryCode

			const country = availableCountries.find((country) => country.code === countryCode)
			if (!country) return HttpResponse.json({ error: 'Country not found' }, { status: 404 })

			const releases = await getProductFeed({
				countryCode: country.code,
				language: country.language
			})
			const result = formatProductFeedResponse(releases)

			return HttpResponse.json(result, { status: 200 })
		} catch (error) {
			return HttpResponse.json({ error: 'Failed to fetch releases' }, { status: 400 })
		}
	}),
	/*
	 * Dev-only switch for debugging against real Nike responses.
	 *
	 * Normal app flow should stay on `/api/upcoming-releases/:countryCode` (BFF/API route),
	 * while SDK-level Nike calls are mocked by `snkrsSdkHandlers`.
	 *
	 * If page URL contains `?vite-proxy-nike=true`, this handler bypasses that Nike mock,
	 * rewrites `https://api.nike.com/...` to `${window.location.origin}/api/nike/...`,
	 * and lets Vite proxy it to the real Nike API.
	 *
	 * Related Vite proxy config: `vite.config.ts` -> `server.proxy['/api/nike']`.
	 */
	http.get(snkrsSdkHandlers[0].info.path, ({ request }) => {
		const pageParams = new URLSearchParams(window.location.search)
		const shouldProxyNike = pageParams.get('vite-proxy-nike')

		// When vite-proxy-nike is enabled, rewrite URL to point to Vite proxy
		if (shouldProxyNike) {
			const originalUrl = new URL(request.url)
			// Rewrite Nike API domain to our local Vite proxy endpoint
			const proxyUrl = originalUrl.href.replace(
				'https://api.nike.com',
				`${window.location.origin}/api/nike`
			)
			console.log('Redirecting to proxy:', proxyUrl)

			// Create new request with rewritten URL
			const modifiedRequest = new Request(proxyUrl, request)

			// Let the rewritten request pass through to Vite proxy
			return fetch(bypass(modifiedRequest))
		}

		// Otherwise, let other handlers handle it
		return USE_NEXT_HANDLER
	}),
	...snkrsSdkHandlers
]
