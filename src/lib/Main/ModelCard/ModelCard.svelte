<script lang="ts">
	import * as Sentry from '@sentry/svelte'
	import Button from '$lib/Button.svelte'

	import { useCountryStore, useNotificationScheduler, useSubscriptionStore } from '../services'
	import Divider from './Divider.svelte'
	import BellAlertIcon from './icons/BellAlertIcon.svelte'
	import BellSlashIcon from './icons/BellSlashIcon.svelte'
	import ModelInfo from './ModelInfo.svelte'
	import ReleaseDate from './ReleaseDate.svelte'
	import ReleaseName from './ReleaseName.svelte'
	import ShareButton from './ShareButton.svelte'
	import StockInfo from './StockInfo.svelte'
	import SubscribeInfoDialog from './SubscribeInfoDialog/SubscribeInfoDialog.svelte'

	interface Props {
		imageUrl?: string
		releaseDate?: string
		releaseName?: string
		modelName?: string
		modelId?: string
		price?: string
		method?: string
		sizes?: Array<{
			size: string
			level: 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA'
		}>
		isLazyImage?: boolean
	}

	let {
		imageUrl,
		releaseDate,
		releaseName,
		modelName,
		modelId,
		price,
		method,
		sizes,
		isLazyImage
	}: Props = $props()

	const subscriptionStore = useSubscriptionStore()
	const countryStore = useCountryStore()
	const scheduler = useNotificationScheduler()
	let countryCode = $derived(countryStore.value?.code!)

	let isSubscribed = $derived(
		modelId ? subscriptionStore.isSubscribed(modelId, countryCode) : false
	)
	let infoDialog: HTMLDialogElement = $state()!

	const HOUR = 60 * 60 * 1000

	const isReleaseSoon = $derived(
		!!releaseDate && new Date(releaseDate).getTime() - Date.now() < 1 * HOUR
	)

	const INFO_ACCEPTED_KEY = 'notification-info-accepted'

	const performSubscribe = async () => {
		Sentry.metrics.count('release.subscribed', 1, {
			attributes: { model_name: modelName, release_name: releaseName, country_code: countryCode }
		})
		const isPermissionGranted = await scheduler.requestPermission()
		if (!isPermissionGranted) return
		localStorage.setItem(INFO_ACCEPTED_KEY, 'true')
		subscriptionStore.subscribe({
			modelId: modelId!,
			modelName: modelName ?? '',
			releaseName: releaseName ?? '',
			releaseDate: releaseDate ?? '',
			imageUrl: imageUrl ?? '',
			countryCode
		})
	}

	const handleSubscribe = () => {
		if (isSubscribed) {
			subscriptionStore.unsubscribe(modelId!, countryCode)
			Sentry.metrics.count('release.unsubscribed', 1, {
				attributes: { model_name: modelName, release_name: releaseName }
			})
			return
		}

		const infoAccepted = localStorage.getItem(INFO_ACCEPTED_KEY)
		if (!infoAccepted) {
			infoDialog.showModal()
			return
		}

		performSubscribe()
	}

	const isSubscribedButtonAvailable = $derived(releaseDate ? !isReleaseSoon : false)
</script>

<article class="card-container">
	<img
		class="product-image"
		src={imageUrl}
		alt={releaseName || modelName || 'Product image'}
		loading={isLazyImage ? 'lazy' : 'eager'}
	/>

	{#if imageUrl}
		<ReleaseDate {imageUrl} {releaseDate} />
	{/if}

	<div class="card-body">
		<ReleaseName {releaseName} {modelName} />

		<Divider />

		<ModelInfo {price} {method} />

		<Divider />

		{#if sizes}
			<StockInfo {sizes} />
		{/if}

		<div class="button-row">
			{#if isSubscribedButtonAvailable}
				<Button text={isSubscribed ? 'Unsubscribe' : 'Subscribe'} onclick={handleSubscribe}>
					{#snippet icon()}
						{#if isSubscribed}
							<BellSlashIcon />
						{:else}
							<BellAlertIcon />
						{/if}
					{/snippet}
				</Button>
			{/if}
			<ShareButton style="margin-left: auto" {imageUrl} {releaseDate} {releaseName} {modelName} {price} {method} {sizes} />
		</div>
	</div>
</article>

<SubscribeInfoDialog bind:dialog={infoDialog} onconfirm={performSubscribe} />

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
		display: block;
		background-color: var(--white);
		width: 100%;
		min-height: 15.125rem;
		max-height: 15.125rem;
		object-fit: cover;
		color: var(--black);
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
