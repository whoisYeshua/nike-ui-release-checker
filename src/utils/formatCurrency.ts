import { LOCALE } from './constants'

/**
 * Formats a value as currency using the current locale like '130 $'
 * @param value - The number to format as currency
 * @param currency - The currency code (e.g., 'USD', 'EUR', 'GBP')
 * @returns Formatted currency string
 */
export const formatCurrency = (value?: number, currency: string = 'USD') => {
	if (!value) return ''

	return new Intl.NumberFormat(LOCALE, {
		style: 'currency',
		currency: currency || 'USD',
		maximumFractionDigits: 0
	}).format(value)
}
