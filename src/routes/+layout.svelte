<script>
	import '../app.css'
	import { pwaInfo } from 'virtual:pwa-info'
	import { pwaAssetsHead } from 'virtual:pwa-assets/head'
	import { on_key_up, on_key_down } from '$lib/keybinding'

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

<svelte:window on:keydown={on_key_down} on:keyup={on_key_up} />
<div>
	<main class="bg-gray-700 text-white">
		<slot />
	</main>
	{#await import('$lib/PWABadge.svelte') then { default: PWABadge }}
		<PWABadge />
	{/await}
</div>
