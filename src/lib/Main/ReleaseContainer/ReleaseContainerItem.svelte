<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="release-container__item">
	{@render children()}
</div>

<style>
	.release-container__item {
		min-width: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}
</style>
