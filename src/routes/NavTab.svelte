<script lang="ts">
	import { page } from '$app/stores'
	import { TabAnchor } from '@skeletonlabs/skeleton'

	export let route: string
	export let label: string
</script>

<TabAnchor href={route} selected={$page.url.pathname === route}>
	<svelte:fragment slot="lead">
		<div class="flex justify-center">
			<slot />
		</div>
	</svelte:fragment>
	{label}
</TabAnchor>
