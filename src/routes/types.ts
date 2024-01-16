export type HallOccupancy = {
	name: string
	occupancy: number
	icon: string
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
