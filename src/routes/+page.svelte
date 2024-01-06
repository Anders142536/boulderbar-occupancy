<script lang="ts">
	import Bar from './Bar.svelte'
	import type { PageServerData } from './$types'

	export let data: PageServerData
</script>

<div class="flex-1 overflow-scroll m-auto w-full max-w-screen-sm flex gap-4 flex-col p-4">
	{#each data.occupancies as occ}
		<Bar name={occ.name} occupancy={occ.occupancy} />
	{:else}
		<div class="text-center w-full p-2">Keine Bars definiert</div>
	{/each}
</div>
