<script lang="ts">
	import { useHaptic } from '../../utils/use-haptic.svelte';
	import autoSvg from './auto.svg';
	import darkSvg from './dark.svg';
	import lightSvg from './light.svg';

	type Scheme = 'auto' | 'dark' | 'light';

	const schemes = [
		{ value: 'light', label: 'Light theme', icon: lightSvg },
		{ value: 'auto', label: 'System theme', icon: autoSvg },
		{ value: 'dark', label: 'Dark theme', icon: darkSvg }
	];

	const schemeFromLocalStorage = localStorage.getItem('color-scheme') as Scheme | null;
	let scheme = $state<Scheme>(schemeFromLocalStorage ?? 'auto');

	const { vibrate } = useHaptic();

	$effect(() => {
		const colorScheme = document.querySelector<HTMLMetaElement>('meta[name="color-scheme"]');
		const lightThemeColor = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"][data-id="light"]'
		);
		const darkThemeColor = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"][data-id="dark"]'
		);
		const rootHtmlElement = document.documentElement;

		if (scheme === 'auto') {
			rootHtmlElement.classList = '';
			localStorage.removeItem('color-scheme');
			colorScheme?.setAttribute('content', 'light dark');
			lightThemeColor?.setAttribute('media', '(prefers-color-scheme: light)');
			darkThemeColor?.setAttribute('media', '(prefers-color-scheme: dark)');
		} else {
			rootHtmlElement.classList = scheme;
			localStorage.setItem('color-scheme', scheme);
			colorScheme?.setAttribute('content', scheme);
			lightThemeColor?.setAttribute('media', scheme === 'light' ? 'all' : 'not all');
			darkThemeColor?.setAttribute('media', scheme === 'dark' ? 'all' : 'not all');
		}
	});
</script>

<fieldset class="switcher">
	{#each schemes as { value, label, icon } (value)}
		<label class="switcher__label" tabindex="-1">
			<input
				type="radio"
				class="switcher__radio"
				name="color-scheme"
				bind:group={scheme}
				{value}
				aria-label={label}
				onclick={vibrate}
			/>
			<img class="switcher__icon" src={icon} width="24px" height="24px" title={label} alt={label} />
		</label>
	{/each}
</fieldset>

<style>
	/* Switcher */

	.switcher {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 0.75rem;
		border: none;
		border-radius: var(--border-radius);
		padding: 0.375rem;
		touch-action: manipulation; /* speed up on mobile https://stackoverflow.com/questions/44240596/input-checkboxes-radio-buttons-slow-response-on-tablet-mobile */

		&:has(:focus-visible) {
			outline: 0.125rem solid var(--focus-ring-color);
			outline-offset: 0.125rem;
		}

		@media (hover: hover) {
			&:hover {
				outline: 0.125rem solid var(--focus-ring-color);
				outline-offset: 0.125rem;
			}
		}
	}

	/* Switcher Label */

	.switcher__label {
		display: flex;
		justify-content: center;
		align-items: center;

		cursor: pointer;
	}

	/* Switcher Radio */

	.switcher__radio {
		position: absolute;

		appearance: none;

		&:checked {
			outline: none;
			border-radius: var(--border-radius);

			background-color: var(--icon-color);
			width: 28px;
			height: 28px;
		}
	}

	/* Switcher Icon */
	.switcher__radio + .switcher__icon {
		@media (prefers-color-scheme: light) {
			filter: invert(0);
		}
		:global(.light) & {
			filter: invert(0);
		}

		@media (prefers-color-scheme: dark) {
			filter: invert(1);
		}
		:global(.dark) & {
			filter: invert(1);
		}
	}

	.switcher__radio:checked + .switcher__icon {
		@media (prefers-color-scheme: light) {
			filter: invert(1);
		}
		:global(.light) & {
			filter: invert(1);
		}

		@media (prefers-color-scheme: dark) {
			filter: invert(0);
		}
		:global(.dark) & {
			filter: invert(0);
		}
	}

	img {
		-webkit-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
		user-drag: none;
		-webkit-touch-callout: none;
	}
</style>
