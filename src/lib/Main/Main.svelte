<script lang="ts">
	import { formatCurrency } from '$utils/formatCurrency'
	import { formatDate } from '$utils/formatDate'

	import CountrySelect from './CountrySelect/CountrySelect.svelte'
	import EmptyReleases from './EmptyReleases/EmptyReleases.svelte'
	import ErrorReleases from './ErrorReleases/ErrorReleases.svelte'
	import ModelCard from './ModelCard/ModelCard.svelte'
	import ReleaseContainer from './ReleaseContainer/ReleaseContainer.svelte'
	import ReleaseContainerItem from './ReleaseContainer/ReleaseContainerItem.svelte'
	import ReleaseSkeleton from './ReleaseSkeleton.svelte'
	import { setupServiceProvider, useReleasesStore } from './services'

	setupServiceProvider()

	const releasesStore = useReleasesStore()
</script>

{#snippet releaseSkeleton()}
	<div class="releases__grid">
		<ReleaseSkeleton />
		<ReleaseSkeleton />
		<ReleaseSkeleton />
		<ReleaseSkeleton />
	</div>
{/snippet}

{#snippet loadedReleases()}
	{#if releasesStore.data?.length}
		<div class="releases__grid">
			{#each releasesStore.data as release, releaseIndex (release.slug)}
				<ReleaseContainer childrenCount={release.models.length}>
					{#each release.models as model, modelIndex (model.id)}
						<ReleaseContainerItem>
							<ModelCard
								releaseName={release.title}
								modelName={model.modelName}
								method={model.launchView?.method}
								price={formatCurrency(model.merchPrice.currentPrice, model.merchPrice.currency)}
								releaseDate={formatDate(model?.launchView?.startEntryDate)}
								sizes={model.sizes}
								imageUrl={release.imageUrl}
								isLazyImage={releaseIndex >= 8 || modelIndex >= 1}
							/>
						</ReleaseContainerItem>
					{/each}
				</ReleaseContainer>
			{/each}
		</div>
	{:else}
		<EmptyReleases />
	{/if}
{/snippet}

<main>
	<div class="top-panel">
		<CountrySelect />
	</div>
	<section class="releases">
		<h2 class="releases__title">
			Upcoming releases
			<span class="releases__title-count">{releasesStore.data?.length}</span>
		</h2>
		{#if releasesStore.error}
			<ErrorReleases onClick={releasesStore.refetch} isRefetching={releasesStore.isRefetching} />
		{:else if releasesStore.isFetching}
			{@render releaseSkeleton()}
		{:else}
			{@render loadedReleases()}
		{/if}
	</section>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding-inline: calc(50% - 838px);
		padding-block: 2rem;

		@media (width <= 1760px) {
			padding-inline: 1.5rem;
		}

		@media (width <= 640px) {
			padding-inline: 1rem;
			padding-block: 1.5rem;
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
		font-family: 'Trade Gothic', system-ui;
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
		/* https://ishadeed.com/article/css-grid-minmax/ The auto-fill keyword means it will create empty columns if there's extra space (to prevent too width card on full screen for desktop). 344px - The minimum width of each column.1fr - The maximum width is 1 fraction of the available space */
		grid-template-columns: repeat(auto-fill, minmax(var(--min-card-width), 1fr));
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
