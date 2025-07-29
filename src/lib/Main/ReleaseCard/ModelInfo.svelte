<script lang="ts">
	import Button from '$lib/Button.svelte';

	import QuestionIcon from './icons/QuestionIcon.svelte';

	interface Props {
		price?: string;
		method?: string;
	}

	let { price, method }: Props = $props();

	let formattedPrice = $derived(price ? price : '—');

	const handleShare = () => {
		console.log('share');
	};
</script>

<div class="model-info-container">
	<div class="price">{formattedPrice}</div>
	{#if method}
		<div class="method-container">
			<span class="method-text">Method: <strong>{method}</strong></span>
			<Button onClick={handleShare} variant="light" aria-label="Describe what this method means">
				{#snippet icon()}
					<QuestionIcon />
				{/snippet}
			</Button>
		</div>
	{/if}
</div>

<style>
	.model-info-container {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: 100%;
	}

	.price {
		font-size: 14px;
		line-height: 18px;
	}

	.method-container {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.method-text {
		font-size: 14px;
		line-height: 18px;
		text-box-trim: trim-end;
	}

	.method-text strong {
		font-weight: 500;
	}
</style>
