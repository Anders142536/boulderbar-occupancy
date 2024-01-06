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
	const bbNew = await Promise.all(
		BBNewMetaData.map(async (meta): Promise<HallOccupancy> => {
			return {
				name: meta.name,
				occupancy: await loadBBOccupancy(meta, axBBNew)
			}
		})
	)

	const bbOld = await Promise.all(
		BBOldMetaData.map(async (meta): Promise<HallOccupancy> => {
			return {
				name: meta.name,
				occupancy: await loadBBOccupancy(meta, axBBOld)
			}
		})
	)

	const blockFabrik: HallOccupancy = {
		name: 'BlockFabrik',
		occupancy: await loadBlockFabrikOccupancy()
	}

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

type BlockFabrikData = {
	counter: number
	maxcount: number
	countername: string
}

const loadBlockFabrikOccupancy = async (): Promise<number> => {
	// was hardcoded on their website
	const url =
		'https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php?mode=get&token=eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IkJsb2NrZmFicmlrV2llbiJ9.yymz1Eg_-jX28iMdaq1aGVb0iD4-29uWVkuxZd7a_9U&raw=1'

	const response = await axios.get(url)
	const res = response.data as BlockFabrikData
	console.debug(`res: ${JSON.stringify(res)}`)

	const maxCount = 195 // hardcoded on their website
	const occ = ((res.counter / maxCount) * 100).toFixed(0) // same way as on their website
	console.log(`loaded blockfabrik with ${occ.toString().padStart(3)}%`)
	return occ
}
