<script lang="ts">
	import { page } from '$app/stores'
	import { TabAnchor } from '@skeletonlabs/skeleton'

	export let route: string
	export let img: string
	export let label: string
</script>

<TabAnchor href={route} selected={$page.url.pathname === route}>
	<svelte:fragment slot="lead">
		<img class="m-auto" height="48" width="48" src="/icons/{img}.png" alt={label} />
	</svelte:fragment>
	{label}
</TabAnchor>
