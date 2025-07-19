<script lang="ts">
	import CountrySelect from './CountrySelect.svelte';
</script>

<main>
	<div class="top-panel">
		<CountrySelect />
	</div>
	<section class="releases">
		<h2 class="releases__title">Upcoming releases</h2>
		<div class="releases__grid">
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
			<div style="width: 180px; height: 180px; background-color: red"></div>
		</div>
	</section>
</main>

<style>
	main {
		padding-inline: calc(50% - 838px);
		padding-block: 2rem;

		@media (width <= 640px) {
			padding-inline: 1rem;
			padding-block: 1.5rem;
		}

		@media (width <= 1760px) {
			padding-inline: 1.5rem;
		}
	}

	.top-panel {
		display: flex;
		justify-content: center;
	}

	.releases {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.releases__title {
		font-size: 1.5rem;
		line-height: calc(1.5rem + 4px);
		text-transform: uppercase;
	}

	.releases__grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr));
		column-gap: 1.25rem;
		row-gap: 5rem;

		@media (width <= 1760px) {
			row-gap: 3.75rem;
		}

		@media (width <= 640px) {
			row-gap: 2.5rem;
		}
	}
</style>
