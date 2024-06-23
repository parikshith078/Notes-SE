<script lang="ts">
	export let data: { note: { text: string; id: string } }

	let value = data.note.text
	let id = data.note.id
	let debounceTimeout: NodeJS.Timeout | null = null

	const saveChanges = async () => {
		const response = await fetch('/api/updateNote', {
			method: 'POST',
			body: JSON.stringify({ value, id }),
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			console.log('Changes saved successfully')
		} else {
			console.error('Failed to save changes')
		}
	}

	const debouncedSaveChanges = () => {
		if (debounceTimeout) {
			clearTimeout(debounceTimeout)
		}
		debounceTimeout = setTimeout(saveChanges, 1000) // 5 seconds debounce time
	}
</script>

<div class="container mx-auto mt-10 h-screen max-w-3xl">
	<textarea
		class="h-[80%] w-full resize-none rounded-xl bg-gray-700 p-8 text-lg leading-6 text-gray-200 shadow-lg outline-0 transition"
		placeholder="Enter a note...."
		bind:value
		on:input={debouncedSaveChanges}
	/>
</div>
