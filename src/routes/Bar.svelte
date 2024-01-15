<script lang="ts">
	import type { HallOccupancy } from './types'

	export let occ: HallOccupancy

	let bg = 'green'
	$: bg = occ.occupancy < 50 ? 'green' : occ.occupancy > 80 ? 'red' : 'yellow'
</script>

<div>
	<div class="flex space-between">
		<h3 class="h3 flex-1">{occ.name}</h3>
		<div class="m-auto">
			{occ.occupancy}%
		</div>
	</div>
	<div class="flex gap-2 items-center">
		<div class="flex-1 bg-black border-2 rounded-lg border-neutral-700 overflow-hidden p-[2px]">
			<div class="p-2 h-6 rounded" style="background:{bg}; width:{occ.occupancy}%" />
		</div>
	</div>
</div>
