<script lang="ts">
	import type { HallOccupancy } from './types'
	import Skull from '$lib/svg/Skull.svelte'

	export let occ: HallOccupancy

	let bg = 'green'
	$: {
		if (occ.error) {
			bg = 'rgb(var(--color-surface-500))'
		} else {
			bg = occ.occupancy < 50 ? 'green' : occ.occupancy > 80 ? 'red' : 'yellow'
		}
	}
</script>

<div>
	<div class="flex space-between">
		<div class="flex flex-1 gap-2 items-center">
			<img class="w-[24px] h-[24px]" src="{occ.icon}.png" alt="icon for location" />
			<h3 class="h3 flex-1">{occ.name}</h3>
		</div>
		<div class="m-auto flex gap-2 items-center">
			{#if occ.error}
				<Skull />Error<Skull />
			{:else}
				{occ.occupancy}%
			{/if}
		</div>
	</div>
	<div class="flex gap-2 items-center">
		<div
			class="flex-1 {occ.loading
				? 'loading'
				: 'border-neutral-700'} border-2 bg-black rounded-lg overflow-hidden p-[2px]"
		>
			<div
				class="p-2 h-6 rounded"
				style="background:{bg}; width:{occ.error ? 100 : occ.occupancy}%"
			/>
		</div>
	</div>
</div>

<style>
	.loading {
		animation-duration: 1s;
		animation-name: loading-bar;
		animation-iteration-count: infinite;
		animation-timing-function: ease-out;
	}

	@keyframes loading-bar {
		0% {
			border-color: #404040;
		}

		25% {
			border-color: #71717a;
		}

		100% {
			border-color: #404040;
		}
	}
</style>
