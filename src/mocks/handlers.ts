import { availableCountries, formatProductFeedResponse, getProductFeed } from '#snkrs-sdk'
import { handlers as snkrsSdkHandlers } from '#snkrs-sdk/mocks/handlers'
import { bypass, delay, http, HttpResponse } from 'msw'

console.log(snkrsSdkHandlers)

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

			console.log('result', result)

			return HttpResponse.json(result, { status: 200 })
		} catch (error) {
			return HttpResponse.json({ error: 'Failed to fetch releases' }, { status: 400 })
		}
	}),
	http.get(snkrsSdkHandlers[0].info.path, ({ request }) => {
		const pageParams = new URLSearchParams(window.location.search)
		const isServerMock = pageParams.get('server-mock')

		// When server-mock is enabled, rewrite URL to point to Vite proxy
		if (isServerMock) {
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
		const USE_NEXT_HANDLER = undefined
		return USE_NEXT_HANDLER
	}),
	...snkrsSdkHandlers
]
