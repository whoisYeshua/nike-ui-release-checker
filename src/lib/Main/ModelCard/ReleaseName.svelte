<script lang="ts">
	interface Props {
		productCategory?: string
		productName?: string
	}

	let { productCategory, productName }: Props = $props()
</script>

<div class="release-name-container">
	<p class="product-category">{productCategory}</p>
	<h3 class="product-name">{productName}</h3>
</div>

<style>
	.release-name-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		margin-top: auto;
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
