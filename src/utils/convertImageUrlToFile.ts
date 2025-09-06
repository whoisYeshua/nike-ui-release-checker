export const convertImageUrlToFile = async (
	url: string,
	filename: string = 'image'
): Promise<File | null> => {
	try {
		const response = await fetch(url)
		if (!response.ok) throw new Error(`Failed to fetch image: ${response.status}`)

		const blob = await response.blob()

		const contentType = response.headers.get('content-type') || 'image/jpeg'
		const extension = contentType.split('/')[1] || 'jpg'

		const finalFilename = `${filename}.${extension}`
		const file = new File([blob], finalFilename, {
			type: contentType
		})
		return file
	} catch (error) {
		console.error('Error converting image URL to File:', error)
		return null
	}
}
