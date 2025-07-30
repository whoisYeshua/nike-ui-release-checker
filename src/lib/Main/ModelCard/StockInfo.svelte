<script lang="ts">
	interface Size {
		size: string;
		stock: 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA';
	}

	interface Props {
		sizes: Size[];
	}

	let { sizes }: Props = $props();

	const stockColorMap = {
		HIGH: 'var(--success)',
		MEDIUM: 'var(--warning)',
		LOW: 'var(--error)',
		OOS: 'var(--font-color)',
		NA: '#ababab'
	};

	function getStockColor(stock: string): string {
		return stockColorMap[stock as keyof typeof stockColorMap] || 'var(--font-color)';
	}
</script>

<div class="size-stock">
	<div class="size-stock__header">Size — Stock:</div>
	<div class="size-stock__grid">
		{#each sizes as { size, stock }}
			<div class="size-stock__item" style:color={getStockColor(stock)}>
				<span class="size">{size} </span>— {stock}
			</div>
		{/each}
	</div>
</div>

<style>
	.size-stock {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.size-stock__header {
		font-size: 14px;
		line-height: 18px;
	}

	.size-stock__grid {
		display: grid;
		grid-template-rows: repeat(6, 1fr);
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}

	.size-stock__item {
		font-weight: 500;
		font-size: 12px;
		line-height: 16px;
		white-space: pre;
	}

	.size {
		display: inline-block;
		width: 4ch;
	}
</style>
