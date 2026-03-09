import { AsyncStore } from './services/async-store.svelte'

import type { formatProductFeedResponse } from '@nike-release-checker/sdk'

type CountryStoreValue = { value?: { code?: string } | null }
type FormattedProductFeedResponse = ReturnType<typeof formatProductFeedResponse>

type Release = FormattedProductFeedResponse[number]

export class ReleasesStore extends AsyncStore<FormattedProductFeedResponse, string> {
	sortedData = $derived(this.data?.toSorted((a, b) => this.#getEarliestDate(a) - this.#getEarliestDate(b)))

	constructor(countryStore: CountryStoreValue) {
		super()
		this.setupEffect(() => countryStore.value?.code)
	}

	protected async fetchData(code: string, signal: AbortSignal | undefined) {
		const res = await fetch(`/api/upcoming-releases/${code}`, { signal })
		if (!res.ok) throw new Error(res.status?.toString())
		return res.json()
	}

	#getEarliestDate(release: Release) {
		let earliest = Infinity
		for (const model of release.models) {
			const date = model.launchView?.startEntryDate
			if (date) {
				const timestamp = new Date(date).getTime()
				if (timestamp < earliest) earliest = timestamp
			}
		}
		return earliest
	}
}
