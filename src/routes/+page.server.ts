import axios from 'axios'
import type { PageServerLoad } from './$types'
import type { BarMetaData, BoulderBar } from './types'

export const ssr = false
const ax = axios.create({
	baseURL: 'https://flash-cloud.boulderbar.net/modules/bbext/CustomerCapacity.php?gym='
})
const barMetaData: BarMetaData[] = [
	{
		name: 'Wiener Berg',
		tag: 'wb'
	},
	{
		name: 'Hauptbahnhof',
		tag: 'hbf'
	},
	{
		name: 'Hannovermarkt',
		tag: 'han'
	},
	{
		name: 'Seestadt',
		tag: 'see'
	},
	{
		name: 'Linz',
		tag: 'LNZ'
	},
	{
		name: 'Salzburg',
		tag: 'SBG'
	}
]

export const load: PageServerLoad = async ({ params }) => {
	console.log('loading...')
	const bars: BoulderBar[] = barMetaData.map((meta) => {
		return {
			meta: meta,
			occupancy: loadOccupancy(meta)
		}
	})

	return {
		bars: bars
	}
}

const loadOccupancy = (meta: BarMetaData) => {
	return Math.round(Math.random() * 100)
}
