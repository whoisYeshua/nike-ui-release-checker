import { availableCountries } from '@nike-release-checker/sdk'

import type { Subscription, SubscriptionStore } from './subscription-store.svelte'

const isBrowser = typeof window !== 'undefined'
const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

interface ScheduledNotification {
	key: string
	timeoutId: ReturnType<typeof setTimeout>
}

export class NotificationScheduler {
	#scheduled: ScheduledNotification[] = []
	#subscriptionStore: SubscriptionStore

	constructor(subscriptionStore: SubscriptionStore) {
		this.#subscriptionStore = subscriptionStore

		$effect(() => {
			const subs = this.#subscriptionStore.subscriptions
			this.#cancelAll()
			this.#scheduleAll(subs)
		})
	}

	/** Cross-browser permission request (handles Safari callback pattern) */
	async requestPermission(): Promise<boolean> {
		if (!this.#isSupported()) return false
		if (Notification.permission === 'granted') return true
		if (Notification.permission === 'denied') return false

		return new Promise<boolean>((resolve) => {
			Notification.requestPermission().then((permission) => {
				resolve(permission === 'granted')
			})
		})
	}

	getPermissionStatus(): NotificationPermission | 'unsupported' {
		if (!this.#isSupported()) return 'unsupported'
		return Notification.permission
	}

	#schedule(subscription: Subscription): void {
		const key = this.#getKey(subscription.modelId, subscription.countryCode)
		if (this.#scheduled.some((s) => s.key === key)) return

		const releaseTime = new Date(subscription.releaseDate).getTime()
		const isReleaseInPast = releaseTime <= Date.now()
		if (isReleaseInPast) return
		const isReleaseLaterThan7Days = releaseTime - Date.now() > 7 * DAY
		if (isReleaseLaterThan7Days) return

		const notifyAt = releaseTime - HOUR
		const delay = Math.max(notifyAt - Date.now(), 2000)

		const timeoutId = setTimeout(() => {
			this.#showNotification(subscription)
			this.#scheduled = this.#scheduled.filter((s) => s.key !== key)
		}, delay)

		this.#scheduled.push({ key, timeoutId })
	}

	#scheduleAll(subscriptions: Subscription[]): void {
		for (const sub of subscriptions) {
			this.#schedule(sub)
		}
	}

	#cancelAll(): void {
		for (const entry of this.#scheduled) {
			clearTimeout(entry.timeoutId)
		}
		this.#scheduled = []
	}

	#showNotification(subscription: Subscription): void {
		if (Notification.permission !== 'granted') return

		const notificationTitle = this.#getNotificationTitle(subscription)

		new Notification(notificationTitle, {
			body: `${subscription.modelName} is releasing in ~1 hour!`,
			icon: subscription.imageUrl
		})
	}

	#getNotificationTitle(subscription: Subscription): string {
		const targetCountry = availableCountries.find(
			(country) => country.code === subscription.countryCode
		)
		const countryTitle = targetCountry?.emoji ? `${targetCountry.emoji} ` : ''
		return `${countryTitle}${subscription.releaseName}`
	}

	#getKey(modelId: string, countryCode: string): string {
		return `${modelId}:${countryCode}`
	}

	#isSupported(): boolean {
		return isBrowser && 'Notification' in window
	}
}
