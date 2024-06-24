<script lang="ts">
	import '../app.css'
	import MenuButton from '$lib/components/menuButton.svelte'

	export let data

</script>


<div class="relative min-h-screen bg-gray-700 text-white">
	{#if data.user}
		<MenuButton />
	{/if}
	<main>
		<slot />
	</main>
	<!-- NOTE: offline support badge is disabled -->

	<!-- {#await import('$lib/PWABadge.svelte') then { default: PWABadge }} -->
	<!-- 	<PWABadge /> -->
	<!-- {/await} -->
</div>
