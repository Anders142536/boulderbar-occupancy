<script lang="ts">
	import Bar from './Bar.svelte'
	import RefreshIndicator from './RefreshIndicator.svelte'
	import type { PageServerData } from './$types'
	import { goto, invalidate, invalidateAll } from '$app/navigation'

	export let data: PageServerData

	let countdown = 10

	function refreshCountdown() {
		if (countdown <= 1) {
			countdown = 10
			invalidateAll()
		} else {
			countdown = countdown - 1
		}
		setTimeout(refreshCountdown, 1000)
	}

	refreshCountdown()
</script>

<div class="flex flex-col h-screen">
	<div class="w-full text-right bg-black p-2">
		<RefreshIndicator {countdown} />
	</div>

	<div class="flex-1 overflow-scroll w-full max-w-screen-sm m-auto flex gap-4 flex-col p-4">
		{#each data.bars as bar}
			<Bar name={bar.meta.name} occupancy={bar.occupancy} />
		{:else}
			<div class="text-center w-full p-2">Keine Bars definiert</div>
		{/each}
	</div>
</div>
