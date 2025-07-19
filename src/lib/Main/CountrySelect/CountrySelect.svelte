<script lang="ts">
	import { availableCountries } from '../../utils/avaliableCountries';

	import type { AvailableCountry, CountryCode } from '../../utils/avaliableCountries';

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

{#snippet selectedContent()}
	<button aria-label="Selected country">
		<selectedcontent></selectedcontent>
		<svg width="24" height="24" viewBox="0 0 24 24">
			<path fill="currentColor" d="m7 10l5 5l5-5z" />
		</svg>
	</button>
{/snippet}

{#snippet placeholderContent()}
	<option value="" disabled>Select a country</option>
{/snippet}

{#snippet optionContent(country: AvailableCountry)}
	<div class="custom-option">
		<span class="custom-option__text">{country.emoji} {country.name}</span>
		{#if country.description}
			<small class="custom-option__description">({country.description})</small>
		{/if}
	</div>
{/snippet}

<select bind:value={selectedCountry} aria-label="SNKRS Country">
	{@render selectedContent()}
	{@render placeholderContent()}
	{#each availableCountries as country}
		<option value={country.code}>
			{@render optionContent(country)}
		</option>
	{/each}
</select>

<style>
	@supports not (appearance: base-select) {
		select {
			appearance: none;

			background-position: right 8px top 50%;
			background-size: 1.25rem auto;
			background-repeat: no-repeat;

			color: inherit;

			/* Arrow icon theming */
			@media (prefers-color-scheme: light) {
				background-image: url('./dark-arrow.svg');
			}
			:global(.light) & {
				background-image: url('./dark-arrow.svg');
			}

			@media (prefers-color-scheme: dark) {
				background-image: url('./light-arrow.svg');
			}
			:global(.dark) & {
				background-image: url('./light-arrow.svg');
			}
		}
	}

	select {
		--select-bg: oklch(from var(--bg) calc(l * 1.35) c h);
		cursor: pointer;
		border: 1px solid var(--divider-color);
		border-radius: 0.375rem;
		background-color: var(--select-bg);
		padding: 0.5rem 0.625rem;
		font-family: Helvetica, sans-serif;

		@media (hover: hover) {
			&:hover {
				border-color: var(--focus-ring-color);
			}
		}

		&:focus-visible {
			outline: 0.125rem solid var(--focus-ring-color);
			border-color: transparent;
		}

		/** Customizable Select styles */
		&,
		&::picker(select) {
			appearance: base-select;
		}

		&::picker-icon {
			display: none;
		}

		&::picker(select) {
			transition: all 0.2s allow-discrete;
		}

		/* A: open stage (from B -> A, from A -> C) */
		&::picker(select):popover-open {
			transform: scale(1);
			opacity: 1;
		}
		/* B: before open stage */
		@starting-style {
			&::picker(select):popover-open {
				transform: scale(0.95);
				opacity: 0;
			}
		}
		/* C: after close stage */
		&::picker(select) {
			transform: scale(0.95);
			opacity: 0;
		}

		/* customize the invoking button */
		> button {
			display: flex;
			justify-content: space-between;
			min-inline-size: 22ch;

			& svg {
				transition: transform 0.3s ease-in-out;
				inline-size: 2ch;
			}
		}

		/* Rotate the arrow icon when the dropdown is open */
		&:open > button svg {
			transform: rotate(0.5turn);
		}

		/* Hide the description when the country is selected */
		:global(selectedcontent .custom-option__description) {
			display: none;
		}

		/* apply drop down / picker styles */
		&::picker(select) {
			--shadow-color: 220 40% 2%;
			margin-block: 8px;
			box-shadow:
				0 -1px 2px 0 hsl(var(--shadow-color) / calc(10% + 2%)),
				0 2px 1px -2px hsl(var(--shadow-color) / calc(10% + 3%)),
				0 5px 5px -2px hsl(var(--shadow-color) / calc(10% + 3%)),
				0 10px 10px -2px hsl(var(--shadow-color) / calc(10% + 4%)),
				0 20px 20px -2px hsl(var(--shadow-color) / calc(10% + 5%)),
				0 40px 40px -2px hsl(var(--shadow-color) / calc(10% + 7%));
			border-radius: 8px;
			background: var(--select-bg);
			max-block-size: 12lh;
			overscroll-behavior: none;
			scroll-behavior: smooth;
			scrollbar-width: thin;
		}

		& option {
			--hover-dark-bg: oklch(from var(--select-bg) calc(l * 0.9) c h);
			--selected-dark-bg: oklch(from var(--select-bg) calc(l * 0.7) c h);
			--hover-light-bg: oklch(from var(--select-bg) calc(l * 0.95) c h);
			--selected-light-bg: oklch(from var(--select-bg) calc(l * 0.85) c h);

			display: flex;
			align-items: center;
			gap: 1rem;

			cursor: pointer;
			padding-inline: 1rem;
			padding-block: 0.5rem;
			color: var(--font-color);

			&:has(.custom-option__description) {
				cursor: help;
			}

			&:disabled {
				display: none;
			}

			&:focus-visible {
				outline-color: var(--focus-ring-color);
				outline-offset: -1px;
			}

			@media (hover: hover) {
				&:hover {
					background-color: light-dark(var(--hover-light-bg), var(--hover-dark-bg));
				}
			}

			/* selected option */
			&:checked {
				background-color: light-dark(var(--selected-light-bg), var(--selected-dark-bg));
				color: inherit;
			}

			/* selected checkmark */
			&::checkmark {
				font-weight: 600;
				font-family: system-ui;
			}
		}
	}

	.custom-option {
		display: flex;
		flex-direction: column;
	}
</style>
