<script lang="ts">
	import '../app.css'
	import { pwaInfo } from 'virtual:pwa-info'
	import { pwaAssetsHead } from 'virtual:pwa-assets/head'

	$: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : ''
</script>

<svelte:head>
	{#if pwaAssetsHead.themeColor}
		<meta name="theme-color" content={pwaAssetsHead.themeColor.content} />
	{/if}
	{#each pwaAssetsHead.links as link}
		<link {...link} />
	{/each}
	{@html webManifest}
</svelte:head>

<div class="min-h-screen bg-gray-700 text-white">
	<main>
		<slot />
	</main>
	<!-- NOTE: offline support badge is disabled -->

	<!-- {#await import('$lib/PWABadge.svelte') then { default: PWABadge }} -->
	<!-- 	<PWABadge /> -->
	<!-- {/await} -->
</div>
