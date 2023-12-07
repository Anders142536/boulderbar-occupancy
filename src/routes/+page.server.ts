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
	const response = await ax.get(meta.tag)
	const resData = response.data as string

	// ~~~magic~~~
	const h2Regex = /<h2>(\d*)%<\/h2>/g

	const matches = h2Regex.exec(resData)

	const occ
	if (matches === null) {
		console.debug('matches was null, something failed')
		occ = -1
	} else {
		console.debug(`regex matched: ${matches[0]} with parsed number ${matches[1]}`)
		occ = Number(matches[1])
	}

	console.log(`loaded ${meta.name.padEnd(13)} with ${occ.toString().padStart(3)}%`)
	return occ
}
