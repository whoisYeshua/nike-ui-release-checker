<main>
	<section>
		<h2>Upcoming releases</h2>
		<div class="releases">
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

	section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h2 {
		font-size: 1.5rem;
		line-height: calc(1.5rem + 4px);
		text-transform: uppercase;
	}

	.releases {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(360px, 100%), 1fr));
		column-gap: 20px;
		row-gap: 80px;

		@media (width <= 1760px) {
			row-gap: 60px;
		}

		@media (width <= 640px) {
			row-gap: 40px;
		}
	}
</style>
