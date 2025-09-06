type Stock = 'HIGH' | 'MEDIUM' | 'LOW' | 'OOS' | 'NA'

type Size = {
	size: string
	stock: Stock
}

type Model = {
	imageUrl: string
	releaseDate: string
	productCategory: string
	productName: string
	price: string
	method: string
	sizes: Size[]
}

type Release = {
	productName: string
	models: Model[]
}

export type ReleaseResponse = Release[]
