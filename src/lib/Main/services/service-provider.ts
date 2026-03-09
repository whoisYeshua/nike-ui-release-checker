import { CountryStore } from '../country.svelte'
import { ReleasesStore } from '../releases.svelte'
import { NotificationScheduler } from './notification-scheduler'
import { SubscriptionStore } from './subscription-store.svelte'

/** Провайдер сервисов с ленивой инициализацией */
export class ServiceProvider {
	#countryStore: CountryStore | null = null
	#releasesStore: ReleasesStore | null = null
	#subscriptionStore: SubscriptionStore | null = null
	#notificationScheduler: NotificationScheduler | null = null

	constructor() {}

	/** Получить CountryStore (singleton) */
	getCountryStore(): CountryStore {
		if (!this.#countryStore) {
			this.#countryStore = new CountryStore()
		}
		return this.#countryStore
	}

	/** Получить ReleasesStore (singleton) */
	getReleasesStore(): ReleasesStore {
		if (!this.#releasesStore) {
			const countryStore = this.getCountryStore()
			this.#releasesStore = new ReleasesStore(countryStore)
		}
		return this.#releasesStore
	}

	/** Получить SubscriptionStore (singleton) */
	getSubscriptionStore(): SubscriptionStore {
		if (!this.#subscriptionStore) {
			this.#subscriptionStore = new SubscriptionStore()
		}
		return this.#subscriptionStore
	}

	/** Получить NotificationScheduler (singleton) */
	getNotificationScheduler(): NotificationScheduler {
		if (!this.#notificationScheduler) {
			const subscriptionStore = this.getSubscriptionStore()
			this.#notificationScheduler = new NotificationScheduler(subscriptionStore)
		}
		return this.#notificationScheduler
	}
}
