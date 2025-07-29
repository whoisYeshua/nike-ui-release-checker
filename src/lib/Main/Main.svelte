<script lang="ts">
	import CountrySelect from './CountrySelect/CountrySelect.svelte';
	import ReleaseCard from './ReleaseCard/ReleaseCard.svelte';

	const sizes = [
		{ size: '7', stock: 'HIGH' },
		{ size: '7.5', stock: 'MEDIUM' },
		{ size: '8', stock: 'LOW' },
		{ size: '8.5', stock: 'OOS' },
		{ size: '9', stock: 'NA' },
		{ size: '9.5', stock: 'NA' },
		{ size: '10', stock: 'OOS' },
		{ size: '10.5', stock: 'MEDIUM' },
		{ size: '11.5', stock: 'MEDIUM' },
		{ size: '12', stock: 'HIGH' },
		{ size: '12.5', stock: 'MEDIUM' },
		{ size: '13', stock: 'MEDIUM' },
		{ size: '14', stock: 'MEDIUM' },
		{ size: '15', stock: 'MEDIUM' },
		{ size: '16', stock: 'MEDIUM' },
		{ size: '18', stock: 'MEDIUM' }
	] satisfies { size: string; stock: 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA' }[];

	// Sample release data
	const releases = [
		{
			imageUrl:
				'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/1cd8cb39-da26-4d78-8ac2-5a2a81702275/little-kids-jordan-1-high-og-shattered-backboard-fd1412-008.jpg',
			releaseDate: 'Jul 26, 05:00 PM',
			productCategory: "Big Kids' Air Jordan 1 High OG",
			productName: 'Glacier Blue and Light Armory Blue',
			price: '130 USD',
			method: 'LEO',
			sizes
		},
		{
			imageUrl:
				'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/105a18bc-1e1c-4014-8847-fbafad174468/acg-rufus-dark-smoke-grey-and-light-lemon-twist-ib5843-300-release-date.jpg',
			releaseDate: 'Jul 28, 10:00 AM',
			productCategory: "Men's Air Force 1 Low",
			productName: 'Triple White Classic',
			price: '110 USD',
			method: 'FCFS',
			sizes
		},
		{
			imageUrl:
				'https://static.nike.com/a/images/t_prod_ss/w_960,c_limit/2e04c0f5-5e23-4f07-9ebc-fd44913fec55/big-kids-air-jordan-5-reimagined-hf3976-001.jpg',
			releaseDate: 'Aug 2, 12:00 PM',
			productCategory: "Women's Dunk Low",
			productName: 'Panda Black and White',
			price: '100 USD',
			method: 'LEO',
			sizes
		}
	];
</script>

<main>
	<div class="top-panel">
		<CountrySelect />
	</div>
	<section class="releases">
		<h2 class="releases__title">
			Upcoming releases
			<span class="releases__title-count">{releases.length}</span>
		</h2>
		<div class="releases__grid">
			{#each releases as release}
				<ReleaseCard {...release} />
			{/each}
		</div>
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
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

	.releases__title-count {
		vertical-align: top;
		font-size: 1rem;
		line-height: calc(1rem + 6px);
	}

	.releases__grid {
		--min-card-width: 344px;
		display: grid;
		/* https://ishadeed.com/article/css-grid-minmax/ The auto-fill keyword means it will create empty columns if there's extra space (to prevent too width card on full screen for desktop). min(344px, 100%) - The minimum width of each column is the smaller of either 344px or 100% of the container width.1fr - The maximum width is 1 fraction of the available space */
		grid-template-columns: repeat(auto-fill, minmax(min(var(--min-card-width), 100%), 1fr));
		justify-items: center;
		gap: 2rem;

		@media (width <= 1760px) {
			gap: 1.5rem;
		}

		@media (width <= 640px) {
			gap: 1rem;
		}
	}
</style>
