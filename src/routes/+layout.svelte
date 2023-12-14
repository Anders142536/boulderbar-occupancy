<script lang="ts">
	import '../app.postcss'
	import { AppShell, TabGroup } from '@skeletonlabs/skeleton'
	import RefreshIndicator from './RefreshIndicator.svelte'
	import { invalidateAll } from '$app/navigation'
	import NavTab from './NavTab.svelte'

	const refreshinterval = 60
	let activeTimeoutId: NodeJS.Timeout
	let countdown = refreshinterval

	function refreshCountdown() {
		// this stops the countdown if the browser is hidden to avoid traffic
		if (document.hidden)
			return

		if (countdown <= 1) {
				countdown = refreshinterval
				invalidateAll()
		} else {
			countdown = countdown - 1
		}
		activeTimeoutId = setTimeout(refreshCountdown, 1000)
	}

	function forceRefresh() {
		clearTimeout(activeTimeoutId)
		countdown = refreshinterval
		invalidateAll()
		activeTimeoutId = setTimeout(refreshCountdown, 1000)
	}

	refreshCountdown()

</script>

<svelte:window on:focus={forceRefresh} />

<AppShell>
	<div slot="header" class="text-right bg-black p-2">
		<RefreshIndicator {countdown} />
	</div>

	<slot />

	<svelte:fragment slot="footer">
		<TabGroup
			active="variant-filled-primary"
			justify="justify-center"
			hover="hover:variant-soft-primary"
			rounded=""
			border=""
			flex="flex-1 lg:flex-none"
			class="w-full"
		>
			<NavTab route="/old" label="Old" />
			<NavTab route="/" label="Fancy" />
		</TabGroup>
	</svelte:fragment>
</AppShell>
