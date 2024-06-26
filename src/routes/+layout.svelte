<script lang="ts">
	import '../app.css'
	import MenuButton from '$lib/components/menuButton.svelte'

	export let data

</script>

<div class="relative min-h-screen max-h-screen bg-gray-700 text-white">
	{#if data.user}
		<MenuButton />
	{/if}
	<main>
		<slot />
	</main>
</div>
