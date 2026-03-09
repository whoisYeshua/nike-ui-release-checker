<script lang="ts">
	import { availableCountries } from '@nike-release-checker/sdk'
	import * as Sentry from '@sentry/svelte'
	import Button from '$lib/Button.svelte'
	import Modal from '$lib/Modal.svelte'
	import { formatDate } from '$utils/formatDate'

	import { useSubscriptionStore } from '../Main/services'
	import BellIcon from './BellIcon.svelte'

	let dialog: HTMLDialogElement = $state()!

	const subscriptionStore = useSubscriptionStore()
	const getCountry = (countryCode: string) =>
		availableCountries.find((country) => country.code === countryCode)

	const handleOpen = () => {
		dialog.showModal()
	}

	const getCountryName = (countryCode: string) => {
		const targetCountry = getCountry(countryCode)
		if (!targetCountry) return countryCode
		return `${targetCountry.emoji} ${targetCountry.name}`
	}

	interface UnsubscribeParams {
		modelId: string
		countryCode: string
		modelName: string
		releaseName: string
	}
	const handleUnsubscribe = ({
		modelId,
		countryCode,
		modelName,
		releaseName
	}: UnsubscribeParams) => {
		subscriptionStore.unsubscribe(modelId, countryCode)
		Sentry.metrics.count('release.unsubscribed', 1, {
			attributes: { model_name: modelName, release_name: releaseName }
		})
	}
</script>

<button type="button" aria-label="My subscriptions" title="My subscriptions" onclick={handleOpen}>
	<BellIcon />
</button>

<Modal bind:dialog headerText="My Subscriptions">
	{#if subscriptionStore.sortedSubscriptionsByCountry.length === 0}
		<p class="empty-message">No active subscriptions</p>
	{:else}
		<ul class="country-groups">
			{#each subscriptionStore.sortedSubscriptionsByCountry as [countryCode, subscriptions] (countryCode)}
				<li class="country-group">
					<h3 class="country-heading">{getCountryName(countryCode)}</h3>
					<ul class="subscription-list">
						{#each subscriptions as { imageUrl, modelName, releaseName, releaseDate, modelId, countryCode } (modelId)}
							<li class="subscription-item">
								<img class="thumbnail" src={imageUrl} alt={modelName} width="40" height="40" />
								<div class="subscription-info">
									<span class="model-name">{modelName}</span>
									<span class="release-details">{releaseName}</span>
									<span class="release-details">{formatDate(releaseDate)}</span>
								</div>
								<Button
									onclick={() =>
										handleUnsubscribe({ modelId, countryCode, modelName, releaseName })}
									text="Unsubscribe"
									variant="light"
								/>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{/if}
</Modal>

<style>
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: none;
		border-radius: var(--border-radius);
		background: none;
		padding: 0.375rem;
		color: var(--icon-color);

		&:focus-visible {
			outline: 0.125rem solid var(--focus-ring-color);
			outline-offset: 0.125rem;
		}

		@media (hover: hover) {
			&:hover {
				background-color: var(--divider-color);
			}
		}
	}

	.empty-message {
		padding: 1rem 0;
		color: var(--icon-color);
		text-align: center;
	}

	.subscription-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.country-groups {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin: 0;
		padding: 0 0.25rem 0 0;
		list-style: none;
	}

	.country-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.country-heading {
		font-weight: 500;
		font-size: 16px;
		text-align: center;
	}

	.subscription-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.thumbnail {
		flex-shrink: 0;
		border-radius: 4px;
		width: 40px;
		height: 40px;
		object-fit: cover;
	}

	.subscription-info {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
	}

	.model-name {
		overflow: hidden;
		font-weight: 500;
		font-size: 16px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.release-details {
		overflow: hidden;
		color: var(--icon-color);
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
