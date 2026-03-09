import { createContext } from 'svelte'

import { ServiceProvider } from './service-provider'

const [getServiceProviderContext, setServiceProviderContext] = createContext<ServiceProvider>()
export const setupServiceProvider = () => setServiceProviderContext(new ServiceProvider())

export const useCountryStore = () => {
	const provider = getServiceProviderContext()
	return provider.getCountryStore()
}

export const useReleasesStore = () => {
	const provider = getServiceProviderContext()
	return provider.getReleasesStore()
}

export const useSubscriptionStore = () => {
	const provider = getServiceProviderContext()
	return provider.getSubscriptionStore()
}

export const useNotificationScheduler = () => {
	const provider = getServiceProviderContext()
	return provider.getNotificationScheduler()
}
