import type { PageServerLoad } from './$types'
import { type LocationMetaData, LocationEndpointType } from './types'

export const ssr = false

const locationMetaData: LocationMetaData[] = [
	{
		name: 'Wienerberg',
		tag: 'wb',
		type: LocationEndpointType.BBNew
	},
	{
		name: 'Hauptbahnhof',
		tag: 'hbf',
		type: LocationEndpointType.BBNew
	},
	{
		name: 'Hannovergasse',
		tag: 'han',
		type: LocationEndpointType.BBNew
	},
	{
		name: 'Seestadt',
		tag: 'see',
		type: LocationEndpointType.BBNew
	},
	{
		name: 'Linz',
		tag: 'LNZ',
		type: LocationEndpointType.BBOld
	},
	{
		name: 'Salzburg',
		tag: 'SBG',
		type: LocationEndpointType.BBOld
	},
	{
		name: 'Blockfabrik',
		type: LocationEndpointType.BlockFabrik
	}
]

export const load: PageServerLoad = async () => {
	console.log('loading')
	return {
		locations: locationMetaData
	}
}
