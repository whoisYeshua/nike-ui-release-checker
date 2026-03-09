import { availableCountries } from '@nike-release-checker/sdk'

const isBrowser = typeof window !== 'undefined'

const getCountry = (countryCode: string) =>
	availableCountries.find((country) => country.code === countryCode)

const getCountrySortValue = (countryCode: string) => getCountry(countryCode)?.name ?? countryCode

export interface Subscription {
	modelId: string
	modelName: string
	releaseName: string
	releaseDate: string
	imageUrl: string
	countryCode: string
	subscribedAt: number
}

export class SubscriptionStore {
	#storageKey = 'release-subscriptions'
	#subscriptions = $state<Subscription[]>(this.#loadFromStorage())

	get subscriptions(): Subscription[] {
		return this.#subscriptions
	}

	get sortedSubscriptionsByCountry() {
		return Array.from(Map.groupBy(this.#subscriptions, (sub) => sub.countryCode)).toSorted(
			([leftCode], [rightCode]) =>
				getCountrySortValue(leftCode).localeCompare(getCountrySortValue(rightCode))
		)
	}

	isSubscribed(modelId: string, countryCode: string): boolean {
		return this.#subscriptions.some(
			(sub) => sub.modelId === modelId && sub.countryCode === countryCode
		)
	}

	subscribe(subscription: Omit<Subscription, 'subscribedAt'>): Subscription | null {
		if (this.isSubscribed(subscription.modelId, subscription.countryCode)) return null
		const completeSubscription = { ...subscription, subscribedAt: Date.now() }
		this.#subscriptions = [...this.#subscriptions, completeSubscription]
		this.#saveToStorage()
		return completeSubscription
	}

	unsubscribe(modelId: string, countryCode: string): Subscription | null {
		const existing = this.#subscriptions.find(
			(sub) => sub.modelId === modelId && sub.countryCode === countryCode
		)
		if (!existing) return null
		this.#subscriptions = this.#subscriptions.filter(
			(sub) => sub.modelId !== modelId || sub.countryCode !== countryCode
		)
		this.#saveToStorage()
		return existing
	}

	#loadFromStorage(): Subscription[] {
		if (!isBrowser) return []
		try {
			const raw = localStorage.getItem(this.#storageKey)
			if (!raw) return []
			const parsed: Subscription[] = JSON.parse(raw)
			const now = Date.now()
			return parsed.filter((sub) => new Date(sub.releaseDate).getTime() > now)
		} catch {
			return []
		}
	}

	#saveToStorage(): void {
		if (!isBrowser) return
		localStorage.setItem(this.#storageKey, JSON.stringify(this.#subscriptions))
	}
}
