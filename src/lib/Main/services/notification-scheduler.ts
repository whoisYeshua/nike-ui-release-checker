import { availableCountries } from '@nike-release-checker/sdk'

import type { Subscription, SubscriptionStore } from './subscription-store.svelte'

type ScheduleKey = string & { readonly __brand: unique symbol } // brand type

const isBrowser = typeof window !== 'undefined'
const HOUR = 60 * 60 * 1000
const DAY = 24 * HOUR

export class NotificationScheduler {
	#scheduled = new Map<ScheduleKey, ReturnType<typeof setTimeout>>()
	#subscriptionStore: SubscriptionStore

	constructor(subscriptionStore: SubscriptionStore) {
		this.#subscriptionStore = subscriptionStore

		subscriptionStore.onChange((subs) => this.#sync(subs))
	}

	async requestPermission(): Promise<boolean> {
		if (!this.#isSupported()) return false
		if (Notification.permission === 'granted') return true
		if (Notification.permission === 'denied') return false

		const { promise, resolve, reject } = Promise.withResolvers<boolean>()
		Notification.requestPermission().then((permission) => {
			resolve(permission === 'granted')
		}, reject)
		return promise
	}

	getPermissionStatus(): NotificationPermission | 'unsupported' {
		if (!this.#isSupported()) return 'unsupported'
		return Notification.permission
	}

	#sync(subs: Subscription[]): void {
		const subsByKey = new Map(subs.map((sub) => [this.#getKey(sub.modelId, sub.countryCode), sub]))

		// Cancel only removed subscriptions
		for (const [key, timeoutId] of this.#scheduled) {
			if (subsByKey.has(key)) continue
			this.#cancel(key, timeoutId)
		}

		// Schedule only newly added subscriptions
		for (const [key, sub] of subsByKey) {
			if (this.#scheduled.has(key)) continue
			this.#schedule(sub)
		}
	}

	#schedule(subscription: Subscription): void {
		const key = this.#getKey(subscription.modelId, subscription.countryCode)

		const releaseTime = new Date(subscription.releaseDate).getTime()
		const isReleaseInPast = releaseTime <= Date.now()
		if (isReleaseInPast) return
		const isReleaseLaterThan7Days = releaseTime - Date.now() > 7 * DAY
		if (isReleaseLaterThan7Days) return

		const notifyAt = releaseTime - HOUR
		const delay = Math.max(notifyAt - Date.now(), 2000)

		const timeoutId = setTimeout(() => {
			this.#showNotification(subscription)
			this.#scheduled.delete(key)
			this.#subscriptionStore.unsubscribe(subscription.modelId, subscription.countryCode)
		}, delay)

		this.#scheduled.set(key, timeoutId)
	}

	#cancel(key: ScheduleKey, timeoutId: ReturnType<typeof setTimeout>): void {
		clearTimeout(timeoutId)
		this.#scheduled.delete(key)
	}

	#showNotification(subscription: Subscription): void {
		if (Notification.permission !== 'granted') return

		const notificationTitle = this.#getNotificationTitle(subscription)

		new Notification(notificationTitle, {
			body: `${subscription.modelName} is releasing in 1 hour!`,
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

	#getKey(modelId: string, countryCode: string): ScheduleKey {
		return `${modelId}:${countryCode}` as ScheduleKey
	}

	#isSupported(): boolean {
		return isBrowser && 'Notification' in window
	}
}
