import { hexToRgb } from './hexToRgb'

// https://github.com/luukdv/color.js/tree/master

type Args = {
	format: 'array' | 'hex'
	sample: number
}

type Data = Uint8ClampedArray

type Rgb = [r: number, g: number, b: number]
type Hex = string
type Output = Hex | Rgb

type Url = string
type Item = Url | HTMLImageElement

const getSrc = (item: Item): string => (typeof item === 'string' ? item : item.src)

const getDefaultArgs = ({ format = 'hex', sample = 10 }: Partial<Args> = {}) => ({
	format,
	sample
})

const format = (input: Rgb, args: Args): Output => (args.format === 'hex' ? rgbToHex(input) : input)

const rgbToHex = (rgb: Rgb): Hex =>
	'#' +
	rgb
		.map((val) => {
			const hex = val.toString(16)

			return hex.length === 1 ? '0' + hex : hex
		})
		.join('')

const getImageData = (src: Url, zone: number = 1): Promise<Data> =>
	new Promise((resolve, reject) => {
		const canvas = document.createElement('canvas')
		const context = canvas.getContext('2d')!
		const img = new Image()

		img.addEventListener(
			'load',
			() => {
				canvas.height = img.height
				canvas.width = img.width
				context.drawImage(img, 0, 0)

				const data = context.getImageData(0, 0, img.width * zone, img.height * zone).data

				resolve(data)
			},
			{ once: true }
		)
		img.addEventListener('error', () => reject(Error('Image loading failed.')), { once: true })
		img.crossOrigin = ''
		img.src = src
	})

const getAverage = (data: Data, args: Args): Output => {
	const gap = 4 * args.sample
	const amount = data.length / gap
	const rgb = { r: 0, g: 0, b: 0 }

	for (let i = 0; i < data.length; i += gap) {
		rgb.r += data[i]
		rgb.g += data[i + 1]
		rgb.b += data[i + 2]
	}

	return format(
		[Math.round(rgb.r / amount), Math.round(rgb.g / amount), Math.round(rgb.b / amount)],
		args
	)
}

export async function getAverageColor(
	item: Item,
	args?: Partial<Args> & { format: 'array' }
): Promise<Rgb>
export async function getAverageColor(
	item: Item,
	args?: Partial<Args> & { format: 'hex' }
): Promise<Hex>
export async function getAverageColor(item: Item, args?: Partial<Args>): Promise<Output> {
	const data = await getImageData(getSrc(item))
	return getAverage(data, getDefaultArgs(args))
}

export async function getTopLeftAverageColor(
	item: Item,
	args?: Partial<Args> & { format: 'array' }
): Promise<Rgb>
export async function getTopLeftAverageColor(
	item: Item,
	args?: Partial<Args> & { format: 'hex' }
): Promise<Hex>
export async function getTopLeftAverageColor(item: Item, args?: Partial<Args>): Promise<Output> {
	const data = await getImageData(getSrc(item), 0.5)
	return getAverage(data, getDefaultArgs(args))
}

// https://github.com/scottcorgan/contrast
export const getContrast = (hex: Hex) => {
	var rgb = hexToRgb(hex, { format: 'array' })
	var o = Math.round((rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000)

	return o <= 180 ? 'dark' : 'light'
}
