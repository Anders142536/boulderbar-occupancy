<script lang="ts">
	import Bar from './Bar.svelte'
	import type { PageServerData } from './$types'
	import { LocationEndpointType, type HallOccupancy } from './types'
	import axios, { type AxiosResponse } from 'axios'

	export let data: PageServerData

	// TODO refactor this to use a store for triggering the reload on refresh
	// countdown instead of now useless invalidate method call and this hack here
	$: {
		data.locations
		loadOccupancies()
	}

	let occupancies: Map<string, HallOccupancy> = new Map()
	let occList: HallOccupancy[] = []

	const init = () => {
		for (let loc of data.locations) {
			switch (loc.type) {
				case LocationEndpointType.BBNew:
				case LocationEndpointType.BBOld:
					occupancies.set(loc.name, {
						name: loc.name,
						occupancy: 0,
						icon: 'boulderbar',
						loading: true
					} as HallOccupancy)
					break
				case LocationEndpointType.BlockFabrik:
					occupancies.set(loc.name, {
						name: loc.name,
						occupancy: 0,
						icon: 'blockfabrik',
						loading: true
					} as HallOccupancy)
					break
			}
		}
	}

	const setAllToLoading = () => {
		for (const [name, occ] of occupancies) {
			occupancies.set(name, {
				name: occ.name,
				occupancy: occ.occupancy,
				icon: occ.icon,
				loading: true,
				error: occ.error
			})
		}
	}

	const loadOccupancies = async () => {
		setAllToLoading()
		for (let loc of data.locations) {
			switch (loc.type) {
				case LocationEndpointType.BBNew:
					axios
						.get(`/api/boulderbar?tag=${loc.tag}`)
						.catch((error) => {
							handleError(loc.name, 'boulderbar')
						})
						.then((res) => {
							if (res) {
								handle(loc.name, res, 'boulderbar')
							}
						})
					break
				case LocationEndpointType.BBOld:
					axios
						.get(`/api/boulderbar?tag=${loc.tag}&useOld=true`)
						.catch((error) => {
							handleError(loc.name, 'boulderbar')
						})
						.then((res) => {
							if (res) {
								handle(loc.name, res, 'boulderbar')
							}
						})
					break
				case LocationEndpointType.BlockFabrik:
					axios
						.get(`/api/blockfabrik`)
						.catch((error) => {
							handleError(loc.name, 'blockfabrik')
						})
						.then((res) => {
							if (res) {
								handle(loc.name, res, 'blockfabrik')
							}
						})
					break
			}
		}

		sort()
	}

	const handle = (name: string, res: AxiosResponse, icon: string) => {
		console.log(`occupancy for ${name}: ${res.data.occupancy}`)
		occupancies.set(name, {
			name: name,
			occupancy: res.data.occupancy,
			icon: icon,
			loading: false,
			error: false
		} as HallOccupancy)

		sort()
	}

	const handleError = (name: string, icon: string) => {
		console.warn(`an error occured whilst fetching ${name}`)
		occupancies.set(name, {
			name: name,
			occupancy: -1,
			icon: icon,
			loading: false,
			error: true
		} as HallOccupancy)

		sort()
	}

	const sort = () => {
		// takes values and converts it to array
		occList = Array.from(occupancies, ([name, value]) => value)

			// sorting based on the location of entries in data string to avoid
			// random order
			.sort(
				(a, b) =>
					data.locations.findIndex((e) => e.name === a.name) -
					data.locations.findIndex((e) => e.name === b.name)
			)
	}

	init()
	loadOccupancies()
</script>

<div class="flex-1 overflow-scroll m-auto w-full max-w-screen-sm flex gap-4 flex-col p-4">
	{#each occList as occ (occ.name)}
		<Bar {occ} />
	{:else}
		<div class="text-center w-full p-2">Keine Bars definiert</div>
	{/each}
</div>
