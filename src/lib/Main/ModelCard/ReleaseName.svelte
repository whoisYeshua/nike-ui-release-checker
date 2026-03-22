<script lang="ts">
	interface Props {
		releaseName?: string
		modelName?: string
	}

	let { releaseName, modelName }: Props = $props()
</script>

<hgroup class="release-name-container">
	<p class="product-category">{releaseName}</p>
	<h3 class="product-name">{modelName}</h3>
</hgroup>

<style>
	.release-name-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.product-category {
		font-size: 14px;
		line-height: 18px;
	}

	.product-name {
		font-weight: 500;
		font-size: 20px;
		line-height: 24px;
	}
</style>
