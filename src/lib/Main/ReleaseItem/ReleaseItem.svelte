<script lang="ts">
	import ModelCard from '../ModelCard/ModelCard.svelte';

	interface Props {
		release: {
			productName: string;
			models: Array<{
				imageUrl: string;
				releaseDate: string;
				productCategory: string;
				productName: string;
				price: string;
				method: string;
				sizes: Array<{ size: string; stock: 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA' }>;
			}>;
		};
	}

	const ITEMS_GAP = 24;

	let { release }: Props = $props();

	let activeIndex = $state(0);

	const handleScroll = ({ currentTarget }: Event) => {
		const cardsContainer = currentTarget as HTMLDivElement;
		if (!cardsContainer) return;

		const scrollLeft = cardsContainer.scrollLeft;
		const cardWidth = cardsContainer.clientWidth;

		// Calculate which card is currently most visible
		const currentIndex = Math.round(scrollLeft / (cardWidth + ITEMS_GAP));
		activeIndex = Math.max(0, Math.min(currentIndex, cardsContainer.childElementCount - 1));
	};
</script>

<div class="releases-item">
	<div class="releases-item__cards" style:gap={`${ITEMS_GAP}px`} onscroll={handleScroll}>
		{#each release.models as model (model.productName)}
			<div class="releases-item__card">
				<ModelCard {...model} />
			</div>
		{/each}
	</div>
	<div class="models-count">
		{#each release.models as _, index}
			<div class="models-count__item" class:active={index === activeIndex}></div>
		{/each}
	</div>
</div>

<style>
	.releases-item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		height: 100%;
	}

	.releases-item__cards {
		display: flex;
		width: 100%;
		height: 100%;
		overflow-x: scroll;
		overscroll-behavior-x: contain;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
	}

	.releases-item__card {
		min-width: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	.models-count {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
	}

	.models-count__item {
		border: 1px solid var(--divider-color);
		border-radius: 50%;
		width: 0.5rem;
		height: 0.5rem;

		&.active {
			background-color: var(--font-color);
		}
	}
</style>
