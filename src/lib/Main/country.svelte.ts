import { availableCountries } from '$utils/availableCountries'

import type { AvailableCountry, CountryCode } from '$utils/availableCountries'

const isBrowser = typeof window !== 'undefined'

export class CountryStore {
	#storageKey = 'selected-country'
	#value = $state<AvailableCountry | null>(this.#getInitialCountry())

	get value() {
		return this.#value
	}
	set value(selectedCountry: AvailableCountry | null) {
		this.#value = selectedCountry
		if (!selectedCountry) return
		if (isBrowser) localStorage.setItem(this.#storageKey, selectedCountry.code)
	}

	#getInitialCountry() {
		if (!isBrowser) return null

		const selectedCountryCodeFromLocalStorage = localStorage.getItem(
			this.#storageKey
		) as CountryCode | null

		const selectedCountryFromLocalStorage = availableCountries.find(
			(country) => country.code === selectedCountryCodeFromLocalStorage
		)

		return selectedCountryFromLocalStorage ?? null
	}
}
