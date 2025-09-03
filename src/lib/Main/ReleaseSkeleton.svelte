<script lang="ts">
	import Skeleton from '$lib/Skeleton.svelte';
</script>

<div class="release-skeleton">
	<Skeleton height="622px" />
	<div class="release-skeleton__indicator">
		<Skeleton height="8px" width="8px" borderRadius="50%" />
	</div>
</div>

<style>
	.release-skeleton {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		height: 100%;
	}

	.release-skeleton__indicator {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}
</style>
