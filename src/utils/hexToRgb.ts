// https://github.com/sindresorhus/hex-rgb

const hexCharacters = 'a-f\\d'
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi')
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i')

interface Options {
	/**
	 * The RGB output format. Note that when using the `css` format, the value of the alpha channel is rounded to two decimal places.
	 * @default 'object'
	 */
	readonly format?: 'object' | 'array' | 'css'
}

interface RgbaObject {
	red: number
	green: number
	blue: number
	alpha: number
}

type RgbaTuple = [red: number, green: number, blue: number, alpha: number]

/**
 * Convert HEX color to RGBA.
 *
 * @param hex - The color in HEX format. Leading `#` is optional.
 */
export function hexToRgb(hex: string): RgbaObject
export function hexToRgb(hex: string, options: Options & { format: 'object' }): RgbaObject // eslint-disable-line @typescript-eslint/unified-signatures
export function hexToRgb(hex: string, options: Options & { format: 'array' }): RgbaTuple
export function hexToRgb(hex: string, options: Options & { format: 'css' }): string
export function hexToRgb(hex: string, options: Options = {}) {
	if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
		throw new TypeError('Expected a valid hex string')
	}

	hex = hex.replace(/^#/, '')
	let alpha = 1

	if (hex.length === 8) {
		alpha = Number.parseInt(hex.slice(6, 8), 16) / 255
		hex = hex.slice(0, 6)
	}

	if (hex.length === 4) {
		alpha = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255
		hex = hex.slice(0, 3)
	}

	if (hex.length === 3) {
		hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
	}

	const number = Number.parseInt(hex, 16)
	const red = number >> 16
	const green = (number >> 8) & 255
	const blue = number & 255

	if (options.format === 'array') {
		return [red, green, blue, alpha]
	}

	if (options.format === 'css') {
		const alphaString = alpha === 1 ? '' : ` / ${Number((alpha * 100).toFixed(2))}%`
		return `rgb(${red} ${green} ${blue}${alphaString})`
	}

	return { red, green, blue, alpha }
}
