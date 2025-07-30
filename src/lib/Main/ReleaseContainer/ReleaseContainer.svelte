<script lang="ts">
	import ModelCard from '../ModelCard/ModelCard.svelte';

	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		childrenCount: number;
	}

	const ITEMS_GAP = 24;

	let { children, childrenCount }: Props = $props();

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

<div class="release-container">
	<div class="release-container__items" style:gap={`${ITEMS_GAP}px`} onscroll={handleScroll}>
		{@render children()}
	</div>
	<div class="models-count">
		{#each { length: childrenCount }, index}
			<div class="models-count__item" class:active={index === activeIndex}></div>
		{/each}
	</div>
</div>

<style>
	.release-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		height: 100%;
	}

	.release-container__items {
		display: flex;
		width: 100%;
		height: 100%;
		overflow-x: scroll;
		overscroll-behavior-x: contain;
		scroll-behavior: smooth;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
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
