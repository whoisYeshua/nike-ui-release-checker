<script lang="ts">
	import Button from '$lib/Button.svelte'
	import { convertImageUrlToFile } from '$utils/convertImageUrlToFile'

	import ShareIcon from './icons/ShareIcon.svelte'

	const isBrowser = typeof window !== 'undefined'
	const webShareAPISupported = isBrowser && typeof navigator.share !== 'undefined'

	interface Props {
		imageUrl?: string
		releaseDate?: string
		productCategory?: string
		productName?: string
		price?: string
		method?: string
		sizes?: Array<{
			size: string
			stock: 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA'
		}>
	}

	let { imageUrl, releaseDate, productCategory, productName, price, method, sizes }: Props =
		$props()

	const formatReleaseText = () => {
		let text = ''

		// Product info
		if (productCategory && productName) {
			text += `${productCategory} - ${productName}\n`
		} else if (productName) {
			text += `${productName}\n`
		}

		// Release date
		if (releaseDate) {
			text += `Release Date: ${releaseDate}\n`
		}

		// Price and method
		if (price) {
			text += `Price: ${price}`
			if (method) {
				text += ` (${method})`
			}
			text += '\n'
		}

		// Stock information
		if (sizes && sizes.length > 0) {
			text += '\nStock Status:\n'
			sizes.forEach((sizeInfo) => {
				const stockStatusMap = {
					HIGH: '🟢 High',
					MEDIUM: '🟡 Medium',
					LOW: '🔴 Low',
					OOS: '❌ Out of Stock',
					NA: '❓ Not Available'
				}
				const stockStatus = stockStatusMap[sizeInfo.stock]
				text += `  Size ${sizeInfo.size}: ${stockStatus}\n`
			})
		}

		return text.trim()
	}

	const handleShare = async () => {
		const shareText = formatReleaseText()
		const shareData: ShareData = {
			title: productName || 'Nike Release',
			text: shareText,
			url: window.location.href
		}

		if (imageUrl && navigator?.canShare({ ...shareData, files: [] })) {
			const imageFile = await convertImageUrlToFile(imageUrl, 'nike-release')
			if (imageFile) shareData.files = [imageFile]
		}

		await navigator.share(shareData)
	}
</script>

{#if webShareAPISupported}
	<Button onclick={handleShare} aria-label="Share this release">
		{#snippet icon()}
			<ShareIcon />
		{/snippet}
	</Button>
{/if}
