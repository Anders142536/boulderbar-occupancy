import axios, { type AxiosInstance } from 'axios'
import type { PageServerLoad } from './$types'
import type { BarMetaData, HallOccupancy } from './types'

export const ssr = false

const axBBNew = axios.create({
	baseURL: 'https://flash-cloud.boulderbar.net/modules/bbext/'
})

const axBBOld = axios.create({
	baseURL: 'https://flash-cloud-sbg.boulderbar.net/modules/bbext/'
})

const BBNewMetaData: BarMetaData[] = [
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
	}
]

const BBOldMetaData: BarMetaData[] = [
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
	const bbNew = await Promise.all(BBNewMetaData.map(async (meta): Promise<HallOccupancy> => {
		return {
			name: meta.name,
			occupancy: await loadBBOccupancy(meta, axBBNew)
		}
	}))

	const bbOld = await Promise.all(BBOldMetaData.map(async (meta): Promise<HallOccupancy> => {
		return {
			name: meta.name,
			occupancy: await loadBBOccupancy(meta, axBBOld)
		}
	}))

	const blockFabrik: HallOccupancy = ({
		name: 'BlockFabrik',
		occupancy: await loadBlockFabrikOccupancy()
	})

	return {
		occupancies: bbNew.concat(bbOld, blockFabrik)
	}
}

const loadBBOccupancy = async (meta: BarMetaData, axios: AxiosInstance): Promise<number> => {
	const response = await axios.get(`CustomerCapacity.php?gym=${meta.tag}`)
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

const loadBlockFabrikOccupancy = async (): Promise<number> => {
	return 0
}
