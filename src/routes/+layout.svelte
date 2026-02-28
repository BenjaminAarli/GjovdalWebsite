
<!-- This code kept giving hydration errors when doing anything in the main +page.svelte, only left here for backup safety incase it's needed. -->
<!-- <script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()} -->

<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<slot />