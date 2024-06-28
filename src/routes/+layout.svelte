<script lang="ts">
	import '../app.css'
	import MenuButton from '$lib/components/menuButton.svelte'
	import { onMount } from 'svelte'
	import { updateItems } from '$lib/indexdb'

	export let data

	const saveToIndexDB = async () => {
		console.log('Saving to indexdb')
		const transpiledDB = data.notes.map((item) => ({
			id: item.id,
			dirty: false,
			isNew: false,
			isDeleted: false,
			text: item.text,
			userId: item.userId,
			createdAt: item.createdAt,
			modifiedAt: item.modifiedAt
		}))
		await updateItems(transpiledDB)
		console.log('Saving completed')
	}

	onMount(async () => {
		if (data.user) {
			await saveToIndexDB()
		}
	})
</script>

<div class="relative max-h-screen min-h-screen bg-gray-700 text-white">
	{#if data.user}
		<MenuButton />
	{/if}
	<main>
		<slot />
	</main>
</div>
