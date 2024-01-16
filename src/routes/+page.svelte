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

	const loadOccupancies = async () => {
		for (let loc of data.locations) {
			switch (loc.type) {
				case LocationEndpointType.BBNew:
					axios
						.get(`/api/boulderbar?tag=${loc.tag}`)
						.then((res) => handle(loc.name, res, 'boulderbar'))
					break
				case LocationEndpointType.BBOld:
					axios
						.get(`/api/boulderbar?tag=${loc.tag}&useOld=true`)
						.then((res) => handle(loc.name, res, 'boulderbar'))
					break
				case LocationEndpointType.BlockFabrik:
					axios.get(`/api/blockfabrik`).then((res) => handle(loc.name, res, 'blockfabrik'))
					break
			}
		}
	}

	const handle = (name: string, res: AxiosResponse, icon: string) => {
		console.log(`occupancy for ${name}: ${res.data.occupancy}`)
		occupancies.set(name, {
			name: name,
			occupancy: res.data.occupancy,
			icon: icon,
			loading: false
		} as HallOccupancy)

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

	loadOccupancies()
</script>

<div class="flex-1 overflow-scroll m-auto w-full max-w-screen-sm flex gap-4 flex-col p-4">
	{#each occList as occ (occ.name)}
		<Bar {occ} />
	{:else}
		<div class="text-center w-full p-2">Keine Bars definiert</div>
	{/each}
</div>
