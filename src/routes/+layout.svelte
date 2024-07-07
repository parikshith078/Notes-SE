<script lang="ts">
	import '../app.css'
	import MenuButton from '$lib/components/menuButton.svelte'
	import { Toaster } from 'svelte-french-toast'

	export let data
</script>

<div class="relative max-h-screen min-h-screen bg-gray-700 text-white">
	<Toaster />
	{#if data.user}
		<MenuButton />
	{/if}
	<main>
		<slot />
	</main>
</div>
