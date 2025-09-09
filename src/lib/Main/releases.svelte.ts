import { getAbortSignal } from 'svelte'

import type { FormattedProductFeedResponse } from '#snkrs-sdk'

export class ReleasesStore {
	status = $state.raw<'uninitialized' | 'pending' | 'success' | 'error'>('uninitialized')
	data = $state.raw<FormattedProductFeedResponse | null>(null)
	dataUpdatedAt = $state.raw(0)
	errorUpdatedAt = $state.raw(0)
	error = $state.raw<unknown | null>(null)
	isUninitialized = $derived(this.status === 'uninitialized')
	isFetching = $derived(this.status === 'pending')
	isInitialLoading = $derived(
		this.isFetching && this.dataUpdatedAt === 0 && this.errorUpdatedAt === 0
	)
	isRefetching = $derived(this.isFetching && (this.dataUpdatedAt > 0 || this.errorUpdatedAt > 0))
	isSuccess = $derived(this.status === 'success')
	isError = $derived(this.status === 'error')

	#lastParams: string | undefined
	#fetchAbortController = new AbortController()
	#silentAbort = Symbol('silentAbort')

	constructor(countryStore: { value?: { code?: string } | null }) {
		$effect.root(() => {
			$effect(() => {
				if (!countryStore.value?.code) return

				this.#lastParams = countryStore.value.code
				this.#fetchRelease(countryStore.value.code)
			})
		})
	}

	refetch = async () => {
		if (!this.#lastParams) return
		await this.#fetchRelease(this.#lastParams)
	}

	#fetchRelease = async (code: string) => {
		const signal = getAbortSignal()
		try {
			this.status = 'pending'
			const res = await fetch(`/api/upcoming-releases/${code}`, {
				signal: signal
			})
			if (!res.ok) throw new Error(res.status?.toString())
			this.data = await res.json()
			this.status = 'success'
			this.dataUpdatedAt = Date.now()
			this.error = null
		} catch (error) {
			if (signal?.reason === error) return

			this.error = error
			this.status = 'error'
			this.errorUpdatedAt = Date.now()
		}
	}
}
