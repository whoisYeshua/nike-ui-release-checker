<script lang="ts">
	import Button from '$lib/Button.svelte'
	import { formatDate } from '$utils/formatDate'
	import { getAverageColor, getContrast } from '$utils/getImageData'

	import Divider from './Divider.svelte'
	import BellAlertIcon from './icons/BellAlertIcon.svelte'
	import BellSlashIcon from './icons/BellSlashIcon.svelte'
	import ModelInfo from './ModelInfo.svelte'
	import ReleaseName from './ReleaseName.svelte'
	import ShareButton from './ShareButton.svelte'
	import StockInfo from './StockInfo.svelte'

	interface Props {
		imageUrl?: string
		releaseDate?: string
		releaseName?: string
		modelName?: string
		price?: string
		method?: string
		sizes?: Array<{
			size: string
			level: 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA'
		}>
		isSubscribed?: boolean
	}

	let { imageUrl, releaseDate, releaseName, modelName, price, method, sizes, isSubscribed }: Props =
		$props()

	let subscriptionState = $state(isSubscribed)

	function handleSubscribe() {
		subscriptionState = !subscriptionState
	}

	let isDarkImageBackground = $state(false)

	$effect(() => {
		if (!imageUrl) return
		getAverageColor(imageUrl, { format: 'hex' }).then((data) => {
			isDarkImageBackground = getContrast(data) === 'dark'
		})
	})
</script>

<article class="card-container">
	<div class="product-image" style="background-image: url('{imageUrl}')"></div>

	<div
		class="release-date"
		style:--release-date-color={isDarkImageBackground
			? 'var(--release-date-light-color)'
			: 'var(--release-date-dark-color)'}
	>
		{formatDate(releaseDate)}
	</div>

	<div class="card-body">
		<ReleaseName {releaseName} {modelName} />

		<Divider />

		<ModelInfo {price} {method} />

		<Divider />

		{#if sizes}
			<StockInfo {sizes} />
		{/if}

		<div class="button-row">
			<Button text={subscriptionState ? 'Unsubscribe' : 'Subscribe'} onclick={handleSubscribe}>
				{#snippet icon()}
					{#if subscriptionState}
						<BellSlashIcon />
					{:else}
						<BellAlertIcon />
					{/if}
				{/snippet}
			</Button>
			<ShareButton {imageUrl} {releaseDate} {releaseName} {modelName} {price} {method} {sizes} />
		</div>
	</div>
</article>

<style>
	.card-container {
		--release-card-padding: 1rem;
		--release-card-bg: light-dark(hsl(0, 0%, 100%), hsl(0, 0%, 12%));

		display: flex;

		position: relative;
		flex-direction: column;
		border: 1px solid var(--divider-color);
		border-radius: var(--border-radius);
		background: var(--release-card-bg);
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.product-image {
		background-size: cover;
		background-repeat: no-repeat;
		background-color: var(--white);
		background-position-y: -130px;
		min-height: 15.125rem;
		max-height: 15.125rem;
	}

	.release-date {
		--release-date-light-color: hsl(210, 10%, 84%);
		--release-date-dark-color: hsl(208, 37%, 20%);
		position: absolute;
		top: var(--release-card-padding);
		left: var(--release-card-padding);
		color: var(--release-date-color);
		font-size: 20px;
		line-height: 24px;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		padding: var(--release-card-padding);
		height: 100%;
	}

	/* Icons */

	.button-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: auto;
		padding-top: 0.375rem;
		width: 100%;
	}
</style>
