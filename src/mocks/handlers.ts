import { availableCountries, formatProductFeedResponse, getProductFeed } from '#snkrs-sdk'
import { handlers as snkrsSdkHandlers } from '#snkrs-sdk/mocks/handlers'
import { delay, http, HttpResponse } from 'msw'

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
	...snkrsSdkHandlers
]
