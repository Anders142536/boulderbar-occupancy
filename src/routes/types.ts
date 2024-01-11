export type HallOccupancy = {
	name: string
	occupancy: number
	loading: boolean
}

export type LocationMetaData = {
	name: string
	tag?: string
	type: LocationEndpointType
}

export enum LocationEndpointType {
	BBNew = 'BBNew',
	BBOld = 'BBOld',
	BlockFabrik = 'BlockFabrik'
}
