<script lang="ts">
	import Github from './Github.svelte'
	import SchemeSwitcher from './SchemeSwitcher/SchemeSwitcher.svelte'
</script>

<footer>
	<SchemeSwitcher />
	<Github />
</footer>

<style>
	footer {
		display: grid;
		grid-template-columns: auto auto;
		justify-content: center;
		align-items: center;
		gap: 3rem;
		box-shadow: 0 -2px var(--divider-color);
		padding-inline: 1.5rem;
		padding-block: 1rem;

		@media (width <= 640px) {
			padding-inline: 1rem;
		}
	}
</style>
