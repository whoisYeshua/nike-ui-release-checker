<script lang="ts">
	import Button from '$lib/Button.svelte';

	let { onClick, isRefetching }: { onClick: () => void; isRefetching: boolean } = $props();
</script>

<div class="container">
	<h3>Loading error</h3>

	<Button
		text={isRefetching ? 'Refetching...' : 'Retry request'}
		onclick={onClick}
		disabled={isRefetching}
	/>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	h3 {
		color: darkgray;
		font-size: 1.25rem;
		line-height: calc(1.25rem + 4px);
		font-family: 'Trade Gothic', system-ui;
		text-transform: uppercase;
	}
</style>
