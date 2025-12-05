import { AsyncStore } from './services/async-store.svelte'

import type { FormattedProductFeedResponse } from '#snkrs-sdk'

type CountryStoreValue = { value?: { code?: string } | null }

export class ReleasesStore extends AsyncStore<FormattedProductFeedResponse, string> {
	constructor(countryStore: CountryStoreValue) {
		super()
		this.setupEffect(() => countryStore.value?.code)
	}

	protected async fetchData(code: string, signal: AbortSignal | undefined) {
		const res = await fetch(`/api/upcoming-releases/${code}`, { signal })
		if (!res.ok) throw new Error(res.status?.toString())
		return res.json()
	}
}
