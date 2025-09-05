import type { ReleaseResponse } from '$models/Release';

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

	#lastParams: string | undefined;
	#fetchAbortController = new AbortController();
	#silentAbort = Symbol('silentAbort');

	constructor(countryStore: { value?: { code?: string } | null }) {
		$effect.root(() => {
			$effect(() => {
				if (!countryStore.value?.code) return;

				this.#restartController();
				this.#lastParams = countryStore.value.code;
				this.#fetchRelease(countryStore.value.code);
			});
		});
	}

	refetch = async () => {
		if (!this.#lastParams) return;
		this.#restartController();
		await this.#fetchRelease(this.#lastParams);
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
