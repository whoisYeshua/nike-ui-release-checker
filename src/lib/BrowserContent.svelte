<script lang="ts">
	import { detectBrowser } from '$utils/detectBrowser'

	import type { Snippet } from 'svelte'

	interface Props {
		chromeIos?: Snippet
		chromeAndroid?: Snippet
		chromeDesktop?: Snippet
		safariIos?: Snippet
		safariMacos?: Snippet
		firefoxIos?: Snippet
		firefoxAndroid?: Snippet
		firefoxDesktop?: Snippet
		chrome?: Snippet
		safari?: Snippet
		firefox?: Snippet
		children: Snippet
	}

	const {
		chromeIos,
		chromeAndroid,
		chromeDesktop,
		safariIos,
		safariMacos,
		firefoxIos,
		firefoxAndroid,
		firefoxDesktop,
		chrome,
		safari,
		firefox,
		children: fallback
	}: Props = $props()

	const { browser, platform } = detectBrowser()

	const isDesktop = platform === 'macos' || platform === 'windows' || platform === 'linux'

	const resolved: Snippet | undefined = $derived.by(() => {
		let specific: Snippet | undefined
		if (browser === 'chrome') {
			if (platform === 'ios') specific = chromeIos
			else if (platform === 'android') specific = chromeAndroid
			else if (isDesktop) specific = chromeDesktop
		} else if (browser === 'safari') {
			if (platform === 'ios') specific = safariIos
			else if (isDesktop) specific = safariMacos
		} else if (browser === 'firefox') {
			if (platform === 'ios') specific = firefoxIos
			else if (platform === 'android') specific = firefoxAndroid
			else if (isDesktop) specific = firefoxDesktop
		}

		if (specific) return specific

		if (browser === 'chrome' && chrome) return chrome
		if (browser === 'safari' && safari) return safari
		if (browser === 'firefox' && firefox) return firefox

		return fallback
	})
</script>

{@render resolved?.()}
