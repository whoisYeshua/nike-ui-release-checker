<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
		childrenCount: number
	}

	const ITEMS_GAP = 24

	let { children, childrenCount }: Props = $props()

	let activeIndex = $state(0)
	let cardsContainer: HTMLDivElement

	const handleScroll = () => {
		const scrollLeft = cardsContainer.scrollLeft
		const cardWidth = cardsContainer.clientWidth

		// Calculate which card is currently most visible
		const currentIndex = Math.round(scrollLeft / (cardWidth + ITEMS_GAP))
		activeIndex = Math.max(0, Math.min(currentIndex, cardsContainer.childElementCount - 1))
	}

	const scrollToItem = (index: number) => {
		const cardWidth = cardsContainer.clientWidth
		const scrollPosition = index * (cardWidth + ITEMS_GAP)

		cardsContainer.scrollTo({
			left: scrollPosition,
			behavior: 'smooth'
		})
	}
</script>

<div class="release-container">
	<div
		class="release-container__items"
		style:gap={`${ITEMS_GAP}px`}
		onscroll={handleScroll}
		bind:this={cardsContainer}
	>
		{@render children()}
	</div>
	<div class="models-count">
		{#each { length: childrenCount }, index}
			<button
				class={['models-count__item', 'touchable', { active: index === activeIndex }]}
				aria-label="Go to item {index + 1}"
				tabindex="-1"
				onclick={() => scrollToItem(index)}
			></button>
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
		cursor: pointer;
		border: 1px solid var(--divider-color);
		border-radius: 50%;
		background-color: transparent;
		padding: 0;
		width: 0.5rem;
		height: 0.5rem;

		&.active {
			background-color: var(--font-color);
		}
	}
</style>
