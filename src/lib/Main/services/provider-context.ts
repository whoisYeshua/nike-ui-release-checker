import { getContext, setContext } from 'svelte';

import { serviceProvider } from './service-provider';

import type { ServiceProvider } from './service-provider';

const SERVICE_PROVIDER_KEY = Symbol('service-provider');

export const setupServiceProvider = (): void => {
	setContext(SERVICE_PROVIDER_KEY, serviceProvider);
};

const getServiceProvider = (): ServiceProvider => {
	const provider = getContext<ServiceProvider>(SERVICE_PROVIDER_KEY);
	if (!provider) {
		throw new Error('Service Provider not found in Svelte context');
	}
	return provider;
};

export const useCountryStore = () => {
	const provider = getServiceProvider();
	return provider.getCountryStore();
};

export const useReleasesStore = () => {
	const provider = getServiceProvider();
	return provider.getReleasesStore();
};
