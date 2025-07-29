<script lang="ts">
	import { useHaptic } from './utils/use-haptic.svelte';

	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		onClick: () => void;
		icon?: Snippet;
		text?: string;
		variant?: 'default' | 'light';
	}

	const { vibrate } = useHaptic();

	let { onClick, icon, text, variant = 'default', ...rest }: Props = $props();

	const handleClick = () => {
		vibrate();
		onClick();
	};
</script>

<button
	class="button"
	class:light={variant === 'light'}
	onclick={handleClick}
	style:padding={text ? '6px 16px' : '6px'}
	{...rest}
>
	{@render icon?.()}
	{text}
</button>

<style>
	button {
		--button-bg: light-dark(var(--black), hsla(0, 0%, 100%, 0.9));
		--button-bg-hover: light-dark(
			oklch(from var(--button-bg) calc(l * 1.3) c h),
			oklch(from var(--button-bg) calc(l * 0.9) c h)
		);
		--button-bg-active: light-dark(
			oklch(from var(--button-bg) calc(l * 1.5) c h),
			oklch(from var(--button-bg) calc(l * 0.8) c h)
		);

		display: flex;
		align-items: center;
		gap: 8px;
		transition: opacity 0.2s;

		transition: translate 0.2s ease-in-out;
		cursor: pointer;
		border: none;
		border-radius: 32px;
		background-color: var(--button-bg);
		color: light-dark(var(--white), var(--black));
		font-weight: normal;
		font-size: 16px;
		line-height: 20px;
		font-family: 'Helvetica Neue', sans-serif;

		-webkit-user-select: none;
		user-select: none;
		-webkit-user-drag: none;
		user-drag: none;
		-webkit-touch-callout: none;

		&.light {
			--button-bg-hover: var(--divider-color);
			--button-bg-active: var(--divider-color);

			background-color: transparent;
			color: light-dark(var(--black), var(--white));
		}

		&:focus-visible {
			outline: 0.125rem solid var(--focus-ring-color);
			outline-offset: 0.125rem;
		}

		@media (hover: hover) {
			&:hover {
				background-color: var(--button-bg-hover);
			}
		}

		&:active {
			translate: 0 1px;
			background-color: var(--button-bg-active);
		}
	}
</style>
