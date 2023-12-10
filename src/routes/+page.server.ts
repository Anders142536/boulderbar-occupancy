import axios from 'axios'
import type { PageServerLoad } from './$types'
import type { BarMetaData, BoulderBar } from './types'

export const ssr = false
const ax = axios.create({
	baseURL: 'https://flash-cloud.boulderbar.net/modules/bbext/'
})
const axOld = axios.create({
	baseURL: 'https://shopsbg.boulderbar.net:8081/modules/bbext/'
})
const barMetaData: BarMetaData[] = [
	{
		name: 'Wiener Berg',
		tag: 'wb',
		newEndpoint: true
	},
	{
		name: 'Hauptbahnhof',
		tag: 'hbf',
		newEndpoint: true
	},
	{
		name: 'Hannovermarkt',
		tag: 'han',
		newEndpoint: true
	},
	{
		name: 'Seestadt',
		tag: 'see',
		newEndpoint: true
	},
	{
		name: 'Linz',
		tag: 'LNZ',
		newEndpoint: false
	},
	{
		name: 'Salzburg',
		tag: 'SBG',
		newEndpoint: false
	}
]

export const load: PageServerLoad = async () => {
	console.log('loading...')
	const bars: BoulderBar[] = await Promise.all(
		barMetaData.map(async (meta): Promise<BoulderBar> => {
			return {
				meta: meta,
				occupancy: await loadOccupancy(meta)
			}
		})
	)

	return {
		bars: bars
	}
}

const loadOccupancy = async (meta: BarMetaData): Promise<number> => {
	const response = await (meta.newEndpoint ? ax : axOld).get(`CustomerCapacity.php?gym=${meta.tag}`)
	const resData = response.data as string

	// ~~~magic~~~
	const h2Regex = /<h2>(\d*)%<\/h2>/g

	const matches = h2Regex.exec(resData)

	let occ = -1
	if (matches === null) {
		console.debug('matches was null, something failed')
	} else {
		console.debug(`regex matched: ${matches[0]} with parsed number ${matches[1]}`)
		occ = Number(matches[1])
	}

	console.log(`loaded ${meta.name.padEnd(13)} with ${occ.toString().padStart(3)}%`)
	return occ
}
