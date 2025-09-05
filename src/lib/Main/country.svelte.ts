import { availableCountries } from '$utils/avaliableCountries';

import type { AvailableCountry, CountryCode } from '$utils/avaliableCountries';

class CountryStore {
	#storageKey = 'selected-country';
	#value = $state<AvailableCountry | null>(this.#getInitialCountry());

	get value() {
		return this.#value;
	}
	set value(selectedCountry: AvailableCountry | null) {
		this.#value = selectedCountry;
		if (!selectedCountry) return;
		localStorage.setItem(this.#storageKey, selectedCountry.code);
	}

	#getInitialCountry() {
		if (typeof localStorage === 'undefined') return null;

		const selectedCountryCodeFromLocalStorage = localStorage.getItem(
			this.#storageKey
		) as CountryCode | null;

		const selectedCountryFromLocalStorage = availableCountries.find(
			(country) => country.code === selectedCountryCodeFromLocalStorage
		);

		return selectedCountryFromLocalStorage ?? null;
	}
}

export const countryStore = new CountryStore();
