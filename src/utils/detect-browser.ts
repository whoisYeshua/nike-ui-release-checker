export type Browser = 'chrome' | 'safari' | 'firefox' | 'other'
export type Platform = 'ios' | 'android' | 'macos' | 'windows' | 'linux' | 'other'

export type BrowserInfo = {
	browser: Browser
	platform: Platform
}

export const isBrowser = typeof window !== 'undefined'

export function detectBrowser(): BrowserInfo {
	if (typeof navigator === 'undefined') return { browser: 'other', platform: 'other' }

	const ua = navigator.userAgent

	// Platform detection (iOS must be checked before macOS due to iPad UA overlap)
	let platform: Platform = 'other'
	const isIos =
		/iPhone|iPod/.test(ua) || /iPad/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
	if (isIos) platform = 'ios'
	else if (/Android/.test(ua)) platform = 'android'
	else if (/Macintosh|Mac OS X/.test(ua)) platform = 'macos'
	else if (/Windows/.test(ua)) platform = 'windows'
	else if (/Linux/.test(ua)) platform = 'linux'

	// Browser detection (order matters: Chrome UA contains "Safari")
	let browser: Browser = 'other'
	if (/Chrome|Chromium|CriOS/.test(ua) && !/Edg/.test(ua)) browser = 'chrome'
	else if (/Firefox|FxiOS/.test(ua)) browser = 'firefox'
	else if (/Safari/.test(ua)) browser = 'safari'

	return { browser, platform }
}
