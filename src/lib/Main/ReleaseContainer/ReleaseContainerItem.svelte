<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
	}

	let { children }: Props = $props()
</script>

<div class="release-container__item">
	{@render children()}
</div>

<style>
	.release-container__item {
		min-width: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		animation: card-lift linear both;
		animation-timeline: view(inline);
	}

	@keyframes card-lift {
		0%, 50%, 100% {
			transform: translateY(0);
		}
		25%, 75% {
			transform: translateY(-0.5rem);
		}
	}
</style>
