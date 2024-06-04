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
	<div class="flex space-between mb-1">
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
		animation: blink 0.5s infinite ease-out, stripes 1s infinite linear;
		/*background: repeating-linear-gradient(
				45deg,
				#000,
				#000 20px,
				#333 20px,
				#333 40px)*/
		background: linear-gradient(90deg, #000, #333 10%, #000 11%);
	}

	@keyframes blink {
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

	@keyframes stripes {
		0% {
			background-position: 0px;
			box-shadow: inset 0px 0px 0.6rem 1rem black;
		}

		12% {
			box-shadow: inset 0px 0px 0.6rem 0.1rem black;
		}

		50% {
			box-shadow: inset 0px 0px 0.6rem 0.7rem black;
		}

		62% {
			box-shadow: inset 0px 0px 0.6rem 0.1rem black;
		}

		90% {
			box-shadow: inset 0px 0px 0.6rem 0.7rem black;
		}

		100% {
			background-position: 600px;
			box-shadow: inset 0px 0px 0.6rem 1rem black;
		}
	}
</style>
