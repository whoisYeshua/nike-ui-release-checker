<script>
	let {
		width = '100%',
		height = '100%',
		borderRadius = 'var(--border-radius)',
		backgroundColor = 'var(--divider-color)'
	} = $props();
</script>

<div
	class="skeleton"
	style:width
	style:height
	style:border-radius={borderRadius}
	style:background-color={backgroundColor}
></div>

<style>
	.skeleton {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		50% {
			opacity: 0.5;
		}
	}
</style>
