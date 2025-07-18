<script lang="ts">
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
		gap: 8px;
		border: none;
		border-radius: 16px;
		padding: 6px;

		&:has(:focus-visible),
		&:hover {
			@media (hover: hover) {
				outline: 0.125rem solid light-dark(var(--black), var(--white));
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
			border-radius: 16px;

			background-color: light-dark(var(--black), var(--white));
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
