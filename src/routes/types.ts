export type BoulderBar = {
	meta: BarMetaData
	occupancy: number
}

export type BarMetaData = {
	name: string
	tag: string
	newEndpoint: boolean
}
