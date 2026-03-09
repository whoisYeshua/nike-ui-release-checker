import { LOCALE } from './constants'

/**
 * Formats an ISO timestamp to a readable date format like "Jul 26, 05:00 PM"
 * @param isoString - ISO timestamp string
 * @returns Formatted date string or empty string if invalid
 */
export const formatDate = (isoString: string | undefined, options: Intl.DateTimeFormatOptions = {}): string => {
	if (!isoString) return ''
	const date = new Date(isoString).getTime()

	if (Number.isNaN(date)) return ''

	// Use Intl.DateTimeFormat to format the date with current locale
	const formatter = new Intl.DateTimeFormat(LOCALE, {
		month: 'short',
		day: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		...options
	})

	return formatter.format(date)
}
