<script lang="ts">
	export let name = '';
	export let occupancy = 99;

	let bg = 'green';
	$: bg = occupancy < 50 ? 'green' : occupancy > 80 ? 'red' : 'yellow';
</script>

<div>
	<div class="flex space-between">
		<h3 class="h3 flex-1">{name}</h3>
		<div class="m-auto">
			{occupancy}%
		</div>
	</div>
	<div class="flex gap-2 items-center">
		<div class="flex-1 bg-black border-2 rounded-lg border-neutral-700 overflow-hidden">
			<div class="p-2 h-6" style="background:{bg}; width:{occupancy}%" />
		</div>
	</div>
</div>
