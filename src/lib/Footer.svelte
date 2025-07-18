<script lang="ts">
	import SchemeSwitcher from './SchemeSwitcher/SchemeSwitcher.svelte';
</script>

<footer>
	<SchemeSwitcher />
</footer>

<style>
	footer {
		display: grid;
		justify-content: center;
		box-shadow: 0 -2px var(--divider);
		padding-inline: 1.5rem;
		padding-block: 1rem;

		@media (width <= 640px) {
			padding-inline: 1rem;
		}
	}
</style>
