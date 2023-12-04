<script lang="ts">
	import type { BoulderBar } from "./types";
	import Bar from './Bar.svelte'
	import RefreshIndicator from "./RefreshIndicator.svelte";


	let bars : BoulderBar[] = [
			{
				name:	'Wiener Berg',
				tag:	'wb',
				occupancy: 0
			},
			{
				name:	'Hauptbahnhof',
				tag:	'hbf',
				occupancy: 7
			},
			{
				name:	'Hannovermarkt',
				tag:	'han',
				occupancy: 99
			},
			{
				name:	'Seestadt',
				tag:	'see',
				occupancy: 100
			},
			{
				name:	'Linz',
				tag:	'LNZ',
				occupancy: 60
			},
			{
				name:	'Salzburg',
				tag:	'SBG',
				occupancy: 80
			}
		]
;
	let countdown = 10;


	function refreshCountdown() {
		countdown = countdown <= 1 ? 10 : countdown - 1
		setTimeout(refreshCountdown, 1000)
	}

	refreshCountdown()

</script>

<div class='flex flex-col h-screen'>
	<div class='w-full text-right bg-black p-2'>
		<RefreshIndicator {countdown} />
	</div>

	<div class='flex-1 overflow-scroll w-full max-w-screen-sm m-auto flex gap-4 flex-col p-4'>
		{#each bars as bar}
			<Bar name={bar.name} occupancy={bar.occupancy}/>
		{:else}
			<div class='text-center w-full p-2'>Keine Bars definiert</div>
		{/each}
	</div>
</div>
