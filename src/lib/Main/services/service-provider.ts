import { CountryStore } from '../country.svelte';
import { ReleasesStore } from '../releases.svelte';

/**
 * Провайдер сервисов с ленивой инициализацией
 */
export class ServiceProvider {
	static #countryStore: CountryStore;
	static #releasesStore: ReleasesStore;

	constructor() {}

	/**
	 * Получить CountryStore (singleton)
	 */
	getCountryStore(): CountryStore {
		if (!ServiceProvider.#countryStore) {
			ServiceProvider.#countryStore = new CountryStore();
		}
		return ServiceProvider.#countryStore;
	}

	/**
	 * Получить ReleasesStore (singleton)
	 */
	getReleasesStore(): ReleasesStore {
		if (!ServiceProvider.#releasesStore) {
			const countryStore = this.getCountryStore();
			ServiceProvider.#releasesStore = new ReleasesStore(countryStore);
		}
		return ServiceProvider.#releasesStore;
	}
}

export const serviceProvider = new ServiceProvider();
