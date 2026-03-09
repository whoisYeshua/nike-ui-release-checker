<script lang="ts">
	import * as Sentry from '@sentry/svelte'
	import Button from '$lib/Button.svelte'
	import { convertImageUrlToFile } from '$utils/convertImageUrlToFile'
	import { formatDate } from '$utils/formatDate'

	import ShareIcon from './icons/ShareIcon.svelte'

	const isBrowser = typeof window !== 'undefined'
	const webShareAPISupported = isBrowser && typeof navigator.share !== 'undefined'

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
	}

	let { imageUrl, releaseDate, releaseName, modelName, price, method, sizes }: Props = $props()

	const formatReleaseText = () => {
		let text = ''

		// Product info
		if (releaseName && modelName) {
			text += `${releaseName} - ${modelName}\n`
		} else if (modelName) {
			text += `${modelName}\n`
		}

		// Release date
		if (releaseDate) {
			text += `Release Date: ${formatDate(releaseDate)}\n`
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
				const stockLevelStatusMap = {
					HIGH: '🟢 High',
					MEDIUM: '🟡 Medium',
					LOW: '🔴 Low',
					OOS: '❌ Out of Stock',
					NA: '❓ Not Available'
				}
				const stockStatus = stockLevelStatusMap[sizeInfo.level]
				text += `  Size ${sizeInfo.size}: ${stockStatus}\n`
			})
		}

		return text.trim()
	}

	const handleShare = async () => {
		const shareText = formatReleaseText()
		const shareData: ShareData = {
			title: modelName || 'Nike Release',
			text: shareText,
			url: window.location.href
		}

		if (imageUrl && navigator?.canShare({ ...shareData, files: [] })) {
			const imageFile = await convertImageUrlToFile(imageUrl, 'nike-release')
			if (imageFile) shareData.files = [imageFile]
		}

		await navigator.share(shareData)
		Sentry.metrics.count('release.shared', 1, {
			attributes: { model_name: modelName, release_name: releaseName }
		})
	}
</script>

{#if webShareAPISupported}
	<Button onclick={handleShare} aria-label="Share this release">
		{#snippet icon()}
			<ShareIcon />
		{/snippet}
	</Button>
{/if}
