<script lang="ts">
	import { LOCALE } from '$utils/constants'
	import { formatDate } from '$utils/formatDate'
	import { getContrast, getTopLeftAverageColor } from '$utils/getImageData'

	const SECOND = 1000
	const MINUTE = 60 * SECOND
	const HOUR = 60 * MINUTE

	// @ts-expect-error Intl.DurationFormat is not in TypeScript lib yet
	const durationFormatter = new Intl.DurationFormat(LOCALE, { style: 'narrow' })

	interface Props {
		imageUrl: string
		releaseDate?: string
	}

	let { imageUrl, releaseDate }: Props = $props()

	let now = $state(Date.now())

	const countdown = $derived.by(() => {
		if (!releaseDate) return { label: '', delay: 0 }
		const diffMs = new Date(releaseDate).getTime() - now

		if (diffMs <= 0) return { label: `✅ Released at ${formatDate(releaseDate)}`, delay: 0 }
		if (diffMs > 4 * HOUR) return { label: formatDate(releaseDate), delay: diffMs - 4 * HOUR }
		if (diffMs > 10 * MINUTE) {
			const hours = Math.floor(diffMs / HOUR)
			const minutes = Math.floor((diffMs % HOUR) / MINUTE)
			return {
				label: `Release in ${durationFormatter.format({ hours, minutes })} (${formatDate(releaseDate, { month: undefined, day: undefined })})`,
				delay: MINUTE
			}
		}
		const minutes = Math.floor(diffMs / MINUTE)
		const seconds = Math.floor((diffMs % MINUTE) / SECOND)
		return {
			label: `🔥 ${durationFormatter.format({ minutes, seconds })}`,
			delay: SECOND
		}
	})

	$effect(() => {
		if (countdown.delay <= 0) return
		const timeoutId = setTimeout(() => {
			now = Date.now()
		}, countdown.delay)
		return () => clearTimeout(timeoutId)
	})
</script>

{#await getTopLeftAverageColor(imageUrl, { format: 'hex' }) then data}
	<div
		class="release-date"
		style:--release-date-color={getContrast(data) === 'dark'
			? 'var(--release-date-light-color)'
			: 'var(--release-date-dark-color)'}
	>
		{countdown.label}
	</div>
{/await}

<style>
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
</style>
