<script lang="ts">
	import { availableCountries } from './utils/avaliableCountries';

	import type { AvailableCountry, CountryCode } from './utils/avaliableCountries';

	const selectedCountryCodeFromLocalStorage = localStorage.getItem(
		'selected-country'
	) as CountryCode | null;
	const selectedCountryFromLocalStorage = availableCountries.find(
		(country) => country.code === selectedCountryCodeFromLocalStorage
	);

	let selectedCountry = $state<AvailableCountry | ''>(selectedCountryFromLocalStorage ?? '');

	$effect(() => {
		if (selectedCountry) {
			localStorage.setItem('selected-country', selectedCountry.code);
		}
	});
</script>

<select bind:value={selectedCountry} aria-label="SNKRS Country">
	<option value="" disabled>Select a country</option>
	{#each availableCountries as country}
		<option value={country}>{country.emoji} {country.name}</option>
	{/each}
</select>

<style>
	select {
		cursor: pointer;
		border: 1px solid var(--divider-color);
		border-radius: 0.375rem;
		padding: 0.5rem 0.625rem;
		font-family: 'Helvetica Neue', sans-serif;

		&:hover {
			@media (hover: hover) {
				border-color: var(--focus-ring-color);
			}
		}

		&:focus-visible {
			outline: 0.125rem solid var(--focus-ring-color);
			border-color: transparent;
		}
	}
</style>
