<script lang="ts">
	import { updateItem, getItems, addItems } from '$lib/indexdb'
	let text = ''
	let testData: any
	export let data

	const handleClick = async () => {
		try {
			await updateItem({
				id: 'glsgjskglj',
				text: text,
				dirty: false
			})
		} catch (err) {
			console.error('Error while storing: ', err)
		}
	}
	const getData = async () => {
		testData = await getItems()
	}
	const addAll = async () => {
		try {
			let noteData = data.notes
			noteData = noteData.map((note) => ({ ...note, dirty: false }))
			await addItems(noteData)
		} catch (err) {
			console.error('Error while storing: ', err)
		}
	}
</script>

<form
	class="mx-auto flex min-h-screen max-w-20 flex-col items-center justify-center gap-8 text-left"
>
	<label for="text">Text</label>
	<input class="px-2 py-1 text-gray-900" bind:value={text} name="text" type="text" />
	<button class="rounded-md bg-primary px-2 py-1" on:click|preventDefault={handleClick}>Add</button>
	<button class="rounded-md bg-primary px-2 py-1" on:click|preventDefault={addAll}>Add all</button>
	<button class="rounded-md bg-primary px-2 py-1" on:click|preventDefault={getData}>Get</button>
	{#if testData}
		<pre> 
       {JSON.stringify(testData, null, 2)}
    </pre>
	{/if}
</form>
