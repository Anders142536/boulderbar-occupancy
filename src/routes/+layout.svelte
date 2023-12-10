<script lang="ts">
	import '../app.postcss'
	import { AppShell, TabGroup } from '@skeletonlabs/skeleton'
	import RefreshIndicator from './RefreshIndicator.svelte'
	import { invalidateAll } from '$app/navigation'
	import NavTab from './NavTab.svelte'

	const refreshinterval = 60
	let countdown = refreshinterval

	function refreshCountdown() {
		if (countdown <= 1) {
			// this stops the countdown at 1 if the browser is closed to avoid traffic
			// and to automatically reload on opening
			if (document.hasFocus()) {
				countdown = refreshinterval
				invalidateAll()
			}
		} else {
			countdown = countdown - 1
		}
		setTimeout(refreshCountdown, 1000)
	}

	refreshCountdown()
</script>

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
			<NavTab route="/old" label="Old" img="nav-todo" />
			<NavTab route="/" label="Fancy" img="nav-cal" />
		</TabGroup>
	</svelte:fragment>
</AppShell>
