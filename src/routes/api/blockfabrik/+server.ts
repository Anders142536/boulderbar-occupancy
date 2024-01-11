import axios from 'axios'
import type { RequestHandler } from './$types'
import { json } from '@sveltejs/kit'

type BlockFabrikData = {
	counter: number
	maxcount: number
	countername: string
}

export const GET: RequestHandler = async ({ url }) => {
	// was hardcoded on their website
	const fetchUrl =
		'https://www.boulderado.de/boulderadoweb/gym-clientcounter/index.php?mode=get&token=eyJhbGciOiJIUzI1NiIsICJ0eXAiOiJKV1QifQ.eyJjdXN0b21lciI6IkJsb2NrZmFicmlrV2llbiJ9.yymz1Eg_-jX28iMdaq1aGVb0iD4-29uWVkuxZd7a_9U&raw=1'

	const response = await axios.get(fetchUrl)
	const res = response.data as BlockFabrikData
	console.debug(`res: ${JSON.stringify(res)}`)

	const maxCount = 195 // hardcoded on their website
	const occ = ((res.counter / maxCount) * 100).toFixed(0) // same way as on their website
	console.log(`loaded blockfabrik with ${occ.padStart(3)}%`)
	return json({
		occupancy: Number(occ)
	})
}
