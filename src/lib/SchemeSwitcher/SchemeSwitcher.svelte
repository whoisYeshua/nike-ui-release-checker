<script lang="ts">
	import autoSvg from './auto.svg';
	import darkSvg from './dark.svg';
	import lightSvg from './light.svg';

	let scheme = $state<'auto' | 'dark' | 'light'>('auto');

	$inspect(scheme);
</script>

<fieldset class="switcher">
	<label class="switcher__label" tabindex="-1">
		<input
			type="radio"
			class="switcher__radio"
			name="color-scheme"
			bind:group={scheme}
			value="light"
			aria-label="Light theme"
		/>
		<img
			class="switcher__icon svg"
			src={lightSvg}
			width="24px"
			height="24px"
			title="Light theme"
			alt="Light theme"
		/>
	</label>

	<label class="switcher__label" tabindex="-1">
		<input
			type="radio"
			class="switcher__radio"
			name="color-scheme"
			bind:group={scheme}
			value="auto"
			aria-label="System theme"
			checked
		/>
		<img
			class="switcher__icon svg"
			src={autoSvg}
			width="24px"
			height="24px"
			title="System theme"
			alt="System theme"
		/>
	</label>
	<label class="switcher__label" tabindex="-1">
		<input
			type="radio"
			class="switcher__radio"
			name="color-scheme"
			bind:group={scheme}
			value="dark"
			aria-label="Dark theme"
		/>
		<img
			class="switcher__icon svg"
			src={darkSvg}
			width="24px"
			height="24px"
			title="Dark theme"
			alt="Dark theme"
		/>
	</label>
</fieldset>

<style>
	/* Switcher */

	.switcher {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 8px;
		padding: 6px;
		border: none;
		border-radius: 16px;

		background-color: var(--strong-grey);

		&:focus-within {
			box-shadow: 0px 0px 0px 2px var(--white);
		}
	}

	/* Switcher Label */

	.switcher__label {
		display: flex;
		align-items: center;
		justify-content: center;

		cursor: pointer;
	}

	/* Switcher Radio */

	.switcher__radio {
		position: absolute;

		appearance: none;

		&:checked {
			width: 28px;
			height: 28px;
			border-radius: 16px;

			background-color: var(--white);
			outline: none;
		}
	}

	/* Switcher Icon */
	.switcher__radio + .switcher__icon {
		filter: invert(1);
	}

	.switcher__radio:checked + .switcher__icon {
		filter: invert(0);
	}
</style>
