import { countryStore } from '../Main/country.svelte';

import type { ReleaseResponse } from '$models/Release';
import type { AvailableCountry } from '$utils/avaliableCountries';

export class ReleasesStore {
	status = $state<'uninitialized' | 'pending' | 'success' | 'error'>('uninitialized');
	data = $state<ReleaseResponse | null>(null);
	dataUpdatedAt = $state(0);
	errorUpdatedAt = $state(0);
	error = $state<unknown | null>(null);
	isUninitialized = $derived(this.status === 'uninitialized');
	isFetching = $derived(this.status === 'pending');
	isInitialLoading = $derived(
		this.isFetching && this.dataUpdatedAt === 0 && this.errorUpdatedAt === 0
	);
	isRefetching = $derived(this.isFetching && (this.dataUpdatedAt > 0 || this.errorUpdatedAt > 0));
	isSuccess = $derived(this.status === 'success');
	isError = $derived(this.status === 'error');

	#lastParams: AvailableCountry | undefined;
	#fetchAbortController = new AbortController();
	#silentAbort = Symbol('silentAbort');

	constructor() {
		$effect.root(() => {
			$effect(() => {
				if (!countryStore.value) return;

				this.#restartController();
				this.#lastParams = countryStore.value;
				this.#fetchRelease(countryStore.value.code);
			});
		});
	}

	refetch = async () => {
		if (!this.#lastParams?.code) return;
		this.#restartController();
		await this.#fetchRelease(this.#lastParams.code);
	};

	#fetchRelease = async (code: string) => {
		try {
			this.status = 'pending';
			const res = await fetch('/api/releases', { signal: this.#fetchAbortController.signal });
			if (!res.ok) throw new Error(res.status?.toString());
			this.data = await res.json();
			this.status = 'success';
			this.dataUpdatedAt = Date.now();
			this.error = null;
		} catch (error) {
			if (error === this.#silentAbort) return;

			this.error = error;
			this.status = 'error';
			this.errorUpdatedAt = Date.now();
		}
	};

	#restartController = () => {
		this.#fetchAbortController.abort(this.#silentAbort);
		this.#fetchAbortController = new AbortController();
	};
}
