import { error, json } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import axios from 'axios'

const axNew = axios.create({
	baseURL: 'https://flash-cloud.boulderbar.net/modules/bbext/'
})

const axOld = axios.create({
	baseURL: 'https://flash-cloud-sbg.boulderbar.net/modules/bbext/'
})

export const GET: RequestHandler = async ({ url }) => {
	const tag = url.searchParams.get('tag')

	if (tag === null) {
		error(400, 'The tag of the requested boulderbar must be given')
	}

	const useOld = Boolean(url.searchParams.get('useOld')) ?? false
	const axInstanceToUse = useOld ? axOld : axNew

	const response = await axInstanceToUse.get(`CustomerCapacity.php?gym=${tag}`)
	const resData = response.data as string

	// remove this, just for dev purposes
	//await new Promise((f) => setTimeout(f, 1000))

	// ~~~magic~~~
	const h2Regex = /<h2>(\d*)%<\/h2>/g

	const matches = h2Regex.exec(resData)

	if (matches === null) {
		console.debug('matches was null, something failed')
		error(500, 'Could not parse occupancy')
	}

	console.debug(`regex matched: ${matches[0]} with parsed number ${matches[1]}`)
	return json({
		occupancy: Number(matches[1])
	})
}
