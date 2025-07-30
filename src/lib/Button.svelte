<script lang="ts">
	import { useHaptic } from './utils/use-haptic.svelte';

	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		onclick: () => void;
		icon?: Snippet;
		text?: string;
		variant?: 'default' | 'light';
	}

	const { vibrate } = useHaptic();

	let { onclick, icon, text, variant = 'default', ...rest }: Props = $props();

	const handleClick = () => {
		vibrate();
		onclick();
	};
</script>

<!-- ontouchstart enable CSS pseudo-class `:active` work on safari  https://ru.stackoverflow.com/questions/1066115/%D0%9A%D0%B0%D0%BA-%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C-%D1%87%D1%82%D0%BE%D0%B1%D1%8B-%D0%BD%D0%B0-ios-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%B0%D0%BB-active-%D1%83-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2 -->
<button
	type="button"
	class="button not-selectable touchable"
	class:light={variant === 'light'}
	onclick={handleClick}
	style:padding={text ? '6px 16px' : '6px'}
	ontouchstart={() => {}}
	{...rest}
>
	{@render icon?.()}
	{#if text}
		<span>{text}</span>
	{/if}
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
		transition:
			translate 0.2s ease-in-out,
			background-color 0.2s ease-in-out;
		cursor: pointer;
		border: none;
		border-radius: 32px;
		background-color: var(--button-bg);
		color: light-dark(var(--white), var(--black));
		font-weight: normal;
		font-size: 16px;
		line-height: 20px;

		text-box-trim: trim-end;

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
