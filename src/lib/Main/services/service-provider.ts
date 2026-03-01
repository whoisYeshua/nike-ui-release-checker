import { CountryStore } from '../country.svelte'
import { ReleasesStore } from '../releases.svelte'

/** Провайдер сервисов с ленивой инициализацией */
export class ServiceProvider {
	#countryStore: CountryStore | null = null
	#releasesStore: ReleasesStore | null = null

	constructor() {}

	/** Получить CountryStore (singleton) */
	getCountryStore(): CountryStore {
		if (!this.#countryStore) {
			this.#countryStore = new CountryStore()
		}
		return this.#countryStore
	}

	/** Получить ReleasesStore (singleton) */
	getReleasesStore(): ReleasesStore {
		if (!this.#releasesStore) {
			const countryStore = this.getCountryStore()
			this.#releasesStore = new ReleasesStore(countryStore)
		}
		return this.#releasesStore
	}
}
