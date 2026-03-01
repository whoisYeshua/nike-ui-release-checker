import { getAbortSignal } from 'svelte'

import * as Sentry from '@sentry/svelte'

type AsyncStoreStatus = 'uninitialized' | 'pending' | 'success' | 'error'

export abstract class AsyncStore<TData, TParams> {
	status = $state.raw<AsyncStoreStatus>('uninitialized')
	data = $state.raw<TData | null>(null)
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

	#lastParams: TParams | undefined

	protected abstract fetchData(params: TParams, signal: AbortSignal | undefined): Promise<TData>

	protected setupEffect(getParams: () => TParams | undefined): void {
		$effect.root(() => {
			$effect(() => {
				const params = getParams()
				if (params === undefined) return

				this.#lastParams = params
				this.#fetch(params)
			})
		})
	}

	refetch = async () => {
		if (this.#lastParams === undefined) return
		await this.#fetch(this.#lastParams)
	}

	#fetch = async (params: TParams) => {
		const signal = getAbortSignal()
		try {
			this.status = 'pending'
			this.data = await this.fetchData(params, signal)
			this.status = 'success'
			this.dataUpdatedAt = Date.now()
			this.error = null
		} catch (error) {
			if (signal?.reason === error) return

			Sentry.captureException(error)
			this.error = error
			this.status = 'error'
			this.errorUpdatedAt = Date.now()
		}
	}
}
