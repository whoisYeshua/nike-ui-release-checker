import { availableCountries } from '@nike-release-checker/sdk'
import * as Sentry from '@sentry/svelte'

import type { AvailableCountry, CountryCode } from '@nike-release-checker/sdk'

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
		Sentry.metrics.count('country.selected', 1, { attributes: { country: selectedCountry.code } })
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
