<script lang="ts">
	import { detectBrowser } from '$utils/detect-browser'

	import type { Snippet } from 'svelte'

	interface Props {
		chrome_ios?: Snippet
		chrome_android?: Snippet
		chrome_desktop?: Snippet
		safari_ios?: Snippet
		safari_macos?: Snippet
		firefox_ios?: Snippet
		firefox_android?: Snippet
		firefox_desktop?: Snippet
		chrome?: Snippet
		safari?: Snippet
		firefox?: Snippet
		fallback?: Snippet
	}

	const {
		chrome_ios,
		chrome_android,
		chrome_desktop,
		safari_ios,
		safari_macos,
		firefox_ios,
		firefox_android,
		firefox_desktop,
		chrome,
		safari,
		firefox,
		fallback
	}: Props = $props()

	const { browser, platform } = detectBrowser()

	const isDesktop = platform === 'macos' || platform === 'windows' || platform === 'linux'

	const resolved: Snippet | undefined = $derived.by(() => {
		let specific: Snippet | undefined
		if (browser === 'chrome') {
			if (platform === 'ios') specific = chrome_ios
			else if (platform === 'android') specific = chrome_android
			else if (isDesktop) specific = chrome_desktop
		} else if (browser === 'safari') {
			if (platform === 'ios') specific = safari_ios
			else if (platform === 'macos') specific = safari_macos
		} else if (browser === 'firefox') {
			if (platform === 'ios') specific = firefox_ios
			else if (platform === 'android') specific = firefox_android
			else if (isDesktop) specific = firefox_desktop
		}

		if (specific) return specific

		if (browser === 'chrome') return chrome
		if (browser === 'safari') return safari
		if (browser === 'firefox') return firefox

		return fallback
	})
</script>

{@render resolved?.()}
